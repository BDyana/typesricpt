'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import ProductCard from '@/components/(front-end)/product-card';
import { useState, useMemo } from 'react';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const favoriteItems = useAppSelector((state) => state.favorite);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return favoriteItems;

    return favoriteItems.filter((item) => {
      // Convert both search query and item fields to lowercase for case-insensitive search
      const query = searchQuery.toLowerCase();
      return (
        item.title?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      );
    });
  }, [favoriteItems, searchQuery]);

  if (favoriteItems?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h1 className="text-xl font-semibold text-muted-foreground">
          You have no favorites yet!
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Favorites</h1>
        <p className="text-muted-foreground">
          Find your saved items and get ready to order them.
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search favorites..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <p className="text-muted-foreground">
            No items found matching &quot;{searchQuery}&quot;
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      )}

      {/* Optional: Show count of filtered items */}
      {searchQuery && filteredItems.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredItems.length} of {favoriteItems.length} items
        </div>
      )}
    </div>
  );
}
