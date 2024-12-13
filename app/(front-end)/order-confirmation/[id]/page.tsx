import { getOrderById } from '@/actions/orders';
import OrderConfirmation from '@/components/(front-end)/order-confirmation';

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const orderData = await getOrderById(id);
  const order = orderData?.data;

  return <OrderConfirmation id={id} order={order} />;
}
