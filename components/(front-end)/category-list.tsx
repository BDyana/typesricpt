'use client';

import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import CategoryCarousel from './category-carousel';

interface IProps {
  category: any;
  isMarketPage?: boolean;
}
export default function CategoryList({
  category,
  isMarketPage = false,
}: IProps) {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-[#000000]',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
  ];

  // Use the category id or index to determine the color
  const colorIndex =
    typeof category.id === 'number'
      ? category.id % colors.length
      : category.title.length % colors.length;

  const categoryColor = colors[colorIndex];

  return (
    <div className="bg-white border border-gray-200 text-slate-800 overflow-hidden">
      <div
        className={`${categoryColor} py-2 pl-2 text-slate-100 flex justify-between items-center`}
      >
        <h2>{category.title}</h2>
        <Link
          className="duration-300 transition-all text-slate-800  rounded-md px-4"
          href={`/categories/${category.slug}`}
        >
          <MoveRight className="size-8 text-white" strokeWidth={1.5} />
        </Link>
      </div>
      <div className="bg-white dark:bg-slate-700 pt-2 px-1 pb-0">
        <CategoryCarousel
          isMarketPage={isMarketPage}
          products={category.products}
        />
      </div>
    </div>
  );
}
