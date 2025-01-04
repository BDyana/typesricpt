import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { siteConfig } from '@/constants/site';
import { UploadButton } from '@/lib/uploadthing';
import Image from 'next/image';

type ImageInputProps = {
  title: string;
  imageUrl: string;
  setImageUrl: any;
  endpoint: any;
};

export default function ImageInput({
  title,
  imageUrl,
  setImageUrl,
  endpoint,
}: ImageInputProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt={title || siteConfig.name}
            className={`h-40 w-full rounded-md object-cover ${imageUrl === '/placeholder.svg' ? 'invert' : ''}`}
            height="300"
            src={imageUrl}
            width="300"
          />
          <UploadButton
            className="mt-4 ut-button:!cursor-pointer ut-button:bg-brandColor ut-label:text-white ut-label:hover:text-brandBlack/50 ut-button:ut-readying:bg-orange-600/50"
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log('Files: ', res);

              setImageUrl(res[0].url);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
