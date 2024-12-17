import * as fbq from '../../lib/fpixel';
import { Category } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { getBanners } from '@/actions/banners';
import { authOptions } from '@/lib/authOptions';
import Hero from '@/components/(front-end)/hero';
import { getTrainings } from '@/actions/trainings';
import { getLatestProducts } from '@/actions/products';
import { getAllCategories } from '@/actions/categories';
import Products from '@/components/(front-end)/products';
import CategoryList from '@/components/(front-end)/category-list';
import CategoryGrid from '@/components/(front-end)/category-grid';
import TrendingDeals from '@/components/(front-end)/trending-deals';
import { PromotionalBanner } from '@/components/(front-end)/promotional-banner';

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

  const bannersData = await getBanners();
  const banners = bannersData?.data;

  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen">
      <Hero banners={banners} />

      <div className="px-4 md:px-0">
        {/* New Products */}
        <Products
          title="New Arrivals"
          description="100+ products added today"
          products={latestProducts as any}
        />

        {/* Shop by category */}
        <CategoryGrid data={categoriesData} />

        {/* <HalfBannerOne/> */}
        <div className="py-8">
          <PromotionalBanner
            title="Summer Sale is Here!"
            description="Get up to 50% off on all summer essentials. Limited time offer, shop now and save big!!"
            ctaText="Shop Now"
            // onCtaClick={() => console.log('CTA clicked')}
          />
        </div>

        {/* More categories */}
        {categories?.map((category: Category) => {
          return (
            <div className="lg:pb-4 pb-2" key={category.id}>
              <CategoryList category={category} />
            </div>
          );
        })}

        <TrendingDeals categories={categoriesData} />
      </div>
    </div>
  );
}
