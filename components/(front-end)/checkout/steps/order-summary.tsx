import { siteConfig } from '@/constants/site';
import { useAppSelector } from '@/redux/hooks/hooks';
import { removeFromCart } from '@/redux/slices/cart';
import { setCurrentStep } from '@/redux/slices/checkout';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

export default function OrderSummary() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const checkoutFormData = useAppSelector(
    (store) => store.checkout.checkoutFormData,
  );

  const currentStep = useAppSelector((store) => store.checkout.currentStep);
  const dispatch = useDispatch();

  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }

  const cartItems = useAppSelector((store) => store.cart);
  const subTotal =
    cartItems
      .reduce((acc, currentItem) => {
        return acc + currentItem.salePrice * currentItem.qty;
      }, 0)
      .toFixed(2) ?? 0;

  async function submitData() {
    const data = {
      orderItems: cartItems,
      checkoutFormData,
    };

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
      setLoading(false);
    }
  }

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary :</h2>
      {cartItems.map((cartItem, i) => (
        <div
          key={`${cartItem.id}-${i}`}
          className="flex items-center justify-between border-b border-slate-400 pb-3 font-semibold text-sm mb-4"
        >
          <div className="flex items-center gap-3">
            <Image
              src={cartItem.imageUrl}
              width={249}
              height={249}
              alt={cartItem.title || siteConfig.name}
              className="rounded-xl w-14 h-14"
            />
            <div className="flex flex-col">
              <h2>{cartItem.title}</h2>
            </div>
          </div>
          <div className="rounded-xl border border-gray-400 flex gap-3 items-center">
            <p className="flex-grow py-2 px-4">{cartItem.qty}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col justify-center">
              <h4>৳{(cartItem.salePrice * cartItem.qty).toFixed(2)}</h4>
              <p className="text-[10px] text-gray-300">
                (৳{cartItem.salePrice}x {cartItem.qty})
              </p>
            </div>
          </div>
        </div>
      ))}
      {checkoutFormData.shippingCost && (
        <div className="flex items-center justify-between border-b border-slate-400 pb-3 font-semibold text-sm mb-4">
          <span>Shipping Cost </span>
          <span className="text-[12px] text-gray-300">
            The Order will be delivered in{' '}
            {checkoutFormData.shippingCost == '50'
              ? '3'
              : checkoutFormData.shippingCost == '75'
                ? '2'
                : '1'}{' '}
            days{' '}
          </span>
          <span>৳{checkoutFormData.shippingCost}</span>
        </div>
      )}
      <div className="flex items-center justify-between border-b border-slate-400 pb-3 font-semibold text-sm mb-4">
        <span>Total</span>
        <span>
          ৳
          {(
            parseFloat(checkoutFormData.shippingCost || '0') +
            parseFloat(subTotal)
          ).toFixed(2)}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          type="button"
          className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-slate-800 dark:bg-green-600 dark:hover:bg-green-700"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>
        {loading ? (
          <button
            disabled
            className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-slate-800 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Processing Please wait...
          </button>
        ) : (
          <button
            onClick={submitData}
            className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-slate-800 dark:bg-green-600 dark:hover:bg-green-700"
          >
            <span>Proceed to Payment</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
