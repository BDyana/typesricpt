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
    'bg-[#fdf498]',
    'bg-[#005b96]',
    'bg-[#a8e6cf]',
    'bg-[#f6abb6]',
    'bg-[#fed766]',
    'bg-[#2ab7ca]',
    'bg-[#fe4a49]',
  ]; //I've used the colors from this site: https://digitalsynopsis.com/design/beautiful-color-palettes-combinations-schemes/

  // Use the category id or index to determine the color
  const colorIndex =
    typeof category.id === 'number'
      ? category.id % colors.length
      : category.title.length % colors.length;

  const categoryColor = colors[colorIndex];

  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div
        className={`${categoryColor} py-2 pl-2 flex justify-between items-center`}
      >
        <h2 className="font-bold">{category.title}</h2>
        <Link
          className="duration-300 transition-all  rounded-md px-4"
          href={`/categories/${category.slug}`}
        >
          <MoveRight className="size-8 text-black" strokeWidth={1.5} />
        </Link>
      </div>
      <div className="bg-white pt-2 px-1 pb-0">
        <CategoryCarousel
          isMarketPage={isMarketPage}
          products={category.products}
        />
      </div>
    </div>
  );
}
