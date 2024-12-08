import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const { token, id } = await request.json();
    const user: any = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          data: null,
          message: 'No User Found',
        },
        { status: 404 },
      );
    }
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        emailVerified: true,
        verificationRequestCount: parseInt(user.verificationRequestCount) + 1,
      } as any,
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Failed to Update User',
        error,
      },
      { status: 500 },
    );
  }
}
