'use client';

import { Checkbox } from '@/components/ui/checkbox';

import ActionColumn from '@/components/data-table/data-table-columns/action-column';
import DateColumn from '@/components/data-table/data-table-columns/date-column';
import ImageColumn from '@/components/data-table/data-table-columns/image-column';
import SortableColumn from '@/components/data-table/data-table-columns/sortable-column';
import { ColumnDef } from '@tanstack/react-table';
export const columns: ColumnDef<any>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableColumn column={column} title="Customer Name" />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <SortableColumn column={column} title="Customer Email" />
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <SortableColumn column={column} title="Customer Role" />
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Joined Us',
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const customer = row.original;
  //     return (
  //       <ActionColumn
  //         row={row}
  //         model="customer"
  //         editEndpoint={`customers/update/${customer.id}`}
  //         id={customer.id}
  //       />
  //     );
  //   },
  // },
];
