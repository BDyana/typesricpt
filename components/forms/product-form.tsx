'use client';

import { generateSlug } from '@/lib/generateSlug';
import { generateUserCode } from '@/lib/generateUserCode';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import MultipleImageInput from '../re-usable-inputs/multiple-image-input';
import { createProduct, updateProduct } from '@/actions/products';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import { z } from 'zod';
import FormSelectInput from '../re-usable-inputs/select-input';
import TagInput from '../re-usable-inputs/tag-input';
import CustomText from '../re-usable-inputs/text-reusable';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form';
import FormHeader from './form-header';
import SubmitButton from './submit-button';
const QuillEditor = dynamic(
  () => import('@/components/re-usable-inputs/quill-editor'),
  {
    ssr: false,
  },
);
export default function ProductForm({
  categories,
  farmers,
  initialData,
  editingId,
}: any) {
  const initialContent = initialData?.content ?? '';
  const initialImageUrl = initialData?.imageUrl ?? '';
  const initialTags = Array.isArray(initialData?.tags)
    ? initialData.tags.join(', ')
    : (initialData?.tags ?? '');
  const id = initialData?.id ?? '';
  const [tags, setTags] = useState(initialTags);
  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState<string[]>(
    initialData?.productImages?.length
      ? initialData.productImages
      : ['/placeholder.svg'],
  );
  const [productcontent, setProductContent] = useState(initialContent);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const form = useForm<z.infer<any>>({
    defaultValues: {
      isActive: false,
      isFlashSale: false,
      isSponsoredOne: false,
      isWholesale: false,
      ...initialData,
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = form;
  const watchAllFields = watch();
  const isWholesale = watch('isWholesale');
  useEffect(() => {
    const validateForm = () => {
      const {
        title,
        sku,
        barcode,
        productPrice,
        salePrice,
        description,
      } = watchAllFields;
      const isBasicInfoComplete = !!(title && sku && barcode);
      const isPricingComplete = !!(productPrice && salePrice);
      const isMediaComplete =
        productImages.length > 0 &&
        tags.length > 0;
      const isDescriptionComplete = !!(productcontent && description);
      setIsFormComplete(
        isBasicInfoComplete &&
          isPricingComplete &&
          isMediaComplete &&
          isDescriptionComplete,
      );
    };
  validateForm();
  }, [watchAllFields, productImages, tags, productcontent]);
  const handleTagsChange = (tagsInput: string) => {
    const tagsArray = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');
    setTags(tagsArray);
  };
  const [selectedCategory, setSelectedCategory] = useState<any>(() => {
    const initialCategory = categories?.find(
      (category: any) => category.id === initialData?.categoryId,
    );
    return initialCategory
      ? { value: initialCategory.id, label: initialCategory.title }
      : { label: '', value: '' };
  });
  const [selectedFarmer, setSelectedFarmer] = useState<any>(() => {
    const initialFarmer = farmers?.find(
      (farmer: any) => farmer.id === initialData?.userId,
    );
    return initialFarmer
      ? { value: initialFarmer.id, label: initialFarmer.title }
      : { label: '', value: '' };
  });
  async function onSubmit(data: any, event: React.BaseSyntheticEvent) {
    event.preventDefault();
    const slug = generateSlug(data.title);
    const productCode = generateUserCode('LLP', data.title);
    data.slug = slug;
    data.productImages = productImages;
    data.content = productcontent;
    data.tags =
      typeof tags === 'string'
        ? tags
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag !== '')
        : tags;
    data.qty = 1;
    data.productCode = productCode;
    data.categoryId = selectedCategory.value;
    data.userId = selectedFarmer.value;
    data.wholesalePrice;
    data.imageUrl = productImages?.[0];
    setLoading(true);
    try {
      if (id) {
        const res = await updateProduct(id, data);
        if (res.status === 200) {
          toast.success(`${res.message}`);
          location.reload();
        } else if (
          res.status === 409 ||
          res.status === 400 ||
          res.status === 500 ||
          res.status === 404
        ) {
          toast.error(`${res.message}`);
          reset();
          setTags(initialData);
        } else {
          toast.error('An unexpected error occurred');
        }
      } else {
        const res = await createProduct(data);
        if (res.status === 201) {
          toast.success(`${res.message}`);
          reset();
          setTags(initialData);
          setProductContent(initialData);
          setProductImages([]);
        } else if (
          res.status === 409 ||
          res.status === 400 ||
          res.status === 500
        ) {
          toast.error(`${res.message}`);
          reset();
          setTags(initialData);
        } else {
          toast.error('An unexpected error occurred');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit((data, event) => onSubmit(data, event as any))}
        className="space-y-8"
      >
        <FormHeader
          href="/products"
          parent=""
          title="Product"
          editingId={initialData}
          loading={loading}
        />
        <Card>
          <CardHeader>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              defaultValue="basic"
              className="space-y-4"
            >
              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-2 md:grid-cols-2">
                  <CustomText
                    className="text-black"
                    label="Product Title"
                    name="title"
                    register={register}
                    errors={errors}
                  />
                  <FormSelectInput
                    label="Category"
                    options={categories?.map((category: any) => ({
                      value: category.id,
                      label: category.title,
                    }))}
                    option={selectedCategory}
                    setOption={setSelectedCategory}
                    href="/dashboard/categories/new"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <CustomText
                    className="text-black"
                    label="Price (Before Discount)"
                    name="productPrice"
                    type="number"
                    register={register}
                    errors={errors}
                  />
                  <CustomText
                    className="text-black"
                    label="Sale Price (Discounted)"
                    name="salePrice"
                    register={register}
                    errors={errors}
                    type="number"
                  />
                  <CustomText
                    className="text-black"
                    label="Product SKU"
                    name="sku"
                    register={register}
                    errors={errors}
                  />
                </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-4">
                    <FormSelectInput
                      label="Farmer"
                      options={farmers?.map((farmer: any) => ({
                        value: farmer.id,
                        label: farmer.title,
                      }))}
                      option={selectedFarmer}
                      setOption={setSelectedFarmer}
                    />
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="isWholesale"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-md border-brandBlack border-gray-300 px-2 py-1 bg-transparent">
                            <div>
                              <FormLabel className="text-base">
                                Wholsale Availbale?
                              </FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    {isWholesale && (
                    <div className="grid grid-cols-2 gap-2">
                      <>
                        <CustomText
                          className="text-black"
                          label="Wholesale Price"
                          name="wholesalePrice"
                          register={register}
                          errors={errors}
                          type="number"
                        />
                        <CustomText
                          className="text-black"
                          label="Minimum Wholesale Qty"
                          name="wholesaleQty"
                          register={register}
                          errors={errors}
                          type="number"
                        />
                      </>
                    </div>
                    )}
                    <TagInput
                      initialValue={tags}
                      onChange={setTags}
                      placeholder="Add product tags..."
                      maxTags={10}
                      maxTagLength={20}
                    />
                  </div>
                    <MultipleImageInput
                      imageUrls={productImages}
                      setImageUrls={setProductImages}
                      endpoint="multipleProductsUploader"
                      title="Product Images"
                    />
                  </div>
                <QuillEditor
                  label="Product Content"
                  className="sm:col-span-2"
                  value={productcontent}
                  onChange={setProductContent}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex justify-between w-full">
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full items-center space-x-2">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row justify-center rounded-lg border-none bg-transparent gap-3 items-center">
                      <Label htmlFor="isActive">Publish</Label>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFlashSale"
                  render={({ field }) => (
                    <FormItem className="flex flex-row justify-center rounded-lg border-none bg-transparent gap-3 items-center">
                      <Label htmlFor="isFlashSale">
                        Flash Sale?
                      </Label>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isSponsoredOne"
                  render={({ field }) => (
                    <FormItem className="flex flex-row justify-center rounded-lg border-none bg-transparent gap-3 items-center">
                      <Label htmlFor="isSponsoredOne">
                        Sponsored 1 ?
                      </Label>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <SubmitButton
                className="w-sm"
                title={editingId ? `Update Product` : `Save Product`}
                loading={loading}
              />
            </div>
            {!isFormComplete && activeTab === 'description' && (
              <p className="text-red-500 mt-2 text-sm">
                Please ensure all fields are filled out before creating the
                product. (This product should have original images)
              </p>
            )}
          </CardContent>
        </Card>
      </form>{' '}
    </Form>
  );
}
