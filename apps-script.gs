/**
 * رؤية للإنتاج الفني — استقبال استبيان عيادات الطيب في Google Sheets
 * 1) افتح Google Sheet جديد باسم "استبيان عيادات الطيب"
 * 2) Extensions > Apps Script ، امسح الموجود والصق هذا الكود
 * 3) Deploy > New deployment > Web app
 *    Execute as: Me   |   Who has access: Anyone
 * 4) انسخ رابط الـ Web App والصقه في index.html بمتغير SCRIPT_URL
 */
const NOTIFY_EMAIL = "v.production.iq@gmail.com"; // يوصلك إيميل مع كل إجابة جديدة (خلّيه "" حتى توقفه)

const LABELS = {
  submitted_at:"وقت الإرسال", contact_name:"الاسم", contact_role:"الصفة", contact_phone:"الهاتف",
  d_devices:"أسنان: الأجهزة", d_device_benefits:"أسنان: فوائد الأجهزة", d_exclusive:"أسنان: أجهزة حصرية",
  d_services:"أسنان: الخدمات", d_materials:"أسنان: المواد والبراندات", d_journey:"أسنان: رحلة المريض",
  d_duration:"أسنان: مدة الجلسات", d_fears:"أسنان: مخاوف المرضى", d_profit:"أسنان: الربحية والطلب",
  d_warranty:"أسنان: الضمان", d_cases:"أسنان: قصص الحالات", d_myths:"أسنان: الخرافات",
  d_keywords:"أسنان: الكلمات المفتاحية", d_impression:"أسنان: انطباع المريض",
  c_devices:"تجميل: الأجهزة", c_brands:"تجميل: الماركات", c_fda:"تجميل: FDA والشهادات",
  c_specs:"تجميل: التفاصيل التقنية", c_services:"تجميل: الخدمات", c_results:"تجميل: النتائج ومدتها",
  c_fears:"تجميل: التخوفات", c_reassure:"تجميل: رسائل الطمأنة", c_bundles:"تجميل: الباقات",
  c_faq_dm:"تجميل: أسئلة الرسائل", c_videos:"تجميل: الفيديوهات المتاحة", c_faq_comments:"تجميل: أسئلة الكومنتات",
  c_terms:"تجميل: المصطلحات", c_redlines:"تجميل: الخطوط الحمراء",
  p_staff:"الخطة: الكادر", p_priority:"الخطة: أولويات الشهر الأول", p_notes:"ملاحظات إضافية"
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const keys = Object.keys(LABELS);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(keys.map(k => LABELS[k]));
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, keys.length).setFontWeight("bold").setBackground("#F37420").setFontColor("#FFFFFF");
      sheet.setRightToLeft(true);
    }
    const p = e.parameter || {};
    sheet.appendRow(keys.map(k => p[k] || ""));
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL, "إجابة جديدة — استبيان عيادات الطيب",
        keys.map(k => LABELS[k] + ":\n" + (p[k] || "—")).join("\n\n"));
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
