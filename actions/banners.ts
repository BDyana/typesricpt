'use server';

import { db } from '@/lib/db';
import { Banner } from '@prisma/client';
import { revalidatePath } from 'next/cache';

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

export async function createBanner(data: Banner) {
  // console.log('Server Data:', data);
  try {
    const newBanner = await db.banner.create({
      data,
    });
    // console.log(newBanner);
    revalidatePath('/dashboard/store-banners');
    return newBanner;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getBannerById(id: string) {
  try {
    const banner = await db.banner.findUnique({
      where: {
        id,
      },
    });
    return banner;
  } catch (error) {
    console.log(error);
  }
}

export async function updateBannerById(id: string, data: Partial<Banner>) {
  try {
    delete data.id;

    const updatedBanner = await db.banner.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath('/dashboard/store-banners');
    return updatedBanner;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteBanner(id: string) {
  try {
    const deletedBanner = await db.banner.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
      data: deletedBanner,
    };
  } catch (error) {
    console.log(error);
  }
}
