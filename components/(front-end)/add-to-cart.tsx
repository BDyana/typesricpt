'use client';

import React from 'react';
import { toast } from 'sonner';
import * as fbq from '../../lib/fpixel';
import { Product } from '@prisma/client';
import { useDispatch } from 'react-redux';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { addToCart, removeFromCart } from '@/redux/slices/cart';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface IProps {
  product: Product | null;
  className?: string;
  isInCart?: boolean;
}

export default function AddToCartButton({
  isInCart,
  product,
  className,
}: IProps) {
  const handleClick = () => {
    fbq.event('Purchase', { currency: 'USD', value: 10 });
  };
  const dispatch = useDispatch();

  // const { addItemToCart } = useCart();
  function handleAddToCart() {
    // Remove from cart if already present
    if (isInCart) {
      dispatch(removeFromCart(product?.id as any));
      toast.success('Product removed from cart');
      return;
    }

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
    <Button
      type="button"
      onClick={() => {
        handleAddToCart();
        if (!isInCart) handleClick(); // Only trigger FB pixel on add, not remove
      }}
      className={cn(
        'flex items-center space-x-2 md:px-8 px-4 py-2 rounded-sm text-white w-1/2',
        className,
      )}
    >
      {isInCart ? (
        <>
          <Trash2 size={17} />
          <span>Remove from cart</span>
        </>
      ) : (
        <>
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </>
      )}
    </Button>
  );
}
