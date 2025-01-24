'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { splitFullName } from '@/lib/splitNames';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { removeFromCart } from '@/redux/slices/cart';
import { type Product, type UserProfile } from '@prisma/client';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { LocationManager } from '../location-manager';
import { PaymentMethodSelector } from '../payment-method-selector';
import CartItemList from './cart-item-list';
import DeliveryOption from './delivery-option';
import { EmptyCart } from './empty-cart';
import { OrderSummary } from './order-summary';
import RecommendedProducts from './recommended-products';

interface DeliveryOption {
  id: string;
  label: string;
  basePrice: number;
  additionalPricePerKg?: number;
  isOil?: boolean;
}

interface Location {
  isDefault: boolean;
  phone: string;
  streetAddress: string;
  city: string;
  country: string;
  district: string;
}

interface ShoppingCartProps {
  products: Product[] | null | undefined;
  userProfile: UserProfile | null;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export default function ShoppingCart({
  products,
  user,
  userProfile,
}: ShoppingCartProps) {
  // Initialize default location only if userProfile exists
  const userProfileDefaultLocation: Location[] = userProfile
    ? [
        {
          isDefault: true,
          phone: userProfile.phone || '',
          streetAddress: userProfile.streetAddress || '',
          city: userProfile.city || '',
          country: userProfile.country || '',
          district: userProfile.district || '',
        },
      ]
    : [];

  const [loading, setLoading] = useState(false);
  const [selectedDelivery, setSelectedDelivery] =
    useState<DeliveryOption | null>(null);
  const [errors, setErrors] = useState({
    location: false,
    delivery: false,
  });

  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const subTotal = cartItems
    .reduce(
      (acc, currentItem) => acc + currentItem.salePrice * currentItem.qty,
      0,
    )
    .toFixed(2);

  const [locations] = useLocalStorage<Location[]>(
    'locations',
    userProfileDefaultLocation,
  );

  const sortedLocation = locations.find(
    (location) => location.isDefault === true,
  );

  // Handle case where user or user properties might be undefined
  const fullName = user?.name ?? '';
  const email = user?.email ?? '';
  const userId = user?.id ?? '';

  const { firstName, secondName } = splitFullName(fullName);

  const checkoutFormData = sortedLocation
    ? {
        ...sortedLocation,
        email,
        userId,
        tel: sortedLocation.phone,
        firstName,
        lastName: secondName,
        paymentMethod: 'Cash On Delivery',
        shippingCost: selectedDelivery?.basePrice ?? 90,
      }
    : null;

  async function handleSubmit() {
    if (!checkoutFormData) {
      toast.error('Missing required form data');
      return;
    }

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

    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!baseUrl) {
        throw new Error('Base URL not configured');
      }

      const response = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const responseData = await response.json();

      // Clear cart items
      cartItems.forEach((item) => dispatch(removeFromCart(item.id)));

      toast.success('Order Created Successfully');
      router.push(`/order-confirmation/${responseData.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Something went wrong, please try again');
    } finally {
      setLoading(false);
    }
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="mt-4 md:gap-6 lg:flex lg:items-start xl:gap-8">
      <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-3xl">
        <CartItemList cartItems={cartItems} />
        {products && <RecommendedProducts products={products} />}
      </div>

      <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <Card>
          <CardContent className="m-2">
            <div className={errors.location ? 'border-red-500' : ''}>
              <LocationManager userProfile={userProfile} />
              {errors.location && (
                <p className="text-sm text-red-500 mt-1">
                  Please select a delivery location
                </p>
              )}
            </div>

            <div className="mt-4">
              <Label>
                Delivery Charge
                <span className="text-red-500">*</span>
              </Label>
              <div className="my-2">
                <DeliveryOption
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
              <Label className="font-normal">
                Payment Method : Cash on Delivery
                <span className="text-red-500">*</span>
              </Label>
              {/* <PaymentMethodSelector /> */}
              </div>
          </CardContent>
        </Card>
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
          <OrderSummary subTotal={subTotal} selectedDelivery={selectedDelivery} />
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
            {/* 
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}