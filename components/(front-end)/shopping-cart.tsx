'use client';

import Link from 'next/link';
import Products from './products';
import { Product, UserProfile } from '@prisma/client';
import { Loader2Icon, Minus, Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from '@/redux/slices/cart';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { LocationManager } from './location-manager';
import { PaymentMethodSelector } from './payment-method-selector';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { splitFullName } from '@/lib/splitNames';
import { Label } from '../ui/label';
import DeliveryChargeSelector from './shopping-cart/delivery-option';
import { siteConfig } from '@/constants/site';

interface IProps {
  products: Product[] | null | undefined;
  userProfile: UserProfile | any;
  user: any;
}
export default function ShoppingCart({ products, user, userProfile }: IProps) {
  const [loading, setLoading] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<{
    id: string;
    label: string;
    basePrice: number;
    additionalPricePerKg?: number;
    isOil?: boolean;
  } | null>(null);
  const [errors, setErrors] = useState({
    location: false,
    delivery: false,
  });
  const router = useRouter();

  const cartItems = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const subTotal =
    cartItems
      .reduce((acc, currentItem) => {
        return acc + currentItem.salePrice * currentItem.qty;
      }, 0)
      .toFixed(2) ?? 0;

  function handleRemoveFromCart(cartId: string) {
    dispatch(removeFromCart(cartId));
    toast.success('Product removed Successfully');
  }

  function handleQtyIncrement(cartId: string) {
    dispatch(incrementQty(cartId));
  }
  function handleQtyDecrement(cartId: string) {
    dispatch(decrementQty(cartId));
  }

  const [locations, setLocations] = useLocalStorage<any[]>('locations', []);
  const sortedLocation = locations.find(
    (location) => location.isDefault === true,
  );
  const fullName = user.name;
  const email = user.email;
  const userId = user.id;

  const { firstName, secondName } = splitFullName(fullName);
  const { isDefault, phone, ...location } = sortedLocation;

  const checkoutFormData = {
    ...location,
    email,
    userId,
    tel: sortedLocation.phone,
    firstName,
    lastName: secondName,
    paymentMethod: 'Cash On Delivery',
    shippingCost: selectedDelivery?.basePrice ?? 90,
  };

  // Calculate total weight of cart items

  async function handleSubmit() {
    // Validate required fields
    const newErrors = {
      location: !sortedLocation,
      delivery: !selectedDelivery,
    };
    setErrors(newErrors);

    if (newErrors.location || newErrors.delivery) {
      toast.error('Please fill in all required fields');
      return;
    }

    const data = {
      checkoutFormData,
      orderItems: cartItems,
    };

    console.log('Location:', data);
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const response = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (response.ok) {
        setLoading(false);
        toast.success('Order Created Successfully');

        // Clear all items from the cart
        cartItems.forEach((item) => dispatch(removeFromCart(item.id)));

        router.push(`/order-confirmation/${responseData.id}`);
      } else {
        setLoading(false);
        toast.error('Something Went wrong, Please Try Again');
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
      <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-3xl">
        <div className="space-y-6">
          {cartItems.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
            >
              <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <Link
                  href={`/products/${item.slug}`}
                  className="shrink-0 md:order-1"
                >
                  <img
                    className="h-20 w-20"
                    src={item.imageUrl as string}
                    alt={item.title || siteConfig.name}
                  />
                </Link>

                <label htmlFor="counter-input" className="sr-only">
                  Choose quantity:
                </label>
                <div className="flex items-center justify-between md:order-3 md:justify-end">
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleQtyDecrement(item.id)}
                      id="decrement-button"
                      data-input-counter-decrement="counter-input"
                      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      <Minus className=" text-brandBlack size-2.5" />
                    </button>
                    <span
                      id="counter-input"
                      data-input-counter
                      className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-brandBlack focus:outline-none focus:ring-0 "
                    >
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQtyIncrement(item.id)}
                      id="increment-button"
                      data-input-counter-increment="counter-input"
                      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      <Plus className=" text-brandBlack size-2.5" />
                    </button>
                  </div>
                  <div className="text-end md:order-4 md:w-32">
                    <p className="text-base font-bold text-brandBlack">
                      ৳{item.salePrice}
                    </p>
                  </div>
                </div>

                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                  <Link
                    href={`/products/${item.slug}`}
                    className="text-base font-medium text-brandBlack hover:underline "
                  >
                    {item.title}
                  </Link>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brandBlack hover:underline dark:hover:text-white"
                    >
                      <svg
                        className="me-1.5 h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                        />
                      </svg>
                      Add to Favorites
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                    >
                      <Minus className="me-1.5 h-5 w-5" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden w-full xl:mt-8 xl:block">
          <h3 className="text-2xl font-semibold text-brandBlack">
            People also bought
          </h3>
          {/* <div className="mt-6 grid grid-cols-3 w-full gap-4 sm:mt-8"> */}
          {/* Most Bought Products */}
          <Products
            title=""
            description=""
            products={products as any}
            buttonTitle="View More"
            className="lg:grid-cols-5 gap-y-2"
          />
          {/* </div> */}
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm   sm:p-6">
          <p className="text-xl font-semibold text-brandBlack">
            Order summaryddd
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">
                  Original price
                </dt>
                <dd className="text-base font-medium text-brandBlack">
                  ৳{subTotal}
                </dd>
              </dl>
              {/* <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">Savings</dt>
                <dd className="text-base font-medium text-green-600">
                  -৳299.00
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">
                  Store Pickup
                </dt>
                <dd className="text-base font-medium text-brandBlack">৳0</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">Tax</dt>
                <dd className="text-base font-medium text-brandBlack">৳0</dd>
              </dl> */}
            </div>

            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
              <dt className="text-base font-bold text-brandBlack">Subtotal</dt>
              <dd className="text-base font-bold text-brandBlack">
                ৳{subTotal}
              </dd>
            </dl>
            {selectedDelivery && (
              <div className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">
                  Delivery Charge
                </dt>
                <dd className="text-base font-medium text-brandBlack">
                  ৳{selectedDelivery.basePrice}
                </dd>
              </div>
            )}
          </div>
          {/* 
          <form className="space-y-4">
            <div>
              <label
                htmlFor="voucher"
                className="mb-2 block text-sm font-medium text-brandBlack"
              >
                {' '}
                Do you have Link voucher or gift card?{' '}
              </label>
              <input
                type="text"
                id="voucher"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-brandBlack focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder=""
                required
              />
            </div>
            <button
              type="submit"
              className="flex bg-brandBlack w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Apply Code
            </button>
          </form> */}
        </div>

        <Card>
          <CardHeader>
            <p className="text-xl font-semibold text-brandBlack">
              Delivery Location
            </p>
            <CardDescription>Manage your delivery locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`${errors.location ? 'border-red-500' : ''}`}>
              <LocationManager userProfile={userProfile} />
              {errors.location && (
                <p className="text-sm text-red-500 mt-1">
                  Please select a delivery location
                </p>
              )}
            </div>

            <div className="mt-4">
              <Label>
                Delivery Option
                <span className="text-red-500">*</span>
              </Label>
              <div className="mt-2">
                <DeliveryChargeSelector
                  onSelect={setSelectedDelivery}
                  selectedOptionId={selectedDelivery?.id}
                  required
                  error={errors.delivery}
                />
                {errors.delivery && (
                  <p className="text-sm text-red-500 mt-1">
                    Please select a delivery option
                  </p>
                )}
              </div>
              <Label>
                Payment Method : Cash on Delivery.
                <span className="text-red-500">*</span>
              </Label>
              {/* <PaymentMethodSelector /> */}
            </div>

            <div className="flex mt-4 items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
              <dt className="text-base font-bold text-brandBlack">Total</dt>
              <dd className="text-base font-bold text-brandBlack">
                ৳
                {(
                  parseFloat(subTotal) + (selectedDelivery?.basePrice ?? 0)
                ).toFixed(2)}
              </dd>
            </div>

            <div className="my-4">
              <button
                disabled={loading}
                onClick={() => handleSubmit()}
                title="Proceed to checkout"
                className="flex bg-brandColor w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-brandBlack dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? (
                  <span className="flex gap-2 ">
                    <Loader2Icon className="size-4 animate-spin" />{' '}
                    Submitting...
                  </span>
                ) : (
                  <> Submit Order</>
                )}
              </button>

              <div className="flex items-center mt-2 justify-center gap-2">
                <span className="text-sm font-normal text-gray-500"> or </span>
                <Link
                  href="/"
                  prefetch={true}
                  title="Continue Shopping"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                >
                  Continue Shopping
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
