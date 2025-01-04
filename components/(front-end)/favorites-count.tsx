'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks/hooks';

export default function FavoritesCount() {
  const favorites = useAppSelector((state) => state.favorite);

  const [favoritesCount, setFavorites] = useState(0);

  useEffect(() => {
    setFavorites(favorites?.length || 0);
  }, [favorites]);

  return (
    <Link
      href="/my-favorites"
      className="relative inline-flex items-center mt-2 pb-1 p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg"
    >
      <Heart className="text-red-500 fill-red-500" />
      <span className="sr-only">favorites</span>
      <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs border-2 text-red-500 font-bold border-red-500 shadow-md rounded-full -top-1 right-0">
        {favoritesCount}
      </span>
    </Link>
  );
}
