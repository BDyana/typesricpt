import { Product } from '@prisma/client';
import { getProductBySlug } from '@/actions/products';
import { getCategoryBySlug } from '@/actions/categories';
import ProductView from '@/components/(front-end)/product-view';

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  const categoryId = product?.categoryId;

  const category = await getCategoryBySlug(categoryId);

  return (
    <div className="md:mx-2">
      <ProductView product={product} category={category} />
    </div>
  );
}
