import { Loader, Plus } from 'lucide-react';
import { Button } from '../ui/button';

type SubmitButtonProps = {
  title: string;
  loadingTitle?: string;
  className?: string;
  loaderIcon?: any;
  buttonIcon?: any;
  loading: boolean;
  showIcon?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
};
export default function SubmitButton({
  title,
  loadingTitle = 'Saving Please wait...',
  loading,
  className,
  loaderIcon = Loader,
  buttonIcon = Plus,
  showIcon = true,
}: SubmitButtonProps) {
  const LoaderIcon = loaderIcon;
  const ButtonIcon = buttonIcon;

  return (
    <>
      {loading ? (
        <Button
          type="submit"
          className="w-full py-2 px-4 bg-brandBlack text-white font-semibold rounded-md hover:bg-brandColor transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          <LoaderIcon className="w-4 h-4 animate-spin mr-2" />
          {loadingTitle}
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full py-2 px-4 bg-brandBlack text-white font-semibold rounded-md hover:bg-brandColor transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {showIcon && <ButtonIcon className="w-4 h-4 mr-2" />}
          {title}
        </Button>
      )}
    </>
  );
}
