import { getAllCategories, getCategoryBySlug } from '@/actions/categories';
import TrendingDeals from '@/components/(front-end)/trending-deals';
import { Suspense } from 'react';
import CategoryDetailed from './category-detailed';
interface PageProps {
  params: any;
}
function CategoryFallback() {
  return <></>;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const category = await getCategoryBySlug(slug);
  return {
    title: category?.title,
    description: category?.description,
    alternates: {
      canonical: `/categories/${category?.slug}`,
    },
  };
}
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const category: any = await getCategoryBySlug(slug);
  const categories_res = await getAllCategories();
  const categoriesData = categories_res?.data;
  return (
    <div>
      <Suspense fallback={<CategoryFallback />}>
        <CategoryDetailed category={category as any} slug={slug} />
        <div>
          <TrendingDeals
            className="bg-brandColor mt-4"
            categories={categoriesData}
          />
        </div>
      </Suspense>
    </div>
  );
}
