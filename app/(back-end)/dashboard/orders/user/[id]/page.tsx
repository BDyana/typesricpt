import { getOrderById } from '@/actions/orders';
import OrderDetail from '@/components/(back-end)/user-orders/order-detail';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const order = await getOrderById(id);

  const session = await getServerSession(authOptions);
  const user = session?.user;

  // console.log('User;', user);
  // console.log('Order;', order);
  // console.log('Order Id;', id);
  return <OrderDetail order={order?.data as any} user={user} />;
}
