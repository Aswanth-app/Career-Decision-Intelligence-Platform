import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, GraduationCap, BookOpen, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/FormFields';
import { ProgressBar } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { departments, colleges, skillLevels } from '../data/mockData';
import { profileService } from '../services/api';

const STEPS = [
  { id: 1, title: 'Personal Info', subtitle: 'Tell us about yourself', icon: <User size={20} /> },
  { id: 2, title: 'Academic Details', subtitle: 'Your college & department', icon: <GraduationCap size={20} /> },
  { id: 3, title: 'Current Skills', subtitle: 'Where you are right now', icon: <Zap size={20} /> },
];

export default function ProfileSetupPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    college: '',
    department: '',
    year: '',
    skillLevel: '',
    weeklyHours: '',
  });
  const { user } = useAuth();
  const { setProfile } = useAppState();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const canProceed = {
    1: form.name.trim().length > 1,
    2: form.college && form.department && form.year,
    3: form.skillLevel && form.weeklyHours,
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    const profileData = { ...form, userId: user?.id, createdAt: new Date().toISOString() };
    await profileService.save(profileData);
    setProfile(profileData);
    setLoading(false);
    navigate('/goal');
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Profile Setup</span>
          <span className="text-sm text-slate-400">Step {step} of {STEPS.length}</span>
        </div>
        <ProgressBar value={step} max={STEPS.length} color="indigo" />
        <div className="flex justify-between mt-3">
          {STEPS.map((s) => (
            <div key={s.id} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${step >= s.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${step > s.id ? 'bg-indigo-600 border-indigo-600 text-white' : step === s.id ? 'border-indigo-600 text-indigo-600' : 'border-slate-300 dark:border-slate-600'}`}>
                {step > s.id ? '✓' : s.id}
              </span>
              <span className="hidden sm:inline">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Step header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                {STEPS[step - 1].icon}
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">{STEPS[step - 1].title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{STEPS[step - 1].subtitle}</p>
              </div>
            </div>

            {/* Step 1 — Personal */}
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <Input
                  id="profile-name"
                  name="name"
                  label="Full Name"
                  placeholder="Arjun Kumar"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <div className="bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl p-4">
                  <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium mb-1">👋 Welcome to CareerAI!</p>
                  <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70">
                    Your profile helps us build a roadmap that's specific to your branch, year, and career goal — not a generic template.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2 — Academic */}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <Select
                  id="profile-college"
                  name="college"
                  label="College / University"
                  value={form.college}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your college</option>
                  {colleges.map((c) => <option key={c} value={c}>{c}</option>)}
                </Select>
                <Select
                  id="profile-department"
                  name="department"
                  label="Department"
                  value={form.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your department</option>
                  {departments.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
                </Select>
                <Select
                  id="profile-year"
                  name="year"
                  label="Current Year"
                  value={form.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select year</option>
                  {[1, 2, 3, 4].map((y) => <option key={y} value={y}>{y === 1 ? '1st' : y === 2 ? '2nd' : y === 3 ? '3rd' : '4th'} Year (B.E./B.Tech)</option>)}
                </Select>
              </div>
            )}

            {/* Step 3 — Skills */}
            {step === 3 && (
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Current Skill Level <span className="text-red-500">*</span></p>
                  <div className="grid grid-cols-2 gap-3">
                    {skillLevels.map((level) => (
                      <button
                        key={level.id}
                        id={`skill-level-${level.id}`}
                        type="button"
                        onClick={() => setForm({ ...form, skillLevel: level.id })}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${form.skillLevel === level.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'}`}
                      >
                        <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{level.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{level.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <Select
                  id="profile-weekly-hours"
                  name="weeklyHours"
                  label="Hours per week for learning"
                  value={form.weeklyHours}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select hours</option>
                  <option value="1-5">1–5 hours/week</option>
                  <option value="5-10">5–10 hours/week</option>
                  <option value="10-15">10–15 hours/week</option>
                  <option value="15+">15+ hours/week</option>
                </Select>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
          <Button
            variant="secondary"
            size="md"
            onClick={() => step > 1 ? setStep(step - 1) : null}
            disabled={step === 1}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back
          </Button>
          <Button
            id={step === 3 ? 'profile-submit' : 'profile-next'}
            variant="gradient"
            size="md"
            onClick={handleNext}
            disabled={!canProceed[step]}
            loading={loading}
            rightIcon={<ArrowRight size={16} />}
          >
            {step === 3 ? 'Save & Continue' : 'Next Step'}
          </Button>
        </div>
      </div>
    </div>
  );
}
