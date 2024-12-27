'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Comment, User } from '@prisma/client';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { postComment } from '@/actions/comments';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Image from 'next/image';
import { generateInitials } from '@/lib/generateInitials';

interface ProductCommentsProps {
  productId: string;
  initialComments: (Comment & { user: User })[];
}

export default function ProductComments({
  productId,
  initialComments,
}: ProductCommentsProps) {
  const [comments, setComments] = useState<any | undefined | []>(
    initialComments,
  );

  // console.log('Initial Comments:', initialComments);
  const [newComment, setNewComment] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert('You must be logged in to comment');
      router.push('/login');
      return;
    }

    const content = newComment;
    const response = await postComment(productId, content);
    if (response.status === 201) {
      const comment = response?.data;
      setComments([...comments, comment]);
      setNewComment('');
    } else {
      toast.error(`${response.status}`);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      {comments.map((comment: any) => {
        const initials = generateInitials(
          comment.name ? (comment?.name as string) : 'Uncle Moses',
        );

        console.log('User Name:', comment?.user);

        return (
          <div key={comment.id} className="flex items-start space-x-4">
            <div>
              {comment.user?.profile?.profileImage ? (
                <Image
                  src={
                    comment.user?.profile.profileImage
                      ? comment.user?.profile.profileImage
                      : '/profile.jpg'
                  }
                  alt="User profile"
                  width={200}
                  height={200}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 p-4 text-sm flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-600">
                  {initials}
                </div>
              )}
            </div>

            <div className="flex-1 gap-2">
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="font-semibold">{comment?.user?.name}</p>
                <p className="mt-1">{comment?.content}</p>
              </div>
              <p className="text-sm text-gray-500 my-2">
                {new Date(comment?.createdAt).toLocaleDateString()} at{' '}
                {new Date(comment?.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        );
      })}
      {session && (
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Add a comment..."
            rows={3}
          />
          <Button
            type="submit"
            className="mt-2 px-4 py-2 bg-brandColor w-full text-white rounded-md"
          >
            Post Comment
          </Button>
        </form>
      )}
    </div>
  );
}
