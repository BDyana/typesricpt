'use client';

import { Product } from '@prisma/client';
import { Button } from '../ui/button';
import ProductCard from './product-card';
import { cn } from '@/lib/utils';

interface IProps {
  title: string;
  description: string;
  buttonTitle?: string;
  products: [];
  className?: string;
}
export default function Products({
  title,
  description,
  products,
  buttonTitle = 'View All',
  className = 'lg:grid-cols-6',
}: IProps) {
  return (
    <div className="lg:pt-8 pt-6 pb-4">
      <div className="flex pb-3 justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <h4>{description}</h4>
        </div>
        <Button className="px-8 bg-brandColor h-8">{buttonTitle}</Button>
      </div>
      <div
        className={cn(
          className,
          'grid grid-cols-3 gap-y-2 md:gap-y-0 sm:grid-cols-3 md:grid-cols-4 lg:mt-3 mt-1.5 -mx-1',
        )}
      >
        {products.map((product: Product) => (
          <div key={product.id}>
            <ProductCard product={product as any} />
          </div>
        ))}
      </div>
    </div>
  );
}
