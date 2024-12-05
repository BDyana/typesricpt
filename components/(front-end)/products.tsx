'use client';

import { Product } from '@prisma/client';
import { Button } from '../ui/button';
import ProductCard from './product-card';

interface IProps {
  title: string;
  description: string;
  products: [];
}
export default function Products({ title, description, products }: IProps) {
  // const [productsList, setProductsList] = useState<Product[]>([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const latestProducts = await getLatestProducts(12);
  //     setProductsList(latestProducts);
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <div className="lg:pt-8 pt-6 pb-4">
      <div className="flex px-3 pb-3 justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <h4 className="xs">{description}</h4>
        </div>
        <Button className="px-8 bg-brandColor h-8">View all</Button>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 lg:mt-3 mt-1.5 -mx-1">
        {products.map((product: Product) => (
          <div key={product.id}>
            <ProductCard product={product as any} />
          </div>
        ))}
      </div>
    </div>
  );
}
