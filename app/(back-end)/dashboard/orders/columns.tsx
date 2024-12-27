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
    accessorKey: 'orderNumber',
    header: ({ column }) => (
      <SortableColumn column={column} title="Order No." />
    ),
  },
  // {
  //   accessorKey: 'paymentMethod',
  //   header: ({ column }) => (
  //     <SortableColumn column={column} title="Payment Method" />
  //   ),
  // },
  {
    accessorKey: 'firstName',
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  // {
  //   accessorKey: '{streetAddress}, {city}',
  //   header: ({ column }) => <SortableColumn column={column} title="Address" />,
  // },
  {
    accessorKey: 'city',
    header: ({ column }) => <SortableColumn column={column} title="City" />,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <SortableColumn column={column} title="Phone" />,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortableColumn column={column} title="Email" />,
  },
  {
    accessorKey: 'orderStatus',
    header: ({ column }) => <SortableColumn column={column} title="Status" />,
    cell: ({ row }) => (
      <span className="text-center">{row.original.orderStatus}</span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original;
      return (
        <ActionColumn
          row={row}
          model="order"
          editEndpoint={`orders/update/${order.id}`}
          id={order.id}
        />
      );
    },
  },
];
