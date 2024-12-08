import CartBanner from '@/components/(front-end)/checkout/cart-banner';
import { Steps } from '@/components/(front-end)/checkout/steps';
import CheckoutFormSteps from '@/components/(front-end)/checkout/steps/checkout-form-steps';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const steps = [
    {
      number: 1,
      title: 'Personal Details',
    },
    {
      number: 2,
      title: 'Shipping Details',
    },
    {
      number: 3,
      title: 'Payment Method',
    },
    {
      number: 4,
      title: 'Order Summary',
    },
  ];

  const session = await getServerSession(authOptions);
  // console.warn('Seiion:', session);

  if (!session) {
    redirect(`/login`);
  }
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl my-6 mx-auto p-6 rounded-lg">
        {/* STEPS */}
        <Steps steps={steps} />
        <div className="w-full p-4 border rounded-lg shadow sm:p-6 md:p-8 text-brandBlack">
          {/* Banner */}
          <CartBanner />
          {/* Form */}
          <CheckoutFormSteps />
        </div>
      </div>
    </div>
  );
}
