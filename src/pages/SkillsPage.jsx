import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Flame, Star, Sparkles, BookOpen } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { PageHeader, SectionHeader } from '../components/ui/Components';
import { Tabs } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAppState } from '../context/AppStateContext';
import { skillsService } from '../services/api';
import { getDifficultyColor, getPriorityColor } from '../utils';

export default function SkillsPage() {
  const { profile, selectedGoal, skills } = useAppState();
  const [completedSkills, setCompletedSkills] = useState([]);
  const [activeTab, setActiveTab] = useState('mustLearn');
  const [loading, setLoading] = useState(false);
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
    loadCompletedSkills();
  }, [profile, selectedGoal]);

  const loadCompletedSkills = () => {
    const completed = skillsService.getCompleted();
    setCompletedSkills(completed);
  };

  const handleMarkComplete = async (skillId) => {
    setLoading(true);
    const res = await skillsService.markComplete(skillId);
    if (!res.error) {
      setCompletedSkills((prev) => [...prev, skillId]);
    }
    setLoading(false);
  };

  const tabList = [
    { id: 'mustLearn', label: '🔥 Must Learn', icon: null },
    { id: 'recommended', label: '⭐ Recommended', icon: null },
    { id: 'advanced', label: '🧠 Advanced', icon: null },
  ];

  const currentSkills = skills?.[activeTab] || [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Skill Recommendations"
        subtitle={`Targeted skill sets required to become a ${selectedGoal?.title || 'Software Engineer'}.`}
        badge="Skill Inventory"
      />

      {/* Tabs */}
      <Tabs
        tabs={tabList}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="max-w-md"
      />

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentSkills.length > 0 ? (
          currentSkills.map((skill, index) => {
            const isDone = completedSkills.includes(skill.id);
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`h-full border transition-all duration-300 ${isDone ? 'border-emerald-200 dark:border-emerald-950 bg-emerald-50/10 dark:bg-emerald-950/5' : 'bg-white dark:bg-slate-800'}`}>
                  <CardBody className="p-6 flex flex-col justify-between h-full space-y-4">
                    <div className="space-y-3">
                      {/* Top labels */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl" role="img" aria-label="skill icon">
                            {skill.icon}
                          </span>
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base">
                              {skill.name}
                            </h3>
                            <p className="text-xs text-slate-400 font-medium">Est: {skill.timeToLearn}</p>
                          </div>
                        </div>
                        {isDone ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 text-xs font-semibold">
                            <CheckCircle size={12} />
                            Acquired
                          </span>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkComplete(skill.id)}
                            disabled={loading}
                          >
                            Mark Done
                          </Button>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    {/* Bottom Metadata badges */}
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-50 dark:border-slate-800">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getDifficultyColor(skill.difficulty)}`}>
                        {skill.difficulty}
                      </span>
                      <span className={`text-xs font-bold ${getPriorityColor(skill.priority)}`}>
                        {skill.priority} Priority
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-12 text-slate-400">
            No skill recommendations found.
          </div>
        )}
      </div>
    </div>
  );
}
