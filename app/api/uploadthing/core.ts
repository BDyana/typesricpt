import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
const f = createUploadthing();
const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function
export const ourFileRouter = {
  categoryImageUploader: f({ image: { maxFileSize: '1MB' } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: 'BDyana' };
    }),
  brandImageUploader: f({ image: { maxFileSize: '1MB' } })
      .onUploadComplete(async ({ metadata, file }) => {
        console.log('file url', file.url, metadata);
        return { uploadedBy: 'BDyana' };
      }),
  bannerImageUploader: f({ image: { maxFileSize: '2MB' } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: 'BDyana' };
    }),
  marketLogoUploader: f({ image: { maxFileSize: '1MB' } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: 'BDyana' };
    }),
  productImageUploader: f({ image: { maxFileSize: '1MB' } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: 'BDyana' };
    }),
  trainingImageUploader: f({ image: { maxFileSize: '1MB' } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: 'BDyana' };
    }),
  farmerProfileUploader: f({ image: { maxFileSize: '1MB' } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: 'BDyana' };
    }),
  customerProfileUploader: f({ image: { maxFileSize: '1MB' } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: 'BDyana' };
    }),
  multipleProductsUploader: f({
    image: { maxFileSize: '8MB', maxFileCount: 4 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
