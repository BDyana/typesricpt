'use client';
import { getData } from '@/lib/getData';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import FilterComponent from '@/components/(front-end)/filter/filter-component';

function SearchBarFallback() {
  return <></>;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasMore: boolean;
}

interface ProductsResponse {
  products: any[];
  pagination: PaginationData;
}

export default function CategoryDetailed() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get('search');
  const [products, setProducts] = useState<any[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasMore: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (pageNumber: number) => {
    setLoading(true);
    setError(null);
    const sort = searchParams.get('sort') || '';
    const min = searchParams.get('min') || '0';
    const max = searchParams.get('max') || '';

    try {
      const response: ProductsResponse = await getData(
        `products/search?search=${search}&sort=${sort}&min=${min}&max=${max}&page=${pageNumber}`,
      );

      setProducts(response.products);
      setPaginationData(response.pagination);
    } catch (error) {
      setError('Failed to fetch products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1');
    fetchProducts(page);
  }, [search, searchParams]);

  const handlePageChange = (page: number) => {
    // Update URL with new page number
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', page.toString());
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${window.location.pathname}${query}`);
  };

  return (
    <div>
      <Suspense fallback={<SearchBarFallback />}>
        {products && (
          <FilterComponent
            products={products}
            pagination={paginationData}
            onPageChange={handlePageChange}
            loading={loading}
          />
        )}
      </Suspense>
    </div>
  );
}
