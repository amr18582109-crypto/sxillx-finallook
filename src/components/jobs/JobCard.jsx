import { Calendar, MapPin, Users, X } from 'lucide-react';
import Button from '../shared/Button';
import { useUser } from '../../context/UserContext';
import { getFromStorage, saveToStorage } from '../../utils/storage';
import { useState, useEffect } from 'react';
import Toast from '../shared/Toast';
import ApplyModal from './ApplyModal';

const JobCard = ({ job, onApply, onCancel, appliedJobIds }) => {
  const { user, isAuthenticated, updateUser } = useUser();
  const [applied, setApplied] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicantsCount, setApplicantsCount] = useState(job.applicants || 0);

  // Check applied status on mount and when dependencies change
  useEffect(() => {
    const checkAppliedStatus = () => {
      const appliedJobs = getFromStorage('appliedJobs', []);
      const isApplied = appliedJobs.includes(job.id) || (appliedJobIds && appliedJobIds.has(job.id));
      setApplied(isApplied);
    };
    
    checkAppliedStatus();
    
    // Also check when user context updates
    if (user?.appliedJobs) {
      setApplied(user.appliedJobs.includes(job.id));
    }
  }, [job.id, user?.appliedJobs, appliedJobIds]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / 86400000);
    
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  const handleApply = () => {
    if (isAuthenticated && user?.type === 'student') {
      // Open modal with pre-filled data for logged-in students
      setShowApplyModal(true);
    } else {
      // Guest users: use the onApply callback
      onApply(job);
    }
  };

  const handleApplySuccess = () => {
    // Immediately update the applied state
    setApplied(true);
    setApplicantsCount(prev => prev + 1);
    
    // Double-check from localStorage to ensure consistency
    const appliedJobs = getFromStorage('appliedJobs', []);
    if (appliedJobs.includes(job.id)) {
      setApplied(true);
    }
  };

  const handleCancelClick = () => {
    setShowConfirmDialog(true);
  };

  const handleCancelConfirm = () => {
    const appliedJobs = getFromStorage('appliedJobs', []);
    const updatedJobs = appliedJobs.filter(id => id !== job.id);
    saveToStorage('appliedJobs', updatedJobs);
    setApplied(false);
    setApplicantsCount(prev => Math.max(0, prev - 1));
    setShowConfirmDialog(false);
    setShowToast(true);
    
    // Update user
    if (user) {
      const userApplied = (user.appliedJobs || []).filter(id => id !== job.id);
      updateUser({ appliedJobs: userApplied });
    }

    // Notify parent component if callback provided
    if (onCancel) {
      onCancel(job.id);
    }
  };

  const handleCancelCancel = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl flex-shrink-0">
          {job.logo || '💼'}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h3>
              <p className="text-gray-600 mb-3">{job.company}</p>
            </div>
            {job.type && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  job.type === 'Full-time'
                    ? 'bg-green-100 text-green-700'
                    : job.type === 'Part-time'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                🕒 {job.type}
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(job.postedDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{applicantsCount} applied</span>
            </div>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {job.requirements.slice(0, 4).map((req, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                >
                  {req}
                </span>
              ))}
              {job.requirements.length > 4 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  +{job.requirements.length - 4} more
                </span>
              )}
            </div>
          )}

          <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

          <div className="flex items-center justify-end">
            <div className="flex items-center gap-2">
              {applied ? (
                <>
                  <Button
                    variant="outline"
                    disabled
                    className="bg-green-50 border-green-500 text-green-700 cursor-not-allowed"
                  >
                    Applied ✓
                  </Button>
                  <button
                    onClick={handleCancelClick}
                    className="px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition border border-gray-200 hover:border-red-200"
                    title="Cancel Application"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <Button
                  onClick={handleApply}
                  variant="primary"
                >
                  Apply Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Cancel Application</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your application for <span className="font-semibold">{job.title}</span> at <span className="font-semibold">{job.company}</span>?
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={handleCancelConfirm}
                variant="primary"
                className="flex-1 bg-red-500 hover:bg-red-600"
              >
                Yes, Cancel Application
              </Button>
              <Button
                onClick={handleCancelCancel}
                variant="outline"
                className="flex-1"
              >
                No, Keep It
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal for logged-in students */}
      {showApplyModal && (
        <ApplyModal
          job={job}
          onClose={() => {
            setShowApplyModal(false);
            // Force re-check applied status after modal closes
            setTimeout(() => {
              const appliedJobs = getFromStorage('appliedJobs', []);
              setApplied(appliedJobs.includes(job.id));
            }, 100);
          }}
          onSuccess={handleApplySuccess}
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="Application cancelled successfully"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default JobCard;


