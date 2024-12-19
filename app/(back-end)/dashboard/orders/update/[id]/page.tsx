import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getOrderById } from '@/actions/orders';
import { Button } from '@/components/ui/button';
import OrderEditForm from '@/components/forms/order-edit-form';

export default async function OrderEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const orderData = await getOrderById(id);

  const order = orderData?.data;

  if (!order) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Order: {order.orderNumber}</h1>
        <Link href="/orders">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Button>
        </Link>
      </div>
      <OrderEditForm order={order as any} />
    </div>
  );
}
