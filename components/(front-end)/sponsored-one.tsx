'use client';

import Link from 'next/link';
import { ChevronRight, Tag, Moon } from 'lucide-react';
import { Product } from '@prisma/client';
import ProductCard from './product-card';

interface SponsoredOneProps {
  products: Product[];
  maxProducts?: number;
}

const MAX_DISPLAY_PRODUCTS = 12;

const SponsoredOneHeader: React.FC = () => (
  <div className="flex items-center justify-between bg-[#4f7eff] p-2">
    <h2 className="text-white text-center lg:tracking-normal lg:text-lg text-sm flex items-center gap-1">
      <Moon />
      Ramadan Kareem
    </h2>
    <Link
      className="text-white font-bold lg:text-sm text-xs flex items-center gap-1 hover:opacity-90 transition-opacity"
      href="/sponsored-one"
    >
      SEE ALL <ChevronRight className="w-5 h-5" />
    </Link>
  </div>
);

const SponsoredOne: React.FC<SponsoredOneProps> = ({
  products,
  maxProducts = MAX_DISPLAY_PRODUCTS,
}) => {
  const displayProducts = products.slice(0, maxProducts);

  return (
    <section
      className="flex flex-col gap-3 w-full min-h-[50%] bg-white"
      aria-label="Sponsored One"
    >
      <SponsoredOneHeader />
      <div className="grid md:grid-cols-4 grid-cols-2 lg:grid-cols-6 lg:pb-6 pb-4">
        {displayProducts.map((product) => (
          <ProductCard
            className="bg-[#fce7e5] text-[#e61601]"
            key={product.id}
            product={{
              ...product,
              imageUrl: product.imageUrl as string,
              description: product.description as string,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default SponsoredOne;