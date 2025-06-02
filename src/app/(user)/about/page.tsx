'use client';

import { motion } from 'framer-motion';
import { FaHeart, FaLeaf, FaGem } from 'react-icons/fa';

export default function AboutPage() {
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
            About Amorattar
          </h1>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>
            Discover the essence of luxury and tradition with our premium
            collection of attars and perfumes.
          </p>
        </motion.div>

        <div className='mb-16 grid grid-cols-1 gap-8 md:grid-cols-3'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='rounded-lg bg-white p-6 shadow-lg'
          >
            <FaHeart className='mb-4 text-4xl text-red-500' />
            <h3 className='mb-2 text-xl font-semibold'>Our Passion</h3>
            <p className='text-gray-600'>
              We are dedicated to bringing you the finest fragrances that
              capture the essence of traditional attars.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='rounded-lg bg-white p-6 shadow-lg'
          >
            <FaLeaf className='mb-4 text-4xl text-green-500' />
            <h3 className='mb-2 text-xl font-semibold'>Natural Ingredients</h3>
            <p className='text-gray-600'>
              Our products are crafted using only the finest natural
              ingredients, ensuring authentic and long-lasting fragrances.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='rounded-lg bg-white p-6 shadow-lg'
          >
            <FaGem className='mb-4 text-4xl text-blue-500' />
            <h3 className='mb-2 text-xl font-semibold'>Quality Promise</h3>
            <p className='text-gray-600'>
              We maintain the highest standards of quality in every product we
              offer, from sourcing to delivery.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className='rounded-lg bg-gray-50 p-8'
        >
          <h2 className='mb-4 text-2xl font-bold'>Our Story</h2>
          <p className='mb-4 text-gray-600'>
            Amorattar was founded with a vision to bring the rich tradition of
            attars to the modern world. Our journey began with a simple passion
            for authentic fragrances and has grown into a commitment to
            excellence in every aspect of our business.
          </p>
          <p className='text-gray-600'>
            Today, we continue to honor the ancient art of perfumery while
            embracing modern innovations, ensuring that each product we offer
            meets the highest standards of quality and authenticity.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
