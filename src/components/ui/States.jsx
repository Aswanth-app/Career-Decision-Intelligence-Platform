import { cn } from '../../utils';

export function LoadingSkeleton({ className, lines = 1, height = 'h-4' }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'shimmer rounded-lg',
            height,
            i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

export function CardSkeleton({ className }) {
  return (
    <div className={cn('bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6', className)}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl shimmer flex-shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-4 w-2/3 shimmer rounded" />
          <div className="h-3 w-full shimmer rounded" />
          <div className="h-3 w-3/4 shimmer rounded" />
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">{description}</p>
      )}
      {action}
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', description, retry, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-3xl mb-4">
        ⚠️
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">{description}</p>
      )}
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export function SuccessState({ title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-3xl mb-4">
        ✅
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">{description}</p>
      )}
      {action}
    </div>
  );
}
