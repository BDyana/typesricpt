import { getAllBrands, getBrandBySlug } from '@/actions/brands';
import TrendingDeals from '@/components/(front-end)/trending-deals';
import { Suspense } from 'react';
import BrandDetailed from './brand-detailed';
interface PageProps {
  params: any;
}
function BrandFallback() {
  return <></>;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const brand = await getBrandBySlug(slug);
  return {
    title: brand?.title,
    description: brand?.description,
    alternates: {
      canonical: `/brands/${brand?.slug}`,
    },
  };
}
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const brand: any = await getBrandBySlug(slug);
  const brands_res = await getAllBrands();
  const brandsData = brands_res?.data;
  return (
    <div>
      <Suspense fallback={<BrandFallback />}>
        <BrandDetailed brand={brand as any} slug={slug} />
        {/* <div>
          <TrendingDeals
            className="bg-brandColor mt-4"
            categories={categoriesData}
          />
        </div> */}
      </Suspense>
    </div>
  );
}
