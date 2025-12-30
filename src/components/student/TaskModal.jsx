import { X } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import CodeEditor from './CodeEditor';

const TaskModal = ({ task, onClose, onComplete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-xl shadow-2xl w-full max-h-[90vh] overflow-y-auto ${
        task.type === 'coding' ? 'max-w-6xl' : 'max-w-4xl'
      }`}>
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {task.type === 'video' && task.youtubeUrl && task.youtubeUrl.includes('playlist')
                ? `${task.title} - Complete Course`
                : task.title}
            </h2>
            <div className="flex items-center space-x-2 mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  task.type === 'video'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}
              >
                {task.type === 'video' 
                  ? (task.youtubeUrl && task.youtubeUrl.includes('playlist') ? 'Playlist' : 'Video')
                  : 'Coding'}
              </span>
              {task.track && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {task.track}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {task.type === 'video' ? (
            <VideoPlayer task={task} onComplete={onComplete} />
          ) : (
            <CodeEditor task={task} onComplete={onComplete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;


