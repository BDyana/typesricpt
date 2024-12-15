'use client';

import { getData } from '@/lib/getData';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterComponent from '@/components/(front-end)/filter/filter-component';

function SearchBarFallback() {
  return <></>;
}

export default function CategoryDetailed() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      const sort = searchParams.get('sort') || '';
      const min = searchParams.get('min') || '0';
      const max = searchParams.get('max') || '';
      const page = searchParams.get('page') || '1';

      try {
        const fetchedProducts = await getData(
          `products/search?search=${search}&sort=${sort}&min${min}&max=${max}&page=${page}`,
        );

        setProducts(fetchedProducts);
      } catch (error) {
        setError('Failed to fetch products');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search]);

  return (
    <div>
      <Suspense fallback={<SearchBarFallback />}>
        {products && <FilterComponent products={products} />}
      </Suspense>
    </div>
  );
}
