import Image from 'next/image';
import React from 'react';

export default function ImageColumn({
  row,
  accessorKey,
}: {
  row: any;
  accessorKey: any;
}) {
  const imageUrl = row.getValue(`${accessorKey}`);
  // const thum = row.getValue(`${accessorKey}`);
  // console.log(imageUrl);
  return (
    <div className="shrink-0">
      <Image
        alt={`${accessorKey}`}
        className="aspect-square w-12 h-12 rounded-md object-cover"
        height={200}
        src={imageUrl ?? ''}
        width={200}
      />
    </div>
  );
}
