import { useState, useEffect } from 'react';
import { mockJobs } from '../../data/mockJobs';
import { getFromStorage } from '../../utils/storage';
import JobCard from './JobCard';
import ApplyModal from './ApplyModal';

const JobsList = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [filter, setFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  useEffect(() => {
    const appliedJobs = getFromStorage('appliedJobs', []);
    const postedJobs = getFromStorage('postedJobs', []);
    
    // Update applied job IDs state
    setAppliedJobIds(new Set(appliedJobs));
    
    // Merge posted jobs with mock jobs
    const allJobs = [...postedJobs, ...mockJobs];
    
    if (filter === 'applied') {
      setJobs(allJobs.filter(job => appliedJobs.includes(job.id)));
    } else {
      setJobs(allJobs);
    }
  }, [filter]);

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const handleSuccess = (jobId) => {
    // Update the applied job IDs to trigger re-render of JobCards
    setAppliedJobIds(prev => new Set([...prev, jobId]));
    
    // Also update the jobs list if we're in 'applied' filter
    if (filter === 'applied') {
      const appliedJobs = getFromStorage('appliedJobs', []);
      const postedJobs = getFromStorage('postedJobs', []);
      const allJobs = [...postedJobs, ...mockJobs];
      setJobs(allJobs.filter(job => appliedJobs.includes(job.id)));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Job Opportunities
        </h1>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              filter === 'all'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Jobs
          </button>
          <button
            onClick={() => setFilter('applied')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              filter === 'applied'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Applied Jobs
          </button>
        </div>

        <div className="space-y-6">
          {jobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-gray-600 text-lg">No jobs found</p>
            </div>
          ) : (
            jobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                onApply={handleApply} 
                appliedJobIds={appliedJobIds}
              />
            ))
          )}
        </div>
      </div>

      {showApplyModal && selectedJob && (
        <ApplyModal
          job={selectedJob}
          onClose={() => {
            setShowApplyModal(false);
            setSelectedJob(null);
          }}
          onSuccess={() => handleSuccess(selectedJob.id)}
        />
      )}
    </div>
  );
};

export default JobsList;

