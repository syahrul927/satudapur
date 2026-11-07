/**
 * SatuDapur waiting-list backend — Google Apps Script Web App.
 *
 * Setup (manual, ~3 menit):
 * 1. Buat Google Sheet baru (bebas nama, mis. "SatuDapur Waitlist").
 * 2. Sheet → Extensions → Apps Script. Hapus isi Code.gs, paste file ini.
 * 3. Run setup() sekali (authorize bila diminta) → sheet dapat header kolom.
 * 4. Deploy → New deployment → type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone            ← WAJIB "Anyone", bukan domain
 *    Deploy → copy Web app URL (.../exec).
 * 5. Paste URL itu ke src/lib/site.ts → SITE.appScriptUrl.
 * 6. Re-deploy tiap kali edit kode ini: Deploy → Manage deployments →
 *    edit (pencil) → Version: New version → Deploy. (Edit tanpa new version
 *    tidak aktif.)
 */

const SHEET_NAME = 'Waitlist';

/** Run once from the editor to create headers. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  sh.getRange(1, 1, 1, 7).setValues([[
    'Timestamp', 'Nama/Resto', 'Kontak', 'Alasan', 'Label Alasan', 'Halaman', 'Status',
  ]]);
  sh.setFrozenRows(1);
  return sh;
}

/** No-preflight warmup — browsers send OPTIONS only with custom headers,
 *  which the client avoids; still, reply politely. */
function doPost(e) {
  const lock = LockService.getScriptLock(); // concurrent submits → no row clobber
  lock.waitLock(10000);
  try {
    const out = JSON.parse(e.postData.contents);
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
      || setup();

    sh.appendRow([
      new Date(),
      String(out.nama || '').slice(0, 120),
      String(out.kontak || '').slice(0, 60),
      String(out.alasan || '').slice(0, 20),        // 'pos' | 'integrasi'
      String(out.alasanLabel || '').slice(0, 60),
      String(out.page || '').slice(0, 40),
      'new',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/* GET = health check; open the /exec URL in a browser, should say alive. */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'satudapur-waitlist' }))
    .setMimeType(ContentService.MimeType.JSON);
}
