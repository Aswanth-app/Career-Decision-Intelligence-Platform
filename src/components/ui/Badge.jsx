import { cn } from '../../utils';

const badgeVariants = {
  default: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
  primary: 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400',
  success: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400',
  warning: 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400',
  danger: 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400',
  purple: 'bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400',
  teal: 'bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400',
};

export function Badge({ children, variant = 'default', className, dot = false }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium',
        badgeVariants[variant],
        className
      )}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full',
          variant === 'success' ? 'bg-emerald-500' :
          variant === 'warning' ? 'bg-amber-500' :
          variant === 'danger' ? 'bg-red-500' :
          variant === 'primary' ? 'bg-indigo-500' : 'bg-slate-400'
        )} />
      )}
      {children}
    </span>
  );
}

export function ProgressBar({ value = 0, max = 100, className, color = 'indigo', size = 'md', showLabel = false, label }) {
  const pct = Math.min(Math.round((value / max) * 100), 100);
  const colorMap = {
    indigo: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    emerald: 'bg-gradient-to-r from-emerald-400 to-teal-500',
    amber: 'bg-gradient-to-r from-amber-400 to-orange-500',
    red: 'bg-gradient-to-r from-red-400 to-rose-500',
  };
  const sizeMap = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{pct}%</span>
        </div>
      )}
      <div className={cn('w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden', sizeMap[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out', colorMap[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function Tabs({ tabs, activeTab, onChange, className }) {
  return (
    <div className={cn('flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          id={`tab-${tab.id}`}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200',
            activeTab === tab.id
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          )}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
