import { NextRequest, NextResponse } from 'next/server'
import { getImagesFromFolder } from '@/lib/drive'

export const revalidate = 3600

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const folderId = searchParams.get('folderId')

  if (!folderId) {
    return NextResponse.json({ error: 'folderId required' }, { status: 400 })
  }

  try {
    const images = await getImagesFromFolder(folderId)
    return NextResponse.json(images)
  } catch (error) {
    console.error('Drive API error:', error)
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 })
  }
}
