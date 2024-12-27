interface OrderSummaryProps {
  subTotal: string;
  selectedDelivery: any;
}

export function OrderSummary({
  subTotal,
  selectedDelivery,
}: OrderSummaryProps) {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <p className="text-xl font-semibold text-brandBlack">Order summary</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">
              Original price
            </dt>
            <dd className="text-base font-medium text-brandBlack">
              ৳{subTotal}
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Savings</dt>
            <dd className="text-base font-medium text-green-600">-৳299.00</dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">
              Store Pickup
            </dt>
            <dd className="text-base font-medium text-brandBlack">৳0</dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Tax</dt>
            <dd className="text-base font-medium text-brandBlack">৳0</dd>
          </dl>
        </div>

        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
          <dt className="text-base font-bold text-brandBlack">Subtotal</dt>
          <dd className="text-base font-bold text-brandBlack">৳{subTotal}</dd>
        </dl>
        {selectedDelivery && (
          <div className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">
              Delivery Charge
            </dt>
            <dd className="text-base font-medium text-brandBlack">
              ৳{selectedDelivery.basePrice}
            </dd>
          </div>
        )}
      </div>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="voucher"
            className="mb-2 block text-sm font-medium text-brandBlack"
          >
            {' '}
            Do you have Link voucher or gift card?{' '}
          </label>
          <input
            type="text"
            id="voucher"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-brandBlack focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder=""
            required
          />
        </div>
        <button
          type="submit"
          className="flex bg-brandBlack w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Apply Code
        </button>
      </form>
    </div>
  );
}
