'use client';

import { Checkbox } from '@/components/ui/checkbox';
import ActionColumn from '@/components/data-table/data-table-columns/action-column';
import DateColumn from '@/components/data-table/data-table-columns/date-column';
import SortableColumn from '@/components/data-table/data-table-columns/sortable-column';
import { ColumnDef } from '@tanstack/react-table';
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'orderNumber',
    header: ({ column }) => (
      <SortableColumn column={column} title="Order No." />
    ),
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
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
