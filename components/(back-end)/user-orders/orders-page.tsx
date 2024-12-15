import { Order } from '@prisma/client';
import OrderCard from './order-card';

export default function UserOrders({ orders }: any) {
  // console.log('Orders;', orders);
  return (
    <div className="container max-w-5xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Orders</h1>
        <p className="text-muted-foreground">
          Check the status of recent orders, manage returns, and discover
          similar products.
        </p>
      </div>

      {orders?.map((order: Order) => (
        <OrderCard key={order.id} data={order as any} />
      ))}
    </div>
  );
}
