'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';

import { SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import DateRangeFilter from './data-table-date-range';
import DateFilters from './data-table-dates';
import { DataTablePagination } from './data-table-pagination';
import SearchBar from './data-table-search';
import { DataTableViewOptions } from './data-table-view';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKeys?: string[];
}
export default function DataTable<TData, TValue>({
  columns,
  data,
  searchKeys,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [searchResults, setSearchResults] = useState(data);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // const [isSearch, setIsSearch] = useState(true);

  // Filtering state
  const [filteredData, setFilteredData] = useState<TData[]>(data);
  const [searchActive, setSearchActive] = useState(false);

  // Memoize the final data to prevent unnecessary re-renders
  const tableData = React.useMemo(
    () => (searchActive ? filteredData : data),
    [searchActive, filteredData, data],
  );

  // console.log(isSearch);
  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  // console.log(searchResults);

  // Handler for filter updates
  const handleFilterUpdate = (newData: TData[]) => {
    setFilteredData(newData);
    setSearchActive(true);
    // Reset to first page when filter changes
    table.setPageIndex(0);
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-8">
        <div className="flex-1 w-full">
          {searchKeys && searchKeys.length > 0 ? ( // With specific search keys
            <SearchBar
              data={data}
              onSearch={handleFilterUpdate}
              setIsSearch={setSearchActive}
              placeholder="Search services..."
              searchKeys={searchKeys}
            />
          ) : (
            // Basic usage
            <SearchBar
              data={data}
              onSearch={handleFilterUpdate}
              setIsSearch={setSearchActive}
              placeholder="Search services..."
            />
          )}
        </div>
        <div className="flex items-center gap-2 ">
          <DateRangeFilter
            data={data}
            onFilter={handleFilterUpdate}
            setIsSearch={setSearchActive}
          />
          <DateFilters
            data={data}
            onFilter={handleFilterUpdate}
            setIsSearch={setSearchActive}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 w-lg gap-1">
                <SlidersHorizontal className="size-4 mr-2" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DataTableViewOptions table={table} />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="w-full">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
