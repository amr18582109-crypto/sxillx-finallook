import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 
              className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}
            >
              SkillX
            </h3>
            <p className="text-gray-400 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Connecting students with companies through personalized learning and skill development.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* For Students */}
          <div>
            <h4 
              className="font-semibold mb-6 text-white"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
            >
              For Students
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/jobs" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link 
                  to="/roadmap" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Learning Roadmap
                </Link>
              </li>
              <li>
                <Link 
                  to="/community" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Community
                </Link>
              </li>
              <li>
                <Link 
                  to="/leaderboard" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* For Companies */}
          <div>
            <h4 
              className="font-semibold mb-6 text-white"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
            >
              For Companies
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/?login=true&postJob=true')}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-left"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Post a Job
                </button>
              </li>
              <li>
                <Link 
                  to="/company/inbox" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  View Applications
                </Link>
              </li>
              <li>
                <Link 
                  to="/company/dashboard" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 
              className="font-semibold mb-6 text-white"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
            >
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>hello@skillx.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              &copy; 2024 SkillX. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                to="/" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Privacy Policy
              </Link>
              <Link 
                to="/" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Terms of Service
              </Link>
              <Link 
                to="/" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


