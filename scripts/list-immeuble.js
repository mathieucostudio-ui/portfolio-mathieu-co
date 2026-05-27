const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const m = line.match(/^([^=]+)=(.*)$/);
  if (m) env[m[1].trim()] = m[2].trim().replace(/^"|"$/g, '');
});

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: env.GOOGLE_CLIENT_EMAIL,
    private_key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});
const drive = google.drive({ version: 'v3', auth });

const FOLDER_ID = '1X3k6ApCXGGw6XLhnh30nykzouCccS-ms';

async function run() {
  // Direct images
  const res = await drive.files.list({
    q: `'${FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: 'files(id, name)',
    orderBy: 'name',
    pageSize: 50,
  });
  const files = res.data.files || [];
  console.log(`\n=== Immeuble R+2 — images directes (${files.length}) ===`);
  files.forEach((f, i) => console.log(`  [${i}] ${f.name}  →  ${f.id}`));
  if (files.length === 0) console.log('  (aucune image directe)');

  // Subfolders
  const sub = await drive.files.list({
    q: `'${FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id, name)',
    orderBy: 'name',
    pageSize: 20,
  });
  const subfolders = sub.data.files || [];
  if (subfolders.length > 0) {
    console.log('\n=== Sous-dossiers ===');
    for (const sf of subfolders) {
      console.log(`\n  📁 ${sf.name}  →  ${sf.id}`);
      const subRes = await drive.files.list({
        q: `'${sf.id}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: 'files(id, name)',
        orderBy: 'name',
        pageSize: 50,
      });
      (subRes.data.files || []).forEach((f, i) => console.log(`    [${i}] ${f.name}  →  ${f.id}`));
    }
  }
}
run().catch(console.error);
