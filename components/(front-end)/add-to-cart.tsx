'use client';

import React from 'react';
import { toast } from 'sonner';
import * as fbq from '../../lib/fpixel';
import { Product } from '@prisma/client';
import { useDispatch } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { addToCart } from '@/redux/slices/cart';
import { cn } from '@/lib/utils';

interface IProps {
  product: Product | null;
  className?: string;
}

export default function AddToCartButton({ product, className }: IProps) {
  const handleClick = () => {
    fbq.event('Purchase', { currency: 'USD', value: 10 });
  };
  const dispatch = useDispatch();

  // const { addItemToCart } = useCart();
  function handleAddToCart() {
    // Transforming product to match CartItem interface
    const cartItem = {
      id: product?.id,
      slug: product?.slug,
      title: product?.title,
      salePrice: product?.salePrice,
      qty: product?.qty,
      imageUrl: product?.imageUrl,
      vendorId: product?.userId, // Assuming userId is the equivalent of vendorId
    };

    // addItemToCart(cartItem);
    dispatch(addToCart(cartItem as any));
    toast.success('Product added Successfully');
  }
  return (
    <button
      type="button"
      onClick={() => {
        handleAddToCart();
        handleClick();
      }}
      className={cn(
        'flex items-center space-x-2 md:px-8 bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded-sm text-white',
        className,
      )}
    >
      <ShoppingCart size={18} />
      <span>Add to Cart</span>
    </button>
  );
}
