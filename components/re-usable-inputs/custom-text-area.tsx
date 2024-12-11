import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
type TextAreaProps = {
  register: any;
  errors: any;
  label: string;
  name: string;
  helperText?: string;
};
export default function CustomTextArea({
  register,
  errors,
  label,
  name,
  helperText = '',
}: TextAreaProps) {
  return (
    <div className="col-span-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <Textarea
          id={name}
          {...register(`${name}`, { required: true })}
          rows={3}
          className={cn(
            'block w-full border-brandBlack',
            errors[`${name}`] && 'focus:ring-red-500',
          )}
        />
        {errors[`${name}`] && (
          <span className="text-xs text-red-600">Description is required</span>
        )}
      </div>
      {helperText && (
        <p className="mt-1 text-sm leading-6 text-gray-600">{helperText}</p>
      )}
    </div>
  );
}
