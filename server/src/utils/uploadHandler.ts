import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_ROOT_PATH } from './../constants';

export async function deleteCloudinaryFile(public_id: string) {
  if (public_id.startsWith(CLOUDINARY_ROOT_PATH)) {
    await cloudinary.uploader.destroy(public_id);
    return true;
  }
  return false;
}
