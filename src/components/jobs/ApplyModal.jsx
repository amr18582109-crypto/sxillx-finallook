import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { getFromStorage, saveToStorage } from '../../utils/storage';
import Button from '../shared/Button';
import Toast from '../shared/Toast';

const ApplyModal = ({ job, onClose, onSuccess }) => {
  const { user, isAuthenticated, updateUser } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    experience: '',
    previousWork: '',
    cv: null,
  });
  const [showToast, setShowToast] = useState(false);

  // Pre-fill form for logged-in students
  useEffect(() => {
    if (isAuthenticated && user?.type === 'student') {
      setFormData({
        name: user.name || '',
        age: user.age || '',
        address: user.location || user.address || '',
        experience: user.experience || '',
        previousWork: user.previousWork || '',
        cv: null,
      });
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, cv: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Save application
    const applications = getFromStorage('jobApplications', []);
    const applicationData = {
      id: `app_${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      userId: user?.id || `guest_${Date.now()}`, // Use guest ID if no user
      ...formData,
      experience: parseInt(formData.experience) || 0,
      appliedDate: new Date().toISOString(),
      isGuest: !isAuthenticated, // Mark as guest application
    };
    applications.push(applicationData);
    saveToStorage('jobApplications', applications);

    // Add to applied jobs - MUST be saved first
    const appliedJobs = getFromStorage('appliedJobs', []);
    if (!appliedJobs.includes(job.id)) {
      appliedJobs.push(job.id);
      saveToStorage('appliedJobs', appliedJobs);
    }

    // Update user's applied jobs only if authenticated
    if (isAuthenticated && user) {
      const userApplied = user.appliedJobs || [];
      if (!userApplied.includes(job.id)) {
        const updatedAppliedJobs = [...userApplied, job.id];
        updateUser({ appliedJobs: updatedAppliedJobs });
      }
    }

    // Show toast and call onSuccess to update JobCard
    setShowToast(true);
    onSuccess(); // Update JobCard state immediately
    
    // Close modal after a short delay
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-800">Apply for {job.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="16"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Previous Work</label>
            <textarea
              name="previousWork"
              value={formData.previousWork}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload CV</label>
            <input
              type="file"
              name="cv"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {formData.cv && (
              <p className="text-sm text-gray-600 mt-1">Selected: {formData.cv.name}</p>
            )}
          </div>
          <div className="flex space-x-3 pt-4">
            <Button type="submit" variant="primary" className="flex-1">
              Confirm
            </Button>
            <Button type="button" onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>

      {showToast && (
        <Toast
          message="Application submitted successfully!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default ApplyModal;


