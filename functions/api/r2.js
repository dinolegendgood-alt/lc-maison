export async function onRequest(context) {
  const { request, env } = context;

  const ADMIN_SECRET = env.ADMIN_SECRET || 'lcmaison2026';
  const R2_PUBLIC = (env.R2_PUBLIC_URL || '').replace(/\/$/, '');

  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: cors });
  }

  const url = new URL(request.url);
  const action = url.searchParams.get('action');
  const key = decodeURIComponent(url.searchParams.get('key') || '');
  const prefix = url.searchParams.get('prefix') || '';

  if (!env.R2_BUCKET) {
    return json({ error: 'R2 Bucket 尚未設定，請至 Cloudflare Pages → Settings → Functions → R2 bindings 新增 R2_BUCKET' }, 500, cors);
  }

  // 公開：列出檔案
  if (action === 'list') {
    const result = await env.R2_BUCKET.list({ prefix, limit: 300 });
    const files = result.objects
      .filter(o => o.size > 0)
      .map(o => ({
        key: o.key,
        url: R2_PUBLIC ? `${R2_PUBLIC}/${o.key}` : null,
        size: o.size,
        uploaded: o.uploaded,
      }));
    return json(files, 200, cors);
  }

  // 以下需要管理員驗證
  const adminKey = request.headers.get('X-Admin-Key');
  if (adminKey !== ADMIN_SECRET) {
    return new Response('Unauthorized', { status: 401, headers: cors });
  }

  // 上傳
  if (action === 'upload' && request.method === 'PUT') {
    const contentType = request.headers.get('Content-Type') || 'application/octet-stream';
    await env.R2_BUCKET.put(key, request.body, { httpMetadata: { contentType } });
    const publicUrl = R2_PUBLIC ? `${R2_PUBLIC}/${key}` : null;
    return json({ success: true, key, url: publicUrl }, 200, cors);
  }

  // 刪除
  if (action === 'delete' && request.method === 'DELETE') {
    await env.R2_BUCKET.delete(key);
    return json({ success: true }, 200, cors);
  }

  return new Response('Not found', { status: 404, headers: cors });
}

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}
