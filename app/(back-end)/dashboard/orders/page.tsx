import { getOrders, getOrdersByUserId } from '@/actions/orders';
import DataTable from '@/components/data-table/data-table';
import { columns } from './columns';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import UserOrders from '@/components/(back-end)/user-orders/orders-page';

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userRole = user?.role;
  const userId = user?.id;

  // Redirect if no session
  if (!session) {
    redirect('/login');
  }

  const ordersData = await getOrders();
  const orders = ordersData?.data;
  const oderData = await getOrdersByUserId(userId as string);

  // console.log(oderData);
  // Conditional rendering based on role
  if (userRole === 'USER') {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        {orders?.length === 0 ? (
          <div className="text-center text-gray-500">
            You have no orders yet.
          </div>
        ) : (
          // <DataTable data={oderData as any} columns={columns} />
          <UserOrders orders={oderData as any} />
        )}
      </div>
    );
  }

  // Default view for admin and other roles
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      <DataTable data={orders as any} columns={columns} />
    </div>
  );
}
