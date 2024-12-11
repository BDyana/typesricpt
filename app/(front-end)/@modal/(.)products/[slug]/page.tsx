import { getCategoryById } from '@/actions/categories';
import { getProductBySlug } from '@/actions/products';
import Modal from './modal';

export default async function ProductModalPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  const category: any = await getCategoryById(product.categoryId);

  return <Modal product={product} category={category} />;
}
