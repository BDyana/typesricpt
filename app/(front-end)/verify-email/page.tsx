import React, { Suspense } from 'react';
import VerifyMail from './verify-mail';
import { getUsers } from '@/actions/users';

function SearchBarFallback() {
  return <></>;
}
export default async function page() {
  const usersData = await getUsers();
  const users = usersData?.data;
  return (
    <Suspense fallback={<SearchBarFallback />}>
      <div className="h-screen flex items-center justify-center">
        <VerifyMail users={users as any} />
      </div>
    </Suspense>
  );
}
