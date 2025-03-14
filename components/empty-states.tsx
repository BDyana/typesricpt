import { EqualApproximately, Package, SearchX } from 'lucide-react';

// This is a base component for consistent empty state styling
const EmptyStateWrapper = ({ children }: any) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
    <div className="max-w-md text-center space-y-6">{children}</div>
  </div>
);

// Component for when no products are found
export const NoProductsFound = () => (
  <EmptyStateWrapper>
    <div className="bg-gray-100 rounded-full p-3 w-16 h-16 mx-auto">
      <SearchX className="w-10 h-10 text-gray-500" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900">No Products Found</h3>
    <p className="text-gray-600">
      We couldn't find any products matching your criteria. Try adjusting your
      filters or search terms.
    </p>
  </EmptyStateWrapper>
);

// Component for when category doesn't exist
export const CategoryNotFound = () => (
  <EmptyStateWrapper>
    <div className="bg-gray-100 rounded-full p-3 w-16 h-16 mx-auto">
      <EqualApproximately className="w-10 h-10 text-gray-500" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900">Category Not Found</h3>
    <p className="text-gray-600">
      The category you're looking for doesn't exist or might have been removed.
    </p>
  </EmptyStateWrapper>
);

export const BrandNotFound = () => (
  <EmptyStateWrapper>
    <div className="bg-gray-100 rounded-full p-3 w-16 h-16 mx-auto">
      <EqualApproximately className="w-10 h-10 text-gray-500" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900">Brand Not Found</h3>
    <p className="text-gray-600">
      The brand you're looking for doesn't exist or might have been removed.
    </p>
  </EmptyStateWrapper>
);

// Component for empty category (when category exists but has no products)
export const EmptyCategory = ({ categoryName = 'this category' }) => (
  <EmptyStateWrapper>
    <div className="bg-gray-100 rounded-full p-3 w-16 h-16 mx-auto">
      <Package className="w-10 h-10 text-gray-500" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900">No Products Yet</h3>
    <p className="text-gray-600">
      There are currently no products available in {categoryName}. Please check
      back later.
    </p>
  </EmptyStateWrapper>
);

export const EmptyBrand = ({ brandName = 'this brand' }) => (
  <EmptyStateWrapper>
    <div className="bg-gray-100 rounded-full p-3 w-16 h-16 mx-auto">
      <Package className="w-10 h-10 text-gray-500" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900">No Products Yet</h3>
    <p className="text-gray-600">
      There are currently no products available in {brandName}. Please check
      back later.
    </p>
  </EmptyStateWrapper>
);

// Default export that handles all cases
const EmptyStates = {
  NoProducts: NoProductsFound,
  NoCategory: CategoryNotFound,
  NoBrand: BrandNotFound,
  EmptyCategory: EmptyCategory,
  EmptyBrand: EmptyBrand,
};

export default EmptyStates;
