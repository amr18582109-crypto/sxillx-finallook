import { X, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Button from '../shared/Button';

const StudentSignup = ({ onClose, onBack }) => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    university: '',
    year: '',
    phone: '',
    experience: '',
    previousWork: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: `user_${Date.now()}`,
      type: 'student',
      ...formData,
      age: parseInt(formData.age),
      year: parseInt(formData.year),
      experience: parseInt(formData.experience) || 0,
      previousWork: formData.previousWork || '',
      skills: [],
      completedTasks: [],
      appliedJobs: [],
      progress: 0,
      notifications: [],
      onboardingComplete: false,
      skillsSelected: false,
      quizCompleted: false,
      hasCompletedOnboarding: false,
    };
    login(userData);
    // Close modal first, then navigate immediately
    onClose();
    // Use setTimeout to ensure modal closes before navigation
    setTimeout(() => {
      navigate('/skills-selection', { replace: true });
    }, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        <h2 className="text-2xl font-bold mb-6 text-center">Create Student Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="16"
              max="100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              min="1"
              max="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              min="0"
              max="20"
              placeholder="e.g., 2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Previous Work</label>
            <textarea
              name="previousWork"
              value={formData.previousWork}
              onChange={handleChange}
              rows="3"
              placeholder="Briefly describe your previous work or projects (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;


