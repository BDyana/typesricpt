import { getAllCategories } from '@/actions/categories';
import AnalyticsDashboard from '@/components/analytics-dashboard';

export default async function Page() {
  const categoriesData = await getAllCategories();
  const categories = categoriesData?.data;
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <AnalyticsDashboard categories={categories} />
    </div>
  );
}
