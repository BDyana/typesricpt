import * as fbq from '../../lib/fpixel';
import { Category } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getTrainings } from '@/actions/trainings';
import { getAllCategories } from '@/actions/categories';
import Products from '@/components/(front-end)/products';
import { getLatestProducts } from '@/actions/products';
import CategoryList from '@/components/(front-end)/category-list';
import CategoryGrid from '@/components/(front-end)/category-grid';

export default async function Home() {
  const handleClick = () => {
    fbq.event('Purchase', { currency: 'USD', value: 10 });
  };
  const categories_res = await getAllCategories();
  const latestProducts = await getLatestProducts(12);
  const categoriesData = categories_res?.data;

  const categories = categoriesData?.filter((category: Category) => {
    return (
      category.title === 'Three Pieces' ||
      category.title === 'Women Bag' ||
      category.title === 'Gadget & Accessories' ||
      category.title === "Men's Shoes" ||
      category.title === 'Beauty & Bodycare' ||
      category.title === 'Grocery' ||
      category.title === 'Wool Thread' ||
      category.title === 'Lotions & Creams'
    );
  });

  const trainings_res = await getTrainings();
  const trainingsData = trainings_res?.data;

  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen">
      {/* <Hero /> */}
      {/* New Products */}
      <Products
        title="New Arrivals"
        description="100+ products added today"
        products={latestProducts as any}
      />
      <CategoryGrid data={categoriesData} />

      {/* <HalfBannerOne/> */}
      {categories?.map((category: Category) => {
        return (
          <div className="lg:pb-4 pb-2" key={category.id}>
            <CategoryList category={category} />
          </div>
        );
      })}

      {/* <ArenaGrid/> */}
    </div>
  );
}
