import { FireExtinguisher } from 'lucide-react';
import AllProducts from '../products/page';
import { getFlashSaleProducts } from '@/actions/products';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function CategoriesPage() {
  const flashSaleProducts = await getFlashSaleProducts();

  if (flashSaleProducts.length === 0) {
    return (
      <div className="flex w-full mx-auto h-full flex-col items-center justify-center space-y-4 py-12">
        <FireExtinguisher className="animate-pulse h-16 w-16 text-gray-400" />
        <h2 className="text-2xl font-semibold text-gray-900">
          No Flash Sales at the moment, kindly check back
        </h2>
        <p className="text-center text-gray-500">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Button className="bg-brandColor w-1/2" asChild>
          <Link href="/products">Shop something else</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <AllProducts
        products={flashSaleProducts as any}
        isFlashSale={true}
        className="bg-[#fce7e5] text-[#e61601]"
      />
    </div>
  );
}
