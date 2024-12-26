'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import * as fbq from '../../lib/fpixel';
import { useDispatch } from 'react-redux';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { addToCart, removeFromCart } from '@/redux/slices/cart';
import { calculateDiscountPercentage } from '@/lib/calculatePercentage';
import { useAppSelector } from '@/redux/hooks/hooks';
import { cn } from '@/lib/utils';

interface IProduct {
  imageUrl: string;
  title: string;
  productStock: any;
  salePrice: any;
  productPrice: any;
  description: string;
  slug: string;
  productLeft: any;
  userId: string;
  id: string;
  qty: any;
}

export default function ProductCard({
  product,
  className,
}: {
  product: IProduct;
  className?: string;
}) {
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cart);

  // Check if product is already in cart
  const isInCart = cartItems.some((item: any) => item.id === product.id);

  const handleClick = () => {
    fbq.event('Purchase', { currency: 'USD', value: 10 });
  };

  function handleAddToCart() {
    if (isInCart) {
      // Remove from cart if already present
      dispatch(removeFromCart(product.id));
      toast.success('Product removed from cart');
      return;
    }

    const cartItem = {
      id: product?.id,
      slug: product?.slug,
      title: product?.title,
      salePrice: product?.salePrice,
      qty: product?.qty,
      imageUrl: product?.imageUrl,
      vendorId: product?.userId,
    };

    dispatch(addToCart(cartItem as any));
    toast.success('Product added successfully');
  }

  return (
    <div
      style={{ height: '290px' }} // Fixed height for the card
      className="mb-1 lg:mb-2 lg:mx-1 mx-0.3 bg-white overflow-hidden border border-gray-100 hover:shadow"
    >
      <Link prefetch={true} href={`/products/${product.slug}`} passHref>
        <div className="overflow-hidden h-[160px]">
          <Image
            src={product.imageUrl}
            alt={product.description}
            width={350}
            height={350}
            className="w-full object-contain h-full transition-transform duration-300 hover:scale-110"
          />
        </div>
      </Link>
      <div className="px-1 lg:px-2">
        <Link prefetch={true} href={`/products/${product.slug}/`} passHref>
          <h4 className="lg:text-sm text-xs dark:text-slate-200 text-slate-900 my-2 line-clamp-2">
            {product.title}
          </h4>
        </Link>
        <div className="items-center gap-2 pb-1 dark:text-slate-200 text-slate-800">
          <div className="justify-between flex">
            <div>
              <p className="leading-none font-medium">
                BDT {product?.salePrice}
              </p>
              {product?.productPrice > product?.salePrice && (
                <del className="text-slate-500 lg:text-sm text-xs mr-1 lg:mr-2">
                  BDT {product?.productPrice}
                </del>
              )}
              {product?.productPrice > product?.salePrice && (
                <h5
                  className={cn(
                    'bg-[#fef3e9] text-[#f68b1e] p-1 inline',
                    className,
                  )}
                >
                  -
                  {calculateDiscountPercentage(
                    product?.productPrice,
                    product?.salePrice,
                  )}
                  %
                </h5>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                handleAddToCart();
                if (!isInCart) handleClick(); // Only trigger FB pixel on add, not remove
              }}
              className={`flex items-center p-2 lg:p-3 rounded-full transition-colors ${
                isInCart
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'hover:bg-brandColor/10 text-black'
              }`}
              title={isInCart ? 'Remove from cart' : 'Add to cart'}
            >
              {isInCart ? <Trash2 size={17} /> : <ShoppingCart size={17} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
