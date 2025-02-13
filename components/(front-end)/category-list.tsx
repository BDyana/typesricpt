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
    'bg-[#0A2463]',
    'bg-[#FB3640]',
    'bg-[#292E1E]',
    'bg-[#247BA0]',
    'bg-[#3C4F76]',
    'bg-[#466362]',
    'bg-[#990D35]',
  ]; //I've used the colors from this site: https://digitalsynopsis.com/design/beautiful-color-palettes-combinations-schemes/  https://coolors.co/0a2463-fb3640-605f5e-247ba0-e2e2e2

  // Use the category id or index to determine the color
  const colorIndex =
    typeof category.id === 'number'
      ? category.id % colors.length
      : category.title.length % colors.length;

  const categoryColor = colors[colorIndex];

  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div
        className={`${categoryColor} py-1 pl-2 flex justify-between items-center`}
      >
        <h2 className="font-bold text-white">{category.title}</h2>
        <Link
          className="duration-300 transition-all  rounded-md px-4"
          href={`/categories/${category.slug}`}
        >
          <MoveRight className="size-8 text-white" strokeWidth={1.5} />
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
