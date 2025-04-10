import { getBrandBrief } from '@/actions/brands';
import { getCategoryBrief } from '@/actions/categories';
import { getProductById } from '@/actions/products';
import { getVendors } from '@/actions/users';
import ProductForm from '@/components/forms/product-form';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const product = await getProductById(id);
  const categoriesData = await getCategoryBrief();
  const brandsData = await getBrandBrief();
  const vendorsData = (await getVendors()) ?? [];
  const categories = categoriesData?.data;
  const brands = brandsData?.data;
  const vendors = vendorsData.data?.map((vendor: any) => {
    return {
      id: vendor.id,
      title: vendor.name,
    };
  });
  return (
    <div className="p-8">
      <ProductForm
        initialData={product}
        categories={categories}
        brands={brands}
        vendors={vendors}
        editingId={id}
      />
    </div>
  );
}
