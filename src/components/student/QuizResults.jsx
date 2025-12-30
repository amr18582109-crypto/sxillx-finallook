import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useUser } from '../../context/UserContext';
import Button from '../shared/Button';
import { CheckCircle } from 'lucide-react';

const QuizResults = ({ onClose }) => {
  const { user, updateUser } = useUser();
  const results = user?.quizResults || { programming: 0, design: 0, marketing: 0 };

  const data = [
    { name: 'Programming', value: results.programming, color: '#3B82F6' },
    { name: 'Design', value: results.design, color: '#8B5CF6' },
    { name: 'Marketing', value: results.marketing, color: '#10B981' },
  ];

  const recommended = user?.recommendedField || 'programming';
  const recommendedName = recommended.charAt(0).toUpperCase() + recommended.slice(1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative">
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
          <p className="text-gray-600">Here are your results</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Your Skills Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white mb-6">
          <h3 className="text-xl font-semibold mb-2">Recommended Field</h3>
          <p className="text-2xl font-bold">{recommendedName}</p>
          <p className="text-sm opacity-90 mt-2">
            Based on your quiz results, we recommend focusing on {recommendedName} to maximize your potential!
          </p>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={() => {
              updateUser({ 
                onboardingComplete: true,
                hasCompletedOnboarding: true 
              });
              // onClose already navigates to roadmap
              onClose();
            }} 
            variant="primary" 
            className="px-8 py-4 text-lg"
          >
            View Personalized Roadmap
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;


