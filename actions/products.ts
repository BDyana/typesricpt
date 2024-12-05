'use server';

import { db } from '@/lib/db';

export const getLatestProducts = async (pageSize: number) => {
  try {
    const products = await db.product.findMany({
      include: {
        category: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: pageSize,
    });
    return products;
  } catch (error) {
    console.error('Error while fetching lastest products', error);
    throw new Error('Error while fetching lastest products');
  }
};
