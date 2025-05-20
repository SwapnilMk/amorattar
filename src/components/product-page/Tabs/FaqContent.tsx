// src/components/layout/FaqContent.tsx
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

type FaqItem = {
  question: string;
  answer: string;
};

const faqsData: FaqItem[] = [
  {
    question: 'What are attars and how do they differ from perfumes?',
    answer:
      'Attars are traditional, oil-based fragrances made from natural ingredients like flowers, woods, and spices, offering a concentrated and long-lasting scent. Perfumes are typically alcohol-based, lighter, and designed for broader application. At AMORATTAR, our attars are crafted for depth, while our perfumes provide a versatile, everyday option.'
  },
  {
    question: 'How should I apply attars and perfumes?',
    answer:
      'For attars, dab a small amount on pulse points like wrists, neck, or behind the ears for a lasting effect. For perfumes, spray lightly on pulse points or mist over your body from a distance. Avoid rubbing the fragrance into your skin, as it can alter the scent.'
  },
  {
    question: 'How long do AMORATTAR fragrances last?',
    answer:
      'Our attars can last 8-12 hours or more due to their high concentration of natural oils. Perfumes typically last 4-6 hours, depending on the scent profile and your skin type. Store them in a cool, dry place away from sunlight to maintain their potency.'
  },
  {
    question: 'Are your fragrances unisex?',
    answer:
      'Yes, most of our attars and perfumes are designed to be unisex, appealing to all scent lovers. We craft each fragrance to transcend gender, focusing on personal expression and universal appeal.'
  },
  {
    question: 'What are the shipping options and costs?',
    answer:
      'We offer standard shipping (5-7 business days) and expedited shipping (2-3 business days). Costs vary by location—starting at $5 for standard and $15 for expedited within India, with international rates calculated at checkout. Free shipping applies on orders over $50.'
  },
  {
    question: 'What is your return policy for fragrances?',
    answer:
      'We accept returns within 30 days of delivery if the product is unused and in its original packaging. Contact our support team to initiate a return. Refunds or exchanges are processed within 7-10 business days after we receive the item.'
  }
];

const FaqContent = () => {
  return (
    <section>
      <h3 className='mb-5 text-xl font-bold text-black sm:mb-6 sm:text-2xl'>
        Frequently Asked Questions
      </h3>
      <Accordion type='single' collapsible>
        {faqsData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className='text-left'>
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqContent;
