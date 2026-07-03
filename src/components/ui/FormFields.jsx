import { forwardRef } from 'react';
import { cn } from '../../utils';

export const Input = forwardRef(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  className,
  containerClass,
  required,
  ...props
}, ref) => {
  return (
    <div className={cn('flex flex-col gap-1.5', containerClass)}>
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'border-slate-200 dark:border-slate-700',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
            'transition-all duration-200',
            'py-2.5 text-sm',
            leftIcon ? 'pl-10 pr-4' : 'px-4',
            rightIcon ? 'pr-10' : '',
            error && 'border-red-400 focus:ring-red-400 dark:border-red-600',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:bg-slate-900',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
});
Input.displayName = 'Input';

export const Select = forwardRef(({
  label,
  error,
  hint,
  className,
  containerClass,
  required,
  children,
  ...props
}, ref) => {
  return (
    <div className={cn('flex flex-col gap-1.5', containerClass)}>
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          'w-full rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100',
          'border-slate-200 dark:border-slate-700',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
          'transition-all duration-200 cursor-pointer',
          'py-2.5 px-4 text-sm',
          'appearance-none bg-no-repeat bg-right-4',
          error && 'border-red-400 focus:ring-red-400',
          className
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.75rem center',
          backgroundSize: '1.25em 1.25em',
          paddingRight: '2.5rem',
        }}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
});
Select.displayName = 'Select';

export const Textarea = forwardRef(({
  label,
  error,
  hint,
  className,
  containerClass,
  required,
  rows = 4,
  ...props
}, ref) => {
  return (
    <div className={cn('flex flex-col gap-1.5', containerClass)}>
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'w-full rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100',
          'placeholder:text-slate-400 dark:placeholder:text-slate-500',
          'border-slate-200 dark:border-slate-700',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
          'transition-all duration-200 resize-none',
          'py-3 px-4 text-sm',
          error && 'border-red-400 focus:ring-red-400',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
});
Textarea.displayName = 'Textarea';
