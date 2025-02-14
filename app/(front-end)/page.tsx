import { type FC, Suspense } from 'react';
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
import RecentlyViewedProducts from '@/components/(front-end)/recently-viewed';

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
      <Suspense>
        <Hero banners={banners} />
      </Suspense>

      <div className="px-0">
        <Suspense>
          <Products
            title="New Arrivals"
            description="100+ products added today"
            products={latestProducts}
          />
        </Suspense>

        {flashSales.length >= 6 && (
          <Suspense>
            <FlashSales products={flashSales} />
          </Suspense>
        )}

        <Suspense>
          <CategoryGrid data={categories as any} />
        </Suspense>

        <Suspense>
          <ProductBannerOne />
        </Suspense>

        <Suspense>
          <section>
            {categories.map((category) => (
              <div key={category.id} className="lg:pb-4 pb-2">
                <CategoryList category={category} />
              </div>
            ))}
          </section>
        </Suspense>

        <Suspense>
          <TrendingDeals categories={categories as any} />
        </Suspense>

        <Suspense>
          <RecentlyViewedProducts />
        </Suspense>
      </div>
    </main>
  );
};

export default Home;
