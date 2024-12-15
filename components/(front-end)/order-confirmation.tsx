'use client';

import { Order, OrderItem } from '@prisma/client';
import {
  BadgeDollarSign,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Eye,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { useRouter } from 'next/navigation';

interface IProps {
  id: string;
  order: (Order & { orderItems: OrderItem[] }) | null | undefined;
}
export default function OrderConfirmation({ order, id }: IProps) {
  const orderItems = order?.orderItems;
  const router = useRouter();

  const subtotal =
    orderItems
      ?.reduce((acc, currentItem) => {
        return acc + currentItem.price * currentItem.quantity;
      }, 0)
      .toFixed(2) ?? 0;

  return (
    <>
      <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-4 mx-auto max-w-3xl">
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground text-center py-8">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
              <CardTitle className="text-3xl font-bold">
                Order Confirmed!
              </CardTitle>
              <p className="text-lg mt-2">
                Your order #{order?.orderNumber} is completed and ready to ship
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-end mb-6">
                <Button
                  onClick={() => router.push(`/dashboard/orders/user/${id}`)}
                  asChild
                  className="bg-transparent cursor-pointer  hover:text-brandColor"
                >
                  <span>
                    <Eye className="size-4 text-brandBlack hover:text-brandColor" />
                    {/* View Invoice */}
                  </span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-lg font-semibold mb-3">
                    Shipping Address
                  </h2>
                  <p className="text-muted-foreground">
                    {order?.firstName} {order?.lastName}
                    <br />
                    {order?.apartment && `${order.apartment}, `}
                    {order?.streetAddress}
                    <br />
                    {order?.city}, {order?.state} {order?.zip}
                    <br />
                    {order?.country}
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-3">Payment Info</h2>
                  <div className="flex items-center">
                    {order?.paymentMethod === 'Credit Card' && (
                      <CreditCard className="w-5 h-5 mr-2" />
                    )}

                    {order?.paymentMethod === 'Cash On Delivery' && (
                      <BadgeDollarSign className="w-5 h-5 mr-2" />
                    )}
                    <p className="text-muted-foreground">
                      {order?.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              <ul className="space-y-4">
                {orderItems?.map((item: any, i: any) => (
                  <li key={i} className="flex items-center space-x-4">
                    <Image
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                      src={item.imageUrl}
                      alt={item.title}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold w-[65%]">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        ৳{item.price} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>

              <Separator className="my-6" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>৳{subtotal}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p>Shipping</p>
                    <p className="text-sm text-muted-foreground">
                      Delivered in{' '}
                      {order?.shippingCost == 50
                        ? '3'
                        : order?.shippingCost == 75
                          ? '2'
                          : '1'}{' '}
                      days
                    </p>
                  </div>
                  <p>৳{parseFloat(order?.shippingCost as any).toFixed(2)}</p>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <p>Total</p>
                  <p>
                    ৳
                    {(
                      Number(subtotal) + parseFloat(order?.shippingCost as any)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Badge variant="outline" className="text-primary">
                  <Truck className="w-4 h-4 mr-2" />
                  Your order is being prepared for shipping
                </Badge>
              </div>

              <Button className="w-full bg-black hover:bg-brandColor/90 mt-3">
                Shop something else
                <ChevronRight className="size-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
