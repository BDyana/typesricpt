import Link from 'next/link';
import { Button } from '../ui/button';

export default function CloseButton({
  href,
  parent = 'inventory',
}: {
  href: string;
  parent?: string;
}) {
  return (
    <Button type="button" className="w-full" variant="outline" asChild>
      <Link
        href={
          parent === '' ? `/dashboard${href}` : `/dashboard/${parent}${href}`
        }
      >
        Close
      </Link>
    </Button>
  );
}
