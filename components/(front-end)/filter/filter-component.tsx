import { Card, CardContent } from '@/components/ui/card';
import FilteredProducts from './filtered-products';
import Filters from './filters';
import Sorting from './sorting';

interface FilterComponentProps {
  category: any;
  products: any[];
}

export default function FilterComponent({
  category,
  products,
}: FilterComponentProps) {
  const { title, slug } = category;
  const productCount = category.products.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardContent className="py-4">
          <Sorting
            isSearch={category?.isSearch as boolean}
            title={title}
            slug={slug}
          />
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-[40%] flex-shrink-0 h-fit">
          <CardContent className="py-6">
            <Filters slug={slug} isSearch={category?.isSearch as boolean} />
          </CardContent>
        </Card>

        <div className="flex-grow">
          <FilteredProducts
            className="lg:grid-cols- gap-y-3"
            isSearch={category?.isSearch as boolean}
            productCount={productCount}
            products={products}
          />
        </div>
      </div>
    </div>
  );
}
