import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Flame, TrendingUp, Calendar, ChevronRight, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardBody, StatCard } from '../components/ui/Card';
import { PageHeader, SectionHeader } from '../components/ui/Components';
import { ProgressBar } from '../components/ui/Badge';
import { useAppState } from '../context/AppStateContext';
import { dashboardService } from '../services/api';
import { CardSkeleton } from '../components/ui/States';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [advisorAdvice, setAdvisorAdvice] = useState('');
  const [isRecalibrating, setIsRecalibrating] = useState(false);
  const { profile, selectedGoal, roadmap } = useAppState();
  const navigate = useNavigate();

  useEffect(() => {
    // If onboarding is not completed, redirect accordingly
    if (!profile) {
      navigate('/profile');
      return;
    }
    if (!selectedGoal) {
      navigate('/goal');
      return;
    }

    loadDashboard();
  }, [profile, selectedGoal, roadmap]);

  const loadDashboard = async () => {
    setLoading(true);
    const res = await dashboardService.get();
    if (!res.error) {
      setData(res.data);
      setAdvisorAdvice(res.data.aiSuggestion);
    }
    setLoading(false);
  };

  const handleRecalibrate = async () => {
    setIsRecalibrating(true);
    await new Promise((r) => setTimeout(r, 1500));
    const tips = [
      `Based on your active ${selectedGoal?.title || 'Software Engineer'} path, prioritize building 2 mini-projects to reinforce current milestone skills.`,
      `Your current weekly commitment of ${profile?.weeklyHours || '5-10'}h is optimal. Try to unlock the next roadmap step by this weekend.`,
      `Placement metrics indicate strong demand for Git/GitHub workflows. Make sure your local profile repositories are public and active.`,
      `AI Check: You have completed ${roadmap?.filter((s) => s.status === 'completed')?.length || 0} steps. Let's schedule a mock chat session in the AI Mentor tab to review.`
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setAdvisorAdvice(randomTip);
    setIsRecalibrating(false);
  };

  if (loading || !data) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded shimmer" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 dark:bg-slate-700 rounded-xl shimmer" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <CardSkeleton />
            <CardSkeleton />
          </div>
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl shimmer" />
        </div>
      </div>
    );
  }

  const statIcons = {
    'Skills Learned': '⚡',
    'Days Streak': '🔥',
    'Roadmap %': '📈',
    'Weeks Active': '📅',
  };

  const statColors = {
    'Skills Learned': 'text-indigo-600 dark:text-indigo-400',
    'Days Streak': 'text-orange-500 dark:text-orange-400',
    'Roadmap %': 'text-emerald-600 dark:text-emerald-400',
    'Weeks Active': 'text-purple-600 dark:text-purple-400',
  };

  const statBgColors = {
    'Skills Learned': 'bg-indigo-50 dark:bg-indigo-950/40',
    'Days Streak': 'bg-orange-50 dark:bg-orange-950/40',
    'Roadmap %': 'bg-emerald-50 dark:bg-emerald-950/40',
    'Weeks Active': 'bg-purple-50 dark:bg-purple-950/40',
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <PageHeader
        title={`Welcome back, ${profile?.name || 'Student'}`}
        subtitle={`Here is your personalized pathway progress for becoming a ${data.careerGoal}.`}
        badge={`${profile?.department || 'Engineering'} · Year ${profile?.year || '1'}`}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {data.stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={statIcons[stat.label] || '📈'}
            color={statColors[stat.label]}
            bgColor={statBgColors[stat.label]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Action & Roadmap Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Call To Action Card */}
          <Card className="border-indigo-100 dark:border-indigo-950/50 bg-gradient-to-r from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/20 overflow-hidden relative">
            <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <CardBody className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                    ⚡ Current Focus
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                    {data.nextAction}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Step inside your personalized roadmap. Keep learning to stay on track.
                  </p>
                </div>
                <Button
                  id="dashboard-continue-btn"
                  variant="gradient"
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                  onClick={() => navigate('/roadmap')}
                  className="flex-shrink-0"
                >
                  Continue Roadmap
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Premium Glowing AI Advisor Panel */}
          <div className="p-[1.5px] bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="bg-white dark:bg-slate-900 rounded-[22px] p-6 relative overflow-hidden">
              {/* Subtle mesh background inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-950/20 dark:to-purple-950/20 pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-md flex-shrink-0 animate-pulse-slow">
                  ✨
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-950 dark:text-white text-base">AI Career Advisor Console</h3>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                        ACTIVE STREAM
                      </span>
                    </div>
                    <Button
                      id="dashboard-recalibrate-btn"
                      variant="ghost"
                      size="sm"
                      onClick={handleRecalibrate}
                      loading={isRecalibrating}
                      className="text-xs py-1"
                    >
                      Regenerate Advice
                    </Button>
                  </div>
                  
                  {isRecalibrating ? (
                    <div className="space-y-2 py-1">
                      <div className="h-3 w-5/6 bg-slate-200 dark:bg-slate-800 rounded shimmer" />
                      <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-800 rounded shimmer" />
                    </div>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic"
                    >
                      "{advisorAdvice}"
                    </motion.p>
                  )}

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800/80">
                    <Link to="/mentor" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1">
                      Start full session with AI Mentor <ChevronRight size={14} />
                    </Link>
                    <span className="text-[10px] text-slate-400">Model: Gemini-CDIP-v2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Roadmap Overview & Next Milestone */}
        <div className="space-y-6">
          <Card className="h-full">
            <CardBody className="p-6 flex flex-col justify-between h-full space-y-6">
              <div>
                <SectionHeader
                  title="Roadmap Progress"
                  subtitle="Your journey milestone tracker"
                />
                
                {/* Visual Progress Wheel/Bar */}
                <div className="my-6 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">
                      {data.roadmapProgress}%
                    </span>
                    <span className="text-xs text-slate-400">
                      {data.completedSteps} of {data.totalSteps} steps completed
                    </span>
                  </div>
                  <ProgressBar value={data.roadmapProgress} max={100} color="indigo" />
                </div>

                {/* Checklist Summary */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Roadmap Phases</p>
                  <div className="space-y-2">
                    {roadmap?.slice(0, 3).map((step, idx) => (
                      <div key={step.id} className="flex items-center justify-between text-sm py-1 border-b border-slate-50 dark:border-slate-800 last:border-0">
                        <span className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${step.status === 'completed' ? 'bg-emerald-500' : step.status === 'in-progress' ? 'bg-indigo-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-700'}`} />
                          {step.title}
                        </span>
                        <span className={`text-xs font-medium ${step.status === 'completed' ? 'text-emerald-600' : step.status === 'in-progress' ? 'text-indigo-600' : 'text-slate-400'}`}>
                          {step.status === 'completed' ? 'Done' : step.status === 'in-progress' ? 'In Progress' : 'Locked'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link to="/roadmap" className="w-full">
                  <Button variant="secondary" size="md" fullWidth rightIcon={<ChevronRight size={16} />}>
                    View Detailed Roadmap
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
