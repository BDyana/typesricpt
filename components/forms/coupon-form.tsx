'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { createCategory, updateCategoryById } from '@/actions/categories';
import { CategoryProps, CouponProps } from '@/types/types';
import { Coupon } from '@prisma/client';
import { toast } from 'sonner';
import CustomText from '../re-usable-inputs/text-reusable';
import CustomDatePicker from '../re-usable-inputs/custom-date-picker';
import FormFooter from './form-footer';
import FormHeader from './form-header';
import { createCoupon, updateCoupon } from '@/actions/coupons';

export type SelectOptionProps = {
  label: string;
  value: string;
};

type CouponFormProps = {
  editingId?: string | undefined;
  vendorId?: string;
  initialData?: Coupon | undefined | null;
};

export default function CouponForm({
  editingId,
  initialData,
  vendorId,
}: CouponFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CategoryProps & { expiryDate: Date | null }>({
    defaultValues: {
      ...initialData,
      expiryDate: initialData?.expiryDate
        ? new Date(initialData.expiryDate)
        : null,
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function saveCategory(data: CouponProps) {
    data.vendorId = vendorId as string;

    // console.log('Form Data;', data);
    try {
      // Validate if the expiryDate is in the past
      // const currentDate = new Date();
      // if (new Date(data.expiryDate as any) < currentDate) {
      //   toast.warning('The expiry date cannot be in the past.');
      //   return; // Stop further execution
      // }
      // Validate if the expiryDate is in the past (allowing today's date)
      const currentDate = new Date();
      const expiryDate = new Date(data.expiryDate as any);

      // Reset time to 00:00:00 for comparison
      currentDate.setHours(0, 0, 0, 0);
      expiryDate.setHours(0, 0, 0, 0);

      if (expiryDate < currentDate) {
        toast.error('The expiry date cannot be in the past.');
        return; // Stop further execution
      }

      setLoading(true);

      if (editingId) {
        const res = await updateCoupon(editingId, data as any);
        if (res?.status === 201) {
          toast.success(`${res?.message}`);
        } else if (res?.status === 404 || res?.status === 500) {
          toast.error(`${res?.message}`);
          reset();
        } else {
          // Handle any unexpected status codes
          toast.message('An unexpected error occured.', {
            description:
              'Please mail the developer kiskayemoses@gmail.com for quick fixes',
          });
        }
      } else {
        const res = await createCoupon(data as any);
        if (res?.status === 201) {
          toast.success(`${res?.message}`);
        } else if (res?.status === 409 || res?.status === 500) {
          toast.error(`${res?.message}`);
          reset();
        } else {
          // Handle any unexpected status codes
          toast.message('An unexpected error occured.', {
            description:
              'Please mail the developer kiskayemoses@gmail.com for quick fixes',
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(saveCategory as any)}>
      <FormHeader
        href="/categories"
        parent=""
        title="Coupon"
        editingId={editingId}
        loading={loading}
      />

      <div className="w-full py-3">
        <Card>
          <CardHeader>
            <CardTitle>This form will be used for Coupon creation</CardTitle>
            <CardDescription>
              * Kindly Enter all the necessary fields as required
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <CustomText
                  register={register}
                  errors={errors}
                  label="Coupon Title"
                  name="title"
                  className="text-brandBlack"
                />

                <CustomText
                  register={register}
                  errors={errors}
                  label="Coupon Code"
                  name="couponCode"
                  className="text-brandBlack"
                />

                <CustomDatePicker
                  control={control}
                  errors={errors}
                  label="Expiry Date"
                  name="expiryDate"
                  className="text-brandBlack"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="isActive">Publish your Coupon</Label>
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="isActive"
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <FormFooter
        href="/coupons"
        editingId={editingId}
        loading={loading}
        title="Coupon"
        parent=""
      />
    </form>
  );
}
