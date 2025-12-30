import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              SkillX
            </h3>
            <p className="text-gray-400">
              Connecting students with companies through personalized learning and skill development.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Students</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link 
                  to="/jobs" 
                  className="hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:text-white focus:underline"
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link 
                  to="/roadmap" 
                  className="hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:text-white focus:underline"
                >
                  Learning Roadmap
                </Link>
              </li>
              <li>
                <Link 
                  to="/community" 
                  className="hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:text-white focus:underline"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link 
                  to="/leaderboard" 
                  className="hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:text-white focus:underline"
                >
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Companies</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button
                  onClick={() => navigate('/?login=true&postJob=true')}
                  className="hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:text-white focus:underline text-left"
                >
                  Post a Job
                </button>
              </li>
              <li>
                <Link 
                  to="/company/inbox" 
                  className="hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:text-white focus:underline"
                >
                  View Applications
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link 
                  to="/" 
                  className="hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:text-white focus:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:text-white focus:underline"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:text-white focus:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:text-white focus:underline"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SkillX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


