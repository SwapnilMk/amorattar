'use client';

import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>
            Please read these terms carefully before using our services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='space-y-8'
        >
          <section className='rounded-lg bg-white p-8 shadow-lg'>
            <h2 className='mb-4 text-2xl font-bold'>1. Acceptance of Terms</h2>
            <p className='text-gray-600'>
              By accessing and using Amorattar's website and services, you agree
              to be bound by these Terms of Service and all applicable laws and
              regulations. If you do not agree with any of these terms, you are
              prohibited from using or accessing this site.
            </p>
          </section>

          <section className='rounded-lg bg-white p-8 shadow-lg'>
            <h2 className='mb-4 text-2xl font-bold'>2. Use License</h2>
            <p className='mb-4 text-gray-600'>
              Permission is granted to temporarily access the materials on
              Amorattar's website for personal, non-commercial transitory
              viewing only. This is the grant of a license, not a transfer of
              title, and under this license you may not:
            </p>
            <ul className='list-inside list-disc space-y-2 text-gray-600'>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>
                Attempt to decompile or reverse engineer any software contained
                on the website
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials
              </li>
            </ul>
          </section>

          <section className='rounded-lg bg-white p-8 shadow-lg'>
            <h2 className='mb-4 text-2xl font-bold'>3. Product Information</h2>
            <p className='mb-4 text-gray-600'>
              We strive to display our products as accurately as possible.
              However, we do not guarantee that your screen's display of any
              color will be accurate. We reserve the right to discontinue any
              product at any time.
            </p>
          </section>

          <section className='rounded-lg bg-white p-8 shadow-lg'>
            <h2 className='mb-4 text-2xl font-bold'>4. Pricing and Payment</h2>
            <p className='mb-4 text-gray-600'>
              All prices are subject to change without notice. We reserve the
              right to modify or discontinue any product without notice. We
              shall not be liable to you or any third party for any
              modification, price change, suspension, or discontinuance of any
              product.
            </p>
          </section>

          <section className='rounded-lg bg-white p-8 shadow-lg'>
            <h2 className='mb-4 text-2xl font-bold'>
              5. Shipping and Delivery
            </h2>
            <p className='mb-4 text-gray-600'>
              We aim to process and ship orders promptly, but we do not
              guarantee delivery times. Risk of loss and title for items
              purchased pass to you upon delivery of the items to the carrier.
            </p>
          </section>

          <section className='rounded-lg bg-white p-8 shadow-lg'>
            <h2 className='mb-4 text-2xl font-bold'>6. Returns and Refunds</h2>
            <p className='mb-4 text-gray-600'>
              Our return policy is designed to ensure your satisfaction. Please
              refer to our Return Policy page for detailed information about
              returns and refunds.
            </p>
          </section>

          <section className='rounded-lg bg-white p-8 shadow-lg'>
            <h2 className='mb-4 text-2xl font-bold'>
              7. Limitation of Liability
            </h2>
            <p className='text-gray-600'>
              In no event shall Amorattar or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on our website.
            </p>
          </section>

          <section className='rounded-lg bg-white p-8 shadow-lg'>
            <h2 className='mb-4 text-2xl font-bold'>8. Contact Information</h2>
            <p className='text-gray-600'>
              If you have any questions about these Terms of Service, please
              contact us at terms@amorattar.com
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
