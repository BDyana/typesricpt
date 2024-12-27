import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Loader() {
  return (
    <AlertDialog open={true}>
      <AlertDialogTitle className="sr-only">Loading</AlertDialogTitle>
      <AlertDialogContent className="!rounded-none max-w-screen h-full max-h-screen flex items-center justify-center w-full">
        <div className="text4xl">
          <div className="flex items-center justify-center">
            <div className="loader">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
