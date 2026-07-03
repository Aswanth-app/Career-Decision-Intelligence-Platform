import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles, AlertCircle, Info, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/FormFields';
import { Card, CardBody } from '../components/ui/Card';
import { PageHeader } from '../components/ui/Components';
import { AIChatBubble } from '../components/ui/Components';
import { useAppState } from '../context/AppStateContext';
import { mentorService } from '../services/api';

export default function MentorPage() {
  const { profile, selectedGoal } = useAppState();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
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
    loadHistory();
  }, [profile, selectedGoal]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const loadHistory = async () => {
    const res = await mentorService.getHistory();
    if (!res.error && res.data.length > 0) {
      setMessages(res.data);
    } else {
      // Seed initial greeting message
      const defaultGoalTitle = selectedGoal?.title || 'Software Engineer';
      const initialGreeting = `Hi ${profile?.name || 'there'}! 👋 I'm your AI Career Mentor. Based on your goal of becoming a **${defaultGoalTitle}**, I'm here to provide roadmap-grounded, honest advice to help you reach your goals. Ask me about your roadmap, skill gaps, or learning strategies!`;
      setMessages([
        {
          id: 'init',
          role: 'ai',
          content: initialGreeting,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Call service
    const goalId = selectedGoal?.id || 'software-engineer';
    const res = await mentorService.chat(messageText, profile, goalId);
    
    if (!res.error) {
      const aiMsg = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: res.data.message,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } else {
      const errorMsg = {
        id: `err-${Date.now()}`,
        role: 'ai',
        content: "Sorry, I had trouble processing that request. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
    setLoading(false);
  };

  const handleClearHistory = () => {
    localStorage.removeItem('cdip_mentor_history');
    setMessages([]);
    loadHistory();
  };

  const suggestions = [
    'What should I focus on this week?',
    'What skills do I need next?',
    'How is my progress looking?',
    'What is the best way to learn these skills?',
  ];

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <PageHeader
        title="AI Career Mentor"
        subtitle={`Grounded in your goals and current status as an engineering student.`}
        badge="Mentorship Assistant"
        actions={
          <Button variant="tertiary" size="sm" leftIcon={<RefreshCw size={14} />} onClick={handleClearHistory}>
            Reset Conversation
          </Button>
        }
      />

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        {/* Context banner */}
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 px-6 py-3 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
          <Info size={14} className="text-indigo-600 dark:text-indigo-400" />
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            Mentor active context: <span className="underline font-bold">{selectedGoal?.title}</span> path ({profile?.department} department)
          </p>
        </div>

        {/* Message area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <AIChatBubble
              key={msg.id}
              message={msg.content}
              isUser={msg.role === 'user'}
              timestamp={msg.timestamp}
            />
          ))}
          {loading && (
            <AIChatBubble
              message=""
              isUser={false}
              isLoading={true}
            />
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-6 py-2 border-t border-slate-100 dark:border-slate-800/80 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              id="mentor-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about roadmaps, skill tips, placement preparation..."
              containerClass="flex-1"
              disabled={loading}
              autoComplete="off"
            />
            <Button
              id="mentor-send-btn"
              type="submit"
              variant="primary"
              disabled={loading || !input.trim()}
              className="px-5"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
