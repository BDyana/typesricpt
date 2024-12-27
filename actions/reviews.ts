'use server';

import { authOptions } from '@/lib/authOptions';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function getAllReviewsByProductId(productId: string) {
  if (!productId) {
    return { error: 'Product ID is required', status: 400 };
  }

  const reviews = await db.review.findMany({
    where: { productId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return { data: reviews, status: 201, message: 'Fetched Back Reviews' };
}

export async function createReview(productId: string, data: any) {
  const { rating, comment } = data;

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { error: 'Unauthorized', status: 401 };
  }

  if (!productId || !rating || !comment) {
    return { error: 'Missing required fields', status: 400 };
  }

  const review = await db.review.create({
    data: {
      productId,
      userId: session.user.id,
      rating,
      comment,
    },
    include: { user: { select: { name: true } } },
  });

  return { data: review, message: 'Created Successfully', status: 201 };
}

export async function updateReview(reviewId: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized', status: 401 };
  }

  if (!reviewId) {
    return { error: 'Review ID is required', status: 400 };
  }

  const updatedReview = await db.review.update({
    where: { id: reviewId },
    data: { helpfulCount: { increment: 1 } },
  });

  return {
    data: updatedReview,
    message: 'Updated Review Successfully',
    status: 201,
  };
}
