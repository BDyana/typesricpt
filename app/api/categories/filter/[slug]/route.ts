import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { slug } = await params;
  try {
    const category = await db.category.findUnique({
      where: {
        slug,
      },
      include: {
        products: true,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Failed to Fetch Category',
        error,
      },
      { status: 500 },
    );
  }
}
