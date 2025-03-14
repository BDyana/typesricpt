'use client';

import { deleteBanner } from '@/actions/banners';
import { deleteCategory } from '@/actions/categories';
import { deleteBrand } from '@/actions/brands';
import { deleteCoupon } from '@/actions/coupons';
import { deleteOrder } from '@/actions/orders';
import { deleteProduct } from '@/actions/products';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

type ActionColumnProps = {
  row: any;
  model: any;
  editEndpoint: string;
  id: string | undefined;
  // revPath: string;
};
export default function ActionColumn({
  row,
  model,
  editEndpoint,
  id = '',
}: ActionColumnProps) {
  const isActive = row.isActive;

  function capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function handleDelete() {
    try {
      if (model === 'category') {
        const res = await deleteCategory(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${capitalizeFirstLetter(model)} Deleted Successfully`);
      } else if (model === 'brand') {
        const res = await deleteBrand(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${capitalizeFirstLetter(model)} Deleted Successfully`);
      } else if (model === 'product') {
        const res = await deleteProduct(id);
        if (res?.success) {
          window.location.reload();
        }
        toast.success(`${capitalizeFirstLetter(model)} Deleted Successfully`);
      } else if (model === 'coupon') {
        const res = await deleteCoupon(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${capitalizeFirstLetter(model)} Deleted Successfully`);
      } else if (model === 'banner') {
        const res = await deleteBanner(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${capitalizeFirstLetter(model)} Deleted Successfully`);
      } else if (model === 'order') {
        const res = await deleteOrder(id);
        if (res.status === 201 || 200) {
          window.location.reload();
        }
        toast.success(`${capitalizeFirstLetter(model)} Deleted Successfully`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldn't be deleted");
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={'ghost'}
              size={'sm'}
              className="text-red-600 hover:text-red-700 transition-all duration-500 cursor-pointer "
            >
              <Trash className="w-4 h-4  mr-2 flex-shrink-0" />
              <span>Delete</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this{' '}
                {model}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button variant={'destructive'} onClick={() => handleDelete()}>
                Permanently Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DropdownMenuItem>
          <Link href={editEndpoint} className="flex item w-full gap-2">
            <Pencil className="w-4 h-4 " />
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
