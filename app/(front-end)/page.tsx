import { type FC } from 'react';
import { type Banner, type Category } from '@prisma/client';

// Action imports
import { getBanners } from '@/actions/banners';
import { getAllCategories } from '@/actions/categories';
import { getFlashSaleProducts, getLatestProducts } from '@/actions/products';

// Component imports
import Hero from '@/components/(front-end)/hero';
import Products from '@/components/(front-end)/products';
import FlashSales from '@/components/(front-end)/flash-sales';
import CategoryGrid from '@/components/(front-end)/category-grid';
import CategoryList from '@/components/(front-end)/category-list';
import ProductBannerOne from '@/components/(front-end)/product-banner-one';
import TrendingDeals from '@/components/(front-end)/trending-deals';

// Featured category titles
const FEATURED_CATEGORIES = [
  'Three Pieces',
  'Women Bag',
  'Gadget & Accessories',
  "Men's Shoes",
  'Beauty & Bodycare',
  'Grocery',
  'Dried Fruits & Raisins',
  'Wool Thread',
  'Lotions & Creams',
] as const;

interface PageData {
  categories: Category[];
  banners: Banner[];
  latestProducts: any[]; // Replace 'any' with your product type
  flashSales: any[]; // Replace 'any' with your product type
}

async function getPageData(): Promise<PageData> {
  const [categoriesResponse, bannersData, latestProducts, flashSales] =
    await Promise.all([
      getAllCategories(),
      getBanners(),
      getLatestProducts(12),
      getFlashSaleProducts(),
    ]);

  const categories =
    categoriesResponse?.data?.filter((category: Category) =>
      FEATURED_CATEGORIES.includes(category.title as any),
    ) ?? [];

  return {
    categories,
    banners: bannersData?.data ?? [],
    latestProducts: latestProducts ?? [],
    flashSales: flashSales ?? [],
  };
}

const Home: FC = async () => {
  const { categories, banners, latestProducts, flashSales } =
    await getPageData();

  return (
    <main className="min-h-screen">
      <Hero banners={banners} />

      <div className="px-0">
        {/* New Arrivals Section */}
        <Products
          title="New Arrivals"
          description="100+ products added today"
          products={latestProducts}
        />

        {/* Flash Sales Section - Only show if we have enough products */}
        {flashSales.length >= 6 && <FlashSales products={flashSales} />}

        {/* Categories Section */}
        <CategoryGrid data={categories as any} />

        {/* Product Banner Section */}
        <ProductBannerOne />

        {/* Category Lists Section */}
        <section>
          {categories.map((category) => (
            <div key={category.id} className="lg:pb-4 pb-2">
              <CategoryList category={category} />
            </div>
          ))}
        </section>

        {/* Trending Deals Section */}
        <TrendingDeals categories={categories as any} />
      </div>
    </main>
  );
};

export default Home;
