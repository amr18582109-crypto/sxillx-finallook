import { X, Github, Mail, Linkedin } from 'lucide-react';
import { useState } from 'react';
import StudentSignup from './StudentSignup';
import CompanySignup from './CompanySignup';

const LoginModal = ({ onClose, skipTypeSelection = false, defaultType = null }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [userType, setUserType] = useState(defaultType);

  const handleSocialLogin = (provider) => {
    // If skipTypeSelection is true, automatically set userType to company first
    if (skipTypeSelection) {
      setUserType('company');
    }
    // Then show signup form
    setShowSignup(true);
  };

  // If skipTypeSelection is true and we're showing signup, go directly to company signup
  // This check happens after state updates, so it will catch the flow
  if (skipTypeSelection && showSignup) {
    return <CompanySignup onClose={onClose} onBack={() => { setShowSignup(false); setUserType(null); }} />;
  }

  if (showSignup && userType === 'student') {
    return <StudentSignup onClose={onClose} onBack={() => { setShowSignup(false); setUserType(null); }} />;
  }

  if (showSignup && userType === 'company') {
    return <CompanySignup onClose={onClose} onBack={() => { setShowSignup(false); setUserType(null); }} />;
  }

  // Don't show type selection if skipTypeSelection is true
  if (showSignup && !userType && !skipTypeSelection) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Account Type</h2>
          <div className="space-y-4 mb-6">
            <button
              onClick={() => setUserType('student')}
              className={`w-full p-4 border-2 rounded-lg transition text-left ${
                userType === 'student'
                  ? 'border-primary bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <input type="radio" checked={userType === 'student'} readOnly className="w-5 h-5" />
                <div>
                  <div className="font-semibold text-lg">I'm a Student</div>
                  <div className="text-sm text-gray-600">Looking for jobs and learning opportunities</div>
                </div>
              </div>
            </button>
            <button
              onClick={() => setUserType('company')}
              className={`w-full p-4 border-2 rounded-lg transition text-left ${
                userType === 'company'
                  ? 'border-secondary bg-purple-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <input type="radio" checked={userType === 'company'} readOnly className="w-5 h-5" />
                <div>
                  <div className="font-semibold text-lg">I'm a Company</div>
                  <div className="text-sm text-gray-600">Looking to hire talented students</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Login to SkillX</h2>
        <div className="space-y-4">
          <button
            onClick={() => handleSocialLogin('github')}
            className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Github className="w-6 h-6" />
            <span className="font-semibold">Login with GitHub</span>
          </button>
          <button
            onClick={() => handleSocialLogin('google')}
            className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Mail className="w-6 h-6" />
            <span className="font-semibold">Login with Google</span>
          </button>
          <button
            onClick={() => handleSocialLogin('linkedin')}
            className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Linkedin className="w-6 h-6" />
            <span className="font-semibold">Login with LinkedIn</span>
          </button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          By continuing, you'll be asked to create an account
        </p>
      </div>
    </div>
  );
};

export default LoginModal;

