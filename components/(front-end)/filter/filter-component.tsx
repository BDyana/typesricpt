import { Card, CardContent } from '@/components/ui/card';
import FilteredProducts from './filtered-products';
import Filters from './filters';
import Sorting from './sorting';
import Loader from '@/components/loader';

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasMore: boolean;
}

interface FilterComponentProps {
  products: any[];
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  loading: boolean;
  slug?: string | null;
}

export default function FilterComponent({
  products,
  pagination,
  onPageChange,
  loading,
  slug,
}: FilterComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardContent className="py-4">
          <Sorting slug={slug} />
        </CardContent>
      </Card>
      <div className="flex flex-col md:flex-row gap-3">
        <Card className="md:w-[20%] flex-shrink-0 h-fit">
          <CardContent className="p-2">
            <Filters />
          </CardContent>
        </Card>
        <div className="flex-grow">
          {loading ? (
            <Loader />
          ) : products.length === 0 ? (
            <span className="flex items-center justify-center text-2xl font-semibold h-full">
              Sorry, we couldn't find what you searched for
            </span>
          ) : (
            <FilteredProducts
              className="lg:grid-cols-4"
              products={products}
              pagination={pagination}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
