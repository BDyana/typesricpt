import { getCategoryById } from '@/actions/categories';
import { getProductBySlug } from '@/actions/products';
import ProductView from '@/components/(front-end)/product-view';

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);

  const categoryId = product?.categoryId;

  const category = await getCategoryById(categoryId);

  return (
    <div className="md:mx-2">
      <ProductView product={product} category={category} />
    </div>
  );
}
