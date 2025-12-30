import { useUser } from '../../context/UserContext';
import { getFromStorage, saveToStorage } from '../../utils/storage';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

const Notifications = ({ onClose }) => {
  const { user, updateUser } = useUser();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const stored = getFromStorage('notifications', []);
    setNotifications(stored.filter(n => n.userId === user?.id));
  }, [user]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">Notifications</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No notifications</div>
        ) : (
          notifications.map((notif) => (
            <div key={notif.id} className="p-4 hover:bg-gray-50 transition">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{notif.icon || '🔔'}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{formatTime(notif.timestamp)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;


