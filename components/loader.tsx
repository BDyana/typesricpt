// export default function Loader() {
//   return (
//     <div className="dark:bg:primary absolute inset-x-0 inset-y-0 z-50 flex items-center justify-center bg-background">
//       <div className="loader">
//         <div></div>
//         <div></div>
//         <div></div>
//         <div></div>
//         <div></div>
//       </div>
//     </div>
//   );
// }

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Loader() {
  return (
    <AlertDialog open={true}>
      <AlertDialogTitle className="sr-only">Loading</AlertDialogTitle>
      <AlertDialogContent className="max-w-screen h-full max-h-screen flex items-center justify-center w-full">
        <div className="text4xl">
          <div className="dark:bg:primary flex items-center justify-center bg-background">
            <div className="loader">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
