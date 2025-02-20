'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export default function Sorting({ slug }: { slug?: string | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const sortParam = searchParams.get('sort');
  const min = searchParams.get('min') || '0';
  const max = searchParams.get('max') || '';
  const search = searchParams.get('search') || '';
  const page = Number.parseInt(searchParams.get('page') || '1', 10);

  const sortingLinks = [
    {
      title: 'Relevance',
      href: `/search?search=${search}`,
      sort: null,
    },
    {
      title: 'Price - High to Low',
      href: `/search?search=${search}&page=${page}&sort=desc&min=${min}&max=${max}`,
      sort: 'desc',
    },
    {
      title: 'Price - Low to High',
      href: `/search?search=${search}&page=${page}&sort=asc&min=${min}&max=${max}`,
      sort: 'asc',
    },
  ];

  const activeSortTitle =
    sortingLinks.find((link) => link.sort === sortParam)?.title || 'Relevance';

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
      <h2 className="text-2xl font-bold">
        {slug
          ?.split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}
      </h2>
      <div className="flex items-center space-x-3">
        <p className="text-sm">Sort by :</p>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[160px] justify-between">
              {activeSortTitle}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[160px]">
            {sortingLinks.map((link, i) => (
              <DropdownMenuItem key={i} asChild>
                <Link
                  href={link.href}
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
