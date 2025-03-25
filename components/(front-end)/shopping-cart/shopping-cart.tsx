'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, ShoppingBag, MapPin, Truck, CreditCard } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { splitFullName } from '@/lib/splitNames';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { removeFromCart } from '@/redux/slices/cart';

import { LocationManager } from '../location-manager';
import CartItemList from './cart-item-list';
import DeliveryOption from './delivery-option';
import { EmptyCart } from './empty-cart';
import { OrderSummary } from './order-summary';
import RecommendedProducts from './recommended-products';

interface DeliveryOptionType {
  id: string;
  label: string;
  basePrice: number;
  additionalPricePerKg?: number;
  isOil?: boolean;
}

interface Location {
  isDefault: boolean;
  phone: string;
  name: string;
  streetAddress: string;
  city: string;
  country: string;
  district: string;
}

interface ShoppingCartProps {
  products: any[] | null | undefined;
  userProfile: any | null;
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
  // const userProfileDefaultLocation: Location[] = userProfile
  //   ? [
  //       {
  //         isDefault: true,
  //         phone: userProfile.phone || '',
  //         name: `${userProfile.firstName} ${userProfile.lastName}` || '',
  //         streetAddress: userProfile.streetAddress || '',
  //         city: userProfile.city || '',
  //         country: userProfile.country || '',
  //         district: userProfile.district || '',
  //       },
  //     ]
  //   : [];

  const [loading, setLoading] = useState(false);
  const [selectedDelivery, setSelectedDelivery] =
    useState<DeliveryOptionType | null>(null);
  const [errors, setErrors] = useState({
    name: false,
    delivery: false,
    phone: false,
    streetAddress: false,
    city: false,
    district: false,
  });

  // State to track if validation has been attempted
  const [validationAttempted, setValidationAttempted] = useState(false);

  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const subTotal = cartItems
    .reduce(
      (acc, currentItem) => acc + currentItem.salePrice * currentItem.qty,
      0,
    )
    .toFixed(2);

  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLocations = localStorage.getItem('locations');
      setLocations(storedLocations ? JSON.parse(storedLocations) : []);
    }
  }, []);

  // console.log('Locations ✅:', locations);

  // Update localStorage whenever locations change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('locations', JSON.stringify(locations));
    }
  }, [locations]);

  const defaultLocation = locations.find(
    (location) => location.isDefault === true,
  );

  // Handle case where user or user properties might be undefined
  const fullName = user?.name ?? '';
  const email = user?.email ?? '';
  const userId = user?.id ?? '';

  const { firstName, secondName } = splitFullName(
    (defaultLocation?.name as string) || '',
  );

  // console.log('First Name:', firstName, 'Second Name:', secondName);

  const checkoutFormData = defaultLocation
    ? {
        ...defaultLocation,
        email,
        userId,
        tel: defaultLocation.phone,
        firstName,
        lastName: secondName,
        paymentMethod: 'Cash On Delivery',
        shippingCost: selectedDelivery?.basePrice ?? 90,
      }
    : null;

  // Reset all errors first
  const validateForm = () => {
    const newErrors = {
      name: defaultLocation ? !defaultLocation.name.trim() : false,
      delivery: !selectedDelivery,
      phone: defaultLocation ? !defaultLocation.phone.trim() : false,
      streetAddress: defaultLocation
        ? !defaultLocation.streetAddress.trim()
        : false,
      city: defaultLocation ? !defaultLocation.city.trim() : false,
      district: defaultLocation ? !defaultLocation.district.trim() : false,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  async function handleSubmit() {
    setValidationAttempted(true);

    // Get fresh validation errors
    const isValid = validateForm();

    if (!isValid || !checkoutFormData) {
      toast.error('Missing required form data');
      return;
    }

    const data = {
      checkoutFormData,
      orderItems: cartItems,
    };

    console.log('Data ✅;', data);

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ShoppingBag className="h-6 w-6" />
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Cart items and recommendations */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Items in Your Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <CartItemList cartItems={cartItems} />
            </CardContent>
          </Card>

          {products && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recommended For You</CardTitle>
              </CardHeader>
              <CardContent>
                <RecommendedProducts products={products} />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column - Checkout information */}
        <div className="space-y-6">
          <Card className="sticky top-4 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Delivery Information
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Please provide your delivery details below
              </p>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Delivery Address Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-primary" />
                    Delivery Address
                    <span className="text-destructive">*</span>
                  </h4>
                  {defaultLocation && (
                    <Badge variant="outline" className="bg-primary/5">
                      {defaultLocation.city}, {defaultLocation.district}
                    </Badge>
                  )}
                </div>

                <div
                  className={`rounded-lg ${validationAttempted && errors.name ? 'border-destructive shadow-sm shadow-destructive/10' : 'border-none'}  transition-all`}
                >
                  <LocationManager userProfile={userProfile} />
                </div>

                {validationAttempted &&
                  defaultLocation &&
                  (errors.phone ||
                    errors.name ||
                    errors.streetAddress ||
                    errors.city ||
                    errors.district) && (
                    <Alert
                      variant="destructive"
                      className="animate-in fade-in-50 slide-in-from-top-5"
                    >
                      <AlertDescription>
                        <div className="font-medium mb-2">
                          Please complete the following required fields:
                        </div>
                        <ul className="list-disc pl-5 space-y-1">
                          {errors.name && <li>Name</li>}
                          {errors.phone && <li>Phone number</li>}
                          {errors.streetAddress && <li>Street address</li>}
                          {errors.city && <li>City</li>}
                          {errors.district && <li>District</li>}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
              </div>

              <Separator />

              {/* Delivery Options Section */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-primary" />
                  Delivery Options
                  <span className="text-destructive">*</span>
                </h4>

                <div
                  className={`rounded-lg ${validationAttempted && errors.delivery ? 'border-destructive shadow-sm shadow-destructive/10' : 'border-none'} transition-all`}
                >
                  <DeliveryOption
                    onSelect={setSelectedDelivery}
                    selectedOptionId={selectedDelivery?.id}
                    required
                    error={validationAttempted && errors.delivery}
                  />
                  {validationAttempted && errors.delivery && (
                    <div className="mt-2 flex items-center gap-2 text-destructive text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-alert-circle"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      Please select a delivery option
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Payment Method Section */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-1.5">
                  <CreditCard className="h-4 w-4 text-primary" />
                  Payment Method
                </h4>

                <div className="rounded-lg border border-border p-4 bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        Pay when you receive your order
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <Separator />

            <CardContent className="p-6">
              <OrderSummary
                subTotal={subTotal}
                selectedDelivery={selectedDelivery}
              />
              <div className="flex mt-6 items-center justify-between gap-4 border-t border-border pt-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-bold text-primary">
                  ৳{' '}
                  {(
                    Number.parseFloat(subTotal) +
                    (selectedDelivery?.basePrice ?? 0)
                  ).toFixed(2)}
                </span>
              </div>
            </CardContent>

            <CardFooter className="px-6 pb-6 pt-0">
              <Button
                className="w-full"
                size="lg"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  'Complete Order'
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
