'use client';

import AddToCartButton from '@/components/(front-end)/add-to-cart';
import ProductShareButton from '@/components/(front-end)/product-share-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Category, Product } from '@prisma/client';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ProductModalProps {
  product: Product;
  category: Category;
}

export default function Modal({ product, category }: ProductModalProps) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState('green');
  const [mainImage, setMainImage] = useState(0);

  const thumbnails = [
    '/placeholder.svg?height=80&width=80',
    '/placeholder.svg?height=80&width=80',
    '/placeholder.svg?height=80&width=80',
    '/placeholder.svg?height=80&width=80',
  ];

  const colorOptions = [
    { name: 'Green', color: 'bg-[#8DB355]' },
    { name: 'Yellow', color: 'bg-[#F8D949]' },
    { name: 'Light Red', color: 'bg-[#D65C5C]' },
    { name: 'Dark Red', color: 'bg-[#A61C1C]' },
  ];

  const benefits = [
    'Apples are nutricious',
    'Apples may be good for weight loss',
    'Apples may be good for bone health',
    "They're linked to a lowest risk of diabetes",
  ];

  const base_url = process.env.NEXTAUTH_URL as string;

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-4xl shadow-lg">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>
        <div className="rounded-2xl w-full grid md:grid-cols-2 overflow-hidden">
          {/* Left side - Image section */}
          <div className="relative bg-white p-6 flex flex-col">
            <div className="flex justify-between mb-4">
              <ProductShareButton
                urlToShare={`${base_url}/products/${product.slug}`}
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white hover:bg-white/20"
              >
                <Heart className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-1 relative">
              <Image
                src={product.imageUrl as string}
                alt={`Bdyana | ${product.title}`}
                width={400}
                height={400}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {product.productImages.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`bg-white rounded-lg p-2 ${
                    mainImage === index ? 'ring-2 ring-black' : ''
                  }`}
                >
                  <Image
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Product details */}
          <div className="p-6 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800">
              {product.title}
            </h2>

            <p className="text-gray-500 text-sm w-full">
              {product.sku && `COD: ${product.sku}`}
              <span className="text-gray-500  ml-3 text-sm">
                from:
                <Link
                  className="fotn-bold ml-1 text-black underline"
                  rel="stylesheet"
                  href={`${base_url}/${category.slug}`}
                >
                  {category.title}
                </Link>
              </span>
            </p>

            <div className="mt-6">
              <span className="text-sm text-gray-500">BDT</span>
              <span className="text-5xl font-light text-gray-800 ml-1">
                {product.salePrice}
              </span>
            </div>

            <div className="mt-8">
              <h3 className="text-sm text-gray-500 uppercase tracking-wide">
                Select a color
              </h3>
              <div className="flex gap-2 mt-2">
                {colorOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => setSelectedColor(option.name.toLowerCase())}
                    className={`w-8 h-8 rounded-full ${option.color} ${
                      selectedColor === option.name.toLowerCase()
                        ? 'ring-2 ring-black ring-offset-2'
                        : ''
                    }`}
                  >
                    <span className="sr-only">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm text-gray-500 uppercase tracking-wide">
                Benefits
              </h3>
              <ul className="mt-2 space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="py-4 w-full">
              <AddToCartButton
                className="w-full hover:bg-brandColor hover:translate-x-4 focus:outline-none focus:ring focus:ring-violet-300 justify-center"
                product={product}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
