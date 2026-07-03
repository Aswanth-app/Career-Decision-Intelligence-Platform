import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAppState } from '../context/AppStateContext';
import { careerGoals } from '../data/mockData';
import { goalService } from '../services/api';
import { cn } from '../utils';

export default function GoalSelectionPage() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setGoal, profile } = useAppState();
  const navigate = useNavigate();

  // Filter goals relevant to user's department
  const relevantGoals = careerGoals.filter(
    (g) => !profile?.department || g.departments.includes(profile.department)
  );
  const otherGoals = careerGoals.filter(
    (g) => profile?.department && !g.departments.includes(profile.department)
  );

  const handleSelect = (goalId) => {
    setSelected(goalId === selected ? null : goalId);
  };

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    await goalService.save(selected);
    setGoal(selected);
    setLoading(false);
    navigate('/quiz');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
          Step 2 of 4 · Career Goal
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
          What's your primary career goal?
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto">
          {profile?.name ? `Hi ${profile.name}! ` : ''}Choose the career path you want to pursue. We'll build a personalized roadmap around this goal.
        </p>
      </motion.div>

      {/* Goal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {relevantGoals.map((goal, i) => (
          <motion.button
            key={goal.id}
            id={`goal-${goal.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => handleSelect(goal.id)}
            className={cn(
              'relative p-5 rounded-2xl border-2 text-left transition-all duration-300 group',
              selected === goal.id
                ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/30 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/30'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md'
            )}
          >
            {selected === goal.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 text-indigo-600 dark:text-indigo-400"
              >
                <CheckCircle size={20} />
              </motion.div>
            )}
            <div className={cn(
              'w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110',
              goal.color
            )}>
              {goal.icon}
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">{goal.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{goal.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {goal.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Other goals (less relevant for this dept) */}
      {otherGoals.length > 0 && (
        <div className="mb-8">
          <p className="text-xs text-slate-400 text-center mb-3">Other available goals</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {otherGoals.map((goal) => (
              <button
                key={goal.id}
                id={`goal-other-${goal.id}`}
                onClick={() => handleSelect(goal.id)}
                className={cn(
                  'p-4 rounded-xl border-2 text-left transition-all opacity-70 hover:opacity-100',
                  selected === goal.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{goal.icon}</span>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{goal.title}</p>
                    <p className="text-xs text-slate-400">All departments</p>
                  </div>
                  {selected === goal.id && <CheckCircle size={16} className="text-indigo-600 ml-auto" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center"
      >
        <Button
          id="goal-continue"
          variant={selected ? 'gradient' : 'secondary'}
          size="lg"
          disabled={!selected}
          loading={loading}
          onClick={handleContinue}
          rightIcon={<ArrowRight size={18} />}
        >
          {selected
            ? `Continue with ${careerGoals.find((g) => g.id === selected)?.title}`
            : 'Select a goal to continue'}
        </Button>
      </motion.div>
    </div>
  );
}
