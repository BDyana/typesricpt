'use client';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createBrand, updateBrandById } from '@/actions/brands';
import { generateSlug } from '@/lib/generateSlug';
import { BrandProps } from '@/types/types';
import {Brand} from '@prisma/client';
import { toast } from 'sonner';
import CustomTextArea from '../re-usable-inputs/custom-text-area';
import ImageInput from '../re-usable-inputs/image-input';
import CustomText from '../re-usable-inputs/text-reusable';
import FormFooter from './form-footer';
import FormHeader from './form-header';

export type SelectOptionProps = {
  label: string;
  value: string;
};
type BrandFormProps = {
  editingId?: string | undefined;
  initialData?: Brand | undefined | null;
};

export default function BrandForm({
  editingId,
  initialData,
}: BrandFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<BrandProps>({
    defaultValues: {
      title: initialData?.title,
      description: initialData?.description || '',
      isActive: initialData?.isActive ?? true,
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || '/placeholder.svg';
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveBrand(data: BrandProps) {
    try {
      setLoading(true);
      data.slug = generateSlug(data.title);
      data.imageUrl = imageUrl;

      if (editingId) {
        await updateBrandById(editingId, data);
        setLoading(false);
        toast.success('Updated Successfully!');
        reset();
        router.push('/dashboard/brands');
        setImageUrl('/placeholder.svg');
      } else {
        await createBrand(data);
        setLoading(false);
        toast.success('Successfully Created!');
        reset();
        setImageUrl('/placeholder.svg');
        router.push('/dashboard/brands');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(saveBrand)}>
      <FormHeader
        href="/brands"
        parent=""
        title="Brand"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-8 col-span-full space-y-3">
          <Card>
            <CardHeader>
              <h2>This form will be used for Brand</h2>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <CustomText
                    register={register}
                    errors={errors}
                    label="Brand Title"
                    name="title"
                    className="text-brandBlack"
                  />
                </div>
                <div className="grid gap-3">
                  <CustomTextArea
                    register={register}
                    errors={errors}
                    label="Description"
                    name="description"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="isActive">Publish your Brand</Label>
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
              title="Brand Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="brandImageUploader"
            />
          </div>
        </div>
      </div>
      <FormFooter
        href="/brands"
        editingId={editingId}
        loading={loading}
        title="Brand"
        parent=""
      />
    </form>
  );
}
