# 龍策職人美研 (LC MAISON) 進度紀錄

## 專案狀態：✅ 全系統上線完成（含管理後台）

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

---

## 技術架構

- **前端**：純靜態 HTML + CSS + JS（4 頁）
- **部署**：Cloudflare Pages（連接 GitHub，推送自動更新）
- **資料庫**：Supabase（預約表單儲存）
- **圖片儲存**：Supabase Storage（Bucket 名稱：`images`，公開）
- **版控**：GitHub（帳號：dinolegendgood-alt，branch：master）

---

## 網站架構

| 檔案 | 頁面名稱 | 說明 |
|------|---------|------|
| `index.html` | The Maison | 品牌首頁 |
| `glow.html` | Collections | 工藝選集 |
| `drop.html` | Archives | 施工實錄 |
| `booking.html` | Appointments | 預約表單（連接 Supabase） |
| `admin.html` | 管理後台 | 密碼保護，管理預約與圖片 |
| `assets/css/main.css` | — | 全站樣式 |
| `assets/js/main.js` | — | 動畫與互動 |
| `assets/js/supabase-client.js` | — | 預約表單送出邏輯 |

---

## Supabase 資料庫

### appointments 資料表欄位

| 欄位 | 類型 | 說明 |
|------|------|------|
| id | uuid | 主鍵，自動產生 |
| name | text | 客戶姓名 |
| phone | text | 聯繫電話 |
| model | text | 車型 |
| collection | text | 選擇的服務項目 |
| status | text | pending / contacted / done |
| created_at | timestamptz | 建立時間 |

### 已執行的 SQL 設定
```sql
-- RLS 已關閉（簡化設定）
alter table appointments disable row level security;

-- 授予 anon 完整操作權限
grant select, insert, update, delete on public.appointments to anon;
grant usage on schema public to anon;
```

---

## 管理後台功能

1. **預約管理**：
   - 查看所有預約（依時間倒序）
   - 統計卡：總數 / 待處理 / 已完成
   - 操作：標記「已聯繫」→「已完成」→ 刪除

2. **圖片庫**：
   - 上傳圖片（JPG/PNG/WebP，可多選）
   - 複製圖片公開網址（貼到網站 HTML 使用）
   - 刪除圖片

---

## 更新網站流程

1. 修改本機的 HTML/CSS 檔案
2. 告訴 Claude 幫你推上去
3. Claude 執行：
   ```
   git add .
   git commit -m "說明"
   git push
   ```
4. Cloudflare 自動重新部署（約 1 分鐘）

---

## 完成日期：2026/06/04
