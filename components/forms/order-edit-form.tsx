'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Order, OrderItem, OrderStatus, Product } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { updateOrderStatus } from '@/actions/orders';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { siteConfig } from '@/constants/site';

type OrderWithItems = Order & {
  orderItems: (OrderItem & {
    product: Product;
  })[];
};

export default function OrderEditForm({ order }: { order: OrderWithItems }) {
  const [status, setStatus] = useState<OrderStatus>(order.orderStatus);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await updateOrderStatus(order.id, status);
      if (res.status == 201) {
        toast.success(`${res.message}`);
      } else {
        toast.error(`${res.message}`);
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
    router.refresh();
  }

  const orderItems = order?.orderItems;

  const subtotal =
    orderItems
      ?.reduce((acc: number, currentItem: any) => {
        return acc + currentItem.price * currentItem.quantity;
      }, 0)
      .toFixed(2) ?? '0.00';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Update Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Order Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as OrderStatus)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(OrderStatus).map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="bg-brandBlack hover:bg-brandColor w-full"
            >
              {loading ? (
                <span className="flex gap-1">
                  <Loader className="animate-spin size-4" />
                  Updating...
                </span>
              ) : (
                <span>Update Status</span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Customer Information</h3>
              <p>
                Name: {order.firstName} {order.lastName}
              </p>
              <p>Email: {order.email}</p>
              <p>Phone: {order.phone}</p>
              <p>Payment Method: {order.paymentMethod}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Shipping Address</h3>
              <p>{order.streetAddress}</p>
              <p>
                {order.city}, {order.state} {order.zip}
              </p>
              <p>{order.country}</p>

              <div className="mt-6 w-full">
                <Button>৳{subtotal}</Button>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p>Date Created: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={item.imageUrl || '/placeholder.svg'}
                    alt={(item.title as string) || siteConfig.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: ৳{item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
