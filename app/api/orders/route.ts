import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface OrderItem {
  id: string;
  vendorId: string;
  qty: any;
  salePrice: any;
  imageUrl: string;
  title: string;
  tel: string;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    // console.log('Raw Body:', rawBody);

    const { checkoutFormData, orderItems } = JSON.parse(rawBody);

    if (!checkoutFormData || !orderItems || orderItems.length === 0) {
      throw new Error('Invalid request body');
    }

    function generateOrderNumber(length: number) {
      const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return Array.from(
        { length },
        () => characters[Math.floor(Math.random() * characters.length)],
      ).join('');
    }

    const result = await db.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
        data: {
          userId: checkoutFormData.userId,
          firstName: checkoutFormData.firstName,
          lastName: checkoutFormData.lastName,
          email: checkoutFormData.email,
          phone: checkoutFormData.tel,
          streetAddress: checkoutFormData.streetAddress,
          city: checkoutFormData.city,
          country: checkoutFormData.country,
          shippingCost: parseFloat(checkoutFormData.shippingCost),
          paymentMethod: checkoutFormData.paymentMethod,
          orderNumber: generateOrderNumber(8),
        },
      });

      const newOrderItems = await prisma.orderItem.createMany({
        data: orderItems.map((item: OrderItem) => ({
          productId: item.id,
          vendorId: item.vendorId,
          quantity: parseInt(item.qty),
          price: parseFloat(item.salePrice),
          orderId: newOrder.id,
          imageUrl: item.imageUrl,
          title: item.title,
          phone: item.tel,
        })),
      });

      const sales = await Promise.all(
        orderItems.map(async (item: OrderItem) => {
          const totalAmount = parseFloat(item.salePrice) * parseInt(item.qty);
          return prisma.sale.create({
            data: {
              orderId: newOrder.id,
              productTitle: item.title,
              productImage: item.imageUrl,
              productPrice: parseFloat(item.salePrice),
              productQty: parseInt(item.qty),
              productId: item.id,
              vendorId: item.vendorId,
              total: totalAmount,
            },
          });
        }),
      );

      return { newOrder, newOrderItems, sales };
    });

    return NextResponse.json(result.newOrder, { status: 201 });
  } catch (error) {
    console.error('Order creation error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack available',
    });
    return NextResponse.json(
      {
        message: 'Failed to create Order',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
