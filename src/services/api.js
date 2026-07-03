import { defaultRoadmap, skillsData, defaultSkills, getDashboardData, generateAnalysisResult, mentorResponses, careerGoals } from '../data/mockData';
import { delay } from '../utils';

// Simulated API client with realistic latency
const apiClient = {
  get: async (endpoint, data = null, latency = 400) => {
    await delay(latency);
    return { data, error: null, status: 200 };
  },
  post: async (endpoint, payload, responseData = null, latency = 600) => {
    await delay(latency);
    return { data: responseData || payload, error: null, status: 201 };
  },
};

// ─── Profile ───────────────────────────────────────────────────────────────
export const profileService = {
  get: async (userId) => {
    const stored = localStorage.getItem('cdip_profile');
    return apiClient.get('/profile', stored ? JSON.parse(stored) : null, 300);
  },
  save: async (profileData) => {
    localStorage.setItem('cdip_profile', JSON.stringify(profileData));
    return apiClient.post('/profile', profileData, profileData, 500);
  },
};

// ─── Goal ──────────────────────────────────────────────────────────────────
export const goalService = {
  getAll: async () => {
    return apiClient.get('/goal', careerGoals, 300);
  },
  save: async (goalId) => {
    localStorage.setItem('cdip_goal', goalId);
    const goal = careerGoals.find((g) => g.id === goalId);
    return apiClient.post('/goal', { goalId }, goal, 400);
  },
  getCurrent: () => {
    const id = localStorage.getItem('cdip_goal');
    return careerGoals.find((g) => g.id === id) || null;
  },
};

// ─── Quiz ──────────────────────────────────────────────────────────────────
export const quizService = {
  getQuestions: async () => {
    const { quizQuestions } = await import('../data/mockData');
    return apiClient.get('/quiz', quizQuestions, 300);
  },
  submit: async (answers) => {
    localStorage.setItem('cdip_quiz', JSON.stringify(answers));
    return apiClient.post('/quiz', answers, { success: true, answers }, 500);
  },
  getAnswers: () => {
    const stored = localStorage.getItem('cdip_quiz');
    return stored ? JSON.parse(stored) : null;
  },
};

// ─── Analysis ──────────────────────────────────────────────────────────────
export const analysisService = {
  run: async (profile, goalId, quizAnswers) => {
    await delay(3000); // simulate AI processing
    const result = generateAnalysisResult(profile, goalId, quizAnswers);
    localStorage.setItem('cdip_analysis', JSON.stringify(result));
    return { data: result, error: null, status: 200 };
  },
  get: async () => {
    const stored = localStorage.getItem('cdip_analysis');
    return apiClient.get('/analysis', stored ? JSON.parse(stored) : null, 200);
  },
};

// ─── Dashboard ─────────────────────────────────────────────────────────────
export const dashboardService = {
  get: async () => {
    const profile = JSON.parse(localStorage.getItem('cdip_profile') || '{}');
    const goalId = localStorage.getItem('cdip_goal') || 'software-engineer';
    const goal = careerGoals.find((g) => g.id === goalId);
    const roadmap = defaultRoadmap(goalId, profile?.department || 'CSE');
    const progress = JSON.parse(localStorage.getItem('cdip_progress') || '{}');
    const dashData = getDashboardData(profile, goal, roadmap, progress);
    return apiClient.get('/dashboard', dashData, 400);
  },
};

// ─── Roadmap ───────────────────────────────────────────────────────────────
export const roadmapService = {
  get: async () => {
    const profile = JSON.parse(localStorage.getItem('cdip_profile') || '{}');
    const goalId = localStorage.getItem('cdip_goal') || 'software-engineer';
    const roadmap = defaultRoadmap(goalId, profile?.department || 'CSE');
    return apiClient.get('/roadmap', roadmap, 400);
  },
  updateStep: async (stepId, status) => {
    const profile = JSON.parse(localStorage.getItem('cdip_profile') || '{}');
    const goalId = localStorage.getItem('cdip_goal') || 'software-engineer';
    let roadmap = defaultRoadmap(goalId, profile?.department || 'CSE');
    roadmap = roadmap.map((step) =>
      step.id === stepId ? { ...step, status } : step
    );
    localStorage.setItem('cdip_roadmap_overrides', JSON.stringify(
      roadmap.reduce((acc, s) => ({ ...acc, [s.id]: s.status }), {})
    ));
    return apiClient.post('/roadmap', { stepId, status }, { success: true }, 300);
  },
  getWithOverrides: async () => {
    const profile = JSON.parse(localStorage.getItem('cdip_profile') || '{}');
    const goalId = localStorage.getItem('cdip_goal') || 'software-engineer';
    let roadmap = defaultRoadmap(goalId, profile?.department || 'CSE');
    const overrides = JSON.parse(localStorage.getItem('cdip_roadmap_overrides') || '{}');
    roadmap = roadmap.map((step) =>
      overrides[step.id] ? { ...step, status: overrides[step.id] } : step
    );
    return apiClient.get('/roadmap', roadmap, 300);
  },
};

// ─── Skills ────────────────────────────────────────────────────────────────
export const skillsService = {
  get: async () => {
    const goalId = localStorage.getItem('cdip_goal') || 'software-engineer';
    const skills = skillsData[goalId] || defaultSkills;
    return apiClient.get('/skills', skills, 300);
  },
  markComplete: async (skillId) => {
    const completed = JSON.parse(localStorage.getItem('cdip_skills_completed') || '[]');
    if (!completed.includes(skillId)) completed.push(skillId);
    localStorage.setItem('cdip_skills_completed', JSON.stringify(completed));
    return apiClient.post('/skills', { skillId }, { success: true }, 200);
  },
  getCompleted: () => {
    return JSON.parse(localStorage.getItem('cdip_skills_completed') || '[]');
  },
};

// ─── Mentor ────────────────────────────────────────────────────────────────
export const mentorService = {
  getHistory: async () => {
    const stored = JSON.parse(localStorage.getItem('cdip_mentor_history') || '[]');
    return apiClient.get('/mentor/history', stored, 200);
  },
  chat: async (userMessage, profile, goalId) => {
    const goal = careerGoals.find((g) => g.id === goalId);
    const goalTitle = goal?.title || 'Software Engineer';
    const profile_name = profile?.name || 'there';

    const msg = userMessage.toLowerCase();
    let response;

    if (msg.includes('hello') || msg.includes('hi') || msg.includes('start')) {
      const roadmap = defaultRoadmap(goalId, profile?.department || 'CSE');
      const inProgress = roadmap?.find((s) => s.status === 'in-progress');
      response = mentorResponses.greeting(profile_name, goalTitle, inProgress?.phase || 'Foundation');
    } else if (msg.includes('roadmap') || msg.includes('next step') || msg.includes('what should')) {
      const roadmap = defaultRoadmap(goalId, profile?.department || 'CSE');
      const completed = roadmap?.find((s) => s.status === 'completed');
      const inProgress = roadmap?.find((s) => s.status === 'in-progress');
      response = mentorResponses.roadmapQuestion(
        goalTitle,
        completed?.title || 'Foundation',
        inProgress?.title || 'Core Skills'
      );
    } else if (msg.includes('skill') || msg.includes('learn') || msg.includes('study')) {
      const skills = skillsData[goalId] || defaultSkills;
      const topSkill = skills.mustLearn?.[0];
      response = mentorResponses.skillQuestion(
        topSkill?.name || 'DSA',
        goalTitle,
        topSkill?.priority || 'High'
      );
    } else if (msg.includes('progress') || msg.includes('how am i') || msg.includes('percentage')) {
      const roadmap = defaultRoadmap(goalId, profile?.department || 'CSE');
      const completed = roadmap?.filter((s) => s.status === 'completed')?.length || 1;
      const inProgress = roadmap?.find((s) => s.status === 'in-progress');
      response = mentorResponses.progressQuestion(
        completed,
        roadmap?.length || 5,
        inProgress?.title || 'Core Skills'
      );
    } else if (msg.includes('advice') || msg.includes('tip') || msg.includes('help')) {
      response = mentorResponses.genericAdvice(goalTitle);
    } else {
      response = mentorResponses.default(goalTitle);
    }

    // Save to history
    const history = JSON.parse(localStorage.getItem('cdip_mentor_history') || '[]');
    const newHistory = [
      ...history,
      { id: Date.now(), role: 'user', content: userMessage, timestamp: new Date().toISOString() },
      { id: Date.now() + 1, role: 'ai', content: response, timestamp: new Date().toISOString() },
    ];
    localStorage.setItem('cdip_mentor_history', JSON.stringify(newHistory));

    await delay(1200); // simulate AI thinking
    return { data: { message: response }, error: null, status: 200 };
  },
};

// ─── Progress ──────────────────────────────────────────────────────────────
export const progressService = {
  get: async () => {
    const profile = JSON.parse(localStorage.getItem('cdip_profile') || '{}');
    const goalId = localStorage.getItem('cdip_goal') || 'software-engineer';
    const roadmap = defaultRoadmap(goalId, profile?.department || 'CSE');
    const completedSkills = JSON.parse(localStorage.getItem('cdip_skills_completed') || '[]');
    const overrides = JSON.parse(localStorage.getItem('cdip_roadmap_overrides') || '{}');
    const roadmapWithOverrides = roadmap.map((s) =>
      overrides[s.id] ? { ...s, status: overrides[s.id] } : s
    );
    const completedSteps = roadmapWithOverrides.filter((s) => s.status === 'completed').length;
    const inProgressStep = roadmapWithOverrides.find((s) => s.status === 'in-progress');
    const upcomingStep = roadmapWithOverrides.find((s) => s.status === 'upcoming');

    const progressData = {
      roadmapCompletion: Math.round((completedSteps / roadmap.length) * 100),
      completedSteps,
      totalSteps: roadmap.length,
      completedSkills: completedSkills.length,
      currentStage: inProgressStep?.phase || 'Foundation',
      currentStep: inProgressStep?.title || 'Getting Started',
      upcomingMilestone: upcomingStep?.title || 'Core Skills',
      weeklyGoal: 10,
      weeklyActual: 7,
      streakDays: 7,
      badges: completedSteps >= 1 ? ['🏆 First Step', '⚡ Quick Starter'] : [],
    };
    return apiClient.get('/progress', progressData, 300);
  },
};

// ─── Settings ──────────────────────────────────────────────────────────────
export const settingsService = {
  get: async () => {
    const stored = JSON.parse(localStorage.getItem('cdip_settings') || '{}');
    const defaults = {
      notifications: true,
      weeklyReport: true,
      darkMode: false,
      language: 'English',
      timezone: 'Asia/Kolkata',
    };
    return apiClient.get('/settings', { ...defaults, ...stored }, 200);
  },
  save: async (settings) => {
    const current = JSON.parse(localStorage.getItem('cdip_settings') || '{}');
    const updated = { ...current, ...settings };
    localStorage.setItem('cdip_settings', JSON.stringify(updated));
    return apiClient.post('/settings', settings, { success: true }, 300);
  },
};

// ─── Auth ──────────────────────────────────────────────────────────────────
export const authService = {
  login: async (email, password) => {
    await delay(800);
    const user = { id: 'user_001', email, name: email.split('@')[0] };
    localStorage.setItem('cdip_user', JSON.stringify(user));
    localStorage.setItem('cdip_auth_token', 'mock_jwt_token_' + Date.now());
    return { data: { user, token: 'mock_token' }, error: null, status: 200 };
  },
  signup: async (name, email, password) => {
    await delay(1000);
    const user = { id: 'user_' + Date.now(), email, name };
    localStorage.setItem('cdip_user', JSON.stringify(user));
    localStorage.setItem('cdip_auth_token', 'mock_jwt_token_' + Date.now());
    return { data: { user, token: 'mock_token' }, error: null, status: 201 };
  },
  logout: () => {
    ['cdip_user', 'cdip_auth_token', 'cdip_profile', 'cdip_goal', 'cdip_quiz',
     'cdip_analysis', 'cdip_mentor_history', 'cdip_skills_completed',
     'cdip_roadmap_overrides', 'cdip_progress'].forEach((k) => localStorage.removeItem(k));
  },
  getUser: () => {
    const stored = localStorage.getItem('cdip_user');
    return stored ? JSON.parse(stored) : null;
  },
  isAuthenticated: () => !!localStorage.getItem('cdip_auth_token'),
};
