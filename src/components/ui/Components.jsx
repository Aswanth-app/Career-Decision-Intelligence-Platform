import { cn } from '../../utils';

export function PageHeader({ title, subtitle, badge, actions, className }) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4', className)}>
      <div className="flex flex-col gap-1">
        {badge && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            {badge}
          </span>
        )}
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}

export function SectionHeader({ title, subtitle, action, className }) {
  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

export function StepCard({ step, number, isActive = false, isCompleted = false, isLocked = false, onClick, className }) {
  const statusStyles = isCompleted
    ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/10'
    : isActive
    ? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50/30 dark:bg-indigo-950/10'
    : isLocked
    ? 'border-slate-100 dark:border-slate-800 opacity-60'
    : 'border-slate-200 dark:border-slate-700';

  const numberStyles = isCompleted
    ? 'bg-emerald-500 text-white'
    : isActive
    ? 'bg-indigo-600 text-white pulse-glow'
    : isLocked
    ? 'bg-slate-200 dark:bg-slate-700 text-slate-400'
    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300';

  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      className={cn(
        'rounded-2xl border p-5 transition-all duration-300',
        !isLocked && 'cursor-pointer hover:shadow-md',
        statusStyles,
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0', numberStyles)}>
          {isCompleted ? '✓' : number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {step.phase}
            </span>
            <span className="text-xs font-medium text-slate-400">· {step.duration}</span>
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{step.title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
          {step.skills && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {step.skills.map((skill) => (
                <span key={skill} className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-xs text-slate-600 dark:text-slate-300 rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function SkillCard({ skill, isCompleted = false, onComplete, className }) {
  return (
    <div className={cn(
      'rounded-2xl border p-5 transition-all duration-300',
      isCompleted
        ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/10'
        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-md hover:-translate-y-0.5',
      className
    )}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{skill.name}</h4>
            <span className="text-xs text-slate-400">{skill.timeToLearn}</span>
          </div>
        </div>
        {isCompleted ? (
          <span className="text-emerald-500 text-lg">✓</span>
        ) : (
          <button
            onClick={() => onComplete?.(skill.id)}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium flex-shrink-0"
          >
            Mark done
          </button>
        )}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{skill.description}</p>
      <div className="flex items-center gap-2">
        <span className={cn(
          'px-2 py-0.5 rounded-lg text-xs font-medium',
          skill.difficulty === 'Beginner' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400' :
          skill.difficulty === 'Intermediate' ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400' :
          'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400'
        )}>{skill.difficulty}</span>
        <span className={cn(
          'text-xs font-semibold',
          skill.priority === 'High' ? 'text-red-600 dark:text-red-400' :
          skill.priority === 'Medium' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'
        )}>
          {skill.priority} Priority
        </span>
      </div>
    </div>
  );
}

export function AIChatBubble({ message, isUser = false, timestamp, isLoading = false }) {
  return (
    <div className={cn('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
          AI
        </div>
      )}
      <div className={cn('max-w-[85%] sm:max-w-[75%]', isUser ? 'items-end' : 'items-start', 'flex flex-col gap-1')}>
        <div className={cn(
          'rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'bg-indigo-600 text-white rounded-br-sm'
            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-sm'
        )}>
          {isLoading ? (
            <div className="flex gap-1 items-center h-4">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          )}
        </div>
        {timestamp && (
          <span className="text-[10px] text-slate-400 px-1">
            {new Date(timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
}
