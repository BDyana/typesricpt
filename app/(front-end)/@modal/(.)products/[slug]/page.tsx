import { getCategoryById } from '@/actions/categories';
import { getProductBySlug } from '@/actions/products';
import Modal from './modal';
import { Suspense } from 'react';

function SearchBarFallback() {
  return <></>;
}
export default async function ProductModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const product = await getProductBySlug(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  const category: any = await getCategoryById(product.categoryId);

  return (
    <Suspense fallback={<SearchBarFallback />}>
      <Modal product={product} category={category} />;
    </Suspense>
  );
}
