# Portfolio Mathieu&Co

Site vitrine — Architecture & Design d'Intérieur · Cotonou, Bénin

**Stack :** Next.js 15 · Tailwind CSS · Google Drive API v3 · Vercel

---

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.local.example .env.local
# → Remplir .env.local avec vos credentials Google Service Account

# Lancer en développement
npm run dev
# → http://localhost:3000
```

## Configuration Google Drive

1. Créer un projet sur [Google Cloud Console](https://console.cloud.google.com)
2. Activer **Google Drive API v3**
3. Créer un **Service Account** → Télécharger le JSON de clés
4. Copier l'email Service Account dans `.env.local`
5. Dans Drive, partager le dossier `PROJET PORTFOLIO` avec cet email (Lecteur)
6. Les images du dossier doivent être accessibles "à toute personne disposant du lien"

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `GOOGLE_CLIENT_EMAIL` | Email du Service Account |
| `GOOGLE_PRIVATE_KEY` | Clé privée RSA (remplacer `\n` par vrais retours) |
| `GOOGLE_DRIVE_ROOT_ID` | `1JO6Rqokunhcxv91Id3uzm8qsnFkiCv9G` |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site |

## Déploiement Vercel

```bash
# 1. Push sur GitHub
git init && git add . && git commit -m "Initial commit"
git remote add origin https://github.com/TON_COMPTE/portfolio-mathieu-co.git
git push -u origin main

# 2. Importer sur vercel.com → Settings → Environment Variables
# 3. Ajouter les 4 variables ci-dessus
```

## Ajouter un projet

Éditer `data/projets.json` — ajouter un objet avec :

```json
{
  "id": "slug-url",
  "num": "10",
  "titre": "Nom du Projet",
  "lieu": "Ville, Pays",
  "type": "Type de projet",
  "palette": "Surface · Matériaux",
  "description": "Description du projet...",
  "tags": ["Tag1", "Tag2"],
  "driveId": "ID_DU_DOSSIER_DRIVE"
}
```

Créer le dossier correspondant dans Drive → partager avec le Service Account → les images apparaissent automatiquement.

---

**Contact :** mathieu.co.studio@gmail.com
