'use client';
import React from 'react';
import Paginate from './paginate';
import ProductCard from '../product-card';
import { cn } from '@/lib/utils';

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasMore: boolean;
}

interface FilteredProductsProps {
  products: any[];
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function FilteredProducts({
  products,
  pagination,
  onPageChange,
  className = 'lg:grid-cols-4',
}: FilteredProductsProps) {
  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({
      top: document.getElementById('products-section')?.offsetTop || 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <div className={cn(className, 'grid grid-cols-2 md:grid-cols-3')}>
        {products?.map((product, i) => (
          <ProductCard product={product} key={product.id || i} />
        ))}
      </div>
      <div className="p-8 mx-auto flex items-center justify-center w-full">
        <Paginate
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
