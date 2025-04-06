import { type FC, Suspense } from 'react';
import { type Banner, type Category, type Brand } from '@prisma/client';

// Action imports
import { getBanners } from '@/actions/banners';
import { getAllCategories } from '@/actions/categories';
import { getAllBrands } from '@/actions/brands';
import { getFlashSaleProducts, getLatestProducts, getSponsoredProducts } from '@/actions/products';
// Component imports
import Hero from '@/components/(front-end)/hero';
import Products from '@/components/(front-end)/products';
import FlashSales from '@/components/(front-end)/flash-sales';
import SponsoredOne from '@/components/(front-end)/sponsored-one';
import CategoryGrid from '@/components/(front-end)/category-grid';
import BrandGrid from '@/components/(front-end)/brand-grid';
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
  brands: Brand[];
  categories2: Category[];
  banners: Banner[];
  latestProducts: any[]; // Replace 'any' with your product type
  flashSales: any[]; // Replace 'any' with your product type
  sponsoredOne: any[]; // Replace 'any' with your product type
}

async function getPageData(): Promise<PageData> {
  const [categoriesResponse, brandsResponse, bannersData, latestProducts, flashSales, sponsoredOne] =
    await Promise.all([
      getAllCategories(),
      getAllBrands(),
      getBanners(),
      getLatestProducts(12),
      getFlashSaleProducts(),
      getSponsoredProducts(),
    ]);

    const categories2 = categoriesResponse?.data ?? [];
    const brands = brandsResponse?.data ?? [];

  const categories =
    categoriesResponse?.data?.filter((category: Category) =>
      FEATURED_CATEGORIES.includes(category.title as any),
    ) ?? [];

  return {
    categories,
    categories2,
    brands,
    banners: bannersData?.data ?? [],
    latestProducts: latestProducts ?? [],
    flashSales: flashSales ?? [],
    sponsoredOne: sponsoredOne ?? [],
  };
}

const Home: FC = async () => {
  const { categories, banners, latestProducts, flashSales, categories2, brands, sponsoredOne } =
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

        {sponsoredOne.length >= 1 && (
          <Suspense>
            <SponsoredOne products={sponsoredOne} />
          </Suspense>
        )}
        {flashSales.length >= 1 && (
          <Suspense>
            <FlashSales products={flashSales} />
          </Suspense>
        )}

        <Suspense>
          <CategoryGrid data={categories2 as any} />
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
        <BrandGrid data={brands as any} />
        </Suspense>

        <Suspense>
          <TrendingDeals categories={categories2 as any} />
        </Suspense>

        <Suspense>
          <RecentlyViewedProducts />
        </Suspense>
      </div>
    </main>
  );
};

export default Home;
