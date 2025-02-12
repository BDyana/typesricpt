import { getAllCategories } from '@/actions/categories';
import CommonHeader from '@/components/(back-end)/common-header';
import DataTable from '@/components/data-table/data-table';
import { columns } from './columns';
export default async function page() {
  const categories = await getAllCategories();
  const searchKeys = ['title', 'slug'];

  return (
    <div className="">
      <CommonHeader
        heading="Categories"
        href="/dashboard/categories/new"
        linkTitle="Add Category"
      />

      <div className="">
        <DataTable
          searchKeys={searchKeys}
          data={categories?.data as any}
          columns={columns}
        />
      </div>
    </div>
  );
}
