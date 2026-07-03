import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function getInitials(name) {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getDepartmentLabel(dept) {
  const map = {
    CSE: 'Computer Science & Engineering',
    IT: 'Information Technology',
    CCE: 'Computer & Communication Engineering',
    AIDS: 'AI & Data Science',
    AIML: 'AI & Machine Learning',
    ECE: 'Electronics & Communication Engineering',
    EEE: 'Electrical & Electronics Engineering',
    CSBS: 'Computer Science & Business Systems',
    BME: 'Bio Medical Engineering',
    CHEM: 'Chemical Engineering',
    MECH: 'Mechanical Engineering',
    CIVIL: 'Civil Engineering',
  };
  return map[dept] || dept;
}

export function getYearLabel(year) {
  const map = {
    1: '1st Year',
    2: '2nd Year',
    3: '3rd Year',
    4: '4th Year',
  };
  return map[year] || `${year}th Year`;
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function calculateProgress(completed, total) {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function getDifficultyColor(difficulty) {
  const map = {
    Beginner: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40',
    Intermediate: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/40',
    Advanced: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/40',
  };
  return map[difficulty] || map.Beginner;
}

export function getPriorityColor(priority) {
  const map = {
    High: 'text-red-600 dark:text-red-400',
    Medium: 'text-amber-600 dark:text-amber-400',
    Low: 'text-slate-500 dark:text-slate-400',
  };
  return map[priority] || map.Medium;
}

export function getStatusColor(status) {
  const map = {
    completed: 'text-emerald-600 dark:text-emerald-400',
    'in-progress': 'text-indigo-600 dark:text-indigo-400',
    upcoming: 'text-slate-500 dark:text-slate-400',
    locked: 'text-slate-400 dark:text-slate-600',
  };
  return map[status] || map.upcoming;
}
