import { getLatestProducts } from '@/actions/products';
import CommonHeader from '@/components/(back-end)/common-header';
import DataTable from '@/components/data-table/data-table';
import { columns } from './columns';
export default async function page() {
  const products = await getLatestProducts();
  const searchKeys = ['title', 'slug'];

  return (
    <div className="">
      <CommonHeader
        heading="Products"
        href="/dashboard/products/new"
        linkTitle="Add Product"
      />

      <div className="">
        <DataTable
          data={products as any}
          searchKeys={searchKeys}
          columns={columns}
        />
      </div>
    </div>
  );
}
