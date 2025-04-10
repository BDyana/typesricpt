'use client';

import { Checkbox } from '@/components/ui/checkbox';

import ActionColumn from '@/components/data-table/data-table-columns/action-column';
import DateColumn from '@/components/data-table/data-table-columns/date-column';
import ImageColumn from '@/components/data-table/data-table-columns/image-column';
import SortableColumn from '@/components/data-table/data-table-columns/sortable-column';
import { ColumnDef } from '@tanstack/react-table';
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },
  {
    accessorKey: 'imageUrl',
    header: 'Category Image',
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },

  {
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const category = row.original;
      return (
        <ActionColumn
          row={row}
          model="category"
          editEndpoint={`categories/update/${category.id}`}
          id={category.id}
        />
      );
    },
  },
];
