import { useUser } from '../../context/UserContext';
import { getFromStorage } from '../../utils/storage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BookOpen, Briefcase, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import { useEffect, useState } from 'react';
import { programmingRoadmap, designRoadmap, marketingRoadmap } from '../../data/mockTasks';

const Dashboard = () => {
  const { user } = useUser();
  const [stats, setStats] = useState({
    completedTasks: 0,
    totalTasks: 0,
    appliedJobs: 0,
    streak: 0,
  });
  const [skillsData, setSkillsData] = useState([]);

  // Map tasks to skills based on field
  const getSkillsMapping = (field) => {
    if (field === 'programming') {
      return {
        'HTML': ['html_basics', 'html_exercise'],
        'CSS': ['css_fundamentals', 'css_layout'],
        'JavaScript': ['js_basics', 'js_dom'],
        'React': ['react_intro', 'react_component'],
        'Node.js': ['node_basics', 'express_setup', 'rest_api'],
      };
    } else if (field === 'design') {
      return {
        'Design Principles': ['design_principles'],
        'Figma': ['figma_intro', 'prototyping'],
        'UI/UX': ['ui_fundamentals', 'ux_research'],
        'Typography': ['typography_basics'],
        'Color Theory': ['color_theory'],
        'Wireframing': ['wireframing'],
        'Prototyping': ['prototyping'],
      };
    } else if (field === 'marketing') {
      return {
        'SEO': ['seo_basics'],
        'Content Marketing': ['content_strategy'],
        'Social Media': ['social_media'],
        'Email Marketing': ['email_marketing'],
        'Google Analytics': ['google_analytics'],
        'Copywriting': ['copywriting'],
      };
    }
    return {};
  };

  useEffect(() => {
    const completed = getFromStorage('completedTasks', []);
    const applied = getFromStorage('appliedJobs', []);
    
    // Calculate total tasks based on field
    const field = user?.recommendedField || 'programming';
    let allTasks = [];
    
    if (field === 'programming') {
      allTasks = [...programmingRoadmap.frontend, ...programmingRoadmap.backend];
    } else if (field === 'design') {
      allTasks = designRoadmap;
    } else if (field === 'marketing') {
      allTasks = marketingRoadmap;
    }

    const totalTasks = allTasks.length;

    // Calculate skills progress
    const skillsMapping = getSkillsMapping(field);
    const skillsProgress = Object.entries(skillsMapping).map(([skillName, taskIds]) => {
      const skillTasks = taskIds.filter(taskId => 
        allTasks.some(task => task.id === taskId)
      );
      const completedSkillTasks = skillTasks.filter(taskId => 
        completed.includes(taskId)
      );
      const progress = skillTasks.length > 0 
        ? Math.round((completedSkillTasks.length / skillTasks.length) * 100)
        : 0;
      
      return {
        name: skillName,
        value: progress,
      };
    });

    setSkillsData(skillsProgress);

    setStats({
      completedTasks: completed.length,
      totalTasks,
      appliedJobs: applied.length,
      streak: Math.floor(Math.random() * 7) + 1, // Random streak for demo
    });
  }, [user]);

  const progress = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0;

  const pieData = [
    { name: 'Completed', value: stats.completedTasks, color: '#3B82F6' },
    { name: 'Remaining', value: stats.totalTasks - stats.completedTasks, color: '#E5E7EB' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Overall Progress</p>
                <p className="text-3xl font-bold text-gray-800">{progress}%</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Tasks Completed</p>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.completedTasks}/{stats.totalTasks}
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Jobs Applied</p>
                <p className="text-3xl font-bold text-gray-800">{stats.appliedJobs}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Learning Streak</p>
                <p className="text-3xl font-bold text-gray-800">{stats.streak} days</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Skills Progress</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Task Completion</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link to="/roadmap">
              <Button variant="primary" className="w-full">
                Continue Learning
              </Button>
            </Link>
            <Link to="/jobs">
              <Button variant="secondary" className="w-full">
                Browse Jobs
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Activity</h2>
          <div className="space-y-4">
            {stats.completedTasks > 0 ? (
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">Last completed task</p>
                  <p className="text-sm text-gray-600">Keep up the great work!</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Start your learning journey by completing your first task!</p>
            )}
            {stats.appliedJobs > 0 ? (
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Recent job applications</p>
                  <p className="text-sm text-gray-600">You've applied to {stats.appliedJobs} job{stats.appliedJobs !== 1 ? 's' : ''}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Browse available jobs and apply!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default Dashboard;


