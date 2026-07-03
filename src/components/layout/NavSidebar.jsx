import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X, Bell, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useAppState } from '../../context/AppStateContext';
import { getInitials } from '../../utils';
import { cn } from '../../utils';

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const { profile } = useAppState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayName = profile?.name || user?.name || 'Student';
  const initials = getInitials(displayName);

  return (
    <nav className={cn(
      'sticky top-0 z-40 w-full border-b transition-all duration-200',
      isLandingPage
        ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-slate-100 dark:border-slate-800/50'
        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
    )}>
      <div className="container-app">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm group-hover:shadow-indigo-300 dark:group-hover:shadow-indigo-900 transition-shadow">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-base hidden sm:block">
              CareerAI<span className="text-indigo-500">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={cn('px-3 py-2 text-sm font-medium rounded-lg transition-colors', location.pathname === '/dashboard' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100')}>Dashboard</Link>
                <Link to="/roadmap" className={cn('px-3 py-2 text-sm font-medium rounded-lg transition-colors', location.pathname === '/roadmap' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100')}>Roadmap</Link>
                <Link to="/mentor" className={cn('px-3 py-2 text-sm font-medium rounded-lg transition-colors', location.pathname === '/mentor' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100')}>AI Mentor</Link>
              </>
            ) : (
              <>
                <a href="#features" className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Features</a>
                <a href="#how-it-works" className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">How It Works</a>
              </>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isAuthenticated ? (
              <>
                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    id="profile-menu-btn"
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {initials}
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-slate-700 dark:text-slate-300 max-w-[100px] truncate">
                      {displayName}
                    </span>
                    <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1 z-50">
                      <Link to="/settings" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Settings</Link>
                      <Link to="/progress" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">My Progress</Link>
                      <hr className="border-slate-100 dark:border-slate-700 my-1" />
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" id="nav-login" className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Log in
                </Link>
                <Link to="/signup" id="nav-signup" className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 flex flex-col gap-1">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="py-2.5 px-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Dashboard</Link>
              <Link to="/roadmap" onClick={() => setMenuOpen(false)} className="py-2.5 px-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Roadmap</Link>
              <Link to="/skills" onClick={() => setMenuOpen(false)} className="py-2.5 px-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Skills</Link>
              <Link to="/mentor" onClick={() => setMenuOpen(false)} className="py-2.5 px-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">AI Mentor</Link>
              <Link to="/progress" onClick={() => setMenuOpen(false)} className="py-2.5 px-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Progress</Link>
              <Link to="/settings" onClick={() => setMenuOpen(false)} className="py-2.5 px-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Settings</Link>
              <button onClick={handleLogout} className="py-2.5 px-3 text-sm text-red-600 dark:text-red-400 text-left hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg mt-1">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="py-2.5 px-3 text-sm text-slate-700 dark:text-slate-300">Log in</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="py-2.5 px-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium">Get Started Free</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export function Sidebar() {
  const location = useLocation();
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { to: '/roadmap', label: 'Roadmap', icon: '🗺️' },
    { to: '/skills', label: 'Skills', icon: '⚡' },
    { to: '/mentor', label: 'AI Mentor', icon: '🤖' },
    { to: '/progress', label: 'Progress', icon: '📈' },
    { to: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-56 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-screen py-6">
      <nav className="flex flex-col gap-1 px-3">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            id={`sidebar-${item.label.toLowerCase().replace(' ', '-')}`}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
              location.pathname === item.to
                ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
            )}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12">
      <div className="container-app">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-bold text-white">CareerAI</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              AI-powered career guidance for engineering students. Get a personalized roadmap, skill recommendations, and mentorship.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Platform</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/roadmap" className="hover:text-white transition-colors">Roadmap</Link></li>
              <li><Link to="/skills" className="hover:text-white transition-colors">Skills</Link></li>
              <li><Link to="/mentor" className="hover:text-white transition-colors">AI Mentor</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">For Students</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><span>CSE & IT</span></li>
              <li><span>AI/ML & Data Science</span></li>
              <li><span>ECE & EEE</span></li>
              <li><span>CCE Engineering</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs">© 2025 Career Decision Intelligence Platform. Built for engineering students.</p>
          <p className="text-xs">SIH · Mini Project · Startup MVP</p>
        </div>
      </div>
    </footer>
  );
}
