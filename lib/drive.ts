import { google } from 'googleapis'

export interface DriveImage {
  id: string
  name: string
  url: string
}

function getDriveClient() {
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    return null
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  })

  return google.drive({ version: 'v3', auth })
}

export async function getImagesFromFolder(folderId: string): Promise<DriveImage[]> {
  const drive = getDriveClient()

  if (!drive) {
    console.warn('Google Drive credentials not configured — returning empty images')
    return []
  }

  const response = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: 'files(id, name)',
    orderBy: 'name',
    pageSize: 50,
  })

  const files = response.data.files || []
  return files.map((file) => ({
    id: file.id!,
    name: file.name!,
    url: `https://lh3.googleusercontent.com/d/${file.id}`,
  }))
}
