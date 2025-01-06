'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterComponent from '@/components/(front-end)/filter/filter-component';
import EmptyStates from '@/components/empty-states';
import { getData } from '@/lib/getData';

interface Category {
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
  category: Category;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

interface PageProps {
  category: Category | null;
}

export default function CategoryDetailed({ category }: PageProps) {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // If no category is provided, show the CategoryNotFound component
  if (!category) {
    return <EmptyStates.NoCategory />;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams({
          categoryId: category.id,
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
        setPagination(response.pagination);
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
  }, [category.id, searchParams]);

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

  // If we have a category but no products
  if (!loading && products.length === 0) {
    return <EmptyStates.EmptyCategory categoryName={category.title} />;
  }

  return (
    <FilterComponent
      category={category}
      products={products}
      pagination={pagination}
    />
  );
}
