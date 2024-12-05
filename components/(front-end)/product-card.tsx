'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import * as fbq from '../../lib/fpixel';
import { useDispatch } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { addToCart } from '@/redux/slices/cart';
import { calculateDiscountPercentage } from '@/lib/calculatePercentage';

interface IProduct {
  imageUrl: string;
  title: string;
  productStock: any;
  salePrice: any;
  productPrice: any;
  description: string;
  slug: string;
  productLeft: any;
}
export default function ProductCard({ product }: { product: IProduct }) {
  const handleClick = () => {
    fbq.event('Purchase', { currency: 'USD', value: 10 });
  };

  const dispatch = useDispatch();
  function handleAddToCart() {
    // Dispatch the reducer
    dispatch(addToCart(product as any));
    toast.success('Product added Successfully');
  }
  const progress = (product.productLeft / product.productStock) * 100;
  console.log(progress);

  return (
    <div className="mb-1 lg:mb-2 lg:mx-1 mx-0.3 bg-white overflow-hidden border border-gray-100 hover:shadow">
      <Link href={`/products/${product.slug}`}>
        <div className="overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.description}
            width={500}
            height={500}
            className="w-full transition-transform duration-300 hover:scale-110"
          />
        </div>
      </Link>
      <div className="px-1 lg:px-2">
        <Link href={`/products/${product.slug}`}>
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
                <h5 className="bg-[#fef3e9] text-[#f68b1e] p-1 inline ">
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
                handleClick();
              }}
              className="flex items-center hover:bg-brandColor/10 p-2 lg:p-3 rounded-full text-black"
            >
              <ShoppingCart size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
