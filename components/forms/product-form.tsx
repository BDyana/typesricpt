'use client';

import { generateSlug } from '@/lib/generateSlug';
import { generateUserCode } from '@/lib/generateUserCode';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
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

import { createProduct } from '@/actions/products';
import { Loader2 } from 'lucide-react';
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
  updateData = {},
}: any) {
  const initialContent = updateData?.content ?? '';
  const initialImageUrl = updateData?.imageUrl ?? '';
  const initialTags = updateData?.tags ?? '';
  const id = updateData?.id ?? '';
  const [tags, setTags] = useState(initialTags);
  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState(['/placeholder.svg']);
  const [productcontent, setProductContent] = useState(initialContent);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const form = useForm<z.infer<any>>({
    // resolver: zodResolver(ProductSchema),
    defaultValues: {
      isActive: false,
      isWholesale: false,
      ...updateData,
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

  // Watch all form fields
  const watchAllFields = watch();
  const isActive = watch('isActive');
  const isWholesale = watch('isWholesale');

  // Validation function to check form completeness
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

      // Basic info validation
      const isBasicInfoComplete = !!(title && sku && barcode);

      // Pricing validation
      const isPricingComplete = !!(productPrice && salePrice);
      // &&
      // (!isWholesale || (wholesalePrice && wholesaleQty));

      // Inventory validation
      // const isInventoryComplete = !!(productStock && unit);

      // Media validation
      const isMediaComplete =
        productImages.length > 0 &&
        // productImages[0] !== '/placeholder.svg';
        tags.length > 0;

      // Description validation
      const isDescriptionComplete = !!(productcontent && description);

      // Set form completeness
      setIsFormComplete(
        isBasicInfoComplete &&
          isPricingComplete &&
          // isInventoryComplete &&
          isMediaComplete &&
          isDescriptionComplete,
      );
    };

    validateForm();
  }, [watchAllFields, productImages, tags, productcontent]);

  // When setting tags
  const handleTagsChange = (tagsInput: string) => {
    // Split the input string by comma and trim each tag
    const tagsArray = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');
    setTags(tagsArray);
  };

  const [selectedCategory, setSelectedCategory] = useState<any>({
    label: '',
    value: '',
  });
  const [selectedFarmer, setSelectedFarmer] = useState<any>({
    label: '',
    value: '',
  });
  // console.log('selectedFarmer;', selectedFarmer);
  // console.log('selectedcategory;', selectedCategory);
  async function onSubmit(data: any, event: React.BaseSyntheticEvent) {
    // Prevent default form submission
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

    setLoading(true);
    try {
      if (id) {
        data.id = id;
        // Update logic here
        // For example:
        // await updateProduct(data);
      } else {
        // Create logic here
        // For example:
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
          // Handle any unexpected status codes
          toast.error('An unexpected error occurred');
        }
      }

      // Optional: redirect after successful submission
      // router.push('/dashboard/products');
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
            <CardTitle>
              {id
                ? 'This form will be used for updating a product'
                : 'This form will be used for creating a product'}
            </CardTitle>
            <CardDescription>
              * Enter the details for your product below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              defaultValue="basic"
              className="space-y-4"
            >
              <TabsList>
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <CustomText
                    className="text-black"
                    label="Product Title"
                    name="title"
                    register={register}
                    errors={errors}
                  />
                  <CustomText
                    className="text-black"
                    label="Product SKU"
                    name="sku"
                    register={register}
                    errors={errors}
                  />
                  <CustomText
                    className="text-black"
                    label="Product Barcode"
                    name="barcode"
                    register={register}
                    errors={errors}
                  />

                  <div className="space-y-2">
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
                  <div className="space-y-2">
                    <FormSelectInput
                      label="Farmer"
                      options={farmers?.map((farmer: any) => ({
                        value: farmer.id,
                        label: farmer.title,
                      }))}
                      option={selectedFarmer}
                      setOption={setSelectedFarmer}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <CustomText
                    className="text-black"
                    label="Product Price (Before Discount)"
                    name="productPrice"
                    type="number"
                    register={register}
                    errors={errors}
                  />
                  <CustomText
                    className="text-black"
                    label="Product Sale Price (Discounted)"
                    name="salePrice"
                    register={register}
                    errors={errors}
                    type="number"
                  />
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="isWholesale"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border-brandBlack border p-4 bg-transparent">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Is Wholsale?
                            </FormLabel>
                            <FormDescription>
                              Is thsi product availbale for whole sale?
                            </FormDescription>
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
                  )}
                </div>
              </TabsContent>

              <TabsContent value="inventory" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <CustomText
                    className="text-black"
                    label="Product Stock"
                    name="productStock"
                    register={register}
                    errors={errors}
                    type="number"
                  />
                  <CustomText
                    className="text-black"
                    label="Unit of Measurement (e.g., Kilograms)"
                    name="unit"
                    register={register}
                    errors={errors}
                  />
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-4">
                <MultipleImageInput
                  imageUrls={productImages}
                  setImageUrls={setProductImages}
                  endpoint="multipleProductsUploader"
                  title="Product Images"
                />
                <TagInput
                  initialValue={tags}
                  onChange={setTags}
                  placeholder="Add product tags..."
                  maxTags={10}
                  maxTagLength={20}
                />
              </TabsContent>

              <TabsContent value="description" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Product Description</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    rows={5}
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
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row justify-center rounded-lg border-none bg-transparent gap-3 items-center">
                      <Label htmlFor="isActive">Publish your product</Label>
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
              <Button type="submit" disabled={!isFormComplete || loading}>
                {loading
                  ? `${
                      id ? (
                        <span className="flex gap-2">
                          <Loader2 className="size-4 animate-spin" />
                          Updating...
                        </span>
                      ) : (
                        <span className="flex gap-2">
                          <Loader2 className="size-4 animate-spin" />
                          Creating...
                        </span>
                      )
                    } Product...`
                  : id
                    ? 'Update Product'
                    : 'Create Product'}
              </Button>
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
