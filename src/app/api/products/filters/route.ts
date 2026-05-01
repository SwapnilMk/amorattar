export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // We fetch all products to calculate true min/max across base price and variants
    const products = await prisma.product.findMany({
      select: {
        price: true,
        discountedPrice: true,
        volumeOptions: true,
        selectedVolume: true,
        colors: true,
        selectedColor: true,
        fragrance: true,
        categories: true
      }
    });

    let minP = products.length > 0 ? products[0].discountedPrice : 0;
    let maxP = products.length > 0 ? products[0].discountedPrice : 5000;

    const sizes = new Set<number>();
    const colors = new Map<string, { label: string; value: string; color: string }>();
    const fragrances = new Set<string>();
    const categories = new Set<string>();

    products.forEach(p => {
      // Process price
      if (p.discountedPrice < minP) minP = p.discountedPrice;
      if (p.discountedPrice > maxP) maxP = p.discountedPrice;

      // Process volumes and their prices
      if (p.selectedVolume) {
        sizes.add(p.selectedVolume.ml);
        if (p.selectedVolume.discountedPrice < minP) minP = p.selectedVolume.discountedPrice;
        if (p.selectedVolume.discountedPrice > maxP) maxP = p.selectedVolume.discountedPrice;
      }
      p.volumeOptions?.forEach(v => {
        sizes.add(v.ml);
        if (v.discountedPrice < minP) minP = v.discountedPrice;
        if (v.discountedPrice > maxP) maxP = v.discountedPrice;
      });

      // Process colors
      if (p.selectedColor) {
        const trimmedLabel = p.selectedColor.label.trim();
        colors.set(trimmedLabel, { ...p.selectedColor, label: trimmedLabel });
      }
      p.colors?.forEach(c => {
        const trimmedLabel = c.label.trim();
        colors.set(trimmedLabel, { ...c, label: trimmedLabel });
      });

      // Process fragrance
      p.fragrance?.forEach(f => fragrances.add(f));

      // Process categories
      p.categories?.forEach(c => categories.add(c));
    });

    return NextResponse.json({
      priceRange: {
        min: Math.floor(minP),
        max: Math.ceil(maxP)
      },
      sizes: Array.from(sizes).sort((a, b) => a - b),
      colors: Array.from(colors.values()),
      fragrances: Array.from(fragrances).sort(),
      categories: Array.from(categories).sort()
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return NextResponse.json({ error: 'Failed to fetch filter options' }, { status: 500 });
  }
}
