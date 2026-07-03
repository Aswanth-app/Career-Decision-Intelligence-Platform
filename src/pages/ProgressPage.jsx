import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, CheckCircle, Clock, Flame, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { PageHeader, SectionHeader } from '../components/ui/Components';
import { ProgressBar } from '../components/ui/Badge';
import { useAppState } from '../context/AppStateContext';
import { progressService } from '../services/api';
import { LoadingSkeleton } from '../components/ui/States';

export default function ProgressPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { profile, selectedGoal } = useAppState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      navigate('/profile');
      return;
    }
    if (!selectedGoal) {
      navigate('/goal');
      return;
    }
    loadProgress();
  }, [profile, selectedGoal]);

  const loadProgress = async () => {
    setLoading(true);
    const res = await progressService.get();
    if (!res.error) {
      setData(res.data);
    }
    setLoading(false);
  };

  if (loading || !data) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton lines={5} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your Progress Tracking"
        subtitle="Analyze your B.Tech milestone status, active streaks, and career-readiness badges."
        badge="Progress Insights"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Stats Overview */}
        <Card className="md:col-span-2">
          <CardBody className="p-6 space-y-6">
            <SectionHeader
              title="Career Goal Completion Pathway"
              subtitle={`Detailed tracking towards becoming a ${selectedGoal?.title || 'Software Engineer'}`}
            />

            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Roadmap Progress</span>
                  <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{data.roadmapCompletion}%</span>
                </div>
                <ProgressBar value={data.roadmapCompletion} max={100} color="indigo" />
                <p className="text-xs text-slate-400 mt-1">
                  Completed {data.completedSteps} of {data.totalSteps} key phases
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Current Active Phase</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{data.currentStep}</p>
                  <span className="inline-flex items-center text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded font-medium">
                    {data.currentStage}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Upcoming Milestone Focus</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{data.upcomingMilestone}</p>
                  <span className="inline-flex items-center text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-medium">
                    Pending Unlock
                  </span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Streaks & Activity Summary */}
        <Card>
          <CardBody className="p-6 space-y-6">
            <SectionHeader
              title="Daily Active Streak"
              subtitle="Daily activity streak metric"
            />
            
            <div className="flex flex-col items-center justify-center py-4 space-y-3">
              <div className="w-20 h-20 rounded-full bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center text-orange-500 text-3xl pulse-glow animate-bounce-slow">
                🔥
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">{data.streakDays} Days</h4>
                <p className="text-xs text-slate-400 font-medium">Keep learning to maintain your streak!</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Clock size={14} className="text-indigo-500" /> Weekly Target Hours
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{data.weeklyGoal}h</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <TrendingUp size={14} className="text-emerald-500" /> Completed this week
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{data.weeklyActual}h</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Badges Section */}
      <Card>
        <CardBody className="p-6 space-y-4">
          <SectionHeader
            title="Earned Achievements"
            subtitle="Unlock badges as you complete roadmap phases and acquire target skills."
          />
          <div className="flex flex-wrap gap-4 pt-2">
            {data.badges.length > 0 ? (
              data.badges.map((badge) => (
                <div key={badge} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
                  <Award className="text-indigo-600 dark:text-indigo-400" size={24} />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{badge}</p>
                    <p className="text-[10px] text-slate-400 font-medium">Roadmap unlocked badge</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-sm text-slate-400 w-full">
                No badges earned yet. Complete your first roadmap phase to unlock your first achievement!
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
