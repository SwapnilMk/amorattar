import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export type CloudinaryUploadResponse = {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
};

/**
 * Upload a single image to Cloudinary
 * @param file - The file to upload (can be base64 string, URL, or Buffer)
 * @param folder - The folder to upload to (default: 'products')
 * @param options - Additional upload options
 */
export async function uploadImage(
  file: string,
  folder: string = 'products',
  options: UploadApiOptions = {}
): Promise<CloudinaryUploadResponse> {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'auto',
      ...options
    });

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of files to upload
 * @param folder - The folder to upload to (default: 'products')
 */
export async function uploadMultipleImages(
  files: string[],
  folder: string = 'products'
): Promise<CloudinaryUploadResponse[]> {
  try {
    const uploadPromises = files.map(file => uploadImage(file, folder));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading multiple images to Cloudinary:', error);
    throw new Error('Failed to upload multiple images');
  }
}

/**
 * Delete an image from Cloudinary
 * @param publicId - The public ID of the image to delete
 */
export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Failed to delete image');
  }
}

/**
 * Transform an image URL with Cloudinary transformations
 * @param url - The original Cloudinary URL
 * @param transformations - Object containing transformation options
 */
export function getTransformedImageUrl(
  url: string,
  transformations: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: number;
    format?: string;
  } = {}
): string {
  if (!url.includes('cloudinary.com')) {
    return url;
  }

  const { width, height, crop, quality, format } = transformations;
  const transformString = [
    width && `w_${width}`,
    height && `h_${height}`,
    crop && `c_${crop}`,
    quality && `q_${quality}`,
    format && `f_${format}`
  ]
    .filter(Boolean)
    .join(',');

  return url.replace('/upload/', `/upload/${transformString ? transformString + '/' : ''}`);
} 