import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Map, Brain, Target, TrendingUp, Users, CheckCircle, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';

const features = [
  { icon: <Target size={22} />, title: 'AI Career Goal Mapping', desc: 'Get a precise career goal matched to your department, skills, and aspirations — not generic suggestions.' },
  { icon: <Map size={22} />, title: 'Personalized Roadmap', desc: 'A step-by-step, time-bound roadmap built specifically for your year, branch, and target role.' },
  { icon: <Zap size={22} />, title: 'Skill Gap Analysis', desc: 'Know exactly which skills you lack and which to prioritize — with difficulty ratings and timelines.' },
  { icon: <Brain size={22} />, title: 'Roadmap-Based AI Mentor', desc: 'Not a generic chatbot. Every answer is grounded in your roadmap, progress, and current skill level.' },
  { icon: <TrendingUp size={22} />, title: 'Progress Tracking', desc: 'Track roadmap completion, skill milestones, and stay on target with weekly insights.' },
  { icon: <Users size={22} />, title: 'All Engineering Branches', desc: 'Built for CSE, IT, CCE, AIDS, AIML, ECE, and EEE students — not a one-size-fits-all tool.' },
];

const steps = [
  { num: '01', title: 'Build Your Profile', desc: 'Tell us your department, year, and current skill level. Takes 2 minutes.' },
  { num: '02', title: 'Choose Your Career Goal', desc: 'Pick from Software Engineer, AI Engineer, Data Scientist, Cybersecurity, and more.' },
  { num: '03', title: 'Take the Assessment', desc: 'Answer 5 quick questions about your interests and learning style.' },
  { num: '04', title: 'Get Your AI-Powered Roadmap', desc: 'Receive a complete, personalized career roadmap with skill recommendations.' },
];

const stats = [
  { value: '7', label: 'Engineering Branches', icon: '🏛️' },
  { value: '6', label: 'Career Paths', icon: '🎯' },
  { value: '100%', label: 'Free for Students', icon: '🎓' },
  { value: 'AI', label: 'Powered Mentor', icon: '🤖' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-hero-pattern overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-app relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                AI-Powered Career Guidance for Engineering Students
              </span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05] mb-6"
            >
              Stop Guessing.<br />
              <span className="gradient-text">Start Growing.</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={2}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Get a personalized career roadmap, skill gap analysis, and AI mentorship — built specifically for your engineering branch and career goal.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/signup" id="hero-cta-signup">
                <Button variant="gradient" size="xl" rightIcon={<ArrowRight size={20} />}>
                  Start Your Career Roadmap
                </Button>
              </Link>
              <Link to="/login" id="hero-cta-login">
                <Button variant="secondary" size="xl">
                  Already have an account
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={4}
              className="mt-6 text-sm text-slate-400 dark:text-slate-500"
            >
              Free for all engineering students · No credit card required
            </motion.p>
          </div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl shadow-indigo-100 dark:shadow-indigo-950/30 overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 mx-4 bg-white dark:bg-slate-700 rounded-lg px-3 py-1 text-xs text-slate-400 text-center">
                  careerAI.app/dashboard
                </div>
              </div>
              {/* Mock dashboard */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-5 text-white mb-4">
                    <p className="text-sm opacity-80 mb-1">Your Career Goal</p>
                    <p className="text-xl font-bold">Software Engineer</p>
                    <div className="mt-3 bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2 w-2/5" />
                    </div>
                    <p className="text-xs opacity-70 mt-1">40% Roadmap Complete</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {['🏗️ DSA & Algorithms', '⚛️ React Development', '🗄️ SQL Databases', '🔧 Git & GitHub'].map((s, i) => (
                      <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-xs font-medium text-slate-700 dark:text-slate-300">{s}</div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl p-4">
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Today's Next Action</p>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Continue DSA — Binary Trees</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4">
                    <p className="text-xs font-semibold text-slate-500 mb-2">AI Mentor Suggestion</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">"You're on track. Focus on tree traversal today."</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-emerald-600">12</p>
                      <p className="text-xs text-slate-500">Skills Done</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-orange-500">7🔥</p>
                      <p className="text-xs text-slate-500">Day Streak</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats ─────────────────────────────────────────────────────── */}
      <section className="py-12 border-y border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ──────────────────────────────────────────────────── */}
      <section id="features" className="section-padding bg-slate-50 dark:bg-slate-950">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider">What You Get</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-3 mb-4">
              Everything You Need to Navigate Your Career
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Built specifically for Indian engineering students who want clear direction, not more confusion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ──────────────────────────────────────────────── */}
      <section id="how-it-works" className="section-padding bg-white dark:bg-slate-900">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-3 mb-4">
              From Confused to Career-Ready in 4 Steps
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-lg font-black mb-4 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 w-6 items-center z-10">
                    <ArrowRight size={20} className="text-slate-300 dark:text-slate-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Benefits ──────────────────────────────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-indigo-200 text-sm font-semibold uppercase tracking-wider">Why Students Love It</span>
              <h2 className="text-3xl md:text-4xl font-black mt-3 mb-6">
                Finally, Career Guidance That Actually Makes Sense
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  'No more generic YouTube advice — get a roadmap built for your exact profile',
                  'Know which skill to learn next, not 10 things at once',
                  'AI mentor answers in the context of your roadmap, not random tips',
                  'Built for Tier-2 and Tier-3 college students, not just IIT grads',
                  'Placement-focused from day one — every step maps to a real job outcome',
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-emerald-300 mt-0.5 flex-shrink-0" />
                    <p className="text-indigo-100 text-sm leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">🤖</div>
                <div>
                  <p className="font-bold">AI Career Mentor</p>
                  <p className="text-indigo-200 text-xs">Roadmap-grounded responses</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-white/10 rounded-xl rounded-bl-sm p-3 text-sm">
                  "What should I focus on this week?"
                </div>
                <div className="bg-white/20 rounded-xl rounded-br-sm p-3 text-sm ml-4">
                  "You're in the <strong>DSA phase</strong> of your Software Engineer roadmap. This week: complete Binary Trees and Dynamic Programming basics. That's what stands between you and cracking product company interviews."
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" className="text-amber-300" />
                ))}
                <span className="text-indigo-200 text-xs ml-1">Grounded in your progress — not generic tips</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────────── */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="container-app text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Ready to Get Clarity on Your Career?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto mb-8">
              Join engineering students who are building real career direction — not just studying harder.
            </p>
            <Link to="/signup" id="bottom-cta">
              <Button variant="gradient" size="xl" rightIcon={<ArrowRight size={20} />}>
                Build My Career Roadmap — Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
