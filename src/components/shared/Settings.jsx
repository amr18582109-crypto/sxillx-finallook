import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useT } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { getFromStorage, saveToStorage } from '../../utils/storage';
import { Settings as SettingsIcon, LogOut, Trash2, Globe, Moon, Sun, Bell, Shield, User, HelpCircle, AlertTriangle } from 'lucide-react';
import Button from './Button';
import Toast from './Toast';

const Settings = () => {
  const { user, isAuthenticated, logout } = useUser();
  const { t, language, toggleLanguage } = useT();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    language: 'en',
    theme: 'light',
    emailNotifications: true,
    browserNotifications: true,
    taskAlerts: true,
    jobUpdates: true,
    showInLeaderboard: true,
    allowMessages: true,
    showActivity: true,
    jobsPerPage: 25,
    defaultView: 'grid',
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const stored = getFromStorage('settings', {});
    if (Object.keys(stored).length > 0) {
      setSettings(prev => ({ ...prev, ...stored }));
    } else {
      // Initialize with current language from context
      setSettings(prev => ({ ...prev, language }));
    }
  }, []);

  useEffect(() => {
    // Apply theme
    if (settings.theme === 'dark') {
      document.body.classList.add('dark');
      document.documentElement.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  useEffect(() => {
    // Sync settings language with context
    if (settings.language !== language) {
      setSettings(prev => ({ ...prev, language }));
    }
  }, [language, settings.language]);

  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    saveToStorage('settings', updated);
    
    // Language switching disabled — ignore language updates
    
    setToastMessage(t('settingsSaved'));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteAccount = () => {
    // Clear all user data
    localStorage.clear();
    logout();
    navigate('/');
    setToastMessage('Account deleted successfully');
    setShowToast(true);
  };

  const ToggleSwitch = ({ enabled, onChange, label }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-primary' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const Section = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-600">{t('loading')}</p>
            <Button onClick={() => navigate('/?login=true')} variant="primary" className="mt-4">
              {t('login')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <SettingsIcon className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('settingsTitle')}
          </h1>
        </div>

        {/* Appearance (language fixed to English) */}
        <Section title={t('theme')} icon={Globe}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-700">Language</span>
              <div className="px-4 py-2 rounded-lg text-gray-700">English</div>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-700">{t('theme')}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateSetting('theme', 'light')}
                  className={`px-4 py-2 rounded-lg transition flex items-center space-x-2 ${
                    settings.theme === 'light'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span>{t('lightMode')}</span>
                </button>
                <button
                  onClick={() => updateSetting('theme', 'dark')}
                  className={`px-4 py-2 rounded-lg transition flex items-center space-x-2 ${
                    settings.theme === 'dark'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span>{t('darkMode')}</span>
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* Notifications */}
        <Section title={t('notifications')} icon={Bell}>
          <div className="space-y-2">
            <ToggleSwitch
              enabled={settings.emailNotifications}
              onChange={(val) => updateSetting('emailNotifications', val)}
              label={t('emailNotifications')}
            />
            <ToggleSwitch
              enabled={settings.browserNotifications}
              onChange={(val) => updateSetting('browserNotifications', val)}
              label={t('browserNotifications')}
            />
            <ToggleSwitch
              enabled={settings.taskAlerts}
              onChange={(val) => updateSetting('taskAlerts', val)}
              label={t('taskAlerts')}
            />
            <ToggleSwitch
              enabled={settings.jobUpdates}
              onChange={(val) => updateSetting('jobUpdates', val)}
              label={t('jobUpdates')}
            />
          </div>
        </Section>

        {/* Privacy Settings (for students) */}
        {user?.type === 'student' && (
          <Section title={t('privacy')} icon={Shield}>
            <div className="space-y-2">
              <ToggleSwitch
                enabled={settings.showInLeaderboard}
                onChange={(val) => updateSetting('showInLeaderboard', val)}
                label={t('showInLeaderboard')}
              />
              <ToggleSwitch
                enabled={settings.allowMessages}
                onChange={(val) => updateSetting('allowMessages', val)}
                label={t('allowMessages')}
              />
              <ToggleSwitch
                enabled={settings.showActivity}
                onChange={(val) => updateSetting('showActivity', val)}
                label={t('showActivity')}
              />
            </div>
          </Section>
        )}

        {/* Account Information */}
        <Section title={t('account')} icon={User}>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">{t('accountType')}</span>
              <span className="font-semibold text-gray-800 capitalize">{user?.type || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Email</span>
              <span className="font-semibold text-gray-800">{user?.email || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">{t('memberSince')}</span>
              <span className="font-semibold text-gray-800">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                  : 'Dec 2024'}
              </span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <Button variant="outline" className="w-full">
                {t('changePassword')} ({t('comingSoon')})
              </Button>
            </div>
          </div>
        </Section>

        {/* Preferences */}
        <Section title="Preferences" icon={SettingsIcon}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-700">{t('jobsPerPage')}</span>
              <select
                value={settings.jobsPerPage}
                onChange={(e) => updateSetting('jobsPerPage', parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-700">{t('defaultView')}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateSetting('defaultView', 'grid')}
                  className={`px-4 py-2 rounded-lg transition ${
                    settings.defaultView === 'grid'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {t('grid')}
                </button>
                <button
                  onClick={() => updateSetting('defaultView', 'list')}
                  className={`px-4 py-2 rounded-lg transition ${
                    settings.defaultView === 'list'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {t('list')}
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* Help & Support */}
        <Section title={t('helpSupport')} icon={HelpCircle}>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              {t('contactSupport')}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              {t('faq')}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              {t('reportBug')}
            </Button>
            <div className="pt-3 border-t border-gray-200 text-sm text-gray-500">
              SkillX v1.0.0
            </div>
          </div>
        </Section>

        {/* Logout */}
        {isAuthenticated && (
          <Section title="Account Actions" icon={LogOut}>
            <Button
              onClick={() => setShowLogoutConfirm(true)}
              variant="primary"
              className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>{t('logout')}</span>
            </Button>
          </Section>
        )}

        {/* Danger Zone */}
        {isAuthenticated && (
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-200">
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-bold text-red-600">{t('dangerZone')}</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              variant="outline"
              className="w-full border-red-500 text-red-500 hover:bg-red-50 flex items-center justify-center space-x-2"
            >
              <Trash2 className="w-5 h-5" />
              <span>{t('deleteAccount')}</span>
            </Button>
          </div>
        )}

        {/* Logout Confirmation */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t('confirmLogout')}</h3>
              <p className="text-gray-600 mb-6">{t('areYouSureLogout')}</p>
              <div className="flex space-x-3">
                <Button
                  onClick={handleLogout}
                  variant="primary"
                  className="flex-1 bg-red-500 hover:bg-red-600"
                >
                  {t('yesLogout')}
                </Button>
                <Button
                  onClick={() => setShowLogoutConfirm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  {t('cancel')}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Account Confirmation */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-red-600 mb-4">{t('deleteAccountConfirm')}</h3>
              <p className="text-gray-600 mb-6">
                {t('deleteAccountWarning')}
              </p>
              <div className="flex space-x-3">
                <Button
                  onClick={handleDeleteAccount}
                  variant="primary"
                  className="flex-1 bg-red-500 hover:bg-red-600"
                >
                  {t('yesDeleteAccount')}
                </Button>
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  {t('cancel')}
                </Button>
              </div>
            </div>
          </div>
        )}

        {showToast && (
          <Toast
            message={toastMessage}
            type="success"
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Settings;

