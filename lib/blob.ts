import { put, del } from '@vercel/blob';

export async function uploadImage(
  pathname: string,
  file: File | Buffer | ArrayBuffer | ReadableStream,
  access: 'public' = 'public'
) {
  const blob = await put(pathname, file, {
    access,
    addRandomSuffix: true,
  });
  return blob;
}

export async function deleteImage(url: string) {
  await del(url);
}