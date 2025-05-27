export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validations/product';
import { ZodError } from 'zod';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      skip,
      take: limit,
      include: {
        categories: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const total = await prisma.product.count();

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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

      // Create product with categories
      const product = await prisma.product.create({
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
            create: validatedData.categories.map((categoryName) => ({
              category: {
                connectOrCreate: {
                  where: { name: categoryName },
                  create: {
                    name: categoryName,
                    slug: categoryName.toLowerCase().replace(/\s+/g, '-')
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

      // After creating the product, ensure all categories are properly connected
      await Promise.all(
        validatedData.categories.map(async (categoryName) => {
          const category = await prisma.category.findUnique({
            where: { name: categoryName }
          });

          if (category) {
            await prisma.productCategory.upsert({
              where: {
                productId_categoryId: {
                  productId: product.id,
                  categoryId: category.id
                }
              },
              create: {
                productId: product.id,
                categoryId: category.id
              },
              update: {}
            });
          }
        })
      );

      // Fetch the updated product with categories
      const updatedProduct = await prisma.product.findUnique({
        where: { id: product.id },
        include: {
          categories: {
            include: {
              category: true
            }
          }
        }
      });

      return NextResponse.json(updatedProduct, { status: 201 });
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
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
