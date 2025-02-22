'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Tag } from 'lucide-react';
import { Product } from '@prisma/client';
import ProductCard from './product-card';

interface TimerProps {
  initialTime?: number;
  className?: string;
}

interface FlashSalesProps {
  products: Product[];
  maxProducts?: number;
}

const DEFAULT_TIME = 3600; // 1 hour in seconds
const MAX_DISPLAY_PRODUCTS = 12;

const Timer: React.FC<TimerProps> = ({
  initialTime = DEFAULT_TIME,
  className = '',
}) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const padNumber = (num: number): string => num.toString().padStart(2, '0');

    return `${padNumber(hours)}h : ${padNumber(minutes)}m : ${padNumber(seconds)}s`;
  };

  return (
    <div
      className={`text-white font-bold lg:text-lg text-xs lg:block md:block hidden ${className}`}
    >
      Time Left: {formatTime(time)}
    </div>
  );
};

const FlashSalesHeader: React.FC = () => (
  <div className="flex items-center justify-between bg-[#e61601] p-2">
    <h2 className="text-white font-bold lg:tracking-normal lg:text-lg text-sm flex items-center gap-1">
      <Tag color="#ffba00" />
      Flash Sales
    </h2>
    <Timer />
    <Link
      className="text-white font-bold lg:text-sm text-xs flex items-center gap-1 hover:opacity-90 transition-opacity"
      href="/flash-sales"
    >
      SEE ALL <ChevronRight className="w-5 h-5" />
    </Link>
  </div>
);

const FlashSales: React.FC<FlashSalesProps> = ({
  products,
  maxProducts = MAX_DISPLAY_PRODUCTS,
}) => {
  const displayProducts = products.slice(0, maxProducts);

  return (
    <section
      className="flex flex-col gap-3 w-full min-h-[50%] bg-white"
      aria-label="Flash Sales"
    >
      <FlashSalesHeader />
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

export default FlashSales;
