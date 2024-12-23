import React from 'react';
import Link from 'next/link';
import { CONTACT_INFO } from '@/constants/contacts';
import { siteConfig } from '@/constants/site';
import Image from 'next/image';

const linkGroups = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Features', href: '#' },
      { label: 'Works', href: '#' },
      { label: 'Career', href: '#' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Delivery Details', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Farmer Pricing', href: '/farmer-pricing' },
      { label: 'Register Farmer', href: '/register-farmer' },
    ],
  },
];

export default function Footer() {
  return (
    <section className="pt-8 lg:pt-18 pb-4 lg:pb-5 bg-gray-50">
      <div className="px-4 mx-auto sm:px-6 lg:px-0 max-w-6xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-8 lg:gap-y-16 gap-x-12">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <Image
              width={200}
              height={200}
              className="w-auto h-9"
              src={siteConfig.logo}
              alt={siteConfig.description}
            />
            <p className="text-sm leading-relaxed text-gray-600 my-3 lg:mt-5">
              Best Online E-Commerce Website in Bangladesh. You can Buy your
              Essential Products with Best Price. Happy Shopping...
            </p>
            <h3>
              <b>Helpline:</b> {CONTACT_INFO.supportNumber}
            </h3>
            {/* Social Media Links */}
            <ul className="flex items-center space-x-3 lg:mt-5 mt-3">
              {/* Add your social media links here */}
              <li>
                <Link
                  href="https://www.facebook.com/BDyana.com.bd"
                  title="Facebook"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-brandBlack rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600"
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </Link>
              </li>
              {/* Add other social media icons */}
            </ul>
          </div>

          {/* Link Groups */}
          {linkGroups.map((group, index) => (
            <div key={index}>
              <p className="text-sm font-semibold tracking-widest text-brandBlack uppercase">
                {group.title}
              </p>
              <ul className="mt-4 lg:mt-6 space-y-2">
                {group.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="flex text-sm text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Subscription */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest text-brandBlack uppercase">
              Subscribe to newsletter
            </p>
            <form action="#" method="POST" className="mt-4 lg:mt-6 flex gap-2">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="flex w-auto px-3 py-2 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-gray-600 caret-gray-600"
                />
              </div>
              <button
                type="submit"
                className="items-center justify-center px-3 py-2 font-semibold bg-brandBlack hover:bg-gray-900 text-white transition-all duration-200 rounded-md focus:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <hr className="mt-6 mb-4 lg:mt-12 lg:mb-5 border-gray-200" />
        <p className="text-sm text-center text-gray-600">
          © Copyright 2024, All Rights Reserved by <b>{siteConfig.name}</b>
        </p>
      </div>
    </section>
  );
}
