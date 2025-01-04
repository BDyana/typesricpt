import { Mail } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { convertIsoDateToNormal } from '@/lib/convertDateToNormal';
import { generateInitials } from '@/lib/generateInitials';
import { siteConfig } from '@/constants/site';

export default function OrderDetail({ order, user }: any) {
  const formattedDate = convertIsoDateToNormal(order.createdAt);
  // Fix typo in orderItems
  const orderItems = order?.orderItems;

  const initials = generateInitials(
    user?.name ? (user?.name as string) : 'Bdyana User',
  );

  // Correct total calculation
  const subtotal =
    orderItems
      ?.reduce((acc: number, currentItem: any) => {
        return acc + currentItem.price * currentItem.quantity;
      }, 0)
      .toFixed(2) ?? '0.00';
  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.orderNumber}</h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Customer's Cart</h2>
              <div className="space-y-6">
                {order.orderItems.map((item: any) => (
                  <div key={item.id} className="flex space-x-4">
                    <div className="relative w-24 h-32">
                      <Image
                        src={item.imageUrl as string}
                        alt={(item.title as string) || siteConfig.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{item.title}</h3>
                        <div className="text-right">
                          <p className="font-semibold">
                            ${item.price.toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground line-through">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2">
                        <span className="text-sm font-medium">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Discount ({order.discount})</span>
                    <span>-$0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${order.shippingCost}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${subtotal}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Customer</h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-12 h-12">
                  {user?.image ? (
                    <Image
                      src={user.image as string}
                      alt={user?.name}
                      fill
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 p-4 text-sm flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-600">
                      {initials}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {/* {order} */}
                    Previous Orders
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <address className="not-italic">
                {order.shippingAddress}
                <br />
                {order.city}, {order.country} {order.appartment}
              </address>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
              <address className="not-italic">
                {order.shippingAddress}
                <br />
                {order.city}, {order.country} {order.appartment}
              </address>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping</h2>
              <div className="space-y-2">
                <p className="font-medium">{order.paymentMethod}</p>
                <p className="text-sm text-muted-foreground">
                  Delivery between 1-2 Bussiness Weeks Hours
                </p>
                <Button className="w-full" variant="secondary">
                  View Carrier Details
                </Button>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" variant="outline">
            Edit Details
          </Button>
        </div>
      </div>
    </div>
  );
}
