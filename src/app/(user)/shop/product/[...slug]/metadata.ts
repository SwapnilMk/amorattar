import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({
  params
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const productId = params.slug[0];
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

  const title = `${product.title} - Amorattar`;
  const description =
    product.description ||
    `Shop ${product.title} at Amorattar. Premium attar and perfume collection.`;
  const price =
    product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://amorattar.com/shop/product/${product.id}/${product.title.split(' ').join('-')}`,
      images: [
        {
          url: product.srcUrl,
          width: 800,
          height: 800,
          alt: product.title
        }
      ],
      siteName: 'Amorattar',
      locale: 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.srcUrl],
      creator: '@amorattar'
    }
  };
}
