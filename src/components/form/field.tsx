import { type FieldValues, type RegisterOptions, useFormContext } from 'react-hook-form';
import { errorMessageClassName, inputClassName, labelClassName } from 'src/components/form';

interface Props<T> {
  label: string;
  placeholder?: string;
  fieldKey: T;
  options?: RegisterOptions<FieldValues>;
}

export function FormField<T extends string>({ label, placeholder, fieldKey, options }: Props<T>) {
  const { register, formState } = useFormContext();
  const error = formState.errors[fieldKey];

  return (
    <div>
      <label htmlFor={fieldKey} className={labelClassName}>
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
