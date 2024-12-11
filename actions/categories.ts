'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { CategoryProps } from '@/types/types';

export async function createCategory(data: CategoryProps) {
  const slug = data.slug;
  console.log('Data:', data);
  try {
    const existingCategory = await db.category.findUnique({
      where: {
        slug,
      },
    });
    if (existingCategory) {
      return existingCategory;
    }
    const newCategory = await db.category.create({
      data,
    });
    // console.log(newCategory);
    revalidatePath('/dashboard/categories');
    return newCategory;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getAllCategories() {
  try {
    const req = await db.category.findMany({
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
        message: 'Failed to fetched back categories',
      };
    }

    const categories = req;

    return {
      status: 200,
      data: categories,
      message: 'Successfully fetched back categories',
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function updateCategoryById(id: string, data: CategoryProps) {
  try {
    const updatedCategory = await db.category.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath('/dashboard/categories');
    return updatedCategory;
  } catch (error) {
    console.log(error);
  }
}
export async function getCategoryById(id: string) {
  try {
    const category = await db.category.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
    return category;
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const category = await db.category.findUnique({
      where: {
        slug,
      },
      include: {
        products: true,
      },
    });
    return category;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteCategory(id: string) {
  try {
    const deletedCategory = await db.category.delete({
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
export async function createBulkCategories(categories: CategoryProps[]) {
  try {
    for (const category of categories) {
      await createCategory(category);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoryBrief() {
  try {
    const users = await db.category.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        // email: true,
        // role: true,
        // createdAt: true,
      },
    });
    return {
      message: 'Categories fetched successfully',
      data: users,
    };
  } catch (error) {
    console.error('Fetch farmers error:', error);
    return {
      message: 'Failed to fetch farmers',
      errors: error instanceof Error ? { server: [error.message] } : {},
    };
  }
}
