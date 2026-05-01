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
    const style = searchParams.get('style');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sizeMl = searchParams.get('sizeMl');
    const colorLabel = searchParams.get('color')?.trim();
    const search = searchParams.get('search');
    const recent = searchParams.get('recent');
    const sort = searchParams.get('sort') || 'createdAt';
    const skip = cursor ? 0 : (page - 1) * limit;

    let whereClause: any = {};

    if (category) {
      // Normalize category from slug to DB name
      const categoryMap: { [key: string]: string } = {
        'perfumes': 'Perfumes',
        'attars': 'Attars',
        'home-fragrances': 'Home Fragrances',
        'body-sprays': 'Body Sprays',
        'signature-attars': 'Signature Attars',
        'new-arrivals': 'New Arrivals',
        'best-sellers': 'Best Sellers'
      };

      const normalizedCategory = categoryMap[category] || category;

      if (normalizedCategory === 'New Arrivals') {
        // You might want to filter by date or a specific flag for new arrivals
        // For now, let's just use the category if it exists as a tag
        whereClause.categories = {
          has: normalizedCategory
        };
      } else if (normalizedCategory === 'Best Sellers') {
        // You might want to filter by rating or sales
        whereClause.categories = {
          has: normalizedCategory
        };
      } else {
        whereClause.categories = {
          has: normalizedCategory
        };
      }
    }

    if (style) {
      const styleMap: { [key: string]: string } = {
        'floral': 'Floral',
        'woody': 'Woody',
        'citrus': 'Citrus',
        'oriental': 'Oriental'
      };
      const normalizedStyle = styleMap[style] || style;
      whereClause.fragrance = {
        has: normalizedStyle
      };
    }

    if (minPrice !== null || maxPrice !== null) {
      const parsedMin = minPrice ? parseFloat(minPrice as string) : 0;
      const parsedMax = maxPrice ? parseFloat(maxPrice as string) : 1000000;
      
      const min = isNaN(parsedMin) ? 0 : parsedMin;
      const max = isNaN(parsedMax) ? 1000000 : parsedMax;

      whereClause.AND = [
        ...(whereClause.AND || []),
        {
          OR: [
            { discountedPrice: { gte: min, lte: max } },
            { selectedVolume: { is: { discountedPrice: { gte: min, lte: max } } } },
            {
              volumeOptions: {
                some: {
                  discountedPrice: { gte: min, lte: max }
                }
              }
            }
          ]
        }
      ];
    }

    if (sizeMl) {
      whereClause.AND = [
        ...(whereClause.AND || []),
        {
          OR: [
            { volumeOptions: { some: { ml: parseInt(sizeMl) } } },
            { selectedVolume: { is: { ml: parseInt(sizeMl) } } }
          ]
        }
      ];
    }

    if (colorLabel) {
      whereClause.AND = [
        ...(whereClause.AND || []),
        {
          OR: [
            {
              colors: {
                some: { label: { contains: colorLabel, mode: 'insensitive' } }
              }
            },
            {
              selectedColor: {
                is: { label: { contains: colorLabel, mode: 'insensitive' } }
              }
            }
          ]
        }
      ];
    }

    if (search && search.trim()) {
      whereClause.AND = [
        ...(whereClause.AND || []),
        {
          OR: [
            { title: { contains: search.trim(), mode: 'insensitive' } },
            { brand: { contains: search.trim(), mode: 'insensitive' } },
            { description: { contains: search.trim(), mode: 'insensitive' } }
          ]
        }
      ];
    }

    let orderBy = {};

    switch (sort) {
      case 'low-price':
        orderBy = { discountedPrice: 'asc' };
        break;
      case 'high-price':
        orderBy = { discountedPrice: 'desc' };
        break;
      case 'most-popular':
        orderBy = { rating: 'desc' };
        break;
      case 'recent':
      case 'createdAt':
      default:
        orderBy = { createdAt: 'desc' };
        break;
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
