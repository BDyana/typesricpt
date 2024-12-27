'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Loader, Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  createReview,
  getAllReviewsByProductId,
  updateReview,
} from '@/actions/reviews';

interface Review {
  id: string;
  user: {
    name: string;
    image: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  helpfulCount: number;
}

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [thumbsLoading, setThumbsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    const response = await getAllReviewsByProductId(productId);
    if (response.status === 201) {
      const data = response.data;
      setReviews(data as any);
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const ratingCounts = reviews.reduce(
    (acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setThumbsLoading(true);
      if (!session) {
        alert('You must be logged in to submit a review');
        return;
      }
      const response = await createReview(productId, newReview);

      if (response.status === 201) {
        const newReviewData = response?.data;
        setReviews([newReviewData as any, ...reviews]);
        setNewReview({ rating: 0, comment: '' });
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setThumbsLoading(false);
    }
  };

  const handleHelpful = async (reviewId: string) => {
    try {
      setLoading(true);
      const response = await updateReview(reviewId);

      if (response.status === 201) {
        const updatedReview = response?.data;
        setReviews(
          reviews.map((review) =>
            review.id === updatedReview?.id
              ? { ...review, helpfulCount: updatedReview?.helpfulCount }
              : review,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <span className="text-4xl font-bold mr-2">
              {averageRating.toFixed(1)}
            </span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {reviews.length} total ratings
          </p>
        </div>

        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center mb-2">
              <span className="text-sm w-2">{rating}</span>
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mx-1" />
              <Progress
                value={((ratingCounts[rating] || 0) / reviews.length) * 100}
                className="h-2 w-full max-w-[200px]"
              />
              <span className="text-sm ml-2">{ratingCounts[rating] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Reviews</h3>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 py-4 last:border-b-0"
          >
            <div className="flex items-center mb-2">
              <Avatar className="w-10 h-10 mr-3">
                <AvatarImage
                  src={review?.user?.image}
                  alt={review?.user?.name}
                />
                <AvatarFallback>{review?.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{review?.user?.name}</p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review.comment}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(review.createdAt).toLocaleDateString()}</span>
              <Button
                variant="ghost"
                size="sm"
                disabled={thumbsLoading}
                onClick={() => handleHelpful(review.id)}
                className="flex items-center"
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                Helpful ({review.helpfulCount})
              </Button>
            </div>
          </div>
        ))}
      </div>

      {session && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= newReview.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <Textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              placeholder="Write your review here..."
              className="mb-4"
            />
            <Button
              disabled={loading}
              className="w-full bg-brandColor"
              type="submit"
            >
              {loading ? (
                <span className="flex gap-2 items-center">
                  <Loader className="size-4 animate-spin" />
                  Submitting...
                </span>
              ) : (
                <span>Submit Review</span>
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
