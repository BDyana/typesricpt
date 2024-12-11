'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { createCategory, updateCategoryById } from '@/actions/categories';
import { generateSlug } from '@/lib/generateSlug';
import { CategoryProps } from '@/types/types';
import { Category } from '@prisma/client';
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
type CategoryFormProps = {
  editingId?: string | undefined;
  initialData?: Category | undefined | null;
};

export default function CategoryForm({
  editingId,
  initialData,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CategoryProps>({
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

  async function saveCategory(data: CategoryProps) {
    try {
      setLoading(true);
      data.slug = generateSlug(data.title);
      data.imageUrl = imageUrl;

      if (editingId) {
        await updateCategoryById(editingId, data);
        setLoading(false);
        toast.success('Updated Successfully!');
        reset();
        router.push('/dashboard/categories');
        setImageUrl('/placeholder.svg');
      } else {
        await createCategory(data);
        setLoading(false);
        toast.success('Successfully Created!');
        reset();
        setImageUrl('/placeholder.svg');
        router.push('/dashboard/categories');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(saveCategory)}>
      <FormHeader
        href="/categories"
        parent=""
        title="Category"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-8 col-span-full space-y-3">
          <Card>
            <CardHeader>
              <CardTitle>This form will be used for Category</CardTitle>
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
                    label="Category Title"
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
                  <Label htmlFor="isActive">Publish your Category</Label>
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
              title="Category Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="categoryImageUploader"
            />
          </div>
        </div>
      </div>
      <FormFooter
        href="/categories"
        editingId={editingId}
        loading={loading}
        title="Category"
        parent=""
      />
    </form>
  );
}
