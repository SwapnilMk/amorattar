export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const page = parseInt(searchParams.get('page') || '1');
    const sortBy = searchParams.get('sort') || 'most-popular';
    const perPage = 12;

    if (!query) {
      return NextResponse.json({ products: [], total: 0, perPage });
    }

    // Calculate skip for pagination
    const skip = (page - 1) * perPage;

    // Build sort options
    let orderBy: any = {};
    switch (sortBy) {
      case 'low-price':
        orderBy = { price: 'asc' };
        break;
      case 'high-price':
        orderBy = { price: 'desc' };
        break;
      case 'most-popular':
      default:
        orderBy = { rating: 'desc' };
        break;
    }

    // Get total count for pagination
    const total = await prisma.product.count({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { brand: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ]
      }
    });

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { brand: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ]
      },
      orderBy,
      skip,
      take: perPage,
      select: {
        id: true,
        title: true,
        brand: true,
        srcUrl: true,
        price: true,
        discount: true,
        rating: true
      }
    });

    return NextResponse.json({ products, total, perPage });
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
}
