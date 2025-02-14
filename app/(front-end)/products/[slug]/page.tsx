import { getCategoryById } from '@/actions/categories';
import { getProductBySlug } from '@/actions/products';
import CategoryCarousel from '@/components/(front-end)/category-carousel';
import ProductReviews from '@/components/(front-end)/product-review';
import ProductView from '@/components/(front-end)/product-view';
import RecentlyViewedProducts from '@/components/(front-end)/recently-viewed';
import { Product } from '@prisma/client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const product = await getProductBySlug(slug);
  return {
    title: product.title,
    description: product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);

  const categoryId = product?.categoryId;

  const category = await getCategoryById(categoryId);

  const { id } = product;
  const categoryProducts = category?.products;

  const products =
    categoryProducts?.filter((product: Product) => product.id !== id) ?? [];

  return (
    <div className="md:mx-2">
      <ProductView product={product} category={category} />
      <ProductReviews productId={product.id} />
      <div className="bg-white dark:bg-slate-700 mt-12 rounded-sm py-2">
        {/* <ProductComments
          productId={product.id}
          initialComments={product.comments as any}
        /> */}
        <h2 className="mb-4 text-xl font-semibold dark:text-slate-200">
          Similar Products
        </h2>
        <CategoryCarousel products={products} />
      </div>

      <RecentlyViewedProducts />
    </div>
  );
}
