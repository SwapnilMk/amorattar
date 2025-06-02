'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>
            Your privacy is important to us. Learn how we collect, use, and
            protect your personal information.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='space-y-8'
        >
          <section className='rounded-lg bg-white p-8 shadow-lg'>
            <h2 className='mb-4 text-2xl font-bold'>Information We Collect</h2>
            <p className='mb-4 text-gray-600'>
              We collect information that you provide directly to us, including:
            </p>
            <ul className='list-inside list-disc space-y-2 text-gray-600'>
              <li>Name and contact information</li>
              <li>Shipping and billing addresses</li>
              <li>Payment information</li>
              <li>Order history and preferences</li>
            </ul>
          </section>

          <section className='rounded-lg bg-white p-8 shadow-lg'>
            <h2 className='mb-4 text-2xl font-bold'>
              How We Use Your Information
            </h2>
            <p className='mb-4 text-gray-600'>
              We use the information we collect to:
            </p>
            <ul className='list-inside list-disc space-y-2 text-gray-600'>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
          </section>

          <section className='rounded-lg bg-white p-8 shadow-lg'>
            <h2 className='mb-4 text-2xl font-bold'>Information Sharing</h2>
            <p className='mb-4 text-gray-600'>
              We do not sell or rent your personal information to third parties.
              We may share your information with:
            </p>
            <ul className='list-inside list-disc space-y-2 text-gray-600'>
              <li>Service providers who assist in our operations</li>
              <li>Payment processors for secure transactions</li>
              <li>Shipping partners for order delivery</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className='rounded-lg bg-white p-8 shadow-lg'>
            <h2 className='mb-4 text-2xl font-bold'>Your Rights</h2>
            <p className='mb-4 text-gray-600'>You have the right to:</p>
            <ul className='list-inside list-disc space-y-2 text-gray-600'>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>File a complaint with supervisory authorities</li>
            </ul>
          </section>

          <section className='rounded-lg bg-white p-8 shadow-lg'>
            <h2 className='mb-4 text-2xl font-bold'>Contact Us</h2>
            <p className='text-gray-600'>
              If you have any questions about our privacy policy or how we
              handle your information, please contact us at
              privacy@amorattar.com
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
