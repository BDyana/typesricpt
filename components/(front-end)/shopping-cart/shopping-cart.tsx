'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { splitFullName } from '@/lib/splitNames';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { removeFromCart } from '@/redux/slices/cart';
import { Product, UserProfile } from '@prisma/client';
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

interface ShoppingCartProps {
  products: Product[] | null | undefined;
  userProfile: UserProfile | any;
  user: any;
}

export default function ShoppingCart({
  products,
  user,
  userProfile,
}: ShoppingCartProps) {
  const userProfileDefaultLocation = userProfile
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

  const [locations] = useLocalStorage<any[]>(
    'locations',
    userProfileDefaultLocation,
  );

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

    // console.log('Location:', data);
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

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
      <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-3xl">
        <CartItemList cartItems={cartItems} />
        <RecommendedProducts products={products} />
      </div>

      <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <OrderSummary subTotal={subTotal} selectedDelivery={selectedDelivery} />
        <Card>
          <CardHeader>
            <CardTitle>Delivery Location</CardTitle>
            <CardDescription>Manage your delivery locations</CardDescription>
          </CardHeader>
          <CardContent className="m-4">
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

              <PaymentMethodSelector />
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
        </Card>{' '}
      </div>

      {/* <div className="flex mt-4 items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
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
            onClick={handleSubmit}
            className="flex bg-brandColor w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white"
          >
            {loading ? 'Submitting...' : 'Submit Order'}
          </button>
        </div> */}
    </div>
    // </div>
  );
}
