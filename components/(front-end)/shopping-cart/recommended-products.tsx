import Products from '../products';

interface RecommendedProductsProps {
  products: any;
}

export default function RecommendedProducts({
  products,
}: RecommendedProductsProps) {
  return (
    <div className="hidden w-full xl:mt-24 xl:block">
      <h3 className="text-xl font-semibold text-brandBlack">
        People also bought
      </h3>
      <Products
        title=""
        description=""
        products={products}
        buttonTitle="View More"
        className="lg:grid-cols-4 gap-y-2"
      />
    </div>
  );
}
