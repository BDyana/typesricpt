import React, { Suspense } from 'react';
import CategoryDetailed from './searchDetailed';

function SearchBarFallback() {
  return <></>;
}
export default function page() {
  return (
    <Suspense fallback={<SearchBarFallback />}>
      <CategoryDetailed />
    </Suspense>
  );
}
