'use client';

import React from 'react';
import Paginate from './paginate';
import ProductCard from '../product-card';
import { cn } from '@/lib/utils';

interface ProductType {
  id: string;
  [key: string]: any;
}

interface FilteredProductsProps {
  products: ProductType[];
  productCount: number;
  className?: string;
}

export default function FilteredProducts({
  products,
  productCount,
  className = 'lg:grid-cols-4',
}: FilteredProductsProps) {
  const pageSize = 10;
  const totalPages = Math.ceil(productCount / pageSize);

  return (
    <div>
      <div className={cn(className, 'grid grid-cols-2 md:grid-cols-3')}>
        {products.map((product, i) => (
          <ProductCard product={product as any} key={product.id || i} />
        ))}
      </div>
      <div className="p-8 mx-auto flex items-center justify-center w-full">
        <Paginate totalPages={totalPages} />
      </div>
    </div>
  );
}
