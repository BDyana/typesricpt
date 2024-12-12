import { getNormalUsers } from '@/actions/users';
import CommonHeader from '@/components/(back-end)/common-header';
import DataTable from '@/components/data-table/data-table';
import { columns } from './columns';
export default async function page() {
  const customers = await getNormalUsers();

  return (
    <div className="">
      {/* <CommonHeader
        heading="Customers"
        href="/dashboard/customers/new"
        linkTitle="Add Customer"
      /> */}

      <div className="">
        <DataTable data={customers?.data as any} columns={columns} />
      </div>
    </div>
  );
}
