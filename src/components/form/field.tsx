import { type FieldValues, type RegisterOptions, useFormContext } from 'react-hook-form';
import { errorMessageClassName, inputClassName, labelClassName } from 'src/components/form';
import cm from 'src/utils/class-merge';

interface Props<T> {
  label: string;
  placeholder?: string;
  fieldKey: T;
  options?: RegisterOptions<FieldValues>;
  className?: string;
}

export function FormField<T extends string>({
  label,
  placeholder,
  fieldKey,
  options,
  className,
}: Props<T>) {
  const { register, formState } = useFormContext();
  const error = formState.errors[fieldKey];

  return (
    <div>
      <label htmlFor={fieldKey} className={cm(labelClassName, className)}>
        {label}
      </label>
      <input
        {...register(fieldKey, options)}
        id={fieldKey}
        disabled={options?.disabled}
        placeholder={placeholder}
        spellCheck={false}
        data-invalid={!!error}
        className={inputClassName}
      />
      {error && (
        <small className={errorMessageClassName}>
          {typeof error.message === 'string' && error.message}
        </small>
      )}
    </div>
  );
}
