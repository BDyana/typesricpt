'use client';

import { getRecentlyViewedProducts } from '@/hooks/recently-viewed';
import ProductCard from './product-card';
import { getProductById } from '@/actions/products';
import { useEffect, useState } from 'react';

export default function RecentlyViewedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      const recentIds = getRecentlyViewedProducts();

      if (recentIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        // Fetch products and filter out null/undefined results
        const fetchedProducts = await Promise.all(
          recentIds.map(async (id) => {
            const product = await getProductById(id);
            return product ?? null; // Ensure we don't pass undefined
          })
        );

        setProducts(fetchedProducts.filter(Boolean)); // Remove null values
      } catch (error) {
        console.error('Error fetching recently viewed products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyViewed();
  }, []);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="p-2 my-4 rounded bg-white">
      <h2 className="text-xl font-semibold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {products.map((product) =>
          product ? <ProductCard key={product.id} product={product} /> : null
        )}
      </div>
    </section>
  );
}
