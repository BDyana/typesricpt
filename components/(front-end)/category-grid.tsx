'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MoveRight } from 'lucide-react';
import { Category } from '@prisma/client';
import React, { useState, useEffect } from 'react';
import { siteConfig } from '@/constants/site';

interface IProps {
  data: (Category & { products: any[] })[] | null | undefined;
}

export default function CategoryGrid({ data }: IProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Client-side logic to filter and randomize categories
    if (data) {
      const filteredCategories = data.filter(
        (category: Category & { products: any[] }) =>
          category.products.length > 0,
      );

      // Create a stable random sort using a seed
      const shuffled = filteredCategories.sort(() => 0.5 - Math.random());
      const randomCategories = shuffled.slice(0, 24);

      setCategories(randomCategories);
    }
  }, [data]);

  // Render nothing on initial server render
  if (typeof window === 'undefined' || categories.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-sm text-slate-800 overflow-hidden mb-4">
      <div className="pt-2 pl-2 text-slate-800 flex justify-between items-center border-b border-gray-200">
        <h2 className="pl-3 pb-2 pt-0.5 font-semibold text-slate-800">
          Shop By Category
        </h2>
        <Link
          className="duration-300 transition-all text-slate-800 rounded-md px-4 flex gap-3 items-center"
          href={`/categories`}
        >
          View All
          <MoveRight size={32} strokeWidth={1.5} />
        </Link>
      </div>
      <div className="grid lg:grid-cols-8 grid-cols-4 text-center items-center gap-1 lg:px-2 lg:py-2 py-3">
        {categories.map((category: Category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="gap-3 hover:bg-brandColor/10 duration-300 transition-all rounded-sm pt-3 pb-2 lg:pt-3.5 lg:pb-2.5"
          >
            <Image
              width={500}
              height={500}
              className="lg:w-14 w-11 lg:h-14 h-11 rounded-lg object-cover m-auto"
              src={category.imageUrl as string}
              alt={category.title || siteConfig.name}
            />
            <h4 className="lg:text-sm text-xs dark:text-slate-200 text-slate-900 mt-2.5 line-clamp-1">
              {category.title}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
}
