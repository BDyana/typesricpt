import {
  AlignJustify,
  BookHeart,
  Building2,
  Cable,
  ChevronRight,
  Cpu,
  Factory,
  Laptop,
  Luggage,
  Microwave,
  PawPrint,
  ShoppingBasket,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';

export default async function SidebarMenu() {
  return (
    <div className="sm:col-span-3 sm:block bg-white border border-gray-300 rounded-sm   text-slate-800 hidden">
      <h2 className="bg-slate-100  py-2 px-4 font-semibold border-b border-gray-300  text-slate-800 ">
        Shop By Category
      </h2>

      <div className="py-2 h-[350px] flex flex-col gap-2 text-sm relative">
        <ul className="">
          <li className="">
            <Link
              href="https://www.bdyana.com/project/industrial-machineries"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Factory className="text-slate-500" size={16} />
              <span className="text-sm">Industrial Machineries</span>
              <ChevronRight className="mr-1 shrink-0 w-4 h-4 text-slate-400 right-0 absolute hidden group-hover:block" />
            </Link>
          </li>
          <li className="group">
            <Link
              href="/categories/garments-accessories"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Building2 className="text-slate-500" size={16} />
              <span className="text-sm">Garments & Accessories</span>
              <ChevronRight className="mr-1 shrink-0 w-4 h-4 text-slate-400 right-0 absolute hidden group-hover:block" />
            </Link>
            <ul className="absolute left-[275px] top-0 z-10 w-full px-3 py-1 bg-white h-[340px] hidden group-hover:block">
              <h3 className="mb-1">Thread/Yarn</h3>
              <li className="py-1">
                <Link
                  href="/categories/wool-thread"
                  className="hover:text-black transition-all"
                >
                  Wool Thread
                </Link>
              </li>
              <li className="py-0.5">
                <Link className="hover:text-black transition-all" href="">
                  Samarian Thread
                </Link>
              </li>
              <li className="py-0.5">
                <Link className="hover:text-black transition-all" href="">
                  Malaikot Thread
                </Link>
              </li>
              <li className="py-0.5">
                <Link className="hover:text-black transition-all" href="">
                  Crochet Thread
                </Link>
              </li>
              <li className="py-0.5">
                <Link
                  className="hover:text-black transition-all"
                  href="/categories/lacchi-suta"
                >
                  Lacchi Thread
                </Link>
              </li>
            </ul>
          </li>
          <li className="">
            <Link
              href="/project/computer-hardware"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Laptop className="text-slate-500" size={16} />
              <span className="text-sm">Computer & Hardware</span>
            </Link>
          </li>
          <li className="">
            <Link
              href="/project/gadget-accessories"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Cpu className="text-slate-500" size={16} />
              <span className="text-sm">Gadget & Accessories</span>
            </Link>
          </li>
          <li className="">
            <Link
              href="/project/mens-fashion"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Luggage className="text-slate-500" size={16} />
              <span className="text-sm">Men's Fashion</span>
            </Link>
          </li>
          <li className="group">
            <Link
              href="/project/womens-girls-fashion"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <BookHeart className="text-slate-500" size={16} />
              <span className="text-sm">Women's & Girls' Fashion</span>
            </Link>
            <ul className="absolute left-[275px] top-0 z-10 w-full px-3 py-1 bg-white h-[340px] hidden group-hover:block">
              <h3 className="mb-1">Ladies Bag</h3>
              <li className="hover:text-blue-700">
                <Link className="hover:text-blue-700" href="">
                  Party Bag
                </Link>
              </li>
              <li className="hover:text-blue-700">
                <Link className="hover:text-blue-700" href="">
                  Canvas Bag
                </Link>
              </li>
              <li className="hover:text-blue-700">
                <Link className="hover:text-blue-700" href="">
                  Hand Bag
                </Link>
              </li>
              <li className="hover:text-blue-700">
                <Link className="hover:text-blue-700" href="">
                  Casual Bag
                </Link>
              </li>
            </ul>
          </li>
          <li className="group">
            <Link
              href="/project/mothers-kids"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <PawPrint className="text-slate-500" size={16} />
              <span className="text-sm">Mothers & Kids</span>
              <ChevronRight className="mr-1 shrink-0 w-4 h-4 text-slate-400 right-0 absolute hidden group-hover:block" />
            </Link>
            <ul className="absolute left-[275px] top-0 z-10 w-full px-3 py-1 bg-white h-[340px] hidden group-hover:block">
              <h3 className="mb-1">Baby Food</h3>
              <li className="py-1 hover:text-blue-700">
                <Link
                  className="hover:text-blue-700"
                  href="/categories/lactogen"
                >
                  Lactogen
                </Link>
              </li>
              <li className="py-1 hover:text-blue-700">
                <Link
                  className="hover:text-blue-700"
                  href="/categories/cerelac"
                >
                  Cerelac
                </Link>
              </li>
            </ul>
          </li>
          <li className="">
            <Link
              href="/project/grocery-beverage"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <ShoppingBasket className="text-slate-500" size={16} />
              <span className="text-sm">Grocery & Beverage</span>
            </Link>
          </li>
          <li className="">
            <Link
              href="/project/home-appliance"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Microwave className="text-slate-500" size={16} />
              <span className="text-sm">Home Appliancce</span>
            </Link>
          </li>
          <li className="">
            <Link
              href="/project/electronics-device"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Cable className="text-slate-500" size={16} />
              <span className="text-sm">Electronics Device</span>
            </Link>
          </li>
          <li className="">
            <Link
              href="/project/sports-entertainment"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Trophy className="text-slate-500" size={16} />
              <span className="text-sm">Sports & Entertainment</span>
            </Link>
          </li>
          <li className="">
            <Link
              href="/categories"
              target="_blank"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all text-slate-800"
            >
              <AlignJustify className="text-slate-500" size={16} />
              <span className="text-sm font-semibold">All Categories</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
