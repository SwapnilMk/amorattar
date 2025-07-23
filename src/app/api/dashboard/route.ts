import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (session.role !== 'admin') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    // Get all stats in parallel
    const [totalProducts, totalReviews, totalUsers, totalCategories] =
      await Promise.all([
        prisma.product.count(),
        prisma.review.count(),
        prisma.user.count(),
        prisma.category.count()
      ]);

    return NextResponse.json({
      totalProducts,
      totalReviews,
      totalCategories,
      totalUsers
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
