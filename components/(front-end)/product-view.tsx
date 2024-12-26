'use client';

import Link from 'next/link';
import Breadcrumb from './breadcrumb';
import TrainingHtml from './training-html';
import AddToCartButton from './add-to-cart';
import { Category, Comment, Product } from '@prisma/client';
import CategoryCarousel from './category-carousel';
import ProductShareButton from './product-share-button';
import ProductImageCarousel from './product-image-carousel';
import { calculateDiscountPercentage } from '@/lib/calculatePercentage';
import { Banknote, PhoneCall, ShieldBan, ShieldOff, Truck } from 'lucide-react';
import ProductComments from '../forms/product-comment';

interface IProps {
  product: Product | any;
  category: (Category & { products: any[] }) | null | undefined;
}

export default function ProductView({ product, category }: IProps) {
  const { id } = product;
  const categoryProducts = category?.products;

  const products =
    categoryProducts?.filter((product: Product) => product.id !== id) ?? [];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const urlToShare = `${baseUrl}/products/${product?.slug}`;

  return (
    <>
      <div className="hidden lg:flex">
        <Breadcrumb />{' '}
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="bg-white col-span-12 md:col-span-9 md:flex border border-gray-100 rounded-sm pb-5">
          <div className="w-full md:w-5/12">
            <ProductImageCarousel
              productImages={product.productImages}
              thumbnail={product.imageUrl}
              title={product.title}
              description={product.description}
            />
          </div>
          <div className="w-full md:w-7/12 ml-2 lg:ml-5 pr-3">
            <div className="flex font-bold items-center justify-between mt-3">
              <h1>{product.title}</h1>
            </div>
            <div className="flex gap-3 mt-2 mb-8">
              <div>
                <h4>
                  Cateogory :{' '}
                  <Link
                    className="text-brandColor"
                    href={`/categories/${category?.slug}`}
                  >
                    {category?.title}
                  </Link>
                </h4>
              </div>
            </div>
            <div className="border-b border-gray-300">
              <h4>
                <b>SPECIFICATION : </b>
              </h4>
              <div className="py-2">
                <TrainingHtml content={product.content} />
              </div>
              <div className="flex items-center gap-8 mb-4 justify-between">
                <h4>SKU: {product.sku}</h4>
                <p className="py-1.5 px-4 border rounded-full text-slate-900 ">
                  <b>Stock</b>: {product.productStock}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4 border-b border-gray-200 pb-4">
              <div className="gap-3 flex items-end">
                <h4 className="text-2xl font-bold">BDT {product.salePrice}</h4>
                {product?.productPrice > product?.salePrice && (
                  <del className="text-[#75757a] text-xl font-light">
                    BDT {product?.productPrice}
                  </del>
                )}
                {product?.productPrice > product?.salePrice && (
                  <h5 className="bg-[#fef3e9] text-[#f68b1e] flex items-center py-1 px-2 rounded-sm">
                    <b>
                      -
                      {calculateDiscountPercentage(
                        product?.productPrice,
                        product?.salePrice,
                      )}
                      %
                    </b>
                  </h5>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center py-6">
              <AddToCartButton product={product} />
              <div className="flex gap-3">
                <div>
                  <PhoneCall className="mt-3" />
                </div>
                <div>
                  <h4>Call for Any Query :</h4>
                  <h3 className="font-bold">01511- 309 309</h3>
                </div>
              </div>
            </div>
            <div className="float-right">
              <ProductShareButton urlToShare={urlToShare} />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 lg:col-span-3 sm:block bg-white border border-gray-100 rounded-sm dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden hidden">
          <h4 className="dark:bg-gray-800 p-2 font-medium border-b border-gray-200 dark:border-gray-600 text-slate-800 dark:text-slate-100">
            DELIVERY & RETURNS
          </h4>
          <div className="p-2 space-y-2">
            <div className="flex border-b border-gray-200 gap-2 pb-4">
              <div>
                <Banknote className="mt-3" />
              </div>
              <div>
                <h3>Delivery Fees</h3>
                <h5>
                  Inside Dhaka TK 50,
                  <br />
                  Sub Area Dhaka BDT 90.
                  <br />
                  Outside Dhaka BDT 110.
                  <br />
                  (Added 15tk for Dhaka 20tk for Others Next Per kg )
                </h5>
                <h5>
                  <b>Special Rate for 5 ltr Oil</b>
                </h5>
              </div>
            </div>
            <div className="flex border-b border-gray-200 gap-2 pb-4">
              <div>
                <Banknote className="mt-3" />
              </div>
              <div>
                <h3>Cash on Delivery Available.</h3>
                <h5>
                  You can pay to Delivery man after your product ckecking.
                </h5>
              </div>
            </div>
            <div className="flex border-b border-gray-200 gap-2 pb-4">
              <div>
                <Truck className="mt-3" />
              </div>
              <div>
                <h3>Standard Delivery.</h3>
                <h5>Standard Time : 1-3 Days</h5>
              </div>
            </div>
            <div className="flex border-b border-gray-200 gap-2 pb-4">
              <div>
                <ShieldBan className="mt-3" />
              </div>
              <div>
                <h3>Warranty Not Available.</h3>
                <h5>Warranty for Some Specific Product.</h5>
              </div>
            </div>
            <div className="flex gap-2">
              <div>
                <ShieldOff className="mt-3" />
              </div>
              <div>
                <h3>This item is non-returnable.</h3>
                <h5>
                  Some are Returnable. Check your product in-front-of Delivery
                  man. If get any problem please inform to Helpline Number
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-700 mt-12 rounded-sm py-2">
        <ProductComments
          productId={product.id}
          initialComments={product.comments as any}
        />
        <h2 className="mb-4 text-xl font-semibold dark:text-slate-200">
          Similar Products
        </h2>
        <CategoryCarousel products={products} />
      </div>
    </>
  );
}
