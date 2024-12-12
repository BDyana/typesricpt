import { getBanners } from '@/actions/banners';
import CommonHeader from '@/components/(back-end)/common-header';
import DataTable from '@/components/data-table/data-table';
import { columns } from './columns';
export default async function page() {
  const banners = await getBanners();
  // console.log('Coupons;', banners);
  return (
    <div className="">
      <CommonHeader
        heading="Sotre banners"
        href="/dashboard/store-banners/new"
        linkTitle="Add Banner"
      />

      <div className="">
        <DataTable data={banners?.data as any} columns={columns} />
      </div>
    </div>
  );
}
