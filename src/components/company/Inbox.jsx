import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { getFromStorage, saveToStorage } from '../../utils/storage';
import { CheckCircle, XCircle, Download, Send } from 'lucide-react';
import Button from '../shared/Button';

const Inbox = () => {
  const { user } = useUser();
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const allApplications = getFromStorage('jobApplications', []);
    const postedJobs = getFromStorage('postedJobs', []);
    const companyJobIds = postedJobs
      .filter(job => job.companyId === user?.id)
      .map(job => job.id);
    
    const companyApplications = allApplications.filter(app =>
      companyJobIds.includes(app.jobId)
    );
    
    setApplications(companyApplications);
  }, [user]);

  const handleAccept = (applicationId) => {
    const updated = applications.map(app => {
      if (app.id === applicationId) {
        return { ...app, status: 'accepted' };
      }
      return app;
    });
    setApplications(updated);
    saveToStorage('jobApplications', updated);

    // Create notification
    const app = applications.find(a => a.id === applicationId);
    const notifications = getFromStorage('notifications', []);
    notifications.push({
      id: `notif_${Date.now()}`,
      userId: app.userId || 'user',
      title: 'Application Accepted! 🎉',
      message: `Congratulations! Your application for ${app.jobTitle} at ${app.company} has been accepted!`,
      icon: '✅',
      timestamp: new Date().toISOString(),
    });
    saveToStorage('notifications', notifications);
  };

  const handleReject = (applicationId) => {
    const updated = applications.map(app => {
      if (app.id === applicationId) {
        return { ...app, status: 'rejected' };
      }
      return app;
    });
    setApplications(updated);
    saveToStorage('jobApplications', updated);

    // Create notification
    const app = applications.find(a => a.id === applicationId);
    const notifications = getFromStorage('notifications', []);
    notifications.push({
      id: `notif_${Date.now()}`,
      userId: app.userId || 'user',
      title: 'Application Update',
      message: `Thank you for your interest. Unfortunately, we cannot proceed with your application for ${app.jobTitle} at this time.`,
      icon: '📧',
      timestamp: new Date().toISOString(),
    });
    saveToStorage('notifications', notifications);
  };

  const handleSendMessage = (applicationId) => {
    const message = messages[applicationId];
    if (!message) return;

    const app = applications.find(a => a.id === applicationId);
    const notifications = getFromStorage('notifications', []);
    notifications.push({
      id: `notif_${Date.now()}`,
      userId: app.userId || 'user',
      title: 'New Message',
      message: `Message from ${user.name}: ${message}`,
      icon: '💬',
      timestamp: new Date().toISOString(),
    });
    saveToStorage('notifications', notifications);

    setMessages({ ...messages, [applicationId]: '' });
    alert('Message sent!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Applications Inbox
        </h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No applications yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{app.name}</h3>
                    <p className="text-gray-600 mb-2">
                      Applied for: <span className="font-medium">{app.jobTitle}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Age: {app.age} · Experience: {app.experience} years
                    </p>
                    <p className="text-sm text-gray-500">Address: {app.address}</p>
                    {app.previousWork && (
                      <p className="text-sm text-gray-600 mt-2">
                        Previous Work: {app.previousWork}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {app.status === 'accepted' && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Accepted
                      </span>
                    )}
                    {app.status === 'rejected' && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        Rejected
                      </span>
                    )}
                    {app.cv && (
                      <button className="p-2 text-gray-600 hover:text-primary transition">
                        <Download className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex space-x-3 mb-4">
                    <Button
                      onClick={() => handleAccept(app.id)}
                      variant="primary"
                      className="flex items-center space-x-2 bg-green-500 hover:bg-green-600"
                      disabled={app.status === 'accepted'}
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Accept</span>
                    </Button>
                    <Button
                      onClick={() => handleReject(app.id)}
                      variant="outline"
                      className="flex items-center space-x-2 border-red-500 text-red-500 hover:bg-red-50"
                      disabled={app.status === 'rejected'}
                    >
                      <XCircle className="w-5 h-5" />
                      <span>Reject</span>
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Send Message
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={messages[app.id] || ''}
                        onChange={(e) =>
                          setMessages({ ...messages, [app.id]: e.target.value })
                        }
                        placeholder="We will contact you soon!"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <Button
                        onClick={() => handleSendMessage(app.id)}
                        variant="primary"
                        className="flex items-center space-x-2"
                      >
                        <Send className="w-5 h-5" />
                        <span>Send</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;


