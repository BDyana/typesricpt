'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { splitFullName } from '@/lib/splitNames';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from '@/redux/slices/cart';
import { Product, UserProfile } from '@prisma/client';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card';
import { Label } from '../ui/label';
import { LocationManager } from './location-manager';
import Products from './products';
import DeliveryChargeSelector from './shopping-cart/delivery-option';

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
    name: false,
  });
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [locations] = useLocalStorage<any[]>('locations', []);

  // Basic validation functions
  const validateName = (name?: string) => name && name.trim().length > 0;
  const validateLocation = (location: any) =>
    location && Object.keys(location).length > 0;
  const validateDelivery = (delivery: any) => delivery !== null;

  // Get user details and location
  const fullName = user?.name;
  const email = user?.email;
  const userId = user?.id;
  const sortedLocation = locations.find(
    (location) => location.isDefault === true,
  );

  // Calculate subtotal
  const subTotal = cartItems
    .reduce(
      (acc, currentItem) => acc + currentItem.salePrice * currentItem.qty,
      0,
    )
    .toFixed(2);

  // Split name for form data
  const { firstName, secondName } = splitFullName(fullName || '');

  // Prepare checkout form data
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

  // Cart item handlers
  const handleRemoveFromCart = (cartId: string) => {
    dispatch(removeFromCart(cartId));
    toast.success('Product removed Successfully');
  };

  const handleQtyIncrement = (cartId: string) => dispatch(incrementQty(cartId));
  const handleQtyDecrement = (cartId: string) => dispatch(decrementQty(cartId));

  // Form submission handler
  const handleSubmit = async () => {
    // Validate all required fields
    const validationErrors = {
      name: !validateName(fullName),
      location: !validateLocation(sortedLocation),
      delivery: !validateDelivery(selectedDelivery),
    };

    setErrors(validationErrors);

    // Check if there are any validation errors
    if (Object.values(validationErrors).some((error) => error)) {
      const errorMessages = [];
      if (validationErrors.name) errorMessages.push('Name is required');
      if (validationErrors.location)
        errorMessages.push('Delivery location is required');
      if (validationErrors.delivery)
        errorMessages.push('Delivery option is required');

      toast.error(errorMessages.join(', '));
      return;
    }

    // Validate cart has items
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Proceed with order creation
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const orderData = {
        checkoutFormData,
        orderItems: cartItems,
      };

      const response = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const responseData = await response.json();

      // Clear cart and redirect on success
      cartItems.forEach((item) => dispatch(removeFromCart(item.id)));
      toast.success('Order Created Successfully');
      router.push(`/order-confirmation/${responseData.id}`);
    } catch (error) {
      console.error('Order creation error:', error);
      toast.error('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render cart items
  const renderCartItems = () => (
    <div className="space-y-6">
      {cartItems.map((item, i) => (
        <div
          key={i}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
        >
          {/* ... (rest of the cart item rendering code remains the same) ... */}
        </div>
      ))}
    </div>
  );

  return (
    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
      <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-3xl">
        {renderCartItems()}

        {/* Products recommendation section */}
        <div className="hidden w-full xl:mt-8 xl:block">
          <h3 className="text-2xl font-semibold text-brandBlack">
            People also bought
          </h3>
          <Products
            title=""
            description=""
            products={products as any}
            buttonTitle="View More"
            className="lg:grid-cols-5 gap-y-2"
          />
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        {/* Order summary card */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="text-lg font-semibold text-brandBlack">Order summary</p>

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
            </div>

            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
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
        </div>

        {/* Delivery information card */}
        <Card>
          <CardHeader>
            <p className="text-xl font-semibold text-brandBlack">
              Delivery Information
            </p>
            <CardDescription>
              Please provide your delivery details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Name error message */}
            {errors.name && (
              <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">
                  Name is required to place an order
                </p>
              </div>
            )}

            {/* Location section */}
            <div className={`${errors.location ? 'border-red-500' : ''}`}>
              <LocationManager userProfile={userProfile} />
              {errors.location && (
                <p className="text-sm text-red-500 mt-1">
                  Please select a delivery location
                </p>
              )}
            </div>

            {/* Delivery options section */}
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
                Payment Method : Cash on Delivery
                <span className="text-red-500">*</span>
              </Label>
            </div>

            {/* Total amount */}
            <div className="flex mt-4 items-center justify-between gap-4 border-t border-gray-200 pt-2">
              <dt className="text-base font-bold text-brandBlack">Total</dt>
              <dd className="text-base font-bold text-brandBlack">
                ৳
                {(
                  parseFloat(subTotal) + (selectedDelivery?.basePrice ?? 0)
                ).toFixed(2)}
              </dd>
            </div>

            {/* Submit button section */}
            <div className="my-4">
              <button
                disabled={loading}
                onClick={handleSubmit}
                title="Submit Order"
                className="flex bg-brandColor w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-brandBlack disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex gap-2">
                    <Loader2Icon className="size-4 animate-spin" />{' '}
                    Submitting...
                  </span>
                ) : (
                  'Submit Order'
                )}
              </button>

              <div className="flex items-center mt-2 justify-center gap-2">
                <span className="text-sm font-normal text-gray-500">or</span>
                <Link
                  href="/"
                  prefetch={true}
                  title="Continue Shopping"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
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
