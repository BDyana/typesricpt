import { getVendors, getNormalUsers } from '@/actions/users';
import CommonHeader from '@/components/(back-end)/common-header';
import DataTable from '@/components/data-table/data-table';
import { columns } from './columns';
export default async function page() {
  const vendors = await getVendors();

  return (
    <div className="">
      {/* <CommonHeader
        heading="Customers"
        href="/dashboard/vendors/new"
        linkTitle="Add Customer"
      /> */}

      <div className="">
        <DataTable data={vendors?.data as any} columns={columns} />
      </div>
    </div>
  );
}
