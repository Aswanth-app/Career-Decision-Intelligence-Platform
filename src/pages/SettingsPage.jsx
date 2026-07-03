import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Bell, Shield, Globe, Check } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/FormFields';
import { PageHeader, SectionHeader } from '../components/ui/Components';
import { useAppState } from '../context/AppStateContext';
import { useAuth } from '../context/AuthContext';
import { settingsService } from '../services/api';
import { getDepartmentLabel, getYearLabel } from '../utils';

export default function SettingsPage() {
  const { profile, resetApp } = useAppState();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    notifications: true,
    weeklyReport: true,
    language: 'English',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile) {
      navigate('/profile');
      return;
    }
    loadSettings();
  }, [profile]);

  const loadSettings = async () => {
    const res = await settingsService.get();
    if (!res.error) {
      setSettings(res.data);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await settingsService.save(settings);
    setSaving(false);
    if (!res.error) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    resetApp();
    navigate('/');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <PageHeader
        title="Settings & Profile"
        subtitle="Manage your career profile preferences and dashboard configurations."
        badge="User Hub"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card Summary */}
        <div className="space-y-6">
          <Card>
            <CardBody className="p-6 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black mx-auto shadow-md">
                {profile?.name ? profile.name[0].toUpperCase() : 'U'}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {profile?.name || 'Student Name'}
                </h3>
                <p className="text-xs text-slate-400 font-medium">{user?.email || 'student@college.edu'}</p>
              </div>
              
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-left space-y-3 text-sm">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Department</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {getDepartmentLabel(profile?.department)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Academic Year</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {getYearLabel(profile?.year)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Skill Level Focus</p>
                  <p className="font-bold capitalize text-slate-800 dark:text-slate-200">
                    {profile?.skillLevel || 'Beginner'}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  id="settings-logout-btn"
                  variant="danger"
                  fullWidth
                  leftIcon={<LogOut size={16} />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* System Settings Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardBody className="p-6 space-y-6">
              <SectionHeader
                title="System Preferences"
                subtitle="Configure notifications and language properties."
              />

              <form onSubmit={handleSave} className="space-y-6">
                {/* Notifications Group */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                    <Bell size={16} className="text-indigo-500" /> Notifications Settings
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications}
                        onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mt-1 h-4 w-4"
                      />
                      <div>
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Email Recommendations</span>
                        <p className="text-xs text-slate-400 mt-0.5">Receive notifications about upcoming milestones.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.weeklyReport}
                        onChange={(e) => setSettings({ ...settings, weeklyReport: e.target.checked })}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mt-1 h-4 w-4"
                      />
                      <div>
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Weekly Progress Report</span>
                        <p className="text-xs text-slate-400 mt-0.5">Receive a summary report of completed skills and streaks.</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Internationalization Group */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                    <Globe size={16} className="text-indigo-500" /> Language Preferences
                  </div>

                  <Select
                    id="settings-language"
                    label="Application Language"
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi (हिंदी)</option>
                    <option value="Tamil">Tamil (தமிழ்)</option>
                  </Select>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  {saveSuccess && (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-fade-in">
                      <Check size={16} /> Saved successfully!
                    </span>
                  )}
                  <div className="ml-auto">
                    <Button
                      id="settings-save-btn"
                      type="submit"
                      variant="primary"
                      loading={saving}
                    >
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
