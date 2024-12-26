'use client';

import { getLatestProducts } from '@/actions/products';
import Paginate from '@/components/(front-end)/filter/paginate';
import FlashSales from '@/components/(front-end)/flash-sales';
import ProductCard from '@/components/(front-end)/product-card';
import { ChevronRight, Tag } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';

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
function SearchBarFallback() {
  return <></>;
}

export default function AllProducts({
  isFlashSale,
  className,
}: {
  isFlashSale?: boolean;
  className?: string;
}) {
  const [productsList, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const pageSize = isFlashSale ? 100 : 10;

  // Function to fetch the latest products
  const getLatest = async () => {
    try {
      setIsLoading(true);
      const latestProducts: any = await getLatestProducts(); // Fetch the latest 30 products
      setProductsList(latestProducts);
    } catch (error) {
      console.error('Error fetching latest products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    getLatest();
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(productsList.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = productsList.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    window.scrollTo({
      top: document.getElementById('products-section')?.offsetTop || 0,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-4 px-4 rounded-md bg-gradient-to-b from-slate-50 to-white">
      <h2 className="text-xl font-bold">
        {isFlashSale ? (
          <div className="flex items-center justify-between bg-[#e61601] p-4">
            <h2 className="text-[#ffff] font-bold lg:tracking-normal lg:text-lg text-sm flex items-center gap-1">
              <Tag color="#ffba00" />
              Flash Sales
            </h2>
            <Timer />
            <Link
              className="text-[#fff] hidden font-bold lg:text-sm text-xs items-center gap-1"
              href="/flash-sales"
            >
              SEE ALL <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          'All Products'
        )}
      </h2>
      <Suspense fallback={<SearchBarFallback />}>
        <div
          id="products-section"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:grid-cols-4 mt-4"
        >
          {currentProducts.map((product, i) => (
            <div key={i}>
              <ProductCard
                className={className && 'bg-[#fce7e5] text-[#e61601]'}
                product={product}
              />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="p-8 mx-auto flex items-center justify-center w-full">
            <Paginate
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {!isFlashSale && <FlashSales products={productsList} />}
      </Suspense>
    </div>
  );
}
