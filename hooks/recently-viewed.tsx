'use client';

import { useEffect } from 'react';

const RECENTLY_VIEWED_KEY = 'recently_viewed_products';
const MAX_RECENT_PRODUCTS = 10; // Limiting the number of stored products

export const useRecentlyViewed = (productId: string) => {
  console.log('ProductId:', productId);

  useEffect(() => {
    if (!productId) return;

    // Get existing items
    const existingItems = JSON.parse(
      localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]',
    );

    // Check if product already exists
    if (!existingItems.includes(productId)) {
      // Add the current product to the beginning
      const updatedItems = [productId, ...existingItems].slice(
        0,
        MAX_RECENT_PRODUCTS,
      );

      // Save back to localStorage
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updatedItems));
    }
  }, [productId]);
};

export const getRecentlyViewedProducts = (): string[] => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
};
