'use server';

import { db } from '@/lib/db';
import { Product } from '@prisma/client';

export async function createProduct(formData: Product) {
  // console.log('FormData;', formData);

  try {
    // Check if the product already exists
    const existingProduct = await db.product.findUnique({
      where: { slug: formData.slug },
    });

    if (existingProduct) {
      return {
        success: false,
        status: 409, // Conflict - resource already exists
        message: `Product (${formData.title}) already exists in the Database`,
      };
    }

    // Validate and transform formData
    const processedData = {
      ...formData,
      productPrice: parseFloat(formData.productPrice as unknown as string) || 0,
      salePrice: parseFloat(formData.salePrice as unknown as string) || 0,
      wholesalePrice: formData.wholesalePrice
        ? parseFloat(formData.wholesalePrice as unknown as string)
        : null,
      productStock:
        parseInt(formData.productStock as unknown as string, 10) || 0,
      qty: parseInt(formData.qty as unknown as string, 10) || 0,
      productLeft: formData.productLeft
        ? parseInt(formData.productLeft as unknown as string, 10)
        : null,
    };

    // Validate required fields
    if (
      !processedData.title ||
      !processedData.slug ||
      !processedData.categoryId
    ) {
      return {
        success: false,
        status: 400, // Bad Request
        message:
          'Invalid product data; make sure all required fields are filled!',
      };
    }

    // Create the new product
    const newProduct = await db.product.create({
      data: processedData,
    });

    return {
      success: true,
      status: 201, // Created
      data: newProduct,
      message: 'Product created successfully',
    };
  } catch (error) {
    console.error('Product creation error:', error);

    return {
      success: false,
      status: 500, // Internal Server Error
      message: 'Failed to create Product',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export const getLatestProducts = async (pageSize?: number) => {
  try {
    const products = await db.product.findMany({
      include: {
        category: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...(pageSize && { take: pageSize }), // Only add `take` if pageSize is provided
    });
    return products;
  } catch (error) {
    console.error('Error while fetching latest products', error);
    throw new Error('Error while fetching latest products');
  }
};

export async function getProductBySlug(slug: string) {
  try {
    const product = await db.product.findUnique({
      where: {
        slug,
      },
    });
    return product;
  } catch (error) {
    console.error('Error while fetching product by slug', error);
    throw new Error('Error while fetching product by slug');
  }
}
