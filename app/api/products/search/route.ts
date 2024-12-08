import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// Define type for query parameters
interface ProductQueryParams {
  search?: string | null;
  sort?: string | null;
  min?: string | null;
  max?: string | null;
  page?: string | null;
}

// Define the structure for the Product
interface Product {
  id: string;
  title: string;
  description: string;
  salePrice: number;
  // Add other fields as per your product model
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Extract query parameters
  const { search, sort, min, max, page } = request.nextUrl
    .searchParams as unknown as ProductQueryParams;

  // Default values
  const pageSize = 10;
  const currentPage = parseInt(page || '1', 10); // Default page is 1 if not provided
  const where: any = {
    OR: [
      {
        title: { contains: search, mode: 'insensitive' },
      },
      {
        category: {
          title: { contains: search, mode: 'insensitive' },
        },
      },
      {
        description: { contains: search, mode: 'insensitive' },
      },
    ],
  };

  // Filter by price range if 'min' and/or 'max' are provided
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
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      orderBy: {
        salePrice: sort === 'asc' ? 'asc' : 'desc',
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
