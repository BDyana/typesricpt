'use client';

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';

interface PaginateProps {
  totalPages: number;
  isSearch: boolean;
}

export default function Paginate({ totalPages, isSearch }: PaginateProps) {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || 'asc';
  const min = searchParams.get('min') || '0';
  const max = searchParams.get('max') || '';
  const search = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const generateLink = (page: number): string => {
    const params = {
      page: page.toString(),
      sort,
      min,
      max,
      ...(isSearch ? { search } : {}),
    };
    return `?${new URLSearchParams(params)}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Page */}
        <PaginationItem>
          <PaginationPrevious
            href={generateLink(currentPage === 1 ? 1 : currentPage - 1)}
          />
        </PaginationItem>

        {/* Page Links */}
        {totalPages <= 3 ? (
          Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={index + 1 === currentPage}
                href={generateLink(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        ) : (
          <>
            {Array.from({ length: 3 }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink href={generateLink(index + 1)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {/* Next Page */}
        <PaginationItem>
          <PaginationNext
            href={generateLink(
              currentPage === totalPages ? totalPages : currentPage + 1,
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
