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
    <div className="sm:col-span-3 sm:block bg-white border border-gray-300 rounded-sm hidden">
      <h2 className="bg-slate-100  py-2 px-4 font-semibold border-b border-gray-300">
        Shop By Category
      </h2>

      <div className="py-2 h-[350px] flex flex-col gap-2 text-sm relative">
        <ul className="">
          <li className="">
            <Link
              href="#"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Factory size={16} />
              <span className="text-sm">Industrial Machineries</span>
              <ChevronRight className="mr-1 shrink-0 w-4 h-4 right-0 absolute hidden group-hover:block" />
            </Link>
          </li>
          <li className="group">
            <Link
              href="/categories/garments-accessories"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Building2 size={16} />
              <span className="text-sm">Garments & Accessories</span>
              <ChevronRight className="mr-1 shrink-0 w-4 h-4 right-0 absolute hidden group-hover:block" />
            </Link>
            <ul className="absolute left-[275px] top-0 z-10 w-full px-3 py-1 bg-white h-[340px] hidden group-hover:block">
              <div>
                <h3 className="mb-1">Thread/Yarn</h3>
                <li className="">
                  <Link
                    href="/categories/wool-thread"
                    className="hover:text-black transition-all"
                  >
                    Wool Thread
                  </Link>
                </li>
                <li className="">
                  <Link className="hover:text-black transition-all" href="">
                    Samarian Thread
                  </Link>
                </li>
                <li className="">
                  <Link className="hover:text-black transition-all" href="">
                    Malaikot Thread
                  </Link>
                </li>
                <li className="">
                  <Link className="hover:text-black transition-all" href="">
                    Crochet Thread
                  </Link>
                </li>
                <li className="">
                  <Link
                    className="hover:text-black transition-all"
                    href="/categories/lacchi-suta"
                  >
                    Lacchi Thread
                  </Link>
                </li>
              </div>
            </ul>
          </li>
          <li className="">
            <Link
              href="#"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Laptop size={16} />
              <span className="text-sm">Computer & Hardware</span>
            </Link>
          </li>
          <li className="group">
            <Link
              href="/categories/gadget-accessories"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Cpu size={16} />
              <span className="text-sm">Mobile & Gadget</span>
              <ChevronRight className="mr-1 shrink-0 w-4 h-4 right-0 absolute hidden group-hover:block" />
            </Link>
            <ul className="absolute left-[275px] top-0 z-10 w-full px-3 py-1 bg-white h-[340px] hidden group-hover:block">
              <div>
                <h3 className="mb-1">SmartPhone Brand</h3>
                <li className="">
                  <Link
                    href="/categories/smartphone"
                    className="hover:text-black transition-all"
                  >
                    Infinix
                  </Link>
                </li>
              </div>
            </ul>
          </li>
          <li className="">
            <Link
              href="#"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Luggage size={16} />
              <span className="text-sm">Men's Fashion</span>
            </Link>
          </li>
          <li className="group">
            <Link
              href="/categories/three-pieces"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <BookHeart size={16} />
              <span className="text-sm">Women's & Girls' Fashion</span>
              <ChevronRight className="mr-1 shrink-0 w-4 h-4 right-0 absolute hidden group-hover:block" />
            </Link>
            <ul className="absolute left-[275px] top-0 z-10 w-full px-3 py-1 bg-white h-[340px] hidden group-hover:block space-y-3 text-gray-600">
              <div>
                <h3 className="mb-1 text-gray-800">Beauty & Bodycare</h3>
                <li className="hover:text-blue-700">
                  <Link className="hover:text-blue-700" href="/categories/cleanser">
                    Cleanser
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link className="hover:text-blue-700" href="/categories/facewash">
                    Facewash
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link className="hover:text-blue-700" href="/categories/hair-oil">
                    Hair Oil
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link className="hover:text-blue-700" href="/categories/toner">
                    Toner
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link className="hover:text-blue-700" href="/categories/serum">
                    Serum
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link className="hover:text-blue-700" href="/categories/moisturiser-cream">
                    Moisturiser Cream
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link className="hover:text-blue-700" href="/categories/moisturising-lotion">
                    Moisturising Lotion
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link className="hover:text-blue-700" href="/categories/repair-cream">
                    Repair Cream
                  </Link>
                </li>
              </div>
              <div>
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
              </div>
            </ul>
          </li>
          <li className="group">
            <Link
              href="/categories/lactogen"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <PawPrint size={16} />
              <span className="text-sm">Mothers & Kids</span>
              <ChevronRight className="mr-1 shrink-0 w-4 h-4 right-0 absolute hidden group-hover:block" />
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
          <li className="group">
            <Link
              href="/categories/grocery"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <ShoppingBasket size={16} />
              <span className="text-sm">Grocery & Beverage</span>
              <ChevronRight className="mr-1 shrink-0 w-4 h-4 right-0 absolute hidden group-hover:block" />
            </Link>
            <ul className="absolute left-[275px] top-0 z-10 w-full px-3 py-1 bg-white h-[340px] hidden group-hover:block space-y-3">
              <div className="">
                <h3 className="mb-1">Grocery</h3>
                <li className="hover:text-blue-700">
                  <Link
                    className="hover:text-blue-700"
                    href="/categories/rice"
                  >
                    Rice
                  </Link>
                </li>
              </div>
              <div className="">
                <h3 className="mb-1">Beverage</h3>
                <li className="hover:text-blue-700">
                  <Link
                    className="hover:text-blue-700"
                    href="/categories/coffee"
                  >
                    Coffee
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link
                    className="hover:text-blue-700"
                    href="/categories/cerelac"
                  >
                    Apple Cider Viengar
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link
                    className="hover:text-blue-700"
                    href="/categories/rice"
                  >
                    Dry Fruits
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link
                    className="hover:text-blue-700"
                    href="/categories/cerelac"
                  >
                    Organic Food
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link
                    className="hover:text-blue-700"
                    href="/categories/cerelac"
                  >
                    Coconut Oil
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link
                    className="hover:text-blue-700"
                    href="/categories/cerelac"
                  >
                    Coconut Milk
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link
                    className="hover:text-blue-700"
                    href="/categories/food-supplements"
                  >
                    Food Supplements
                  </Link>
                </li>
              </div>
            </ul>
          </li>
          <li className="group">
            <Link
              href="#"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Microwave size={16} />
              <span className="text-sm">Home Appliancce</span>
              <ChevronRight className="mr-1 shrink-0 w-4 h-4 right-0 absolute hidden group-hover:block" />
            </Link>
            <ul className="absolute left-[275px] top-0 z-10 w-full px-3 py-1 bg-white h-[340px] hidden group-hover:block space-y-3">
              <div className="">
                {/* <h3 className="mb-1">Grocery</h3> */}
                <li className="hover:text-blue-700">
                  <Link
                    className="hover:text-blue-700"
                    href="/categories/water-heater"
                  >
                    Geyser
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link
                    className="hover:text-blue-700"
                    href="/categories/rice-cooker"
                  >
                    Rice Cooker
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link href="/categories/electric-blender"
                  >
                    Blender
                  </Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link
                    className="hover:text-blue-700"
                    href="/categories/electric-kettle"
                  >
                    Kettle
                  </Link>
                </li>
              </div>
            </ul>
          </li>
          <li className="">
            <Link
              href="#"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Cable size={16} />
              <span className="text-sm">Electronics Device</span>
            </Link>
          </li>
          <li className="">
            <Link
              href="#"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <Trophy size={16} />
              <span className="text-sm">Sports & Entertainment</span>
            </Link>
          </li>
          <li className="">
            <Link
              href="/categories"
              target="_blank"
              className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
            >
              <AlignJustify size={16} />
              <span className="text-sm font-semibold">All Categories</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
