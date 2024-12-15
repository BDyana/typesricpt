import Link from 'next/link';
import SidebarMenu from './sidebar-menu';
import HeroCarousel from './hero-carousel';
import { getBanners } from '@/actions/banners';
import { CircleDollarSign, FolderSync, HelpCircle } from 'lucide-react';
import { Banner } from '@prisma/client';

interface IProps {
  banners: Banner[] | null | undefined;
}
export default function Hero({ banners }: IProps) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <SidebarMenu />
      <div className="col-span-full h-full sm:col-span-7 rounded-md">
        <HeroCarousel banners={banners} />
      </div>
      <div className="col-span-2 hidden sm:block bg-white rounded-sm p-3">
        <Link href="#" className="flex items-center space-x-1 mb-5">
          <CircleDollarSign className="shrink-0 w-5 h-5 text-slate-900" />
          <div className="flex flex-col">
            <h2 className="uppercase text-sm">Wholesale Available</h2>
            <p className="text-[0.75rem]">Call for Details.</p>
          </div>
        </Link>
        <Link href="#" className="flex items-center space-x-1 mb-5">
          <HelpCircle className="shrink-0 w-5 h-5 text-slate-900" />
          <div className="flex flex-col">
            <h2 className="uppercase text-sm">Help Center</h2>
            <p className="text-[0.75rem]">Guide to Customer Care</p>
          </div>
        </Link>
        <Link href="#" className="flex items-center space-x-1 mb-5">
          <FolderSync className="shrink-0 w-5 h-5 text-slate-900" />
          <div className="flex flex-col">
            <h2 className="uppercase text-sm">Easy Return</h2>
            <p className="text-[0.75rem]">Quick Return</p>
          </div>
        </Link>
        <Link
          href="/register-farmer"
          className="flex items-center space-x-1 mb-12"
        >
          <CircleDollarSign className="shrink-0 w-5 h-5 text-slate-900" />
          <div className="flex flex-col">
            <h2 className="uppercase text-sm">Sell on BDyana</h2>
            <p className="text-[0.75rem]">Million of Vistors</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
