/**
 * LC Maison - Supabase Integration
 * 處理私人諮詢預約的資料儲存
 */

// 注意：在實際部署時，請將以下 URL 與 KEY 替換為您的 Supabase 專案設定
const SUPABASE_URL = 'https://dgepltmxtbwbfalqgnqv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnZXBsdG14dGJ3YmZhbHFnbnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MDU2NzIsImV4cCI6MjA5NjA4MTY3Mn0.pqGMLBJGBc4apgLIZCnIVGiVaq4XN6Zqws15wC1sZQ4';

async function submitAppointment(data) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/appointments`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('提交失敗，請稍後再試。');
        
        return { success: true };
    } catch (error) {
        console.error('Supabase Error:', error);
        return { success: false, message: error.message };
    }
}

// 監聽預約表單
document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.querySelector('form');
    const submitBtn = document.querySelector('.btn-private');

    if (appointmentForm && submitBtn) {
        submitBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // 獲取表單數據
            const inputs = appointmentForm.querySelectorAll('.form-input, .form-select');
            const data = {
                name: inputs[0].value,
                phone: inputs[1].value,
                model: inputs[2].value,
                collection: inputs[3].value,
                status: 'pending',
                created_at: new Date().toISOString()
            };

            // 簡易驗證
            if (!data.name || !data.phone) {
                alert('請填寫必填欄位：姓名與電話。');
                return;
            }

            // 更新按鈕狀態
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="bilingual-inner"><span class="en">Processing...</span><span class="zh">處理中...</span></span>';
            submitBtn.style.opacity = '0.5';
            submitBtn.disabled = true;

            const result = await submitAppointment(data);

            if (result.success) {
                alert('感謝預約。LC MAISON 的品牌顧問將盡快與閣下聯繫。');
                appointmentForm.reset();
            } else {
                alert('預約失敗：' + result.message);
            }

            // 還原按鈕
            submitBtn.innerHTML = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
        });
    }
});
