import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, TrendingUp, Zap, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/Badge';
import { useAppState } from '../context/AppStateContext';
import { analysisService } from '../services/api';

const ANALYSIS_STEPS = [
  { id: 1, label: 'Analyzing your profile...', icon: '🔍', duration: 800 },
  { id: 2, label: 'Understanding your career goal...', icon: '🎯', duration: 700 },
  { id: 3, label: 'Matching skills to opportunities...', icon: '⚡', duration: 900 },
  { id: 4, label: 'Identifying skill gaps...', icon: '🧩', duration: 700 },
  { id: 5, label: 'Creating personalized roadmap...', icon: '🗺️', duration: 800 },
  { id: 6, label: 'Generating AI recommendations...', icon: '🤖', duration: 600 },
];

export default function AnalysisPage() {
  const [phase, setPhase] = useState('loading'); // loading | results
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState(null);
  const { profile, selectedGoal, quizAnswers, setAnalysisResult } = useAppState();
  const navigate = useNavigate();

  useEffect(() => {
    runAnalysis();
  }, []);

  const runAnalysis = async () => {
    // Animate through steps
    let totalDelay = 0;
    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      setTimeout(() => setCurrentStep(i), totalDelay);
      totalDelay += ANALYSIS_STEPS[i].duration;
    }

    // Run actual analysis
    const goalId = localStorage.getItem('cdip_goal') || 'software-engineer';
    const res = await analysisService.run(profile, goalId, quizAnswers);

    // Wait for animation to finish
    await new Promise((r) => setTimeout(r, totalDelay + 200));
    setResult(res.data);
    setAnalysisResult(res.data);
    setPhase('results');
  };

  const progress = Math.round(((currentStep + 1) / ANALYSIS_STEPS.length) * 100);

  const MOCK_LOGS = [
    `[INFO] Initializing CDIP AI engine v2.0...`,
    `[LOAD] Parsing profile credentials for student: ${profile?.name || 'User'}`,
    `[PARSE] Mapping department: "${profile?.department}" curriculum constraints`,
    `[SEARCH] Querying national placement index for target role: "${selectedGoal}"`,
    `[MATCH] Aligning student skill tier "${profile?.skillLevel}" with market benchmarks`,
    `[MODEL] Calculating priority weights for "Must Learn" and "Advanced" categories`,
    `[PREDICT] Matching career goal "${selectedGoal}" vectors (87% confidence)`,
    `[GRAPH] Constructing personalized linear learning roadmap (5 key phases)`,
    `[GENERATE] Preparing smart contextual mentor guidelines...`,
    `[SUCCESS] Career intelligence vector compilation successful.`
  ];

  if (phase === 'loading') {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          {/* Glowing Scanner & AI Brain */}
          <div className="relative w-36 h-36 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 animate-spin-slow opacity-30 scale-125 blur-md" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse opacity-50 scale-110" />
            <div className="relative w-36 h-36 rounded-full bg-slate-900 border-2 border-indigo-500/50 flex flex-col items-center justify-center shadow-2xl overflow-hidden">
              <span className="text-4xl mb-1 animate-pulse">🧠</span>
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-widest animate-pulse">
                AI SCANNING
              </span>
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-bounce w-full" style={{ animationDuration: '2s' }} />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            AI Engine Analysis In Progress
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
            Our machine learning model is synthesizing your department syllabus with the selected career vectors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Left: Progress Checklist */}
            <div className="md:col-span-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 text-left">
              <ProgressBar value={progress} max={100} color="indigo" size="md" className="mb-4" />
              <div className="space-y-2.5">
                {ANALYSIS_STEPS.map((step, i) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 transition-opacity duration-300 ${i <= currentStep ? 'opacity-100' : 'opacity-30'}`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${i < currentStep ? 'bg-emerald-500 text-white' : i === currentStep ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                      {i < currentStep ? '✓' : '●'}
                    </div>
                    <span className={`text-xs ${i <= currentStep ? 'text-slate-800 dark:text-slate-200 font-semibold' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Real-time System Log Terminal */}
            <div className="md:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-4 text-left font-mono text-[10px] text-indigo-400 overflow-hidden shadow-inner h-[210px] flex flex-col justify-end">
              <div className="border-b border-slate-900 pb-2 mb-2 flex items-center justify-between text-slate-600">
                <span>CON_SHELL: cdip_model.sh</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div className="space-y-1.5 overflow-y-auto max-h-[170px] no-scrollbar">
                {MOCK_LOGS.slice(0, currentStep + 2).map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`${index === currentStep + 1 ? 'text-teal-400 font-bold' : 'text-slate-500'}`}
                  >
                    {log}
                  </motion.div>
                ))}
                <div className="w-1 h-3 bg-indigo-400 animate-pulse inline-block" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Results view
  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
          className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-emerald-200 dark:shadow-emerald-900/40"
        >
          ✅
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
          Your Analysis is Ready!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          {profile?.name ? `${profile.name}, here's ` : "Here's "}your personalized career intelligence report.
        </p>
      </motion.div>

      <div className="flex flex-col gap-4">
        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center gap-3 mb-3">
            <Target size={20} />
            <p className="font-bold">AI Analysis Summary</p>
            <span className="ml-auto text-sm bg-white/20 px-2 py-0.5 rounded-lg">
              {result?.confidence}% confidence
            </span>
          </div>
          <p className="text-indigo-100 text-sm leading-relaxed">{result?.summary}</p>
          <div className="mt-3 flex items-center gap-2 text-xs text-indigo-200">
            <span>⏱ Estimated timeline: <strong className="text-white">{result?.estimatedTimeline}</strong></span>
          </div>
        </motion.div>

        {/* Strengths & Gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={18} className="text-emerald-500" />
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Your Strengths</h3>
            </div>
            <ul className="flex flex-col gap-2.5">
              {result?.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap size={18} className="text-amber-500" />
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Areas to Build</h3>
            </div>
            <ul className="flex flex-col gap-2.5">
              {result?.skillGaps.map((g, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="text-amber-500 mt-0.5 flex-shrink-0">→</span>
                  {g}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Next Step */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100">AI Recommendation</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{result?.recommendation}</p>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs text-slate-500">Your first step:</p>
            <p className="font-semibold text-indigo-600 dark:text-indigo-400 text-sm mt-1">→ {result?.nextStep}</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center pt-2"
        >
          <Button
            id="analysis-to-dashboard"
            variant="gradient"
            size="xl"
            onClick={() => navigate('/dashboard')}
            rightIcon={<ArrowRight size={20} />}
          >
            View My Full Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
