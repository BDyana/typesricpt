import { Card, CardContent } from '@/components/ui/card';
import FilteredProducts from './filtered-products';
import Filters from './filters';
import Sorting from './sorting';

interface FilterComponentProps {
  products: any[];
}

export default function FilterComponent({ products }: any) {
  const productCount = products.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardContent className="py-4">
          <Sorting />
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-[20%] flex-shrink-0 h-fit">
          <CardContent className="p-2">
            <Filters />
          </CardContent>
        </Card>

        <div className="flex-grow">
          <FilteredProducts
            className="lg:grid-cols-4 gap-y-3"
            productCount={productCount}
            products={products}
          />
        </div>
      </div>
    </div>
  );
}
