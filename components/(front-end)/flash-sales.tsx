'use client';

import Link from 'next/link';
import { ChevronRight, Tag } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ProductCard from './product-card';

const Timer = () => {
  const [time, setTime] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime + 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: any) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours < 10 ? '0' : ''}${hours}h : ${
      minutes < 10 ? '0' : ''
    }${minutes}m : ${seconds < 10 ? '0' : ''}${seconds}s`;
  };

  return (
    <div className="text-[#ffff] font-bold lg:text-lg text-xs lg:block md:block hidden">
      Time Left: {formatTime(time)}
    </div>
  );
};

export default function FlashSales({ products }: any) {
  return (
    <div className="flex flex-col gap-6 w-full min-h-[50%] bg-white mt-5">
      <div className="flex items-center justify-between bg-[#e61601] p-4">
        <h2 className="text-[#ffff] font-bold lg:tracking-normal lg:text-lg text-sm flex items-center gap-1">
          <Tag color="#ffba00" />
          Flash Sales
        </h2>
        <Timer />
        <Link
          className="text-[#fff] font-bold lg:text-sm text-xs flex items-center gap-1"
          href="/flash-sales"
        >
          SEE ALL <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 lg:grid-cols-5 gap-4 px-3 lg:pb-6 pb-4">
        {products?.splice(0, 10).map((product: any) => {
          // console.log('Product ✅: ', product);
          return (
            <ProductCard
              className="bg-[#fce7e5] text-[#e61601]"
              key={product.id}
              product={product}
            />
          );
        })}
      </div>
    </div>
  );
}
