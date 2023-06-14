import { type ChangeEvent } from 'react';
import { type FileType } from 'src/types/common';

export async function asyncUploads(e: ChangeEvent<HTMLInputElement>) {
  const { files } = e.target;
  if (!files || !files.length) return;
  return Promise.all(
    Array.from(files).map(
      (file, index) =>
        new Promise<FileType>((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = reject;
          reader.onload = e =>
            resolve({
              file,
              previewUrl: e.target?.result as string,
              id: new Date().toISOString() + index,
            });
          reader.readAsDataURL(file);
        }),
    ),
  );
}
