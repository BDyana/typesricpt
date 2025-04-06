'use client';
import Link from 'next/link';
import Image from 'next/image';
import { MoveRight } from 'lucide-react';
import { Brand } from '@prisma/client';
import React, { useState, useEffect } from 'react';
import { siteConfig } from '@/constants/site';
interface IProps {
  data: (Brand & { products: any[] })[] | null | undefined;
}
const loaderProp = ({ src }: any) => {
  return src;
};
export default function BrandGrid({ data }: IProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  useEffect(() => {
    if (data) {
      const filteredBrands = data.filter(
        (brand: Brand & { products: any[] }) =>
          brand.products.length > 0,
      );
      const shuffled = filteredBrands.sort(() => 0.5 - Math.random());
      const randomBrands = shuffled.slice(0, 12);
      setBrands(randomBrands);
    }
  }, [data]);
  if (typeof window === 'undefined' || brands.length === 0) {
    return null;
  }
  return (
    <div className="border border-gray-200 rounded overflow-hidden bg-white">
      <div className="pt-2 pl-2 flex justify-between items-center border-b border-gray-200">
        <h2 className="pl-3 pb-2 pt-0.5 font-semibold">
          Shop By Brand
        </h2>
        <Link
          className="duration-300 transition-all rounded-md px-4 flex gap-3 items-center"
          href={`/brands`}
        >
          View All
          <MoveRight size={32} strokeWidth={1.5} />
        </Link>
      </div>
      <div className="grid lg:grid-cols-7 grid-cols-4 text-center items-center gap-3 lg:px-2 lg:py-2 py-3">
        {brands.map((brand: Brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
          >
            <Image
              width={500}
              height={500}
              className="object-cover m-auto"
              src={brand.imageUrl as string}
              alt={brand.title || siteConfig.name}
              loader={loaderProp}
            />
            <h3 className="lg:text-lg text-xs dark:text-slate-200 mt-2.5 line-clamp-1">
              {brand.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}