import { Check } from 'lucide-react';

interface OrderStatusProps {
  currentStatus: 'PROCESSING' | 'DISPATCHED' | 'SHIPPED' | 'DELIVERED';
}

export function OrderStatus({ currentStatus }: OrderStatusProps) {
  const statuses = [
    'PENDING',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'CANCELED',
  ];
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {statuses.map((status, index) => (
          <div key={status} className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 
              ${index <= currentIndex ? 'bg-green-500 text-primary-foreground' : 'bg-muted'}`}
            >
              {index <= currentIndex && <Check className="w-4 h-4" />}
            </div>
            <span className="text-sm font-medium">{status}</span>
          </div>
        ))}
      </div>
      <div className="relative w-full h-2 bg-muted rounded-full mt-2">
        <div
          className="absolute left-0 h-full bg-green-500 rounded-full transition-all duration-500"
          style={{ width: `${(currentIndex + 1) * (100 / 4)}%` }}
        />
      </div>
    </div>
  );
}
