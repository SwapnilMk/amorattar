'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is an attar?',
    answer:
      "An attar is a traditional perfume oil made from natural ingredients like flowers, herbs, and spices. It's a concentrated fragrance that's been used for centuries in various cultures."
  },
  {
    question: 'How long does an attar last?',
    answer:
      'The longevity of an attar depends on various factors including the ingredients used and your skin type. Generally, attars can last anywhere from 6 to 12 hours on the skin.'
  },
  {
    question: 'How should I store my attar?',
    answer:
      'Store your attar in a cool, dark place away from direct sunlight. Keep the bottle tightly closed when not in use to preserve the fragrance.'
  },
  {
    question: "What's the difference between attar and perfume?",
    answer:
      'Attars are natural perfume oils made from botanical ingredients, while commercial perfumes often contain synthetic ingredients and alcohol. Attars are typically more concentrated and longer-lasting.'
  },
  {
    question: 'How do I apply attar?',
    answer:
      'Apply attar by dabbing a small amount on pulse points like wrists, behind ears, and the base of the throat. A little goes a long way due to its concentrated nature.'
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship our products worldwide. Shipping times and costs vary depending on your location. Please check our shipping policy for more details.'
  },
  {
    question: 'What is your return policy?',
    answer:
      'We accept returns within 30 days of delivery for unused products in their original packaging. Please refer to our return policy page for complete details.'
  },
  {
    question: 'Are your products cruelty-free?',
    answer:
      'Yes, all our products are cruelty-free and we do not test on animals. We are committed to ethical and sustainable practices.'
  }
];

export default function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className='min-h-screen py-20'>
      <div className='mx-auto max-w-frame px-4 xl:px-0'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-12 text-center'
        >
          <h1 className='mb-4 text-4xl font-bold md:text-5xl'>
            Frequently Asked Questions
          </h1>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>
            Find answers to common questions about our products and services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='mx-auto max-w-3xl space-y-4'
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className='overflow-hidden rounded-lg bg-white shadow-lg'
            >
              <button
                onClick={() => toggleFAQ(index)}
                className='flex w-full items-center justify-between px-6 py-4 text-left focus:outline-none'
              >
                <span className='text-lg font-semibold'>{faq.question}</span>
                <FaChevronDown
                  className={`transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className='overflow-hidden'
              >
                <div className='px-6 pb-4 text-gray-600'>{faq.answer}</div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className='mt-12 text-center'
        >
          <p className='text-gray-600'>
            Still have questions? Feel free to{' '}
            <a
              href='/contact'
              className='font-semibold text-green-600 hover:text-green-700'
            >
              contact us
            </a>
            .
          </p>
        </motion.div>
      </div>
    </main>
  );
}
