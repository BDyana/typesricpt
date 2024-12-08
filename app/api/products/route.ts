import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

type ProductData = {
  barcode: string;
  categoryId: string;
  description: string;
  content: string;
  farmerId: string;
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
  productImages: string[];
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const {
      barcode,
      categoryId,
      description,
      content,
      farmerId,
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
      productImages,
    }: ProductData = await request.json();

    // Check if this product already exists in the database
    const existingProduct = await db.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: `Product (${title}) already exists in the Database`,
        },
        { status: 409 },
      );
    }

    const newProduct = await db.product.create({
      data: {
        barcode,
        categoryId,
        description,
        content,
        userId: farmerId,
        productImages,
        imageUrl: productImages[0],
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
        wholesaleQty: parseInt(wholesaleQty, 10),
        productStock: parseInt(productStock, 10),
        qty: parseInt(qty, 10),
      },
    });

    console.log(newProduct);
    return NextResponse.json(newProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to create Product',
        error,
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const categoryId = request.nextUrl.searchParams.get('catId');
  const sortBy = request.nextUrl.searchParams.get('sort');
  const min = request.nextUrl.searchParams.get('min');
  const max = request.nextUrl.searchParams.get('max');
  const page = parseInt(request.nextUrl.searchParams.get('page') || '1', 10);
  const pageSize = 40;

  let where: Record<string, any> = {};

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (min && max) {
    where.salePrice = {
      gte: parseFloat(min),
      lte: parseFloat(max),
    };
  } else if (min) {
    where.salePrice = {
      gte: parseFloat(min),
    };
  } else if (max) {
    where.salePrice = {
      lte: parseFloat(max),
    };
  }

  try {
    const products = await db.product.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: sortBy
        ? {
            salePrice: sortBy === 'asc' ? 'asc' : 'desc',
          }
        : {
            createdAt: 'desc',
          },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to Fetch Products',
        error,
      },
      { status: 500 },
    );
  }
}
