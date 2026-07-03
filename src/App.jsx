import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useAppState } from './context/AppStateContext';

// Layouts
import { AppLayout, PublicLayout, AuthLayout, OnboardingLayout } from './layouts';

// Pages
import LandingPage from './pages/LandingPage';
import { LoginPage, SignupPage, ForgotPasswordPage } from './pages/AuthPages';
import ProfileSetupPage from './pages/ProfileSetupPage';
import GoalSelectionPage from './pages/GoalSelectionPage';
import QuizPage from './pages/QuizPage';
import AnalysisPage from './pages/AnalysisPage';
import DashboardPage from './pages/DashboardPage';
import RoadmapPage from './pages/RoadmapPage';
import SkillsPage from './pages/SkillsPage';
import MentorPage from './pages/MentorPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';

// Route Guard for authenticated users
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Guard specifically for onboarding flow steps
function OnboardingRoute({ children, stepRequired }) {
  const { isAuthenticated, loading } = useAuth();
  const { profile, selectedGoal, quizAnswers, analysisResult } = useAppState();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Enforce chronological onboarding step order
  if (stepRequired === 'goal' && !profile) {
    return <Navigate to="/profile" replace />;
  }
  if (stepRequired === 'quiz' && !selectedGoal) {
    return <Navigate to="/goal" replace />;
  }
  if (stepRequired === 'analysis' && !quizAnswers) {
    return <Navigate to="/quiz" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Onboarding Routes */}
      <Route element={<OnboardingLayout />}>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileSetupPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/goal"
          element={
            <OnboardingRoute stepRequired="goal">
              <GoalSelectionPage />
            </OnboardingRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <OnboardingRoute stepRequired="quiz">
              <QuizPage />
            </OnboardingRoute>
          }
        />
        <Route
          path="/analysis"
          element={
            <OnboardingRoute stepRequired="analysis">
              <AnalysisPage />
            </OnboardingRoute>
          }
        />
      </Route>

      {/* Main App Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
