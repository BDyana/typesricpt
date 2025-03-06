'use client';
import Image from "next/image";
import Link from "next/link";
const loaderProp = ({ src }: any) => {
    return src;
  };
export default function ProductBannerOne() {
    return (
        <div className="grid grid-cols-12 lg:gap-4 gap-2 my-6">
            <Link href="https://www.bdyana.com/categories/food-supplements" className="lg:col-span-4 col-span-6">
                <Image 
                    src="/Karkuma-food-banner.png" // Update the path to start with "/"
                    alt="Product banner image"
                    height={245} 
                    width={385}
                    loader={loaderProp}
                />
            </Link>
            <Link href="https://www.bdyana.com/categories/dried-fruits--raisins" className="lg:col-span-4 col-span-6">
                <Image 
                    src="/Dry-fruits-banner.png" // Update the path to start with "/"
                    alt="Product banner image"
                    height={245} 
                    width={385}
                    loader={loaderProp}
                />
            </Link>
            <Link href="https://www.bdyana.com/categories/sunflower-oil" className="lg:col-span-4 col-span-6 lg:flex hidden">
                <Image 
                    src="/Sunflower oil Banner.png" // Update the path to start with "/"
                    alt="Product banner image"
                    height={245} 
                    width={385}
                    loader={loaderProp}
                />
            </Link>
        </div>
    )
}
