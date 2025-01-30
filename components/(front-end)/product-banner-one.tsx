'use client';

import Image from "next/image";
import Link from "next/link";

export default function ProductBannerOne() {
    return (
        <div className="grid grid-cols-12 gap-4">
            <Link href="https://www.bdyana.com/categories/food-supplements" className="col-span-4">
                <Image 
                    src="/Karkuma-food-banner.png" // Update the path to start with "/"
                    alt="Product banner image"
                    height={245} 
                    width={385} 
                />
            </Link>
            <Link href="https://www.bdyana.com/categories/dried-fruits--raisins" className="col-span-4">
                <Image 
                    src="/Dry-fruits-banner.png" // Update the path to start with "/"
                    alt="Product banner image"
                    height={245} 
                    width={385} 
                />
            </Link>
            <Link href="https://www.bdyana.com/categories/sunflower-oil" className="col-span-4">
                <Image 
                    src="/Sunflower oil Banner.png" // Update the path to start with "/"
                    alt="Product banner image"
                    height={245} 
                    width={385} 
                />
            </Link>
        </div>
    )
}
