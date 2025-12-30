import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { getFromStorage } from '../../utils/storage';
import { Plus, Briefcase, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';

const CompanyDashboard = () => {
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
  });

  useEffect(() => {
    const postedJobs = getFromStorage('postedJobs', []);
    const companyJobs = postedJobs.filter(job => job.companyId === user?.id);
    setJobs(companyJobs);

    const applications = getFromStorage('jobApplications', []);
    const companyApplicants = applications.filter(app => 
      companyJobs.some(job => job.id === app.jobId)
    );

    setStats({
      totalJobs: companyJobs.length,
      totalApplicants: companyApplicants.length,
    });
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Company Dashboard
          </h1>
          <Link to="/company/post-job">
            <Button variant="primary" className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Post New Job</span>
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Jobs Posted</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalJobs}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Applicants</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalApplicants}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="w-8 h-8 text-secondary" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Posted Jobs</h2>
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">You haven't posted any jobs yet</p>
              <Link to="/company/post-job">
                <Button variant="primary">Post Your First Job</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h3>
                      <p className="text-gray-600 mb-2">{job.location} · {job.type}</p>
                      <p className="text-sm text-gray-500">
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Link to="/company/inbox">
                      <Button variant="outline">View Applications</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;


