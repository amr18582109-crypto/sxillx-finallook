import { generateMockStudents } from '../../data/mockUsers';
import { useUser } from '../../context/UserContext';
import { Trophy, Award, Medal } from 'lucide-react';

const Leaderboard = () => {
  const { user } = useUser();
  const students = generateMockStudents();

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-8 h-8 text-yellow-500" />;
    if (rank === 2) return <Award className="w-8 h-8 text-gray-400" />;
    if (rank === 3) return <Medal className="w-8 h-8 text-orange-500" />;
    return null;
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center">
          Leaderboard
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Top students ranked by learning progress
        </p>

        <div className="space-y-4">
          {students.map((student, index) => {
            const rank = index + 1;
            const isCurrentUser = user?.id === student.id;
            
            return (
              <div
                key={student.id}
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition ${
                  isCurrentUser ? 'ring-2 ring-primary' : ''
                } ${
                  rank <= 3 ? 'border-2 border-yellow-300' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-16 flex items-center justify-center">
                    {getRankIcon(rank) || (
                      <span className="text-2xl font-bold text-gray-400">
                        {getRankBadge(rank)}
                      </span>
                    )}
                  </div>

                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 overflow-hidden">
                    {student.profilePicture && student.profilePicture.startsWith('data:image') ? (
                      <img src={student.profilePicture} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                      student.avatar || student.name?.charAt(0) || '👤'
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {student.name}
                      </h3>
                      {isCurrentUser && (
                        <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">
                        Progress: {student.progress}%
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 max-w-xs">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;


