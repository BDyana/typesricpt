import { getCouponById } from '@/actions/coupons';
import CouponForm from '@/components/forms/coupon-form';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const coupon = await getCouponById(id);

  const session = await getServerSession(authOptions);
  const vendorId = session?.user.id;
  return (
    <div className="p-8">
      <CouponForm initialData={coupon} vendorId={vendorId} editingId={id} />
    </div>
  );
}
