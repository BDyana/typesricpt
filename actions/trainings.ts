'use server';

import { db } from '@/lib/db';

export async function getTrainings() {
  try {
    const req = await db.training.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!req) {
      return {
        data: null,
        status: 404,
        message: 'Failed to fetched back trainings',
      };
    }

    const trainings = req;

    return {
      status: 200,
      data: trainings,
      message: 'Successfully fetched back trainings',
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
