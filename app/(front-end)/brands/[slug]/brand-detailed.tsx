'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterComponent from '@/components/(front-end)/filter/filter-component';
import EmptyStates from '@/components/empty-states';
import { getData } from '@/lib/getData';

interface Brand {
  id: string;
  title: string;
  slug: string;
}

interface Product {
  id: string;
  title: string;
  salePrice: number;
  imageUrl: string;
  description: string;
  brand: Brand;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasMore: boolean;
}

interface PageProps {
  brand: Brand | null;
  slug?: string | null;
}

export default function BrandDetailed({ brand, slug }: PageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginationData, setPaginationData] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasMore: false,
  });

  const handlePageChange = (page: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', page.toString());
    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${window.location.pathname}${query}`);
  };

  useEffect(() => {
    if (!brand) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams({
          brandId: brand.id,
          sort: searchParams.get('sort') || 'desc',
          page: searchParams.get('page') || '1',
          ...(searchParams.get('min') && { min: searchParams.get('min')! }),
          ...(searchParams.get('max') && { max: searchParams.get('max')! }),
          ...(searchParams.get('search') && {
            search: searchParams.get('search')!,
          }),
        });

        const response = await getData(
          `products/search?${queryParams.toString()}`,
        );

        if (!response) {
          throw new Error('No data received');
        }

        setProducts(response.products);
        setPaginationData(response.pagination);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch products',
        );
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brand, searchParams]);

  // Render logic
  if (!brand) {
    return <EmptyStates.NoBrand />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return <EmptyStates.NoProducts />;
  }

  if (!loading && products.length === 0) {
    return <EmptyStates.EmptyBrand brandName={brand.title} />;
  }

  return (
    <FilterComponent
      slug={slug}
      products={products}
      pagination={paginationData}
      onPageChange={handlePageChange}
      loading={loading}
    />
  );
}