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

import { createBanner, updateBannerById } from '@/actions/banners';
import { updateCategoryById } from '@/actions/categories';
import { BannerProps } from '@/types/types';
import { Banner, Category } from '@prisma/client';
import { toast } from 'sonner';
import ImageInput from '../re-usable-inputs/image-input';
import CustomText from '../re-usable-inputs/text-reusable';
import FormFooter from './form-footer';
import FormHeader from './form-header';

export type SelectOptionProps = {
  label: string;
  value: string;
};
type CategoryFormProps = {
  editingId?: string | undefined;
  initialData?: Banner | undefined | null;
};

export default function BannerForm({
  editingId,
  initialData,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<BannerProps>({
    defaultValues: {
      ...(initialData as any),
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || '/placeholder.svg';
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveCategory(data: BannerProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;

      if (editingId) {
        await updateBannerById(editingId, data as any);
        setLoading(false);
        toast.success('Updated Banner Successfully!');
        reset();
        router.push('/dashboard/store-banners');
        setImageUrl('/placeholder.svg');
      } else {
        await createBanner(data as any);
        setLoading(false);
        toast.success('Successfully Created!');
        reset();
        setImageUrl('/placeholder.svg');
        router.push('/dashboard/store-banners');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(saveCategory)}>
      <FormHeader
        href="/store-banners"
        parent=""
        title="Banner"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-8 col-span-full space-y-3">
          <Card>
            <CardHeader>
              <CardTitle>
                This form will be used for banner{' '}
                {editingId ? 'updating' : 'creation'}
              </CardTitle>
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
                    label="Banner Title"
                    name="title"
                    className="text-brandBlack"
                  />
                  <CustomText
                    register={register}
                    errors={errors}
                    label="Banner Link"
                    name="link"
                    type="url"
                    className="text-brandBlack"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Label htmlFor="isActive">Publish your Banner</Label>
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
        <div className="lg:col-span-4 col-span-full ">
          <div className="grid auto-rows-max items-start gap-4 ">
            <ImageInput
              title="Banner Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="bannerImageUploader"
            />
          </div>
        </div>
      </div>
      <FormFooter
        href="/store-banners"
        editingId={editingId}
        loading={loading}
        title="Banner"
        parent=""
      />
    </form>
  );
}
