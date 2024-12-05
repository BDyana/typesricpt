export const calculateDiscountPercentage = (
  originalPrice: any,
  salePrice: any,
) => {
  if (originalPrice <= 0) {
    throw new Error('Original price must be greater than 0');
  }
  if (salePrice < 0) {
    throw new Error('Sale price cannot be negative');
  }

  // Calculate the discount amount
  const discountAmount = originalPrice - salePrice;

  // Calculate the discount percentage
  const discountPercentage = (discountAmount / originalPrice) * 100;

  return discountPercentage.toFixed(0); // Return the result rounded to 2 decimal places
};
