import CouponForm from '@/components/forms/coupon-form';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

export default async function page() {
  const session = await getServerSession(authOptions);
  const vendorId = session?.user.id;
  return (
    <div className="p-8">
      <CouponForm vendorId={vendorId} />
    </div>
  );
}
