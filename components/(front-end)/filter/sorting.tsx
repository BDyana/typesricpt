'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Sorting() {
  const searchParams = useSearchParams();
  const sortParam = searchParams.get('sort');
  const min = searchParams.get('min') || '0';
  const max = searchParams.get('max') || '';
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

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

  return (
    <div className="lg:flex items-center justify-between">
      <h2 className="text-2xl font-bold">Search Results</h2>
      <div className="flex text-sm items-center gap-3 lg:mt-0 mt-5">
        <p>Sort by:</p>
        <div className="flex items-center gap-1">
          {sortingLinks.map((link, i) => {
            const isActive = link.sort === sortParam;

            return (
              <Link
                key={i}
                href={link.href}
                className={`${
                  isActive
                    ? 'text-sm text-white font-medium bg-brandBlack px-3 py-1 border border-gray-700'
                    : 'border border-slate-500 px-2 py-1'
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
