'use server';

import { db } from '@/lib/db';
import { Coupon } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getAllCoupons() {
  try {
    const req = await db.coupon.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      // include: {
      //   products: true,
      // },
    });

    if (!req) {
      return {
        data: null,
        status: 404,
        message: 'Failed to fetched back coupons',
      };
    }

    const coupons = req;

    return {
      status: 200,
      data: coupons,
      message: 'Successfully fetched back coupons',
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getCouponById(id: string) {
  try {
    const coupon = await db.coupon.findUnique({
      where: {
        id,
      },
      // include: {
      //   products: true,
      // },
    });
    return coupon;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteCoupon(id: string) {
  try {
    const deletedCategory = await db.coupon.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
      data: deletedCategory,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function createCoupon(data: Coupon) {
  const couponCode = data.couponCode;
  // console.log('Data:', data);
  try {
    const existingCoupon = await db.coupon.findUnique({
      where: {
        couponCode,
      },
    });
    if (existingCoupon) {
      return {
        success: false,
        status: 409, // Aready Exists
        message: `Coupon code: (${couponCode}) already exists`,
      };
    }
    const newCoupon = await db.coupon.create({
      data,
    });
    // console.log(newCoupon);
    revalidatePath('/dashboard/coupons');
    return {
      success: true,
      status: 201, // Created
      message: `Coupone code (${couponCode}) created Sucessfully`,
      data: newCoupon,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateCoupon(id: string, data: Partial<Coupon>) {
  const couponCode = data.couponCode;
  // console.log('Data:', data);
  try {
    const existingCoupon = await db.coupon.findUnique({
      where: {
        couponCode,
      },
    });
    if (!existingCoupon) {
      return {
        success: false,
        status: 404, // Aready Exists
        message: `Coupon code: (${couponCode}) not Found`,
      };
    }

    delete data.id;

    const updatedCoupon = await db.coupon.update({
      where: { id },
      data,
    });
    // console.log(updatedCoupon);
    revalidatePath('/dashboard/coupons');
    return {
      success: true,
      status: 201, // Updated
      message: `Coupone code (${couponCode}) updated Sucessfully`,
      data: updatedCoupon,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
