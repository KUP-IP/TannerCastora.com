import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'author' | 'book' | 'asset'
    const key = formData.get('key') as string; // for assets

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    let publicUrl: string;

    // Use Vercel Blob in production, local storage in development
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Production: Use Vercel Blob
      const blob = await put(file.name, file, {
        access: 'public',
      });
      publicUrl = blob.url;
    } else {
      // Development: Use local file system
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      await mkdir(uploadDir, { recursive: true });
      
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      
      publicUrl = `/uploads/${filename}`;
    }

    // Update database based on type
    if (type === 'author') {
      await prisma.author.updateMany({
        data: { photoPath: publicUrl },
      });
    } else if (type === 'book') {
      await prisma.book.updateMany({
        data: { coverPath: publicUrl },
      });
    } else if (type === 'asset' && key) {
      await prisma.asset.upsert({
        where: { key },
        update: { path: publicUrl },
        create: { key, path: publicUrl, alt: '' },
      });
    }

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}