import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters
    const searchTerm = request.nextUrl.searchParams.get('search') || '';
    const sortBy = request.nextUrl.searchParams.get('sort') || 'desc';
    const min = request.nextUrl.searchParams.get('min');
    const max = request.nextUrl.searchParams.get('max');
    const categoryId = request.nextUrl.searchParams.get('categoryId');
    const brandId = request.nextUrl.searchParams.get('brandId');
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1', 10);
    const pageSize = 40;

    // Validate `page`
    if (isNaN(page) || page <= 0) {
      return NextResponse.json(
        { message: 'Invalid page number. Page must be a positive integer.' },
        { status: 400 },
      );
    }

    // Construct the base where condition
    const where: any = {
      AND: [
        // Search conditions
        {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        // Category filter
        ...(categoryId ? [{ categoryId }] : []),
        ...(brandId ? [{ brandId }] : []),
      ],
    };

    // Add price filtering if applicable
    if (min || max) {
      where.AND.push({
        salePrice: {
          ...(min ? { gte: parseFloat(min) } : {}),
          ...(max ? { lte: parseFloat(max) } : {}),
        },
      });
    }

    // Fetch products with pagination, sorting, and category filtering
    const [products, totalCount] = await Promise.all([
      db.product.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { salePrice: sortBy === 'asc' ? 'asc' : 'desc' },
        include: {
          category: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
          brand: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
      }),
      db.product.count({ where }), // Get total count for pagination
    ]);

    // Return the response with pagination metadata
    return NextResponse.json(
      {
        products,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / pageSize),
          totalItems: totalCount,
          hasMore: page * pageSize < totalCount,
        },
      },
      { status: 200 },
    );
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
