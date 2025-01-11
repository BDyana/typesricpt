'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { convertIsoDateToNormal } from '@/lib/convertDateToNormal';
import { OrderItem } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { OrderStatus } from './order-status';
import { siteConfig } from '@/constants/site';

export default function OrderCard({ data }: any) {
  const order = data;
  const formattedDate = convertIsoDateToNormal(order.createdAt);

  // Fix typo in orderItems
  const orderItems = order?.orderItems;

  const router = useRouter();

  // Correct total calculation
  const subtotal =
    orderItems
      ?.reduce((acc: number, currentItem: any) => {
        return acc + currentItem.price * currentItem.quantity;
      }, 0)
      .toFixed(2) ?? '0.00';

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-col md:flex-row justify-between pb-4">
        <div className="space-y-1.5">
          <h3 className="text-lg font-semibold">Order: #{order.orderNumber}</h3>
          <p className="text-muted-foreground">Ordered on {formattedDate}</p>
        </div>
        <p className="text-lg font-semibold mt-2 md:mt-0">
          Total Amount: ৳{subtotal}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orderItems?.map((item: OrderItem) => (
            <div key={item.id} className="flex items-start space-x-4">
              <div className="relative w-24 h-24">
                <Image
                  src={item.imageUrl as string}
                  alt={(item.title as string) || siteConfig.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold w-[80%] line-clamp-3">
                  {item.title}
                </h4>
                <p className="font-medium">
                  ৳{item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <div className="space-y-2">
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/orders/user/${order.id}`}>
                    View Details
                  </Link>
                </Button>
                <Button
                  onClick={() =>
                    router.push(`/dashboard/orders/user/${order.id}`)
                  }
                  variant="secondary"
                  className="w-full"
                >
                  Track Your Order
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Separator className="my-6" />
        <OrderStatus currentStatus={order.orderStatus} />
        {order.expectedShipment && (
          <p className="mt-4 text-sm text-muted-foreground">
            Preparing to ship on {order.expectedShipment}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
