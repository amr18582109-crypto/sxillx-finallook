import { useEffect } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in">
      <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg border-2 shadow-lg ${colors[type]}`}>
        {icons[type]}
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Toast;

