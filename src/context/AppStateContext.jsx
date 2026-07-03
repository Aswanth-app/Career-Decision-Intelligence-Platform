import { createContext, useContext, useState, useEffect } from 'react';
import { careerGoals, defaultRoadmap, skillsData, defaultSkills } from '../data/mockData';

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [profile, setProfileState] = useState(null);
  const [selectedGoal, setSelectedGoalState] = useState(null);
  const [quizAnswers, setQuizAnswersState] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  const [skills, setSkills] = useState(null);

  // Restore state from localStorage on mount
  useEffect(() => {
    const storedProfile = localStorage.getItem('cdip_profile');
    const storedGoal = localStorage.getItem('cdip_goal');
    const storedQuiz = localStorage.getItem('cdip_quiz');
    const storedAnalysis = localStorage.getItem('cdip_analysis');

    if (storedProfile) {
      const p = JSON.parse(storedProfile);
      setProfileState(p);
    }

    if (storedGoal) {
      const goal = careerGoals.find((g) => g.id === storedGoal);
      setSelectedGoalState(goal || null);

      const dept = storedProfile ? JSON.parse(storedProfile)?.department : 'CSE';
      const rm = defaultRoadmap(storedGoal, dept || 'CSE');
      // Apply overrides
      const overrides = JSON.parse(localStorage.getItem('cdip_roadmap_overrides') || '{}');
      const rmWithOverrides = rm.map((s) => overrides[s.id] ? { ...s, status: overrides[s.id] } : s);
      setRoadmap(rmWithOverrides);

      const sk = skillsData[storedGoal] || defaultSkills;
      setSkills(sk);
    }

    if (storedQuiz) setQuizAnswersState(JSON.parse(storedQuiz));
    if (storedAnalysis) setAnalysisResult(JSON.parse(storedAnalysis));
  }, []);

  const setProfile = (data) => {
    setProfileState(data);
    localStorage.setItem('cdip_profile', JSON.stringify(data));
  };

  const setGoal = (goalId) => {
    const goal = careerGoals.find((g) => g.id === goalId);
    setSelectedGoalState(goal);
    localStorage.setItem('cdip_goal', goalId);

    // Update roadmap and skills when goal changes
    const dept = profile?.department || 'CSE';
    const rm = defaultRoadmap(goalId, dept);
    setRoadmap(rm);

    const sk = skillsData[goalId] || defaultSkills;
    setSkills(sk);
  };

  const setQuizAnswers = (answers) => {
    setQuizAnswersState(answers);
    localStorage.setItem('cdip_quiz', JSON.stringify(answers));
  };

  const updateRoadmapStep = (stepId, status) => {
    const updated = roadmap.map((s) => s.id === stepId ? { ...s, status } : s);
    setRoadmap(updated);
    const overrides = updated.reduce((acc, s) => ({ ...acc, [s.id]: s.status }), {});
    localStorage.setItem('cdip_roadmap_overrides', JSON.stringify(overrides));
  };

  const resetApp = () => {
    setProfileState(null);
    setSelectedGoalState(null);
    setQuizAnswersState(null);
    setAnalysisResult(null);
    setRoadmap([]);
    setSkills(null);
  };

  return (
    <AppStateContext.Provider value={{
      profile, setProfile,
      selectedGoal, setGoal,
      quizAnswers, setQuizAnswers,
      analysisResult, setAnalysisResult,
      roadmap, setRoadmap, updateRoadmapStep,
      skills, setSkills,
      resetApp,
    }}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
};
