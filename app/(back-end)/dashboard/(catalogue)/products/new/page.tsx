import { getAllCategories } from '@/actions/categories';
import { getAllBrands } from '@/actions/brands';
import { getUsers } from '@/actions/users';
import CategoryForm from '@/components/forms/category-form';
import ProductForm from '@/components/forms/product-form';
import Loader from '@/components/loader';
export default async function page() {
  const categoriesData = await getAllCategories();
  const brandsData = await getAllBrands();
  const usersData = (await getUsers()) ?? [];
  const users = usersData.data;
  if (!categoriesData || !usersData) {
    return <Loader />;
  }
  if (!brandsData || !usersData) {
    return <Loader />;
  }
  const farmersData = users?.filter((user) => user.role === 'FARMER') ?? [];
  const farmers = farmersData?.map((farmer) => {
    return {
      id: farmer.id,
      title: farmer.name,
    };
  });
  const categories = categoriesData.data?.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });
  const brands = brandsData.data?.map((brand) => {
    return {
      id: brand.id,
      title: brand.title,
    };
  });
  return (
    <div>
      <ProductForm categories={categories} brands={brands} farmers={farmers} />
    </div>
  );
}