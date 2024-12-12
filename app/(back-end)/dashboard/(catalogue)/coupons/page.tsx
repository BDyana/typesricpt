import { getAllCoupons } from '@/actions/coupons';
import CommonHeader from '@/components/(back-end)/common-header';
import DataTable from '@/components/data-table/data-table';
import { columns } from './columns';
export default async function page() {
  const coupons = await getAllCoupons();
  // console.log('Coupons;', coupons);
  return (
    <div className="">
      <CommonHeader
        heading="Coupons"
        href="/dashboard/coupons/new"
        linkTitle="Add Coupon"
      />

      <div className="">
        <DataTable data={coupons?.data as any} columns={columns} />
      </div>
    </div>
  );
}
