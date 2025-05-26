export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { productSchema } from '@/lib/validations/product';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import slugify from 'slugify';
import { ZodError } from 'zod';

// Helper function to convert File to base64
async function convertFileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  return `data:${file.type};base64,${base64}`;
}

// Helper function to extract public_id from Cloudinary URL
function extractPublicIdFromUrl(url: string): string | null {
  if (!url || !url.includes('cloudinary.com')) {
    return null;
  }
  try {
    const regex = /\/upload\/(?:v\d+\/)?([^\.]+)\./;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    console.error('Error extracting public_id from URL:', error);
    return null;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { productCategories: { include: { category: true } } }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id },
      include: { productCategories: true } // include for category checks and gallery
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const formData = await req.formData();
    const jsonData = formData.get('data') as string;
    if (!jsonData) {
      return NextResponse.json({ error: 'Missing product data' }, { status: 400 });
    }
    
    const parsedData = JSON.parse(jsonData);
    const validatedData = productSchema.parse(parsedData);

    const updateData: any = { ...validatedData };

    // Handle Main Image (srcUrl)
    const newMainImageFile = formData.get('mainImage') as File | null;
    if (newMainImageFile) {
      const mainImageBase64 = await convertFileToBase64(newMainImageFile);
      const mainImageUploadResult = await uploadImage(mainImageBase64, 'products/main');
      updateData.srcUrl = mainImageUploadResult.secure_url;

      // Delete old main image from Cloudinary if it existed
      if (existingProduct.srcUrl) {
        const oldPublicId = extractPublicIdFromUrl(existingProduct.srcUrl);
        if (oldPublicId) {
          try {
            await deleteImage(oldPublicId);
          } catch (deleteError) {
            console.warn(`Failed to delete old main image ${oldPublicId} from Cloudinary:`, deleteError);
            // Non-fatal, proceed with update
          }
        }
      }
    }

    // Handle Gallery Images
    const existingGalleryImageUrlsString = formData.get('existingGalleryImageUrls') as string | null;
    const existingGalleryImageUrlsToKeep: string[] = existingGalleryImageUrlsString ? JSON.parse(existingGalleryImageUrlsString) : [];
    const newGalleryImageFiles = formData.getAll('newGalleryImages') as File[];

    const currentGalleryUrls: string[] = existingProduct.gallery || [];
    const finalGalleryUrls: string[] = [...existingGalleryImageUrlsToKeep];

    // Identify and delete gallery images that were removed
    for (const oldUrl of currentGalleryUrls) {
      if (!existingGalleryImageUrlsToKeep.includes(oldUrl)) {
        const publicIdToDelete = extractPublicIdFromUrl(oldUrl);
        if (publicIdToDelete) {
          try {
            await deleteImage(publicIdToDelete);
          } catch (deleteError) {
             console.warn(`Failed to delete gallery image ${publicIdToDelete} from Cloudinary:`, deleteError);
             // Non-fatal, proceed with update
          }
        }
      }
    }

    // Upload new gallery images
    if (newGalleryImageFiles.length > 0) {
      for (const file of newGalleryImageFiles) {
        const galleryImageBase64 = await convertFileToBase64(file);
        const galleryImageUploadResult = await uploadImage(galleryImageBase64, 'products/gallery');
        finalGalleryUrls.push(galleryImageUploadResult.secure_url);
      }
    }
    updateData.gallery = finalGalleryUrls;
    
    // Slug Update
    if (validatedData.title && validatedData.title !== existingProduct.title) {
      updateData.slug = slugify(validatedData.title, { lower: true, strict: true });
    } else {
      // Ensure slug is not accidentally removed if title doesn't change
      delete updateData.slug; // Or set to existingProduct.slug
    }
    
    // Remove categories from validatedData as it will be handled by relation update
    // Prisma expects category IDs, not the full validatedData.categories object.
    const categoryIds = validatedData.categories;
    delete updateData.categories;


    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...updateData,
        productCategories: {
          deleteMany: {}, // Deletes all existing relations for this product
          create: categoryIds.map((categoryId: string) => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        }
      },
      include: { productCategories: { include: { category: true } } }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    if (error instanceof SyntaxError) { // JSON parsing error
        return NextResponse.json({ error: "Invalid JSON data provided." }, { status: 400 });
    }
    // Add more specific error checks if needed (e.g., Prisma known errors)
    return NextResponse.json(
      { error: 'Error updating product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.product.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting product' },
      { status: 500 }
    );
  }
}
