export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validations/product';
import { ZodError } from 'zod';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const cursor = searchParams.get('cursor');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const recent = searchParams.get('recent');
    const sort = searchParams.get('sort') || 'createdAt';
    const skip = cursor ? 0 : (page - 1) * limit;

    let whereClause: any = {};

    if (category) {
      if (category === 'new-arrivals' || category === 'best-sellers') {
      } else {
        whereClause.categories = {
          has: category
        };
      }
    }

    if (search && search.trim()) {
      whereClause.OR = [
        { title: { contains: search.trim(), mode: 'insensitive' } },
        { brand: { contains: search.trim(), mode: 'insensitive' } },
        { description: { contains: search.trim(), mode: 'insensitive' } }
      ];
    }

    let orderBy = {};

    if (recent === 'true' || sort === 'recent') {
      orderBy = { createdAt: 'desc' };
    } else {
      switch (sort) {
        case 'low-price':
          orderBy = { price: 'asc' };
          break;
        case 'high-price':
          orderBy = { price: 'desc' };
          break;
        case 'most-popular':
          orderBy = { rating: 'desc' };
          break;
        case 'createdAt':
        default:
          orderBy = { createdAt: 'desc' };
          break;
      }
    }

    const orderByArray = [orderBy, { id: 'asc' }];

    const queryOptions: any = {
      where: whereClause,
      take: limit,
      orderBy: orderByArray
    };

    if (cursor) {
      const cursorProduct = await prisma.product.findUnique({
        where: { id: cursor },
        select: { id: true }
      });

      if (cursorProduct) {
        queryOptions.cursor = { id: cursor };
        queryOptions.skip = 1;
      }
    } else {
      queryOptions.skip = skip;
    }

    const products = await prisma.product.findMany(queryOptions);

    const total = await prisma.product.count({
      where: whereClause
    });

    const nextCursor =
      products.length > 0 ? products[products.length - 1].id : null;
    const hasMore = products.length === limit;

    return new NextResponse(
      JSON.stringify({
        products,
        total,
        perPage: limit,
        nextCursor,
        hasMore,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch products' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      }
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

      const gallery =
        validatedData.gallery.length > 0
          ? validatedData.gallery
          : [validatedData.srcUrl];

      const product = await prisma.product.create({
        data: {
          title: validatedData.title,
          srcUrl: validatedData.srcUrl,
          gallery: gallery,
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
              price: option.price,
              discount: option.discount,
              discountedPrice: option.discountedPrice
            }))
          },
          selectedVolume: {
            ml: validatedData.selectedVolume.ml,
            price: validatedData.selectedVolume.price,
            discount: validatedData.selectedVolume.discount,
            discountedPrice: validatedData.selectedVolume.discountedPrice
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
          categories: validatedData.categories
        }
      });

      const updatedProduct = await prisma.product.findUnique({
        where: { id: product.id }
      });

      return NextResponse.json(updatedProduct, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Zod validation errors:', error.errors);
        return NextResponse.json(
          {
            error: 'Validation failed',
            errors: error.errors.map((err) => ({
              path: err.path,
              message: err.message
            }))
          },
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
