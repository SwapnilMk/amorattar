import type { Metadata } from 'next';
import FAQContent from './FAQContent';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Amor Perfumes',
  description:
    'Find answers to common questions about our attars, perfumes, shipping, returns, and more.',
  openGraph: {
    title: 'Frequently Asked Questions - Amor Perfumes',
    description:
      'Find answers to common questions about our attars, perfumes, shipping, returns, and more.'
  }
};

export default function FAQsPage() {
  return <FAQContent />;
}
