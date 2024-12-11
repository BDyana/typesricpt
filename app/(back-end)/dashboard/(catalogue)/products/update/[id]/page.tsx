import {
  getAllCategories,
  getCategoryBrief,
  getCategoryById,
} from '@/actions/categories';
import { getProductById } from '@/actions/products';
import { getFarmers, getUsers } from '@/actions/users';
import CategoryForm from '@/components/forms/category-form';
import ProductForm from '@/components/forms/product-form';
import React from 'react';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const product = await getProductById(id);
  const categoriesData = await getCategoryBrief();
  const farmersData = (await getFarmers()) ?? [];

  const categories = categoriesData?.data;
  // console.log('Categories;', categories);

  // console.log('Farmers;', farmers);

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
        farmers={farmers}
        editingId={id}
      />
    </div>
  );
}
