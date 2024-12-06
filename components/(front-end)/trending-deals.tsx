import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@prisma/client';

interface IProps {
  categories: (Category & { products: any[] })[] | null | undefined;
}
export default function TrendingDeals({ categories }: IProps) {
  return (
    <div className="w-full bg-white">
      <div className="w-full bg-green-600 shadow-md py-4">
        <h2 className="text-center text-xl font-bold text-white">
          Trending Deals
        </h2>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {categories
            ?.slice(0, 12)
            .filter((category) => category.products.length >= 0)
            .map((category) => (
              <Link
                key={category.title}
                href={`${category.slug}`}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-[3/4] w-full">
                  <Image
                    src={category.imageUrl as string}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />
                  <div className="absolute bottom-0 w-full p-4">
                    <h3 className="text-lg font-bold text-white">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
