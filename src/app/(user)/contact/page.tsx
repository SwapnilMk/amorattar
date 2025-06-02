'use client';

import { motion } from 'framer-motion';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <main className='min-h-screen py-20'>
      <div className='mx-auto max-w-frame px-4 xl:px-0'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-12 text-center'
        >
          <h1 className='mb-4 text-4xl font-bold md:text-5xl'>Contact Us</h1>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>
            We'd love to hear from you. Get in touch with us for any questions
            or concerns.
          </p>
        </motion.div>

        <div className='mb-16 grid grid-cols-1 gap-8 md:grid-cols-2'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='space-y-8'
          >
            <div className='rounded-lg bg-white p-6 shadow-lg'>
              <div className='flex items-center space-x-4'>
                <FaPhone className='text-2xl text-green-500' />
                <div>
                  <h3 className='mb-1 text-xl font-semibold'>Phone</h3>
                  <p className='text-gray-600'>+91 82684 35091</p>
                </div>
              </div>
            </div>

            <div className='rounded-lg bg-white p-6 shadow-lg'>
              <div className='flex items-center space-x-4'>
                <FaEnvelope className='text-2xl text-blue-500' />
                <div>
                  <h3 className='mb-1 text-xl font-semibold'>Email</h3>
                  <p className='text-gray-600'>support@amorattar.com</p>
                </div>
              </div>
            </div>

            <div className='rounded-lg bg-white p-6 shadow-lg'>
              <div className='flex items-center space-x-4'>
                <FaMapMarkerAlt className='text-2xl text-red-500' />
                <div>
                  <h3 className='mb-1 text-xl font-semibold'>Address</h3>
                  <p className='text-gray-600'>
                    123 Fragrance Street
                    <br />
                    Mumbai, Maharashtra
                    <br />
                    India - 400001
                  </p>
                </div>
              </div>
            </div>

            <div className='rounded-lg bg-white p-6 shadow-lg'>
              <div className='flex items-center space-x-4'>
                <FaWhatsapp className='text-2xl text-green-500' />
                <div>
                  <h3 className='mb-1 text-xl font-semibold'>WhatsApp</h3>
                  <p className='text-gray-600'>+91 82684 35091</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='rounded-lg bg-white p-8 shadow-lg'
          >
            <h2 className='mb-6 text-2xl font-bold'>Send us a Message</h2>
            <form className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='mb-1 block text-sm font-medium text-gray-700'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500'
                  placeholder='Your name'
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='mb-1 block text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500'
                  placeholder='Your email'
                />
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='mb-1 block text-sm font-medium text-gray-700'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  rows={4}
                  className='w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500'
                  placeholder='Your message'
                ></textarea>
              </div>

              <Button
                type='submit'
                className='w-full rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700'
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='rounded-lg bg-white p-8 shadow-lg'
        >
          <h2 className='mb-6 text-2xl font-bold'>Business Hours</h2>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <p className='text-gray-600'>
                <span className='font-semibold'>Monday - Friday:</span> 9:00 AM
                - 6:00 PM
              </p>
              <p className='text-gray-600'>
                <span className='font-semibold'>Saturday:</span> 10:00 AM - 4:00
                PM
              </p>
              <p className='text-gray-600'>
                <span className='font-semibold'>Sunday:</span> Closed
              </p>
            </div>
            <div>
              <p className='text-gray-600'>
                <span className='font-semibold'>Customer Support:</span> 24/7
                via WhatsApp
              </p>
              <p className='text-gray-600'>
                <span className='font-semibold'>Email Support:</span> Within 24
                hours
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
