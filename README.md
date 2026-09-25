# استبيان عيادات الطيب — رؤية للإنتاج الفني

صفحة استبيان تفاعلية (GitHub Pages) والإجابات تنحفظ في Google Sheets مجاناً.

## النشر (مرة وحدة)
1. ارفع كل الملفات للريبو `vision-pro/alteeb_clinics` (index.html + ملفات الشعار).
2. Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `(root)` → Save.
3. الرابط يصير: `https://vision-pro.github.io/alteeb_clinics/`

## ربط Google Sheets
1. سوّ Google Sheet جديد.
2. Extensions → Apps Script → الصق محتوى `apps-script.gs`.
3. Deploy → New deployment → Web app → Execute as: **Me** — Who has access: **Anyone**.
4. انسخ رابط الـ Web App والصقه في `index.html` بالسطر:
   `const SCRIPT_URL = "";`
5. ارفع التعديل. كل إرسال يطلع صف جديد بالشيت + إيميل تنبيه.

> جرّب الإرسال مرة بنفسك قبل ما تدز الرابط للزبون.
