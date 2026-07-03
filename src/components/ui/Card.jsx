import { cn } from '../../utils';

export function Card({ children, className, hover = false, interactive = false, ...props }) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm',
        hover && 'transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-indigo-200 dark:hover:border-indigo-800',
        interactive && 'cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-indigo-200 dark:hover:border-indigo-800',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn('px-6 py-4 border-b border-slate-100 dark:border-slate-700/50', className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className }) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn('px-6 py-4 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/30 rounded-b-2xl', className)}>
      {children}
    </div>
  );
}

export function StatCard({ icon, label, value, color = 'text-indigo-600', bgColor = 'bg-indigo-50 dark:bg-indigo-950/40', trend, className }) {
  return (
    <Card className={cn('p-5', className)}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
          <p className={cn('text-2xl font-bold', color)}>{value}</p>
          {trend && <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{trend}</p>}
        </div>
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-lg', bgColor)}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
