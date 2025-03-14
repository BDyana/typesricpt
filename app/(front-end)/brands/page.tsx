import { getAllBrands } from '@/actions/brands';
import { BrandsModal } from './brands-modal';
import RecentlyViewedProducts from '@/components/(front-end)/recently-viewed';

export default async function BrandsPage() {
  const brandsData = await getAllBrands();
  const brands = brandsData?.data?.filter(
    (brand) => brand.products.length > 0,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <BrandsModal brands={brands} />
      <RecentlyViewedProducts />
    </div>
  );
}
