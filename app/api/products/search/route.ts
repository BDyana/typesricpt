import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters
    const searchTerm = request.nextUrl.searchParams.get('search') || '';
    const sortBy = request.nextUrl.searchParams.get('sort') || 'desc';
    const min = request.nextUrl.searchParams.get('min');
    const max = request.nextUrl.searchParams.get('max');
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1', 10);
    const pageSize = 10;

    // Validate `page`
    if (isNaN(page) || page <= 0) {
      return NextResponse.json(
        { message: 'Invalid page number. Page must be a positive integer.' },
        { status: 400 },
      );
    }

    // Construct the `where` condition dynamically
    const where: any = {
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { category: { title: { contains: searchTerm, mode: 'insensitive' } } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ],
    };

    // Add price filtering if applicable
    if (min || max) {
      where.salePrice = {
        ...(min ? { gte: parseFloat(min) } : {}),
        ...(max ? { lte: parseFloat(max) } : {}),
      };
    }

    // Fetch products with pagination and sorting
    const products = await db.product.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { salePrice: sortBy === 'asc' ? 'asc' : 'desc' },
    });

    // Return the response
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);

    return NextResponse.json(
      {
        message: 'Failed to fetch products.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
