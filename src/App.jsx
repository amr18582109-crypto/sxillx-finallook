import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/shared/Navbar';
import Chatbot from './components/shared/Chatbot';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import JobsPage from './pages/JobsPage';
import SkillsSelection from './components/student/SkillsSelection';
import Quiz from './components/student/Quiz';
import Roadmap from './components/student/Roadmap';
import Profile from './components/student/Profile';
import Community from './components/student/Community';
import Messages from './components/student/Messages';
import Leaderboard from './components/student/Leaderboard';
import PostJobForm from './components/company/PostJobForm';
import Inbox from './components/company/Inbox';
import Settings from './components/shared/Settings';
import { getNextOnboardingStep, canAccessRoute } from './utils/onboarding';

const ProtectedRoute = ({ children, requireAuth = true, requireStudent = false, requireCompany = false }) => {
  const { user, isAuthenticated, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    // If trying to access company post-job, redirect with postJob flag
    if (location.pathname === '/company/post-job' || location.pathname === '/company/inbox') {
      return <Navigate to="/?login=true&postJob=true" replace />;
    }
    return <Navigate to="/?login=true" replace />;
  }

  if (requireStudent && user?.type !== 'student') {
    return <Navigate to="/" replace />;
  }

  if (requireCompany && user?.type !== 'company') {
    return <Navigate to="/" replace />;
  }

  // Check onboarding status for students
  if (requireStudent && user?.type === 'student') {
    const nextStep = getNextOnboardingStep(user);
    if (nextStep && location.pathname !== nextStep) {
      return <Navigate to={nextStep} replace />;
    }
    
    // Also check if they're trying to access a route they shouldn't
    if (!canAccessRoute(user, location.pathname)) {
      const redirectStep = getNextOnboardingStep(user);
      return <Navigate to={redirectStep || '/skills-selection'} replace />;
    }
  }

  return children;
};

const AppContent = () => {
  const { user, isAuthenticated } = useUser();
  const showChatbot = isAuthenticated && user?.type === 'student' && user?.hasCompletedOnboarding === true;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requireAuth requireStudent>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/skills-selection"
              element={
                <ProtectedRoute requireAuth requireStudent>
                  <SkillsSelection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <ProtectedRoute requireAuth requireStudent>
                  <Quiz />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roadmap"
              element={
                <ProtectedRoute requireAuth requireStudent>
                  <Roadmap />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs"
              element={<JobsPage />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute requireAuth>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/community"
              element={
                <ProtectedRoute requireAuth requireStudent>
                  <Community />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute requireAuth requireStudent>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={<Leaderboard />}
            />
            <Route
              path="/company/dashboard"
              element={
                <ProtectedRoute requireAuth requireCompany>
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/post-job"
              element={
                <ProtectedRoute requireAuth requireCompany>
                  <PostJobForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/inbox"
              element={
                <ProtectedRoute requireAuth requireCompany>
                  <Inbox />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={<Settings />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showChatbot && <Chatbot />}
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <Router>
          <AppContent />
        </Router>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;


