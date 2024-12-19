'use server';

import { db } from '@/lib/db';
import { OrderStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// Order Number Generation Function
function generateOrderNumber(length: number): string {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length)),
  ).join('');
}

interface CheckoutFormData {
  city: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  paymentMethod: string;
  phone: string;
  shippingCost: string;
  streetAddress: string;
  userId: string;
}

interface OrderItem {
  id: string;
  qty: any;
  salePrice: any;
  imageUrl: string;
  title: string;
  vendorId: string;
}

export async function createOrder(
  checkoutFormData: CheckoutFormData,
  orderItems: OrderItem[],
) {
  try {
    const {
      city,
      country,
      email,
      firstName,
      lastName,
      paymentMethod,
      phone,
      shippingCost,
      streetAddress,
      userId,
    } = checkoutFormData;

    // Use the Prisma transaction
    const result = await db.$transaction(async (prisma) => {
      // Create order and order items within the transaction
      const newOrder = await prisma.order.create({
        data: {
          userId,
          firstName,
          lastName,
          email,
          phone,
          streetAddress,
          city,
          country,
          shippingCost: parseFloat(shippingCost),
          paymentMethod,
          orderNumber: generateOrderNumber(8),
        },
      });

      const newOrderItems = await prisma.orderItem.createMany({
        data: orderItems.map((item) => ({
          productId: item.id,
          vendorId: item.vendorId,
          quantity: parseInt(item.qty),
          price: parseFloat(item.salePrice),
          orderId: newOrder.id,
          imageUrl: item.imageUrl,
          title: item.title,
        })),
      });

      // Calculate total amount for each product and create a sale for each
      const sales = await Promise.all(
        orderItems.map(async (item) => {
          const totalAmount = parseFloat(item.salePrice) * parseInt(item.qty);
          const newSale = await prisma.sale.create({
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
          return newSale;
        }),
      );

      return { newOrder, newOrderItems, sales };
    });

    // Revalidate the path to refresh server-side rendered content
    revalidatePath('/dashboard/orders');

    return {
      success: true,
      data: result.newOrder,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to create Order',
      error,
    };
  }
}

export async function getOrders() {
  try {
    const req = await db.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        orderItems: true,
      },
    });

    if (!req) {
      return {
        data: null,
        status: 404,
        message: 'Failed to fetched back orders',
      };
    }

    const orders = req;

    return {
      status: 200,
      data: orders,
      message: 'Successfully fetched back orders',
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getOrderById(id: string) {
  try {
    const order = await db.order.findUnique({
      where: {
        id,
      },
      include: {
        orderItems: true,
      },
    });

    return {
      success: true,
      data: order,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to Fetch an Order',
      error,
    };
  }
}

export async function deleteOrder(id: string) {
  try {
    const existingOrder = await db.order.findUnique({
      where: {
        id,
      },
    });

    if (!existingOrder) {
      return {
        success: false,
        message: 'Order Not Found',
        status: 404,
      };
    }

    const deletedOrder = await db.order.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      data: deletedOrder,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to Delete an Order',
      error,
      status: 500,
    };
  }
}

export async function getOrdersByUserId(userId: string) {
  try {
    const orders = await db.order.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        orderItems: true,
      },
    });

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    // find order in the database

    const existingOrder = await getOrderById(orderId);

    if (!existingOrder) {
      return {
        status: 404,
        message: 'There is no order found in the database.',
        data: null,
      };
    }

    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: { orderStatus: status },
    });

    revalidatePath(`dashboard/orders/update/${orderId}`);

    return {
      status: 201,
      message: 'Update Order Succefully',
      data: updatedOrder,
    };
  } catch (error) {
    console.error('Failed to update order status:', error);
    throw new Error('Failed to update order status');
  }
}
