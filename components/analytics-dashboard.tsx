'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

// Sales Performance Chart
export function SalesChart() {
  const salesData = [
    { month: 'January', revenue: 28600, orders: 156 },
    { month: 'February', revenue: 34500, orders: 189 },
    { month: 'March', revenue: 32700, orders: 176 },
    { month: 'April', revenue: 29800, orders: 167 },
    { month: 'May', revenue: 35900, orders: 198 },
    { month: 'June', revenue: 38200, orders: 212 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Performance</CardTitle>
        <CardDescription>Revenue & Order Trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium">
              Revenue up 12.4% <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">
              Orders increased by 8.7% this month
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

// Product Categories Distribution
export function CategoryChart({ categories }: any) {
  const categoryData = categories.map((c: any) => {
    return {
      category: c.title,
      products: c.products.length,
    };
  });
  // const categoryData = [
  //   { category: 'Vegetables', products: 145, percentage: 35 },
  //   { category: 'Fruits', products: 98, percentage: 25 },
  //   { category: 'Grains', products: 78, percentage: 20 },
  //   { category: 'Dairy', products: 45, percentage: 12 },
  //   { category: 'Other', products: 34, percentage: 8 },
  // ];

  const totalProducts = useMemo(() => {
    return categoryData.reduce(
      (acc: number, curr: any) => acc + curr.products,
      0,
    );
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Product Categories</CardTitle>
        <CardDescription>Distribution by Category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                }}
              />
              <Pie
                data={categoryData}
                dataKey="products"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
              >
                {categoryData.map((entry: any, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <Label
                  content={({ viewBox }) => {
                    const { cx, cy }: any = viewBox;
                    return (
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={cx}
                          y={cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalProducts}
                        </tspan>
                        <tspan
                          x={cx}
                          y={cy + 20}
                          className="fill-muted-foreground text-sm"
                        >
                          Products
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// User Activity Chart
export function UserActivityChart() {
  const activityData = [
    { month: 'January', farmers: 86, buyers: 245 },
    { month: 'February', farmers: 92, buyers: 278 },
    { month: 'March', farmers: 98, buyers: 312 },
    { month: 'April', farmers: 104, buyers: 345 },
    { month: 'May', farmers: 112, buyers: 389 },
    { month: 'June', farmers: 118, buyers: 412 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>Farmers vs Buyers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                }}
              />
              <Area
                type="monotone"
                dataKey="farmers"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.4}
              />
              <Area
                type="monotone"
                dataKey="buyers"
                stackId="1"
                stroke="hsl(var(--secondary))"
                fill="hsl(var(--secondary))"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium">
              User growth up 15.3% <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">
              Farmer registration increased by 5.4%
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function AnalyticsDashboard({ categories }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl">
      {/* <SalesChart /> */}
      <CategoryChart categories={categories} />

      {/* <UserActivityChart /> */}
    </div>
  );
}
