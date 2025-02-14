import React, { Suspense } from 'react';
import CategoryDetailed from './searchDetailed';
import RecentlyViewedProducts from '@/components/(front-end)/recently-viewed';

function SearchBarFallback() {
  return <></>;
}
export default function page() {
  return (
    <Suspense fallback={<SearchBarFallback />}>
      <CategoryDetailed />
      <RecentlyViewedProducts />
    </Suspense>
  );
}
