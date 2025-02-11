import { getBanners } from '@/actions/banners';
import { getAllCategories } from '@/actions/categories';
import { getFlashSaleProducts, getLatestProducts } from '@/actions/products';
import CategoryGrid from '@/components/(front-end)/category-grid';
import CategoryList from '@/components/(front-end)/category-list';
import FlashSales from '@/components/(front-end)/flash-sales';
import Hero from '@/components/(front-end)/hero';
import ProductBannerOne from '@/components/(front-end)/product-banner-one';
import Products from '@/components/(front-end)/products';
import TrendingDeals from '@/components/(front-end)/trending-deals';
import { Category } from '@prisma/client';

export default async function Home() {
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
      category.title === 'Dried Fruits & Raisins' ||
      category.title === 'Wool Thread' ||
      category.title === 'Lotions & Creams'
    );
  });

  const bannersData = await getBanners();
  const flashSales = await getFlashSaleProducts();
  const banners = bannersData?.data;

  // console.log('Flash Sales Count ✅: ', flashSales.length);

  return (
    <div className="min-h-screen">
      <Hero banners={banners} />

      <div className="px-0">
        {/* New Arrivals */}
        <Products
          title="New Arrivals"
          description="100+ products added today"
          products={latestProducts as any}
        />

        {/* flash sale */}
        {flashSales?.length >= 6 ? <FlashSales products={flashSales} /> : null}

        {/* Shop by category */}
        <CategoryGrid data={categoriesData} />
        <ProductBannerOne />
        {/* <HalfBannerOne/> */}
        {/* <div className="py-8">
          <PromotionalBanner
            title="Summer Sale is Here!"
            description="Get up to 50% off on all summer essentials. Limited time offer, shop now and save big!!"
            ctaText="Shop Now"
            // onCtaClick={() => console.log('CTA clicked')}
          />
        </div> */}

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
