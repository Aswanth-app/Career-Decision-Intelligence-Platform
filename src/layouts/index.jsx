import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from '../components/layout/NavSidebar';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-surface-2 dark:bg-slate-950 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <Outlet />
      </main>
    </div>
  );
}

export function OnboardingLayout() {
  return (
    <div className="min-h-screen gradient-surface flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
