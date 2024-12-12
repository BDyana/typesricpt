'use client';

import { Checkbox } from '@/components/ui/checkbox';

import ActionColumn from '@/components/data-table/data-table-columns/action-column';
import DateColumn from '@/components/data-table/data-table-columns/date-column';
import SortableColumn from '@/components/data-table/data-table-columns/sortable-column';
import { ColumnDef } from '@tanstack/react-table';
import ImageColumn from '@/components/data-table/data-table-columns/image-column';
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
    header: ({ column }) => (
      <SortableColumn column={column} title="Banner Title" />
    ),
  },
  {
    accessorKey: 'link',
    header: ({ column }) => (
      <SortableColumn column={column} title="Banner Link" />
    ),
  },
  {
    accessorKey: 'imageUrl',
    header: 'Banner Image',
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <SortableColumn column={column} title="Banner Status" />
    ),
    cell: ({ row }) => (
      <span className="text-center">
        {row.original.isActive ? 'Active' : 'Draft'}
      </span>
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
      const banner = row.original;
      return (
        <ActionColumn
          row={row}
          model="banner"
          editEndpoint={`store-banners/update/${banner.id}`}
          id={banner.id}
        />
      );
    },
  },
];
