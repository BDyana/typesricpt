import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// Define types for product data and request bodies
interface ProductRequestBody {
  barcode: string;
  categoryId: string;
  description: string;
  content: string;
  farmerId: string;
  imageUrl: string;
  isActive: boolean;
  isWholesale: boolean;
  productCode: string;
  productPrice: string;
  salePrice: string;
  sku: string;
  slug: string;
  tags: string[];
  title: string;
  unit: string;
  wholesalePrice: string;
  wholesaleQty: string;
  productStock: string;
  qty: string;
}

interface Product {
  id: string;
  barcode: string;
  categoryId: string;
  description: string;
  content: string;
  userId: string;
  imageUrl: string;
  isActive: boolean;
  isWholesale: boolean;
  productCode: string;
  productPrice: number;
  salePrice: number;
  sku: string;
  slug: string;
  tags: string[];
  title: string;
  unit: string;
  wholesalePrice: number;
  wholesaleQty: number;
  productStock: number;
  qty: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
): Promise<NextResponse> {
  const { slug } = await params;
  try {
    const product = await db.product.findUnique({
      where: {
        slug: params.slug,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: 'Product Not Found' },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to Fetch Product',
        error,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const existingProduct = await db.product.findUnique({
      where: { id: params.id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { data: null, message: 'Product Not Found' },
        { status: 404 },
      );
    }

    const deletedProduct = await db.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to Delete Product', error },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    const {
      barcode,
      categoryId,
      description,
      content,
      farmerId,
      imageUrl,
      isActive,
      isWholesale,
      productCode,
      productPrice,
      salePrice,
      sku,
      slug,
      tags,
      title,
      unit,
      wholesalePrice,
      wholesaleQty,
      productStock,
      qty,
    }: ProductRequestBody = await request.json();

    const existingProduct = await db.product.findUnique({
      where: { id: params.id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { data: null, message: 'Product Not Found' },
        { status: 404 },
      );
    }

    const updatedProduct = await db.product.update({
      where: { id: params.id },
      data: {
        barcode,
        categoryId,
        description,
        content,
        userId: farmerId,
        imageUrl,
        isActive,
        isWholesale,
        productCode,
        productPrice: parseFloat(productPrice),
        salePrice: parseFloat(salePrice),
        sku,
        slug,
        tags,
        title,
        unit,
        wholesalePrice: parseFloat(wholesalePrice),
        wholesaleQty: parseInt(wholesaleQty),
        productStock: parseInt(productStock),
        qty: parseInt(qty),
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to Update Product', error },
      { status: 500 },
    );
  }
}
