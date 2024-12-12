import { getBannerById } from '@/actions/banners';
import BannerForm from '@/components/forms/banner-form';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const banner = await getBannerById(id);

  return (
    <div className="p-8">
      <BannerForm initialData={banner} editingId={id} />
    </div>
  );
}
