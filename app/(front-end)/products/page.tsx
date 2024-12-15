'use client';

import { getLatestProducts } from '@/actions/products';
import Paginate from '@/components/(front-end)/filter/paginate';
import ProductCard from '@/components/(front-end)/product-card';
import { Suspense, useEffect, useState } from 'react';

function SearchBarFallback() {
  return <></>;
}
export default function AllProducts() {
  const [productsList, setProductsList] = useState([]);
  const [isSearch, setIsSearch] = useState(false); // Track search state if needed

  // Function to fetch the latest products
  const getLatest = async () => {
    try {
      const latestProducts: any = await getLatestProducts(30); // Fetch the latest 30 products
      setProductsList(latestProducts); // Set the fetched products to state
    } catch (error) {
      console.error('Error fetching latest products:', error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    getLatest();
  }, []);

  const pageSize = 10;
  const totalPages = Math.ceil(productsList.length / pageSize); // Dynamically calculate total pages

  return (
    <div className="pt-8 pb-4 px-4 rounded-md bg-gradient-to-b from-slate-50 to-white">
      <h2 className="text-xl font-bold">All Products</h2>
      <Suspense fallback={<SearchBarFallback />}>
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-y-2 md:grid-cols-4 mt-4">
          {productsList.map((product, i) => (
            <div key={i}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="p-8 mx-auto flex items-center justify-center w-full">
          <Paginate totalPages={totalPages} />
        </div>
      </Suspense>
    </div>
  );
}
