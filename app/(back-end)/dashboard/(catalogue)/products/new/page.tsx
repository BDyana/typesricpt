import { getAllCategories } from '@/actions/categories';
import { getUsers } from '@/actions/users';
import CategoryForm from '@/components/forms/category-form';
import ProductForm from '@/components/forms/product-form';
import Loader from '@/components/loader';

export default async function page() {
  //Categories and Farmers
  const categoriesData = await getAllCategories();
  const usersData = (await getUsers()) ?? [];

  const users = usersData.data;

  if (!categoriesData || !usersData) {
    return <Loader />;
  }

  const farmersData = users?.filter((user) => user.role === 'FARMER') ?? [];
  const farmers = farmersData?.map((farmer) => {
    return {
      id: farmer.id,
      title: farmer.name,
    };
  });

  // console.log("Farmers;", farmers);

  const categories = categoriesData.data?.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });

  return (
    <div>
      <ProductForm categories={categories} farmers={farmers} />
    </div>
  );
}
