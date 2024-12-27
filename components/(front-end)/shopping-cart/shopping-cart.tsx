'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OrderSummary } from './order-summary';
import CartItemList from './cart-item-list';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { Product, UserProfile } from '@prisma/client';
import RecommendedProducts from './recommended-products';
import DeliveryOption from './delivery-option';
import { toast } from 'sonner';
import { splitFullName } from '@/lib/splitNames';
import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from '@/redux/slices/cart';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { EmptyCart } from './empty-cart';

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
        <div className="my-4">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="flex bg-brandColor w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white"
          >
            {loading ? 'Submitting...' : 'Submit Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
