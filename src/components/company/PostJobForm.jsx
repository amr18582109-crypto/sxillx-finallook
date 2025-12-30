import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { getFromStorage, saveToStorage } from '../../utils/storage';
import Button from '../shared/Button';

const PostJobForm = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    type: 'Full-time',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const job = {
      id: `job_${Date.now()}`,
      ...formData,
      company: user.name,
      companyId: user.id,
      postedDate: new Date().toISOString(),
      applicants: 0,
      logo: '💼',
      requirements: formData.requirements.split(',').map(r => r.trim()),
    };

    const postedJobs = getFromStorage('postedJobs', []);
    postedJobs.unshift(job);
    saveToStorage('postedJobs', postedJobs);

    // Also add to main jobs list
    const allJobs = getFromStorage('allJobs', []);
    allJobs.unshift(job);
    saveToStorage('allJobs', allJobs);

    navigate('/company/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Post a New Job
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Describe the job role and responsibilities..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Requirements (comma-separated)</label>
              <input
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., React, JavaScript, CSS"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., Cairo, Egypt"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button type="submit" variant="primary" className="flex-1">
                Publish Job
              </Button>
              <Button
                type="button"
                onClick={() => navigate('/company/dashboard')}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobForm;


