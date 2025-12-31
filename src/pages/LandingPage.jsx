import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';
import LoginModal from '../components/auth/LoginModal';

const LandingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showLogin, setShowLogin] = useState(false);
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect logged-in companies to their dashboard
    if (isAuthenticated && user?.type === 'company') {
      navigate('/company/dashboard', { replace: true });
      return;
    }
    
    if (searchParams.get('login') === 'true') {
      setShowLogin(true);
    }
  }, [searchParams, isAuthenticated, user, navigate]);

  const handleCloseLogin = () => {
    setShowLogin(false);
    setSearchParams({});
  };

  const isPostingJob = searchParams.get('postJob') === 'true';

  return (
    <div>
      <Hero />
      <Features />
      <CTA />
      <Footer />
      {showLogin && (
        <LoginModal 
          onClose={handleCloseLogin} 
          skipTypeSelection={isPostingJob}
          defaultType={isPostingJob ? 'company' : null}
        />
      )}
    </div>
  );
};

export default LandingPage;


