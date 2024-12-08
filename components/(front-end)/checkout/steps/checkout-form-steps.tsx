'use client';

import OrderSummary from './order-summary';
import PaymentMethod from './payment-method';
import ShippingDetails from './shipping-details';
import PersonalDetails from './personal-details';
import { useAppSelector } from '@/redux/hooks/hooks';

export default function CheckoutFormSteps() {
  const currentStep = useAppSelector((store) => store.checkout.currentStep);
  function renderFormByStep(step: number) {
    if (step === 1) {
      return (
        <div>
          <PersonalDetails />
        </div>
      );
    } else if (step === 2) {
      return (
        <div>
          <ShippingDetails />
        </div>
      );
    } else if (step === 3) {
      return (
        <div>
          <PaymentMethod />
        </div>
      );
    } else if (step === 4) {
      return (
        <div>
          <OrderSummary />
        </div>
      );
    }
  }
  return (
    <div className=" !text-brandBlack">{renderFormByStep(currentStep)}</div>
  );
}
