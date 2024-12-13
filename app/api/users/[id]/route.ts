import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Extract `id` from the URL using `req.nextUrl`
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 },
      );
    }

    // Fetch user from the database
    const user = await db.user.findUnique({
      where: { id },
      select: {
        email: true,
        name: true,
        id: true,
        role: true,
        createdAt: true,
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { message: 'Failed to fetch user', error },
      { status: 500 },
    );
  }
}
