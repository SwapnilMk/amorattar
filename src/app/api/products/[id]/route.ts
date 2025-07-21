export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validations/product';
import { ZodError } from 'zod';
import { getSession } from '@/lib/auth';
import {
  Category,
  Gender,
  Fragrance,
  AvailabilityStatus
} from '@/types/product.types';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (session.role !== 'admin') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const body = await request.json();
    try {
      const validatedData = productSchema.parse(body);

      const product = await prisma.product.findUnique({
        where: { id: params.id },
        include: {
          categories: {
            include: {
              category: true
            }
          }
        }
      });

      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }

      // Delete existing product categories
      await prisma.productCategory.deleteMany({
        where: { productId: product.id }
      });

      // Update product with new data
      const updatedProduct = await prisma.product.update({
        where: { id: product.id },
        data: {
          title: validatedData.title,
          srcUrl: validatedData.srcUrl,
          gallery: validatedData.gallery,
          brand: validatedData.brand,
          price: validatedData.price,
          discountedPrice: validatedData.discountedPrice,
          discount: validatedData.discount,
          rating: validatedData.rating,
          description: validatedData.description,
          gender: validatedData.gender,
          colors: {
            set: validatedData.colors.map((color) => ({
              id: color.id,
              value: color.value,
              color: color.color,
              label: color.label
            }))
          },
          selectedColor: {
            id: validatedData.selectedColor.id,
            value: validatedData.selectedColor.value,
            color: validatedData.selectedColor.color,
            label: validatedData.selectedColor.label
          },
          volumeOptions: {
            set: validatedData.volumeOptions.map((option) => ({
              ml: option.ml,
              price: option.price
            }))
          },
          selectedVolume: {
            ml: validatedData.selectedVolume.ml,
            price: validatedData.selectedVolume.price
          },
          isSale: validatedData.isSale,
          // Convert specifications from record to array for DB
          specifications: {
            set: Object.entries(validatedData.specifications).map(
              ([key, value]) => ({
                key,
                value
              })
            )
          },
          fragrance: validatedData.fragrance,
          availabilityStatus: validatedData.availabilityStatus,
          categories: {
            create: validatedData.categories.map((category) => ({
              category: {
                connectOrCreate: {
                  where: { name: category },
                  create: {
                    name: category,
                    slug: category.toLowerCase().replace(/\s+/g, '-')
                  }
                }
              }
            }))
          }
        },
        include: {
          categories: {
            include: {
              category: true
            }
          }
        }
      });

      return NextResponse.json(updatedProduct);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: error.errors[0].message },
          { status: 400 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (session.role !== 'admin') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        categories: true
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete product categories first
    await prisma.productCategory.deleteMany({
      where: { productId: product.id }
    });

    // Delete the product
    await prisma.product.delete({
      where: { id: product.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
