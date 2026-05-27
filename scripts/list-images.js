const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
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

const projets = [
  { id: 'piscine',            folder: '1GVtvKD2pG3XPjP5yf5Bn3XymB1NeQNIo' },
  { id: 'mr-phil',            folder: '1vCnsRg-3KstD1ywbQuj5JrHYyEUYyy1d' },
  { id: 'akogbato-retenue',   folder: '12vspD6ipW6CaJ4tBiIiktCKsh6IaNfXB' },
  { id: 'akogbato-prop1',     folder: '1Pat_FSGuP9fse8PhzG0U9hDsDYFOXIvi' },
  { id: 'presbytere',         folder: '1I5ZeS10FazKfkGlj7oEC-v8NOkKPwTYP' },
  { id: 'amenagement-sejour', folder: '1Sm4oWPN73YzacFZZ3SdvspMZZmRaQCmU' },
  { id: 'seme-kpodji',        folder: '12H8iTyU4itLft0ccf7U2XZWsCiWsgEFV' },
  { id: 'appartement',        folder: '1yXdQxCqSfu1xjoJGzmBIrWvSdo17dTPg' },
  { id: 'restaurant-houmba',  folder: '1-HHLVlVpSA87lbSFBzDjj7qokk8m5_Ua' },
];

async function listAll() {
  for (const p of projets) {
    console.log(`\n=== ${p.id} ===`);
    try {
      const res = await drive.files.list({
        q: `'${p.folder}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: 'files(id, name)',
        orderBy: 'name',
        pageSize: 50,
      });
      const files = res.data.files || [];
      files.forEach((f, i) => console.log(`  [${i}] ${f.name}  →  ${f.id}`));
      if (files.length === 0) console.log('  (aucune image)');
    } catch(e) {
      console.log(`  ERREUR: ${e.message}`);
    }
  }
}

listAll();
