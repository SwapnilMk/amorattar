import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const productId = slug[0];
  if (!productId) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    };
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      categories: {
        include: {
          category: true
        }
      }
    }
  });

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    };
  }

  const title = `${product.title} - AMOR PERFUMES`;
  const description =
    product.description ||
    `Shop ${product.title} at AMOR PERFUMES. Premium perfume collection.`;
  const price =
    product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

  return {
    title,
    description,
    alternates: {
      canonical: `/shop/product/${product.id}/${product.title.split(' ').join('-')}`
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/shop/product/${product.id}/${product.title.split(' ').join('-')}`,
      images: [
        {
          url: product.srcUrl,
          width: 1200,
          height: 630,
          alt: product.title
        }
      ],
      siteName: 'AMOR PERFUMES',
      locale: 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.srcUrl],
      creator: '@amorperfumes'
    }
  };
}
