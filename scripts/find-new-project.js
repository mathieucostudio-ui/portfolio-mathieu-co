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
const ROOT_ID = env.GOOGLE_DRIVE_ROOT_ID;

async function run() {
  // List all subfolders in root
  const res = await drive.files.list({
    q: `'${ROOT_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id, name)',
    orderBy: 'name',
    pageSize: 50,
  });
  console.log('\n=== Dossiers dans PROJET PORTFOLIO ===');
  res.data.files.forEach(f => console.log(`  ${f.name}  →  ${f.id}`));

  // Search for FIP files anywhere
  const fip = await drive.files.list({
    q: `name contains 'FIP1' and mimeType contains 'image/' and trashed = false`,
    fields: 'files(id, name, parents)',
    pageSize: 20,
  });
  console.log('\n=== Fichiers FIP1 trouvés ===');
  fip.data.files.forEach(f => console.log(`  ${f.name}  →  ${f.id}  (parent: ${f.parents?.[0]})`));
}
run();
