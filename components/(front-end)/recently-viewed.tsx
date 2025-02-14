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
        // Replace this with your actual API call to fetch products by IDs
        const fetchedProducts = await Promise.all(
          recentIds.map((id) => getProductById(id)),
        );

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching recently viewed products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyViewed();
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
