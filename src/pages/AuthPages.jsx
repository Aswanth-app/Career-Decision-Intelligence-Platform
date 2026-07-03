import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/FormFields';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true); setError('');
    const res = await login(email, password);
    setLoading(false);
    if (!res.error) {
      // Check if profile is set up
      const hasProfile = localStorage.getItem('cdip_profile');
      const hasGoal = localStorage.getItem('cdip_goal');
      const hasQuiz = localStorage.getItem('cdip_quiz');
      const hasAnalysis = localStorage.getItem('cdip_analysis');
      if (!hasProfile) navigate('/profile');
      else if (!hasGoal) navigate('/goal');
      else if (!hasQuiz) navigate('/quiz');
      else if (!hasAnalysis) navigate('/analysis');
      else navigate('/dashboard');
    } else {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-100 dark:shadow-slate-900/50 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-black mx-auto mb-4 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40">
            C
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Welcome back</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Log in to continue your career journey</p>
        </div>

        {/* Demo hint */}
        <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 rounded-xl p-3 mb-6 text-center">
          <p className="text-xs text-indigo-700 dark:text-indigo-400">
            <strong>Demo:</strong> Use any email & password to log in
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="login-email"
            label="Email address"
            type="email"
            placeholder="arjun@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail size={16} />}
            required
          />
          <Input
            id="login-password"
            label="Password"
            type={showPass ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock size={16} />}
            rightIcon={
              <button type="button" onClick={() => setShowPass(!showPass)} aria-label="Toggle password">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
            required
          />
          {error && <p className="text-red-500 dark:text-red-400 text-sm text-center">{error}</p>}
          <Button id="login-submit" type="submit" variant="gradient" size="lg" loading={loading} fullWidth rightIcon={<ArrowRight size={16} />}>
            Log In
          </Button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          <span className="text-xs text-slate-400">or</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="text-center space-y-3">
          <Link to="/forgot-password" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            Forgot password?
          </Link>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" id="login-to-signup" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true); setError('');
    const res = await signup(form.name, form.email, form.password);
    setLoading(false);
    if (!res.error) navigate('/profile');
    else setError('Signup failed. Please try again.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-100 dark:shadow-slate-900/50 p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-black mx-auto mb-4 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40">
            C
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Create your account</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Start your personalized career journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="signup-name"
            name="name"
            label="Full Name"
            placeholder="Arjun Kumar"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            id="signup-email"
            name="email"
            label="College Email"
            type="email"
            placeholder="arjun@college.edu"
            value={form.email}
            onChange={handleChange}
            leftIcon={<Mail size={16} />}
            required
          />
          <Input
            id="signup-password"
            name="password"
            label="Password"
            type={showPass ? 'text' : 'password'}
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={handleChange}
            leftIcon={<Lock size={16} />}
            rightIcon={
              <button type="button" onClick={() => setShowPass(!showPass)} aria-label="Toggle password">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
            required
          />
          {error && <p className="text-red-500 dark:text-red-400 text-sm text-center">{error}</p>}
          <Button id="signup-submit" type="submit" variant="gradient" size="lg" loading={loading} fullWidth rightIcon={<ArrowRight size={16} />}>
            Create Account & Start
          </Button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-4">
          By signing up, you agree to use this platform for educational purposes.
        </p>

        <div className="text-center mt-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" id="signup-to-login" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">{sent ? '✅' : '🔐'}</div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
            {sent ? 'Check your email' : 'Reset password'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {sent ? `We sent a reset link to ${email}` : "Enter your email and we'll send you a reset link"}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              id="forgot-email"
              label="Email address"
              type="email"
              placeholder="arjun@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={16} />}
              required
            />
            <Button id="forgot-submit" type="submit" variant="gradient" size="lg" loading={loading} fullWidth>
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              This is a demo — no real email is sent in the mock environment.
            </p>
          </div>
        )}

        <div className="text-center mt-4">
          <Link to="/login" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            ← Back to login
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
