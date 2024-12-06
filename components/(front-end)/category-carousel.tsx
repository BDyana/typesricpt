'use client';

import { Product } from '@prisma/client';
import ProductCard from './product-card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface IProps {
  products: any;
  isMarketPage?: boolean;
}

export default function CategoryCarousel({
  products,
  isMarketPage = false,
}: IProps) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: isMarketPage ? 5 : 6,
      slidesToSlide: 2, // optional, default to 1.
      partialVisibilityGutter: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: isMarketPage ? 3 : 4,
      slidesToSlide: 2,
      partialVisibilityGutter: 10,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
      partialVisibilityGutter: 30,
    },
  };
  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true}
      partialVisible={true}
      autoPlay={false}
      autoPlaySpeed={2000}
      keyBoardControl={true}
      customTransition="transform 400ms ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={['tablet', 'mobile']}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-0-px"
    >
      {products?.map((product: Product) => {
        return <ProductCard product={product as any} key={product.id} />;
      })}
    </Carousel>
  );
}
