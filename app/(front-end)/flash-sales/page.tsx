import { getLatestProducts } from '@/actions/products';
import AllProducts from '../products/page';

export default async function CategoriesPage() {
  const products = await getLatestProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <AllProducts isFlashSale={true} className="bg-[#fce7e5] text-[#e61601]" />
    </div>
  );
}
