'use client';

import { getData } from '@/lib/getData';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterComponent from '@/components/(front-end)/filter/filter-component';

function SearchBarFallback() {
  return <></>;
}

export default function CategoryDetailed({ category }: any) {
  const searchParams = useSearchParams();

  // Await searchParams to properly access query params
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching new data

      try {
        // Await searchParams and get values from query params
        const sort = searchParams.get('sort') || '';
        const min = searchParams.get('min') || '0';
        const max = searchParams.get('max') || '';
        const page = searchParams.get('page') || '1';

        // Fetch products based on the category and search parameters
        const fetchedProducts: any[] = await getData(
          `products?catId=${category.id}&page=${page}&sort=${sort}&min=${min}&max=${max}`,
        );
        setProducts(fetchedProducts); // Save the products in state
      } catch (error) {
        setError('Failed to fetch products'); // Set error message
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchProducts(); // Trigger the async fetch function
  }, [category.id, searchParams]); // Add the dependencies for category and searchParams

  if (loading) return <div></div>;
  if (error) return <div>{/* {error} */}</div>;

  return (
    <div>
      <Suspense fallback={<SearchBarFallback />}>
        {category && products && (
          <FilterComponent category={category as any} products={products} />
        )}
      </Suspense>
    </div>
  );
}
