import { getAllBrands } from '@/actions/brands';
import CommonHeader from '@/components/(back-end)/common-header';
import DataTable from '@/components/data-table/data-table';
import { columns } from './columns';
export default async function page() {
  const brands = await getAllBrands();
  const searchKeys = ['title', 'slug'];

  return (
    <div className="">
      <CommonHeader
        heading="Brands"
        href="/dashboard/brands/new"
        linkTitle="Add Brands"
      />

      <div className="">
        <DataTable
          searchKeys={searchKeys}
          data={brands?.data as any}
          columns={columns}
        />
      </div>
    </div>
  );
}
