import { getBrandBrief } from '@/actions/brands';
import { getCategoryBrief } from '@/actions/categories';
import { getProductById } from '@/actions/products';
import { getFarmers } from '@/actions/users';
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
  const farmersData = (await getFarmers()) ?? [];
  const categories = categoriesData?.data;
  const brands = brandsData?.data;
  const farmers = farmersData.data?.map((farmer: any) => {
    return {
      id: farmer.id,
      title: farmer.name,
    };
  });
  return (
    <div className="p-8">
      <ProductForm
        initialData={product}
        categories={categories}
        brands={brands}
        farmers={farmers}
        editingId={id}
      />
    </div>
  );
}
