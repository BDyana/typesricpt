import Products from '../products';

interface RecommendedProductsProps {
  products: any;
}

export default function RecommendedProducts({
  products,
}: RecommendedProductsProps) {
  return (
    <div className="hidden w-full xl:mt-8 xl:block">
      <h3 className="text-2xl font-semibold text-brandBlack">
        People also bought
      </h3>
      <Products
        title=""
        description=""
        products={products}
        buttonTitle="View More"
        className="lg:grid-cols-5 gap-y-2"
      />
    </div>
  );
}
