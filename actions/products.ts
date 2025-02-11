'use server';

import { db } from '@/lib/db';
import { Product } from '@prisma/client';
import { revalidatePath } from 'next/cache';

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
      wholesaleQty: formData.wholesaleQty
        ? parseFloat(formData.wholesaleQty as unknown as string)
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
      !processedData.categoryId ||
      !processedData.imageUrl
    ) {
      return {
        success: false,
        status: 400, // Bad Request
        message:
          'Invalid product data; make sure all required fields are filled! (check image is uploaded correctly)',
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
      where: {
        isActive: true,
      },
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

export async function getFlashSaleProducts() {
  try {
    // Fetch the product with comments
    const products = await db.product.findMany({
      where: {
        isFlashSale: true,
        isActive: true,
      },
      include: {
        comments: true,
      },
    });

    return products;
  } catch (error) {
    console.error('Error while fetching product by slug', error);
    throw new Error('Error while fetching product by slug');
  }
}

export async function getProductBySlug(slug: string) {
  try {
    // Fetch the product with comments
    const product = await db.product.findUnique({
      where: {
        slug,
        isActive: true,
      },
      include: {
        comments: true,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    // Refactor comments to include user data
    const commentsWithUser = await Promise.all(
      product.comments.map(async (comment) => {
        const user = await db.user.findUnique({
          where: { id: comment.userId },
          select: { name: true },
        });

        return {
          ...comment,
          user: user ? { name: user.name } : null,
        };
      }),
    );

    return {
      ...product,
      comments: commentsWithUser,
    };
  } catch (error) {
    console.error('Error while fetching product by slug', error);
    throw new Error('Error while fetching product by slug');
  }
}

export async function getProductById(id: string) {
  try {
    const product = await db.product.findUnique({
      where: {
        id,
        isActive: true,
      },
    });

    return product;
  } catch (error) {
    console.error('Error while fetching product by id', error);
    throw new Error('Error while fetching product by id');
  }
}

export async function updateProduct(id: string, formData: Partial<Product>) {
  console.log('Update FormData:', formData);

  try {
    // Check if the product exists
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return {
        success: false,
        status: 404, // Not Found
        message: `Product with id (${id}) not found`,
      };
    }

    delete formData.id;

    // Validate and transform formData
    const updatedData = {
      ...formData,
      productPrice:
        formData.productPrice !== undefined
          ? parseFloat(formData.productPrice as unknown as string)
          : undefined,
      salePrice:
        formData.salePrice !== undefined
          ? parseFloat(formData.salePrice as unknown as string)
          : undefined,
      wholesalePrice:
        formData.wholesalePrice !== undefined
          ? parseFloat(formData.wholesalePrice as unknown as string)
          : undefined,
      wholesaleQty:
        formData.wholesalePrice !== undefined
          ? parseFloat(formData.wholesaleQty as unknown as string)
          : undefined,
      productStock:
        formData.productStock !== undefined
          ? parseInt(formData.productStock as unknown as string, 10)
          : undefined,
      qty:
        formData.qty !== undefined
          ? parseInt(formData.qty as unknown as string, 10)
          : undefined,
      productLeft:
        formData.productLeft !== undefined
          ? parseInt(formData.productLeft as unknown as string, 10)
          : undefined,
    };

    // Ensure updatedData is not empty
    if (Object.keys(updatedData).length === 0) {
      return {
        success: false,
        status: 400, // Bad Request
        message: 'No valid fields provided for update',
      };
    }

    // Perform the update
    const updatedProduct = await db.product.update({
      where: { id },
      data: updatedData,
    });

    return {
      success: true,
      status: 200, // OK
      data: updatedProduct,
      message: 'Product updated successfully',
    };
  } catch (error) {
    console.error('Product update error:', error);

    return {
      success: false,
      status: 500, // Internal Server Error
      message: 'Failed to update Product',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function deleteProduct(id: string) {
  try {
    // First check if product exists and get its relations
    const existingProduct = await db.product.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            orderItems: true,
            sales: true,
          },
        },
      },
    });

    if (!existingProduct) {
      return {
        success: false,
        status: 404,
        message: `Product with id (${id}) not found`,
      };
    }

    // Perform the delete operation - this will cascade to related records
    const deletedProduct = await db.product.delete({
      where: { id },
      include: {
        _count: {
          select: {
            orderItems: true,
            sales: true,
          },
        },
      },
    });

    revalidatePath('/dashboard/products');

    return {
      success: true,
      status: 200,
      message: `Successfully deleted product and its related records`,
      data: {
        deletedProduct,
        deletedRelations: {
          orderItems: existingProduct._count.orderItems,
          sales: existingProduct._count.sales,
        },
      },
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      status: 500,
      message: `Failed to delete product: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

export async function findProblematicProducts() {
  try {
    // First get all products
    const allProducts = await db.product.findMany({
      select: {
        id: true,
        title: true,
        userId: true,
      },
    });

    // Then verify each product's user exists
    const problematicProducts = [];

    for (const product of allProducts) {
      try {
        const userExists = await db.user.findUnique({
          where: {
            id: product.userId,
          },
        });

        if (!userExists) {
          problematicProducts.push(product);
        }
      } catch (error) {
        // If there's an error checking the user, assume the product is problematic
        problematicProducts.push(product);
      }
    }

    if (problematicProducts.length === 0) {
      return {
        success: true,
        message: 'No problematic products found',
        count: 0,
        products: [],
      };
    }

    // Update the problematic products with the new userId
    const fixedProducts = [];
    for (const product of problematicProducts) {
      try {
        const updated = await db.product.update({
          where: {
            id: product.id,
          },
          data: {
            // kiskayemoses"gmail.com
            userId: '67522330490c70bbe22c63df',
          },
        });
        fixedProducts.push(updated);
      } catch (error) {
        console.error(`Failed to update product ${product.id}:`, error);
      }
    }

    return {
      success: true,
      message: `Found ${problematicProducts.length} problematic products and fixed {fixedProducts.length}`,
      count: problematicProducts.length,
      fixedCount: fixedProducts.length,
      problematicProducts,
      fixedProducts,
    };
  } catch (error) {
    console.error('Error finding problematic products:', error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
      count: 0,
      products: [],
    };
  }
}
// Optional: Function to verify if user exists
export async function verifyDefaultUser() {
  try {
    const defaultUser = await db.user.findUnique({
      where: {
        id: '67522330490c70bbe22c63df',
      },
    });

    return {
      exists: !!defaultUser,
      message: defaultUser ? 'Default user exists' : 'Default user not found',
    };
  } catch (error) {
    return {
      exists: false,
      message: 'Error verifying default user',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
