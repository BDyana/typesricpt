'use server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { BrandProps } from '@/types/types';

export async function createBrand(data: BrandProps) {
  const slug = data.slug;
  console.log('Data:', data);
  try {
    const existingBrand = await db.brand.findUnique({
      where: {
        slug,
      },
    });
    if (existingBrand) {
      return existingBrand;
    }
    const newBrand = await db.brand.create({
      data,
    });
    // console.log(newBrand);
    revalidatePath('/dashboard/brands');
    return newBrand;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getAllBrands() {
  try {
    const req = await db.brand.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        products: true,
      },
    });

    if (!req) {
      return {
        data: null,
        status: 404,
        message: 'Failed to fetched back brands',
      };
    }

    const brands = req;

    return {
      status: 200,
      data: brands,
      message: 'Successfully fetched back brands',
    };
  } catch (error) {
    return null;
  }
}
export async function updateBrandById(id: string, data: BrandProps) {
  try {
    const updatedBrand = await db.brand.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath('/dashboard/brands');
    return updatedBrand;
  } catch (error) {
    console.log(error);
  }
}
export async function getBrandById(id: string) {
  try {
    const brand = await db.brand.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
    return brand;
  } catch (error) {
    console.log(error);
  }
}

export async function getBrandBySlug(slug: string) {
  try {
    const brand = await db.brand.findUnique({
      where: {
        slug,
      },
      include: {
        products: true,
      },
    });
    return brand;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteBrand(id: string) {
  try {
    const deletedBrand = await db.brand.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
      data: deletedBrand,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function createBulkBrands(brands: BrandProps[]) {
  try {
    for (const brand of brands) {
      await createBrand(brand);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getBrandBrief() {
  try {
    const brands = await db.brand.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
      },
    });
    return {
      message: 'Brands fetched successfully',
      data: brands,
    };
  } catch (error) {
    console.error('Fetch farmers error:', error);
    return {
      message: 'Failed to fetch farmers',
      errors: error instanceof Error ? { server: [error.message] } : {},
    };
  }
}
