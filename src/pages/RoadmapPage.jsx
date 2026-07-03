import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Lock, PlayCircle, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { PageHeader, SectionHeader } from '../components/ui/Components';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAppState } from '../context/AppStateContext';
import { roadmapService } from '../services/api';
import { LoadingSkeleton } from '../components/ui/States';

export default function RoadmapPage() {
  const { profile, selectedGoal, roadmap, updateRoadmapStep } = useAppState();
  const [loading, setLoading] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);
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
    // Set first in-progress or first step as default selected preview
    if (roadmap && roadmap.length > 0 && !selectedStep) {
      const active = roadmap.find((s) => s.status === 'in-progress') || roadmap[0];
      setSelectedStep(active);
    }
  }, [profile, selectedGoal, roadmap]);

  const handleStatusChange = async (stepId, newStatus) => {
    setLoading(true);
    const res = await roadmapService.updateStep(stepId, newStatus);
    if (!res.error) {
      updateRoadmapStep(stepId, newStatus);
      // Update local selection highlight too
      const updatedStep = roadmap.find((s) => s.id === stepId);
      if (updatedStep) {
        setSelectedStep({ ...updatedStep, status: newStatus });
      }
    }
    setLoading(false);
  };

  if (!roadmap || roadmap.length === 0) {
    return (
      <div className="p-8 text-center space-y-4">
        <LoadingSkeleton lines={5} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your Personalized Roadmap"
        subtitle={`Step-by-step career path tailored for ${selectedGoal?.title} in the ${profile?.department} department.`}
        badge="Roadmap Explorer"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardBody className="p-6">
              <SectionHeader
                title="Linear Milestone Pathway"
                subtitle="Complete modules sequentially. Click a step to view detailed resources & actions."
              />

              <div className="mt-8 relative border-l-2 border-slate-100 dark:border-slate-800 ml-4 pl-6 space-y-8">
                {roadmap.map((step, idx) => {
                  const isSelected = selectedStep?.id === step.id;
                  const isCompleted = step.status === 'completed';
                  const isInProgress = step.status === 'in-progress';
                  const isLocked = step.status === 'locked';

                  return (
                    <div
                      key={step.id}
                      className="relative cursor-pointer group"
                      onClick={() => setSelectedStep(step)}
                    >
                      {/* Timeline Icon Badge */}
                      <span className="absolute -left-10 top-0.5 flex h-7 h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 group-hover:border-indigo-500 transition-colors">
                        {isCompleted ? (
                          <CheckCircle2 size={16} className="text-emerald-500 fill-emerald-50 dark:fill-slate-900" />
                        ) : isInProgress ? (
                          <PlayCircle size={16} className="text-indigo-600 animate-pulse" />
                        ) : isLocked ? (
                          <Lock size={12} className="text-slate-400" />
                        ) : (
                          <Circle size={14} className="text-slate-400" />
                        )}
                      </span>

                      {/* Content Card */}
                      <div className={`p-5 rounded-2xl border transition-all duration-200 ${isSelected ? 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/50 shadow-sm' : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Phase {idx + 1}: {step.phase}
                          </span>
                          <span className="text-xs text-slate-400">· {step.duration}</span>
                          <span className="ml-auto">
                            {isCompleted ? (
                              <Badge variant="success">Completed</Badge>
                            ) : isInProgress ? (
                              <Badge variant="primary" dot>Active</Badge>
                            ) : isLocked ? (
                              <Badge variant="default">Locked</Badge>
                            ) : (
                              <Badge variant="warning">Upcoming</Badge>
                            )}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar Preview (Right Column) */}
        <div className="space-y-6">
          {selectedStep && (
            <Card className="sticky top-24 border-indigo-100 dark:border-indigo-950/50">
              <CardBody className="p-6 space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-1 rounded">
                    {selectedStep.phase}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-3">
                    {selectedStep.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Duration Focus: {selectedStep.duration}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Key Skills Acquired</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStep.skills?.map((sk) => (
                      <span key={sk} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-lg">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recommended Mock Resources</h4>
                  <div className="space-y-2">
                    {selectedStep.resources?.map((res) => (
                      <a
                        key={res}
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen size={14} className="text-indigo-500" />
                          {res}
                        </span>
                        <ExternalLink size={12} className="text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Update Phase Status</h4>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant={selectedStep.status === 'completed' ? 'secondary' : 'primary'}
                      onClick={() => handleStatusChange(selectedStep.id, selectedStep.status === 'completed' ? 'in-progress' : 'completed')}
                      loading={loading}
                      fullWidth
                    >
                      {selectedStep.status === 'completed' ? 'Mark In Progress' : 'Mark Completed'}
                    </Button>
                    {selectedStep.status !== 'upcoming' && selectedStep.status !== 'locked' && (
                      <Button
                        variant="tertiary"
                        onClick={() => handleStatusChange(selectedStep.id, 'upcoming')}
                        loading={loading}
                        fullWidth
                      >
                        Set to Upcoming
                      </Button>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
