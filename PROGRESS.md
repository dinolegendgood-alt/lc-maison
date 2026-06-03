# 龍策 DETAILING 進度紀錄

## 專案狀態：✅ 全系統上線，含 CMS 後台管理

---

## 重要網址與帳號

| 項目 | 網址 / 資訊 |
|------|------------|
| **正式網站** | https://lc-maison.pages.dev |
| **管理後台** | https://lc-maison.pages.dev/admin.html |
| **後台密碼** | lcmaison2026 |
| **GitHub Repo** | https://github.com/dinolegendgood-alt/lc-maison |
| **Supabase 專案** | https://supabase.com/dashboard/project/dgepltmxtbwbfalqgnqv |
| **Cloudflare Pages** | https://dash.cloudflare.com → Workers & Pages → lc-maison |
| **EZPretty 預約系統** | https://www.ezpretty.com.tw/ezpretty/ezpretty/login?es=5545d31e706480f49bb20ba65548e6ca&redirect=/ezpretty/aio%23/5545d31e706480f49bb20ba65548e6ca |

---

## 技術架構

- **前端**：純靜態 HTML + CSS + JS（4 頁 + 後台）
- **部署**：Cloudflare Pages（連接 GitHub，推送自動更新）
- **資料庫**：Supabase PostgreSQL（工藝選集內容動態管理）
- **圖片儲存**：Supabase Storage（Bucket：`images`，公開）
- **版控**：GitHub（帳號：dinolegendgood-alt，branch：master）

---

## 網站架構

| 檔案 | 頁面名稱 | 說明 |
|------|---------|------|
| `index.html` | 品牌首頁 | 龍策 DETAILING 首頁，預約按鈕直連 EZPretty |
| `glow.html` | 工藝選集 | 動態從 Supabase 載入三大服務方案 |
| `drop.html` | 典藏實錄 | 動態從 Supabase Storage 載入施工照片 |
| `booking.html` | 立即預約 | 一鍵連結 EZPretty 線上預約 |
| `admin.html` | 管理後台 | 密碼保護，管理典藏照片、工藝選集內容、圖片庫 |
| `assets/css/main.css` | — | 全站樣式（含完整 RWD：手機/平板/桌機） |
| `assets/js/main.js` | — | 漢堡選單、滾動動畫、頁面淡入 |
| `assets/js/supabase-client.js` | — | 保留（未使用） |
| `functions/api/r2.js` | — | Cloudflare Pages Function（預留，未啟用） |

---

## Supabase 資料庫

### collections 資料表（工藝選集內容）

| 欄位 | 類型 | 說明 |
|------|------|------|
| id | int | 主鍵（1/2/3） |
| tag | text | 標籤小字（如 Collection 01 / Gloss） |
| name_zh | text | 中文服務名稱 |
| name_en | text | 英文服務名稱 |
| description | text | 服務說明段落 |
| includes | jsonb | 服務項目清單（JSON 陣列） |

```sql
-- RLS 已關閉
alter table collections disable row level security;
grant select, update on public.collections to anon;
```

### Storage 設定（Supabase）

```sql
-- images bucket 公開存取政策
create policy "anon_insert" on storage.objects for insert to anon with check (bucket_id = 'images');
create policy "anon_select" on storage.objects for select to anon using (bucket_id = 'images');
create policy "anon_delete" on storage.objects for delete to anon using (true);
```

- `images/` → 圖片庫（行銷用圖）
- `images/archives/` → 典藏實錄照片（自動顯示於網站）

---

## 管理後台功能

| 分頁 | 功能 |
|------|------|
| **典藏照片** | 上傳照片 → 自動顯示於典藏實錄頁面；刪除同步移除 |
| **工藝選集** | 修改三大服務的標題、說明、項目清單，儲存後網站即時更新 |
| **圖片庫** | 上傳行銷圖片，複製網址告訴 Claude 要放哪個頁面 |

---

## 品牌設定

- **品牌名稱**：龍策 DETAILING
- **創始年份**：2012
- **三大服務**：城市焦點精洗 / 結晶美學鍍膜 / 旗艦漆面防護
- **預約系統**：EZPretty（所有預約按鈕直連，不使用 Supabase）

---

## 更新網站流程

### 自助更新（不需 Claude）
- **典藏照片**：後台上傳/刪除，即時生效
- **工藝選集內容**：後台直接編輯，儲存即更新

### 需要 Claude 協助
- 修改 HTML 結構、新增頁面區塊
- 更新首頁文字、圖片
- 任何設計調整

**更新指令：**
```
git add .
git commit -m "說明"
git push
```
Cloudflare 自動重新部署（約 1 分鐘）

---

## 最近異動紀錄（2026/06/04）

- 全站導覽「工藝選集」改為「服務項目」
- 服務頁標題、副標題改成直白語氣
- 服務頁底部數字區塊（12+/500+/9H/36M）移除
- 首頁文字改為直白語氣（標題、內文、按鈕）
- 後台移除預約管理分頁，保留典藏照片、工藝選集、圖片庫
- 工藝選集改為 Supabase 動態載入，後台可直接編輯內容

## 完成日期：2026/06/04（最後更新）
