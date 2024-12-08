'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Circle, Truck } from 'lucide-react';
import CheckOutNavButtons from '../checkout-nav-btns';
import CustomText from '@/components/re-usable-inputs/text-reusable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import {
  setCurrentStep,
  updateCheckoutFormData,
} from '@/redux/slices/checkout';

export default function ShippingDetails() {
  const dispatch = useAppDispatch();
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
  const initialShippingCost = existingFormData.shippingCost || '';
  const [shippingCost, setShippingCost] = useState(initialShippingCost);

  async function processData(data: any) {
    data.shippingCost = shippingCost;
    //Update the checkout Data
    dispatch(updateCheckoutFormData(data));
    //Update the Current Step
    dispatch(setCurrentStep(currentStep + 1));
  }
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-green-400">
        Shipping Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <CustomText
          label="Street Address (Details)"
          name="streetAddress"
          register={register}
          errors={errors}
          className="w-full"
        />
        <CustomText
          label="Thana or Upazila"
          name="apartment"
          register={register}
          errors={errors}
          className="w-full"
        />
        <CustomText
          label="City"
          name="city"
          register={register}
          errors={errors}
          className="w-full"
        />
        <CustomText
          label="District"
          name="state"
          register={register}
          errors={errors}
          className="w-full"
        />
        <CustomText
          label="Zip Code"
          name="zip"
          register={register}
          errors={errors}
          className="w-full"
        />
        <CustomText
          label="Country"
          name="country"
          register={register}
          errors={errors}
          className="w-full"
        />
        {/* Shipping Cost */}

        <div className="col-span-full">
          <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
            Shipping Cost ?
          </h3>
          <ul className="grid w-full gap-6 ">
            <li>
              <input
                type="radio"
                id="hosting-small"
                name="hosting"
                value="60"
                className="hidden peer"
                required
                onChange={(e) => setShippingCost(e.target.value)}
              />
              <label
                htmlFor="hosting-small"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                {/* Design */}
                <div className="flex gap-2 items-center">
                  <Truck className="w-8 h-8 ms-3 flex-shrink-0 " />
                  <div className="">
                    <p>Inside Dhaka - ৳ 50 (for 1 Kg)</p>
                    <h4>৳ 15 Added Next Per Kg</h4>
                  </div>
                </div>
                <Circle className="w-5 h-5 ms-3 flex-shrink-0" />
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="hosting-medium"
                name="hosting"
                value="100"
                className="hidden peer"
                onChange={(e) => setShippingCost(e.target.value)}
              />
              <label
                htmlFor="hosting-medium"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex gap-2 items-center">
                  <Truck className="w-8 h-8 ms-3 flex-shrink-0" />
                  <div className="">
                    <p>Outside Dhaka - ৳ 110 (for 1 Kg)</p>
                    <h4>৳ 20 Added Next Per Kg</h4>
                  </div>
                </div>
                <Circle className="w-5 h-5 ms-3 flex-shrink-0" />
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="hosting-semimedium"
                name="hosting"
                value="90"
                className="hidden peer"
                onChange={(e) => setShippingCost(e.target.value)}
              />
              <label
                htmlFor="hosting-semimedium"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex gap-2 items-center">
                  <div className="">
                    <p>
                      <b>Special Item : Oil (5 Liter) </b>
                      <br />
                      (Inside Dhaka - ৳ 90)
                    </p>
                  </div>
                </div>
                <Circle className="w-5 h-5 ms-3 flex-shrink-0" />
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="hosting-large"
                name="hosting"
                value="150"
                className="hidden peer"
                onChange={(e) => setShippingCost(e.target.value)}
              />
              <label
                htmlFor="hosting-large"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex gap-2 items-center">
                  <div className="">
                    <p>
                      <b>Special Item : Oil (5 Liter) </b>
                      <br />
                      (Outside Dhaka - ৳ 150)
                    </p>
                  </div>
                </div>
                <Circle className="w-5 h-5 ms-3 flex-shrink-0" />
              </label>
            </li>
          </ul>
        </div>
      </div>
      <CheckOutNavButtons />
    </form>
  );
}
