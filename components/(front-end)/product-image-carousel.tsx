'use client';

import { Description } from '@radix-ui/react-dialog';
import Image from 'next/image';
import React, { useState } from 'react';

interface ProductImageCarouselProps {
  productImages?: string[];
  thumbnail?: string | null;
  description?: string | null;
  title: string;
}

export default function ProductImageCarousel({
  productImages = [
    'https://swiperjs.com/demos/images/nature-1.jpg',
    'https://swiperjs.com/demos/images/nature-2.jpg',
    'https://swiperjs.com/demos/images/nature-3.jpg',
    'https://swiperjs.com/demos/images/nature-4.jpg',
    'https://swiperjs.com/demos/images/nature-5.jpg',
    'https://swiperjs.com/demos/images/nature-6.jpg',
  ],
  thumbnail,
  title,
  description,
}: ProductImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1,
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (productImages.length <= 0 && thumbnail) {
    return (
      <div className="col-span-4">
        <Image
          src={thumbnail}
          alt="Product Thumbnail"
          width={580}
          height={580}
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div className="col-span-4 relative">
      {/* Main Image */}
      <div className="relative w-full">
        <Image
          src={productImages[currentImageIndex]}
          alt={`BDyana ${title} | ${description && description}`}
          width={580}
          height={580}
          className="w-full object-cover"
        />

        {/* Navigation Buttons */}
        {productImages.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full"
            >
              &#10094;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full"
            >
              &#10095;
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center space-x-2 mt-3">
        {productImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`BDyana ${title} | ${description && description}`}
            width={60}
            height={60}
            onClick={() => handleThumbnailClick(index)}
            className={`w-16 h-16 object-cover cursor-pointer 
              ${
                index === currentImageIndex
                  ? 'border-2 border-brandColor shadow-sm'
                  : 'opacity-60 hover:opacity-100'
              }`}
          />
        ))}
      </div>
    </div>
  );
}
