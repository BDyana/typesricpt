'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Folder, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

interface Category {
  slug: string;
  title: string;
  products: any[];
  imageUrl: string;
}

interface CategoriesDisplayProps {
  categories: Category[] | any;
}

export function CategoriesModal({ categories }: CategoriesDisplayProps) {
  const [shuffledCategories, setShuffledCategories] = useState<Category[]>([]);

  useEffect(() => {
    setShuffledCategories([...categories].sort(() => 0.5 - Math.random()));
  }, [categories]);

  return (
    <Card className="py-12 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-brandColor bg-clip-text text-transparent">
          Explore Our Categories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {shuffledCategories.map((category, index) => (
            <div
              key={category.slug}
              className="opacity-0 translate-y-4 animate-[fade-in-up_0.3s_ease-out_forwards]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Link href={`/categories/${category.slug}`}>
                <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                    <Image
                      width={300}
                      height={300}
                      src={category.imageUrl}
                      className="w-14 h-14 mb-3 text-primary group-hover:text-brandColor transition-colors duration-300"
                      alt={category.title}
                    />
                    <h3 className="font-semibold text-sm mb-2 group-hover:text-brandColor transition-colors duration-300">
                      {category.title}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="group-hover:bg-brandColor group-hover:text-white transition-colors duration-300"
                    >
                      <ShoppingBag className="w-3 h-3 mr-1" />
                      {category.products.length}
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
