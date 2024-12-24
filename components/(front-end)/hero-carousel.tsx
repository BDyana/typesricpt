'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Banner } from '@prisma/client';
import { Carousel } from 'nuka-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface IProps {
  banners: Banner[] | null | undefined;
}

export default function HeroCarousel({ banners }: IProps) {
  const config: any = {
    nextButtonClassName: 'rounded-full hidden lg:flex',
    nextButtonText: <ChevronRight />,
    pagingDotsClassName: 'me-2 w-4 h-4',
    prevButtonClassName: 'rounded-full hidden lg:flex',
    prevButtonText: <ChevronLeft />,
  };
  return (
    <Carousel
      autoplay
      showArrows
      keyboard={false}
      title="Bdyana | Your one stop Shop"
      scrollDistance="screen"
      className="overflow-hidden h-[100%] rounded-md w-[100%]"
      wrapMode="wrap"
    >
      {banners?.map((banner: Banner) => (
        <div key={banner.id} className="demo-slide">
          <Link href={banner.link}>
            <Image
              width={1080}
              height={1080}
              src={banner.imageUrl}
              className="w-full h-full object-cover"
              alt={banner.title}
              priority
            />
          </Link>
        </div>
      ))}
    </Carousel>
  );
}
