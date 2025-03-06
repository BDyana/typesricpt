'use client';

import { CONTACT_INFO } from '@/constants/contacts';
import { calculateDiscountPercentage } from '@/lib/calculatePercentage';
import { useAppSelector } from '@/redux/hooks/hooks';
import { Category, Product } from '@prisma/client';
import {
  Banknote,
  Check,
  PhoneCall,
  ShieldBan,
  ShieldOff,
  Star,
  StarHalf,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import AddToCartButton from './add-to-cart';
import Breadcrumb from './breadcrumb';
import ProductImageCarousel from './product-image-carousel';
import TrainingHtml from './training-html';
import Image from 'next/image';

interface IProps {
  product: Product | any;
  category: (Category & { products: any[] }) | null | undefined;
}

export default function ProductView({ product, category }: IProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const urlToShare = `${baseUrl}/products/${product?.slug}`;

  const cartItems = useAppSelector((state) => state.cart);

  // Check if product is already in cart
  const isInCart = cartItems.some((item: any) => item.id === product.id);

  return (
    <>
      <div className="hidden lg:flex">
        <Breadcrumb />{' '}
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="bg-white col-span-12 md:col-span-9 md:flex border border-gray-200 rounded pb-5">
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
            <div>
              <div className="flex gap-3 mt-2">
                <h4>
                  Category:{' '}
                  <Link
                    className="text-brandColor"
                    href={`/categories/${category?.slug}`}
                  >
                    {category?.title}
                  </Link>
                </h4>
                <span>|</span>
                <h4>
                  Brand:{' '}
                  <Link className="text-brandColor" href="">
                    Unknown
                  </Link>
                </h4>
              </div>
              <div className="flex gap-3 justify-between">
                <div className="flex items-center">
                  <Star fill="#fbab32" strokeWidth={0} size={16} />
                  <Star fill="#fbab32" strokeWidth={0} size={16} />
                  <Star fill="#fbab32" strokeWidth={0} size={16} />
                  <StarHalf
                    fill="#fbab32"
                    color="#fbab32"
                    strokeWidth={1}
                    size={14}
                  />
                  <Star color="#fbab32" size={14} />{' '}
                  <h4 className="ml-1">
                    {' '}
                    (4.5) <b> 9</b> Reviews
                  </h4>
                </div>
              </div>
              {/* <div className="flex gap-3 mt-2 mb-4 justify-between">
                <div></div>
                <FakeSalesCount />
              </div> */}
            </div>
            <div className="border-b border-gray-300 mt-4">
              <h4>
                <b>DESCRIPTION :</b>
              </h4>
              <div className="py-2">
                <TrainingHtml content={product.content} />
              </div>
              <div className="flex items-center gap-8 mb-4 justify-between">
                <h4>SKU: {product.sku}</h4>
                <p className="px-2 py-1.5 border rounded-full text-slate-900 flex gap-1">
                  <Check
                    className="bg-green-700 rounded-full text-white p-1"
                    strokeWidth={3}
                    size={20}
                  />
                  <b>Stock Available</b>
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
              <AddToCartButton isInCart={isInCart} product={product} />
              <Link href="https://wa.me/8801511309309?text=" className="flex gap-1">
                <div className="bg-blue-50 w-12 h-12 pt-2 pl-2 rounded-full">
                  <PhoneCall size={18} className="absolute ml-3" />
                  <Image className="mt-3" src="/whatsapp.png" alt="" width="26" height="26"/>
                </div>
                <div>
                  <h4>Call for Any Query :</h4>
                  <h3 className="font-bold">{CONTACT_INFO.supportNumber}</h3>
                </div>
              </Link>
            </div>
            <div>
              <h3>Promotional :</h3>
              <Link href="" className="text-brandColor">
                <p>* Best Delivery Charge for All Products.</p>
              </Link>
              <Link href="" className="text-brandColor">
                <p>* Grab Your Top Branded Products.</p>
              </Link>
            </div>
            {/* <div className="float-right">
              <ProductShareButton urlToShare={urlToShare} />
            </div> */}
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 lg:col-span-3 sm:block bg-white overflow-hidden hidden border rounded border-gray-200">
          <div className="mb-3 bg-gray-50 rounded-sm dark:bg-gray-700 dark:border-gray-700 p-2">
            <h4>Sold by :</h4>
            <Link href="" className="font-medium">
              BDyana Official
            </Link>
            <h5 className="mb-1.5">Official Store</h5>
            <h5>
              <b>400</b> Products Available.
            </h5>
            <div className="flex gap-1">
              <h4>Store Rating :</h4>
              <div className="flex items-center">
                <Star fill="#fbab32" strokeWidth={0} size={16} />
                <Star fill="#fbab32" strokeWidth={0} size={16} />
                <Star fill="#fbab32" strokeWidth={0} size={16} />
                <StarHalf
                  fill="#fbab32"
                  color="#fbab32"
                  strokeWidth={1}
                  size={14}
                />
                <Star color="#fbab32" size={14} />{' '}
                <h4 className="ml-1"> (4.5)</h4>
              </div>
            </div>
          </div>
          <div className="border border-gray-100 rounded-sm dark:bg-gray-700 dark:border-gray-700 ">
            <h4 className="dark:bg-gray-800 p-2 font-medium border-b border-gray-200 dark:border-gray-600 dark:text-slate-100">
              DELIVERY & RETURNS
            </h4>
            <div className="p-2 space-y-1.5">
              <div className="flex border-b border-gray-200 gap-2 pb-2.5">
                <div>
                  <Banknote className="mt-.5" />
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
              <div className="flex border-b border-gray-200 gap-2 pb-2.5">
                <div>
                  <Banknote className="mt-.5" />
                </div>
                <div>
                  <h3>Cash on Delivery Available.</h3>
                  <h5>
                    You can pay to Delivery man after your product checking.
                  </h5>
                </div>
              </div>
              <div className="flex border-b border-gray-200 gap-2 pb-2.5">
                <div>
                  <Truck className="mt-1" />
                </div>
                <div>
                  <h3>Standard Delivery.</h3>
                  <h5>Standard Time : 1-3 Days</h5>
                </div>
              </div>
              <div className="flex border-b border-gray-200 gap-2 pb-2.5">
                <div>
                  <ShieldBan className="mt-2" />
                </div>
                <div>
                  <h3>Warranty Not Available.</h3>
                  <h5>Warranty for Some Specific Product.</h5>
                </div>
              </div>
              <div className="flex gap-2">
                <div>
                  <ShieldOff className="mt-2" />
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
      </div>
    </>
  );
}
