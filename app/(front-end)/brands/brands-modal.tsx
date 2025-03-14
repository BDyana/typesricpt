'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { siteConfig } from '@/constants/site';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const loaderProp = ({ src }: any) => {
  return src;
};
interface Brand {
  slug: string;
  title: string;
  products: any[];
  imageUrl: string;
}
interface BrandsDisplayProps {
  brands: Brand[] | any;
}
export function BrandsModal({ brands }: BrandsDisplayProps) {
  const [shuffledBrands, setShuffledBrands] = useState<Brand[]>([]);
  useEffect(() => {
    setShuffledBrands([...brands].sort(() => 0.5 - Math.random()));
  }, [brands]);
  return (
    <Card className="py-8 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-brandColor bg-clip-text text-transparent mb-6 ">
          Explore Our Brands
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {shuffledBrands.map((brand, index) => (
            <div
              key={brand.slug}
              className="opacity-0 translate-y-4 animate-[fade-in-up_0.3s_ease-out_forwards]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Link prefetch={true} href={`/brands/${brand.slug}`}>
                <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                    <Image
                      width={300}
                      height={300}
                      loader={loaderProp}
                      src={brand.imageUrl}
                      className="w-14 h-14 mb-3 text-primary group-hover:text-brandColor transition-colors duration-300"
                      alt={brand.title || siteConfig.name}
                    />
                    <h3 className="font-semibold text-sm mb-2 group-hover:text-brandColor transition-colors duration-300">
                      {brand.title}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="group-hover:bg-brandColor group-hover:text-white transition-colors duration-300"
                    >
                      <ShoppingBag className="w-3 h-3 mr-1" />
                      {brand.products.length}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}