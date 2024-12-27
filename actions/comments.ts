'use server';

import { authOptions } from '@/lib/authOptions';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function postComment(productId: string, content: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return {
        error: 'Unauthorized',
        status: 401,
      };
    }

    const comment = await db.comment.create({
      data: {
        content,
        productId,
        userId: session.user.id,
      },
      include: {
        user: true,
      },
    });

    return {
      status: 201,
      data: comment,
      message: 'Comment created successfully',
    };
  } catch (error) {
    console.log('Error:', error);
    return {
      message: 'un expected error',
      status: 500,
      error: error,
    };
  }
}
