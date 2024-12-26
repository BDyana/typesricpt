import { getAllCategories } from '@/actions/categories';
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
  const categories = await getAllCategories();
  const displayCategories = categories?.data?.slice(0, 11);

  // Create array of available icons
  const icons = [
    Factory,
    Building2,
    Laptop,
    Cpu,
    Luggage,
    BookHeart,
    PawPrint,
    ShoppingBasket,
    Microwave,
    Cable,
    Trophy,
  ];

  // Function to get random icon
  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
  };

  return (
    <div className="sm:col-span-3 sm:block bg-white border border-gray-300 rounded-sm text-slate-800 hidden">
      <h2 className="bg-slate-100 py-2 px-4 font-semibold border-b border-gray-300 text-slate-800">
        Shop By Category
      </h2>

      <div className="py-2 h-[350px] flex flex-col gap-2 text-sm relative">
        <ul className="">
          {displayCategories?.map((category: any) => {
            const RandomIcon = getRandomIcon();

            return (
              <li
                key={category.id}
                className={category.subCategories?.length ? 'group' : ''}
              >
                <Link
                  href={`/categories/${category.slug}`}
                  prefetch={true}
                  className="pl-3 py-1 flex items-center gap-3 hover:bg-slate-100 duration-300 transition-all"
                >
                  <RandomIcon className="text-slate-500" size={16} />
                  <span className="text-sm">{category.title}</span>
                  {category.subCategories?.length > 0 && (
                    <ChevronRight className="mr-1 shrink-0 w-4 h-4 text-slate-400 right-0 absolute hidden group-hover:block" />
                  )}
                </Link>

                {category.subCategories?.length > 0 && (
                  <ul className="absolute left-[275px] top-0 z-10 w-full px-3 py-1 bg-white h-[340px] hidden group-hover:block">
                    <h3 className="mb-1">{category.name}</h3>
                    {category.subCategories.map((subCategory: any) => (
                      <li key={subCategory.id} className="py-0.5">
                        <Link
                          href={`/categories/${category.slug}/${subCategory.slug}`}
                          className="hover:text-black transition-all"
                        >
                          {subCategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}

          <li>
            <Link
              href="/categories"
              prefetch={true}
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
