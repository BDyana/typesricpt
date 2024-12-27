interface OrderSummaryProps {
  subTotal: string;
  selectedDelivery: any;
}

export function OrderSummary({ subTotal, selectedDelivery }: OrderSummaryProps) {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <p className="text-xl font-semibold text-brandBlack">Order summary</p>
      {/* Order summary content */}
      {/* ... */}
    </div>
  );
}

