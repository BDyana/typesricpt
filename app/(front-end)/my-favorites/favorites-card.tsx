'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  seller: string;
  isFavorited?: boolean;
  onFavoriteClick?: (id: string) => void;
  onBuyClick?: (id: string) => void;
}

export default function FavoriteCard({
  id,
  name,
  price,
  image,
  rating,
  seller,
  isFavorited = true,
  onFavoriteClick,
  onBuyClick,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium">
            {name}
          </h3>
          <p className="mt-2 text-lg font-bold text-primary">
            ৳ {price.toLocaleString()}
          </p>
          <div className="mt-1 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${i < rating ? 'fill-primary text-brandColor' : 'fill-muted stroke-muted-foreground'}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Kota {seller}</p>
          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => onFavoriteClick?.(id)}
            >
              <Heart
                className={`h-5 w-5 ${isFavorited ? 'text-red-500 fill-red-500 text-primary' : ''}`}
              />
            </Button>
            <Button
              className="flex-1 bg-brandColor"
              onClick={() => onBuyClick?.(id)}
            >
              Buy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
