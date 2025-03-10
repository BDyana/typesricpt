import { getAllCategories } from '@/actions/categories';
import { CategoriesModal } from './categories-modal';
import RecentlyViewedProducts from '@/components/(front-end)/recently-viewed';

export default async function CategoriesPage() {
  const categoriesData = await getAllCategories();
  const categories = categoriesData?.data?.filter(
    (category) => category.products.length > 0,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoriesModal categories={categories} />
      <RecentlyViewedProducts />
    </div>
  );
}
