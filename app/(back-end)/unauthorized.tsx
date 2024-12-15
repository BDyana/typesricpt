'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md text-center">
        <AlertCircle className="mx-auto mb-4 size-16 text-red-500" />
        <h1 className="mb-2 text-2xl font-bold">Unauthorized Access</h1>
        <p className="mb-4 text-gray-600">
          You do not have permission to access this page.
        </p>
        <Button asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
