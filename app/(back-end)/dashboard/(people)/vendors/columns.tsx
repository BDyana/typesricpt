'use client';
import ActionColumn from '@/components/data-table/data-table-columns/action-column';
import DateColumn from '@/components/data-table/data-table-columns/date-column';
import ImageColumn from '@/components/data-table/data-table-columns/image-column';
import SortableColumn from '@/components/data-table/data-table-columns/sortable-column';
import { ColumnDef } from '@tanstack/react-table';
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableColumn column={column} title="Vendor Name" />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <SortableColumn column={column} title="Vendor Email" />
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <SortableColumn column={column} title="Vendor Role" />
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
  //     const famer = row.original;
  //     return (
  //       <ActionColumn
  //         row={row}
  //         model="famer"
  //         editEndpoint={`vendors/update/${famer.id}`}
  //         id={famer.id}
  //       />
  //     );
  //   },
  // },
];
