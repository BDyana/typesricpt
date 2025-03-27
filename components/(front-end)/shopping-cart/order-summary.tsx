interface OrderSummaryProps {
  subTotal: string;
  selectedDelivery: any;
}

export function OrderSummary({
  subTotal,
  selectedDelivery,
}: OrderSummaryProps) {
  return (
    <div className="space-y-2">
      <p className="text-lg font-semibold text-brandBlack">Order Summary</p>
      <div className="space-y-1">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-sm font-normal text-gray-500">
              Product price
            </dt>
            <dd className="text-sm font-medium text-brandBlack">
              ৳{subTotal}
            </dd>
          </dl>
        </div>
        {selectedDelivery && (
          <div className="flex items-center justify-between gap-4">
            <dt className="text-sm font-normal text-gray-500">
              Delivery Charge
            </dt>
            <dd className="text-sm font-medium text-brandBlack">
              ৳{selectedDelivery.basePrice}
            </dd>
          </div>
        )}
      </div>
    </div>
  );
}
