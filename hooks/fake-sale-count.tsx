'use client';

import { useEffect, useState } from 'react';

export default function FakeSalesCount() {
  const [salesCount, setSalesCount] = useState(0);

  useEffect(() => {
    const randomSales = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
    setSalesCount(randomSales);
  }, []);

  return (
    <div className="text-green-800 text-sm font-semibold">
      {salesCount.toLocaleString()}K+ Sales
    </div>
  );
}
