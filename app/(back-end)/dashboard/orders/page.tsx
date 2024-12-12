import { getOrders } from '@/actions/orders';
import DataTable from '@/components/data-table/data-table';
import { columns } from './columns';
export default async function page() {
  const orders = await getOrders();

  return (
    <div className="">
      {/* <CommonHeader
        heading="Orders"
        href="/dashboard/orders/new"
        linkTitle="Add Category"
      /> */}

      <div className="">
        <DataTable data={orders?.data as any} columns={columns} />
      </div>
    </div>
  );
}
