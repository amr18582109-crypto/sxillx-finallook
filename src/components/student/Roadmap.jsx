import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { programmingRoadmap, designRoadmap, marketingRoadmap } from '../../data/mockTasks';
import { getFromStorage, saveToStorage } from '../../utils/storage';
import TaskModal from './TaskModal';
import { CheckCircle, PlayCircle } from 'lucide-react';
import Button from '../shared/Button';

const Roadmap = () => {
  const { user, updateUser } = useUser();
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const stored = getFromStorage('completedTasks', []);
    setCompletedTasks(stored);
    
    // Load tasks based on recommended field
    const field = user?.recommendedField || 'programming';
    let roadmapTasks = [];

    if (field === 'programming') {
      roadmapTasks = [
        ...programmingRoadmap.frontend,
        ...programmingRoadmap.backend,
      ];
    } else if (field === 'design') {
      roadmapTasks = designRoadmap;
    } else if (field === 'marketing') {
      roadmapTasks = marketingRoadmap;
    }

    setTasks(roadmapTasks);
  }, [user]);

  const handleTaskComplete = (taskId) => {
    const updated = [...completedTasks, taskId];
    setCompletedTasks(updated);
    saveToStorage('completedTasks', updated);
    
    const userCompleted = user?.completedTasks || [];
    updateUser({ completedTasks: [...userCompleted, taskId] });
    
    setSelectedTask(null);
    
    // Show success notification
    const notifications = getFromStorage('notifications', []);
    notifications.push({
      id: `notif_${Date.now()}`,
      userId: user.id,
      title: 'Task Completed! 🎉',
      message: `Congratulations! You completed ${tasks.find(t => t.id === taskId)?.title}`,
      icon: '🎉',
      timestamp: new Date().toISOString(),
    });
    saveToStorage('notifications', notifications);
  };

  const isTaskCompleted = (taskId) => completedTasks.includes(taskId);

  const completedCount = tasks.filter(t => isTaskCompleted(t.id)).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto animate-fade-in-up">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your Learning Roadmap
          </h1>
          <p className="text-gray-600 mb-4">
            Recommended Field: <span className="font-semibold capitalize">{user?.recommendedField || 'Programming'}</span>
          </p>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Overall Progress</span>
              <span className="text-sm font-medium text-gray-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {completedCount} of {tasks.length} tasks completed
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {tasks.map((task, index) => {
            const completed = isTaskCompleted(task.id);
            return (
              <div
                key={task.id}
                className="card"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg animate-gradient-shimmer">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`text-xl font-semibold ${completed ? 'text-gray-800' : 'gradient-text'}`}>{task.title}</h3>
                        {completed && (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            task.type === 'video'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {task.type === 'video' ? '📹 Video' : '💻 Coding'}
                        </span>
                        {task.track && (
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                            {task.track}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setSelectedTask(task)}
                    variant={completed ? 'outline' : 'primary'}
                    className="btn-md"
                  >
                    {completed ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-5 h-5" />
                        <span>Start Task</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onComplete={() => handleTaskComplete(selectedTask.id)}
        />
      )}
    </div>
  );
};

export default Roadmap;


