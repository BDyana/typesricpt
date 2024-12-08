import { Suspense } from 'react';
import { getData } from '@/lib/getData';
import CategoryDetailed from './category-detailed';
import { getAllCategories } from '@/actions/categories';
import TrendingDeals from '@/components/(front-end)/trending-deals';

interface Category {
  id: string;
  name: string;
  // Define other properties based on your category model
}

interface Product {
  id: string;
  title: string;
  price: number;
  // Define other properties based on your product model
}

interface PageProps {
  params: any;
}

function SearchBarFallback() {
  return <></>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // Fetch the category data
  const category: Category = await getData(`categories/filter/${slug}`);

  const categories_res = await getAllCategories();
  const categoriesData = categories_res?.data;

  return (
    <div>
      <Suspense fallback={<SearchBarFallback />}>
        <CategoryDetailed category={category as any} />

        <div>
          <TrendingDeals
            className="bg-brandColor"
            categories={categoriesData}
          />
        </div>
      </Suspense>
    </div>
  );
}
