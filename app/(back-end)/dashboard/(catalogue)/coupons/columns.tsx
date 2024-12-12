'use client';

import { Checkbox } from '@/components/ui/checkbox';

import ActionColumn from '@/components/data-table/data-table-columns/action-column';
import DateColumn from '@/components/data-table/data-table-columns/date-column';
import SortableColumn from '@/components/data-table/data-table-columns/sortable-column';
import { ColumnDef } from '@tanstack/react-table';
export const columns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },
  {
    accessorKey: 'couponCode',
    header: ({ column }) => (
      <SortableColumn column={column} title="Coupon Code" />
    ),
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expiry Date',
    cell: ({ row }) => <DateColumn row={row} accessorKey="expiryDate" />,
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <SortableColumn column={column} title="Coupon Status" />
    ),
    cell: ({ row }) => (
      <span className="text-center">
        {row.original.isActive ? 'Active' : 'Draft'}
      </span>
    ),
  },
  {
    accessorKey: 'vendorId',
    header: ({ column }) => (
      <SortableColumn column={column} title="Vendor Id" />
    ),
  },

  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const coupon = row.original;
      return (
        <ActionColumn
          row={row}
          model="coupon"
          editEndpoint={`coupons/update/${coupon.id}`}
          id={coupon.id}
        />
      );
    },
  },
];
