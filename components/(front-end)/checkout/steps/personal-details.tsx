'use client';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/redux/hooks/hooks';
import CheckOutNavButtons from '../checkout-nav-btns';
import {
  setCurrentStep,
  updateCheckoutFormData,
} from '@/redux/slices/checkout';
import CustomText from '@/components/re-usable-inputs/text-reusable';

export default function PersonalDetails() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const currentStep = useAppSelector((store) => store.checkout.currentStep);
  const existingFormData = useAppSelector(
    (store) => store.checkout.checkoutFormData,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...existingFormData,
    },
  });

  const dispatch = useDispatch();
  async function processData(data: any) {
    if (userId) {
      data.userId = userId;
      //Update the checkout Data
      dispatch(updateCheckoutFormData(data));
      //Update the Current Step
      dispatch(setCurrentStep(currentStep + 1));
    }
  }
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <CustomText
          label="First Name"
          name="firstName"
          register={register}
          errors={errors}
          className="w-full"
        />
        <CustomText
          label="Last Name"
          name="lastName"
          register={register}
          errors={errors}
          className="w-full"
        />
        <CustomText
          label="Email Address"
          name="email"
          type="email"
          register={register}
          errors={errors}
          className="w-full"
        />
        <CustomText
          label="Phone Number"
          name="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
      </div>
      <CheckOutNavButtons />
    </form>
  );
}
