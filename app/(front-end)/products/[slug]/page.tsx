import { getCategoryById } from '@/actions/categories';
import { getBrandById } from '@/actions/brands';
import { getProductBySlug } from '@/actions/products';
import CategoryCarousel from '@/components/(front-end)/category-carousel';
import ProductReviews from '@/components/(front-end)/product-review';
import ProductView from '@/components/(front-end)/product-view';
import RecentlyViewedProducts from '@/components/(front-end)/recently-viewed';
import { Product } from '@prisma/client';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found', description: 'This product does not exist.' };
  }

  return {
    title: product.title,
    description: product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  const category = product.categoryId ? await getCategoryById(product.categoryId) : null;
  const brand = product.brandId ? await getBrandById(product.brandId) : null;

  const categoryProducts = category?.products ?? [];
  const products = categoryProducts.filter((p: Product) => p.id !== product.id);

  return (
    <div className="md:mx-2">
      <ProductView product={product} category={category} brand={brand} />
      <ProductReviews productId={product.id} />
      <div className="bg-white dark:bg-slate-700 mt-12 rounded-sm p-2">
        <h2 className="mb-4 text-xl font-semibold dark:text-slate-200">
          Similar Products
        </h2>
        <CategoryCarousel products={products} />
      </div>
      <RecentlyViewedProducts />
    </div>
  );
}
