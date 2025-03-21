import { getBrandById } from '@/actions/brands';
import BrandForm from '@/components/forms/brand-form';
import React from 'react';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const brand = await getBrandById(id);
  return (
    <div className="p-8">
      <BrandForm initialData={brand} editingId={id} />
    </div>
  );
}
