'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Check, Circle } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';

export default function PriceFilter() {
  const searchParams = useSearchParams();
  const minParam = searchParams.get('min');
  const maxParam = searchParams.get('max');
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'asc';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const priceRanges = [
    { display: 'Under 300', max: 300 },
    { display: 'Between 300 and 500', max: 500, min: 300 },
    { display: 'Between 500 and 700', max: 700, min: 500 },
    { display: 'Above 700', min: 700 },
  ];

  const router = useRouter();
  const { handleSubmit, reset, register } = useForm();

  const onSubmit = (data: FieldValues) => {
    const { min, max } = data;
    router.push(
      `/search?search=${search}&page=${page}&sort=${sort}&min=${min}&max=${max}`,
    );
    reset();
  };

  return (
    <Card className="w-full bg-transparent shadow-none border-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0 py-0 pb-1">
        <CardTitle className="text-xl font-bold">Filter</CardTitle>
        <Button
          className="h-8"
          onClick={() => router.push(`/search?search=${search}`)}
          variant="outline"
          size="sm"
        >
          Reset
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div>
          {priceRanges.map((range, i) => {
            const isActive =
              (range.min && range.min.toString() === minParam) ||
              (range.max && range.max.toString() === maxParam) ||
              (range.min &&
                range.max &&
                range.min.toString() === minParam &&
                range.max.toString() === maxParam);

            const params = new URLSearchParams(searchParams);
            params.set('page', page.toString());
            params.set('sort', sort);
            if (range.min) params.set('min', range.min.toString());
            if (range.max) params.set('max', range.max.toString());

            const linkHref = `/search?${params.toString()}`;

            return (
              <Link
                key={i}
                href={linkHref}
                className={`flex items-center space-x-2 py-1 rounded-md transition-colors ${
                  isActive
                    ? 'font-semibold py-1 p-0'
                    : 'hover:font-semibold'
                }`}
              >
                {isActive ? (
                  <Circle fill="#000000" className="w-3 h-3" />
                ) : (
                  <Circle className="w-3 h-3" />
                )}
                <span className="text-sm">{range.display}</span>
              </Link>
            );
          })}
        </div>

        <Separator className="my-4" />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input {...register('min')} type="number" placeholder="Min" />
            </div>
            <div>
              <Input {...register('max')} type="number" placeholder="Max" />
            </div>
          </div>
          <Button type="submit" className="bg-brandBlack w-full">
            Apply Filter
          </Button>
        </form>

        {(minParam || maxParam) && (
          <div className="mt-4">
            <Badge variant="secondary" className="text-xs">
              Active Filter:
              {minParam && `Min: ${minParam}`}
              {minParam && maxParam && ' - '}
              {maxParam && `Max: ${maxParam}`}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
