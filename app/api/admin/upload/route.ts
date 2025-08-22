import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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

    // Check if we're in production (Supabase available) or development
    const isProduction = process.env.NODE_ENV === 'production' || process.env.SUPABASE_URL;

    if (isProduction) {
      // Production: Use Supabase Storage
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name}`;
      const filePath = `${type}/${fileName}`;

      // First, ensure the bucket exists
      const bucketName = 'uploads';
      const { data: buckets } = await supabase.storage.listBuckets();
      
      if (!buckets?.find(b => b.name === bucketName)) {
        // Create the bucket if it doesn't exist
        const { error: createError } = await supabase.storage.createBucket(bucketName, {
          public: true,
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
          fileSizeLimit: 5242880 // 5MB
        });
        
        if (createError && !createError.message.includes('already exists')) {
          console.error('Error creating bucket:', createError);
          throw createError;
        }
      }

      // Upload the file to Supabase Storage
      const bytes = await file.arrayBuffer();
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, bytes, {
          contentType: file.type,
          upsert: true
        });

      if (error) {
        console.error('Supabase upload error:', error);
        throw error;
      }

      // Get the public URL
      const { data: { publicUrl: url } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);
      
      publicUrl = url;
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