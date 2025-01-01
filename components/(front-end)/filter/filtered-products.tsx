'use client';

import React, { useState } from 'react';
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
  const pageSize = 50;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination values
  const totalPages = Math.ceil(products.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    window.scrollTo({
      top: document.getElementById('products-section')?.offsetTop || 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <div className={cn(className, 'grid grid-cols-2 md:grid-cols-3')}>
        {products.map((product, i) => (
          <ProductCard product={product as any} key={product.id || i} />
        ))}
      </div>
      <div className="p-8 mx-auto flex items-center justify-center w-full">
        <Paginate
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
