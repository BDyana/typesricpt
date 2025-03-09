import { Plus } from 'lucide-react';
import Link from 'next/link';

interface IProps {
  heading: string;
  linkTitle: string;
  href: string;
}

export default function CommonHeader({ heading, linkTitle, href }: IProps) {
  return (
    <div className="flex justify-between pb-4">
      <h2 className="text-2xl font-semibold text-brandBlack">{heading}</h2>
      <Link
        className="bg-brandBlack text-white hover:bg-brandBlack/80 focus:outline-none focus:ring-brandColor/70 font-medium rounded-lg text-base px-4 py-2 text-center inline-flex items-center me-2 space-x-2"
        href={href}
      >
        <Plus className="size-4" />
        <span>{linkTitle}</span>
      </Link>
    </div>
  );
}
