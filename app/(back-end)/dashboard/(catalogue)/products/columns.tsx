'use client';

import { Checkbox } from '@/components/ui/checkbox';

import ActionColumn from '@/components/data-table/data-table-columns/action-column';
import DateColumn from '@/components/data-table/data-table-columns/date-column';
import ImageColumn from '@/components/data-table/data-table-columns/image-column';
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
    accessorKey: 'isActive',
    header: ({ column }) => (
      <SortableColumn column={column} title="Product Status" />
    ),
    cell: ({ row }) => (
      <span className="text-center">
        {row.original.isActive ? 'Active' : 'Draft'}
      </span>
    ),
  },
  {
    accessorKey: 'productPrice',
    header: ({ column }) => (
      <SortableColumn column={column} title="Product Price" />
    ),
    cell: ({ row }) => (
      <span className="text-center">
        <span className="font-bold">$</span>
        {Number(row.original.productPrice).toLocaleString()}
      </span>
    ),
  },

  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },

  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original;
      return (
        <ActionColumn
          row={row}
          model="product"
          editEndpoint={`products/update/${product.id}`}
          id={product.id}
        />
      );
    },
  },
];
