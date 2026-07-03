import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/Badge';
import { useAppState } from '../context/AppStateContext';
import { quizQuestions } from '../data/mockData';
import { quizService } from '../services/api';
import { cn } from '../utils';

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const { setQuizAnswers, profile, selectedGoal } = useAppState();
  const navigate = useNavigate();

  const question = quizQuestions[currentQ];
  const isMulti = question.type === 'multi';
  const currentAnswer = answers[question.id];
  const hasAnswer = isMulti ? (currentAnswer?.length > 0) : !!currentAnswer;

  const handleSingle = (value) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleMulti = (value) => {
    const current = currentAnswer || [];
    if (current.includes(value)) {
      setAnswers({ ...answers, [question.id]: current.filter((v) => v !== value) });
    } else {
      setAnswers({ ...answers, [question.id]: [...current, value] });
    }
  };

  const handleNext = async () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Submit
      setLoading(true);
      await quizService.submit(answers);
      setQuizAnswers(answers);
      setLoading(false);
      navigate('/analysis');
    }
  };

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
          Step 3 of 4 · Career Assessment
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
          Quick Career Assessment
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {profile?.name ? `${profile.name}, answer ` : 'Answer '}5 quick questions to personalize your roadmap
        </p>
      </motion.div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>Question {currentQ + 1} of {quizQuestions.length}</span>
          <span>{Math.round(((currentQ + 1) / quizQuestions.length) * 100)}% complete</span>
        </div>
        <ProgressBar value={currentQ + 1} max={quizQuestions.length} color="indigo" />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {currentQ + 1}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {question.question}
                </h2>
                {isMulti && (
                  <p className="text-sm text-slate-400 mt-1">Select all that apply</p>
                )}
              </div>
            </div>

            <div className={cn('grid gap-3', question.options.length > 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1')}>
              {question.options.map((option) => {
                const isSelected = isMulti
                  ? (currentAnswer || []).includes(option.value)
                  : currentAnswer === option.value;

                return (
                  <button
                    key={option.id}
                    id={`quiz-option-${option.id}`}
                    onClick={() => isMulti ? handleMulti(option.value) : handleSingle(option.value)}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left transition-all duration-200',
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-100'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-5 h-5 flex-shrink-0 flex items-center justify-center transition-all',
                        isMulti ? 'rounded-md border-2' : 'rounded-full border-2',
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500 text-white'
                          : 'border-slate-300 dark:border-slate-600'
                      )}>
                        {isSelected && <span className="text-xs">{isMulti ? '✓' : '●'}</span>}
                      </div>
                      <span className="font-medium text-sm">{option.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
          <Button
            variant="secondary"
            size="md"
            onClick={handleBack}
            disabled={currentQ === 0}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back
          </Button>
          <Button
            id={currentQ === quizQuestions.length - 1 ? 'quiz-submit' : 'quiz-next'}
            variant="gradient"
            size="md"
            onClick={handleNext}
            disabled={!hasAnswer}
            loading={loading}
            rightIcon={<ArrowRight size={16} />}
          >
            {currentQ === quizQuestions.length - 1 ? 'See My Analysis' : 'Next Question'}
          </Button>
        </div>
      </div>

      {/* Skip notice */}
      <p className="text-center text-xs text-slate-400 mt-4">
        Your answers are used only to personalize your roadmap — not stored permanently.
      </p>
    </div>
  );
}
