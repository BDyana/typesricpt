'use server';

import { db } from '@/lib/db';

export async function getBanners() {
  try {
    const req = await db.banner.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!req) {
      return {
        data: null,
        status: 404,
        message: 'Failed to fetched back banners',
      };
    }

    const trainings = req;

    return {
      status: 200,
      data: trainings,
      message: 'Successfully fetched back banners',
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
