import React, { Suspense } from 'react';
import VerifyMail from './verify-mail';

function SearchBarFallback() {
  return <></>;
}
export default function page() {
  return (
    <Suspense fallback={<SearchBarFallback />}>
      <VerifyMail />
    </Suspense>
  );
}
