export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { productSchema } from '@/lib/validations/product';
import { uploadImage, uploadMultipleImages } from '@/lib/cloudinary';
import slugify from 'slugify';
import { ZodError } from 'zod';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    const isSale = searchParams.get('isSale');

    const where: any = {};
    if (category) {
      where.productCategories = {
        some: {
          category: {
            slug: category
          }
        }
      };
    }
    if (gender) {
      where.gender = { has: gender };
    }
    if (isSale === 'true') {
      where.isSale = true;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        productCategories: {
          include: {
            category: true
          }
        },
        reviews: true
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error fetching products' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const data = JSON.parse(formData.get('data') as string);
    const mainImage = formData.get('mainImage') as File | null;
    const galleryImages = formData.getAll('gallery') as File[];

    // Validate product data
    const validatedData = productSchema.parse(data);

    // Handle image uploads
    let mainImageUrl = '';
    let galleryUrls: string[] = [];

    try {
      // Upload main image if provided
      if (mainImage) {
        const mainImageBase64 = await convertFileToBase64(mainImage);
        const mainImageResult = await uploadImage(mainImageBase64, 'products/main');
        mainImageUrl = mainImageResult.secure_url;
      }

      // Upload gallery images if provided
      if (galleryImages.length > 0) {
        const galleryBase64 = await Promise.all(
          galleryImages.map(file => convertFileToBase64(file))
        );
        const galleryResults = await Promise.all(
          galleryBase64.map(image => uploadImage(image, 'products/gallery'))
        );
        galleryUrls = galleryResults.map(img => img.secure_url);
      }
    } catch (uploadError) {
      console.error('Error uploading images:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload images' },
        { status: 500 }
      );
    }

    // Create slug from title
    const slug = slugify(validatedData.title, { lower: true });

    // Create product with categories and image URLs
    const product = await prisma.product.create({
      data: {
        ...validatedData,
        slug,
        srcUrl: mainImageUrl || '', // Make srcUrl optional
        gallery: galleryUrls,
        productCategories: {
          create: validatedData.categories.map((categoryId) => ({
            category: {
              connect: { id: categoryId }
            }
          }))
        }
      },
      include: {
        productCategories: {
          include: {
            category: true
          }
        }
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Error creating product' },
      { status: 500 }
    );
  }
}

// Helper function to convert File to base64
async function convertFileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  return `data:${file.type};base64,${base64}`;
}
