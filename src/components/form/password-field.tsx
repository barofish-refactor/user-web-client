import clsx from 'clsx';
import { useReducer } from 'react';
import { type FieldValues, type RegisterOptions, useFormContext } from 'react-hook-form';
import {
  errorMessageClassName,
  eyeButtonClassName,
  inputClassName,
  labelClassName,
} from 'src/components/form';
import cm from 'src/utils/class-merge';

interface Props<T> {
  label?: string;
  placeholder?: string;
  fieldKey: T;
  options?: RegisterOptions<FieldValues>;
  className?: string;
}

export function PasswordField<T extends string>({
  fieldKey,
  label,
  options,
  placeholder,
  className,
}: Props<T>) {
  const { register, formState } = useFormContext();
  const [visiblePassword, toggleVisiblePassword] = useReducer(p => !p, false);

  const error = formState.errors[fieldKey];

  return (
    <div>
      {label && (
        <label htmlFor={fieldKey} className={cm(labelClassName, className)}>
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          {...register(fieldKey, options)}
          id={fieldKey}
          placeholder={placeholder}
          type={visiblePassword ? 'text' : 'password'}
          spellCheck={false}
          data-invalid={!!error}
          className={clsx(inputClassName, '[&]:pr-[34px]')}
          disabled={options?.disabled}
        />
        <button
          type='button'
          tabIndex={-1}
          data-visible={visiblePassword}
          className={eyeButtonClassName}
          onClick={toggleVisiblePassword}
        />
      </div>
      {error && (
        <small className={errorMessageClassName}>
          {typeof error.message === 'string' && error.message}
        </small>
      )}
    </div>
  );
}
