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
      <span style={{ color: 'var(--text-primary)' }}>{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
        style={{
          background: enabled ? 'var(--color-primary-500)' : 'var(--color-gray-300)'
        }}
      >
        <span
          className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
          style={{
            transform: enabled ? 'translateX(24px)' : 'translateX(4px)'
          }}
        />
      </button>
    </div>
  );

  const Section = ({ title, icon: Icon, children }) => (
    <div className="rounded-xl shadow-lg p-6 mb-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="flex items-center space-x-3 mb-6">
        <Icon className="w-6 h-6" style={{ color: 'var(--color-primary-500)' }} />
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      </div>
      {children}
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-12 px-4" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl shadow-lg p-8 text-center" style={{ background: 'var(--bg-primary)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>{t('loading')}</p>
            <Button onClick={() => navigate('/?login=true')} variant="primary" className="mt-4">
              {t('login')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <SettingsIcon className="w-8 h-8" style={{ color: 'var(--color-primary-500)' }} />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('settingsTitle')}
          </h1>
        </div>

        {/* Appearance (language fixed to English) */}
        <Section title={t('theme')} icon={Globe}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <span style={{ color: 'var(--text-primary)' }}>Language</span>
              <div className="px-4 py-2 rounded-lg" style={{ color: 'var(--text-primary)', background: 'var(--bg-tertiary)' }}>English</div>
            </div>
            <div className="flex items-center justify-between py-3">
              <span style={{ color: 'var(--text-primary)' }}>{t('theme')}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateSetting('theme', 'light')}
                  className={`px-4 py-2 rounded-lg transition flex items-center space-x-2 ${
                    settings.theme === 'light'
                      ? ''
                      : ''
                  }`}
                  style={{
                    background: settings.theme === 'light' ? 'var(--gradient-primary)' : 'var(--bg-tertiary)',
                    color: settings.theme === 'light' ? 'var(--text-inverse)' : 'var(--text-primary)'
                  }}
                >
                  <Sun className="w-4 h-4" />
                  <span>{t('lightMode')}</span>
                </button>
                <button
                  onClick={() => updateSetting('theme', 'dark')}
                  className={`px-4 py-2 rounded-lg transition flex items-center space-x-2 ${
                    settings.theme === 'dark'
                      ? ''
                      : ''
                  }`}
                  style={{
                    background: settings.theme === 'dark' ? 'var(--gradient-primary)' : 'var(--bg-tertiary)',
                    color: settings.theme === 'dark' ? 'var(--text-inverse)' : 'var(--text-primary)'
                  }}
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
              <span style={{ color: 'var(--text-secondary)' }}>{t('accountType')}</span>
              <span className="font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>{user?.type || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span style={{ color: 'var(--text-secondary)' }}>Email</span>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{user?.email || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span style={{ color: 'var(--text-secondary)' }}>{t('memberSince')}</span>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                  : 'Dec 2024'}
              </span>
            </div>
            <div className="pt-3" style={{ borderTop: `1px solid var(--border-light)` }}>
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
              <span style={{ color: 'var(--text-primary)' }}>{t('jobsPerPage')}</span>
              <select
                value={settings.jobsPerPage}
                onChange={(e) => updateSetting('jobsPerPage', parseInt(e.target.value))}
                className="px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                style={{
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  border: `2px solid var(--border-light)`
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-3">
              <span style={{ color: 'var(--text-primary)' }}>{t('defaultView')}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateSetting('defaultView', 'grid')}
                  className="px-4 py-2 rounded-lg transition"
                  style={{
                    background: settings.defaultView === 'grid' ? 'var(--gradient-primary)' : 'var(--bg-tertiary)',
                    color: settings.defaultView === 'grid' ? 'var(--text-inverse)' : 'var(--text-primary)'
                  }}
                >
                  {t('grid')}
                </button>
                <button
                  onClick={() => updateSetting('defaultView', 'list')}
                  className="px-4 py-2 rounded-lg transition"
                  style={{
                    background: settings.defaultView === 'list' ? 'var(--gradient-primary)' : 'var(--bg-tertiary)',
                    color: settings.defaultView === 'list' ? 'var(--text-inverse)' : 'var(--text-primary)'
                  }}
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
            <div className="pt-3 text-sm" style={{ borderTop: `1px solid var(--border-light)`, color: 'var(--text-tertiary)' }}>
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
              className="w-full flex items-center justify-center space-x-2"
              style={{ background: 'var(--gradient-danger)' }}
            >
              <LogOut className="w-5 h-5" />
              <span>{t('logout')}</span>
            </Button>
          </Section>
        )}

        {/* Danger Zone */}
        {isAuthenticated && (
          <div className="rounded-xl shadow-lg p-6" style={{ background: 'var(--bg-primary)', border: `2px solid var(--color-danger-200)` }}>
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="w-6 h-6" style={{ color: 'var(--color-danger-500)' }} />
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-danger-600)' }}>{t('dangerZone')}</h2>
            </div>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
              style={{
                borderColor: 'var(--color-danger-500)',
                color: 'var(--color-danger-500)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--color-danger-50)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              <Trash2 className="w-5 h-5" />
              <span>{t('deleteAccount')}</span>
            </Button>
          </div>
        )}

        {/* Logout Confirmation */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'var(--bg-overlay)' }}>
            <div className="rounded-xl shadow-2xl max-w-md w-full p-6" style={{ background: 'var(--bg-primary)' }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{t('confirmLogout')}</h3>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>{t('areYouSureLogout')}</p>
              <div className="flex space-x-3">
                <Button
                  onClick={handleLogout}
                  variant="primary"
                  className="flex-1"
                  style={{ background: 'var(--gradient-danger)' }}
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
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'var(--bg-overlay)' }}>
            <div className="rounded-xl shadow-2xl max-w-md w-full p-6" style={{ background: 'var(--bg-primary)' }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-danger-600)' }}>{t('deleteAccountConfirm')}</h3>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                {t('deleteAccountWarning')}
              </p>
              <div className="flex space-x-3">
                <Button
                  onClick={handleDeleteAccount}
                  variant="primary"
                  className="flex-1"
                  style={{ background: 'var(--gradient-danger)' }}
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

