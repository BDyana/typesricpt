import { getFarmers, getNormalUsers } from '@/actions/users';
import CommonHeader from '@/components/(back-end)/common-header';
import DataTable from '@/components/data-table/data-table';
import { columns } from './columns';
export default async function page() {
  const farmers = await getFarmers();

  return (
    <div className="">
      {/* <CommonHeader
        heading="Customers"
        href="/dashboard/farmers/new"
        linkTitle="Add Customer"
      /> */}

      <div className="">
        <DataTable data={farmers?.data as any} columns={columns} />
      </div>
    </div>
  );
}
