import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { getFromStorage, saveToStorage } from '../../utils/storage';
import { Send } from 'lucide-react';
import Button from '../shared/Button';

const Messages = () => {
  const { user, isAuthenticated } = useUser();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;

    // Initialize with mock conversations if none exist
    const stored = getFromStorage('conversations', [
      {
        id: 'conv_1',
        userId: 'student_1',
        userName: 'Ahmed Mohamed',
        avatar: '👨‍💻',
        lastMessage: 'Hey! How are you doing?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        messages: [
          { id: 'msg_1', senderId: 'student_1', text: 'Hey! How are you doing?', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
          { id: 'msg_2', senderId: user.id, text: 'I\'m doing great! Just finished a React task!', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
        ],
      },
      {
        id: 'conv_2',
        userId: 'student_2',
        userName: 'Sara Ali',
        avatar: '👩‍🎨',
        lastMessage: 'Congratulations on completing the quiz!',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        messages: [
          { id: 'msg_3', senderId: 'student_2', text: 'Congratulations on completing the quiz!', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
        ],
      },
      {
        id: 'conv_3',
        userId: 'student_3',
        userName: 'Mohamed Hassan',
        avatar: '👨‍💼',
        lastMessage: 'Thanks for the help!',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        messages: [
          { id: 'msg_4', senderId: user.id, text: 'No problem! Good luck with your application!', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
          { id: 'msg_5', senderId: 'student_3', text: 'Thanks for the help!', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
        ],
      },
    ]);

    setConversations(stored);
    if (stored.length > 0 && !selectedConversation) {
      setSelectedConversation(stored[0]);
    }
  }, [user, isAuthenticated, selectedConversation]);

  const handleSend = () => {
    if (!message.trim() || !selectedConversation) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: user.id,
      text: message,
      timestamp: new Date().toISOString(),
    };

    const updated = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: message,
          timestamp: new Date().toISOString(),
        };
      }
      return conv;
    });

    setConversations(updated);
    saveToStorage('conversations', updated);
    setSelectedConversation(updated.find(c => c.id === selectedConversation.id));
    setMessage('');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please log in to view messages</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Messages
        </h1>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex" style={{ height: '600px' }}>
          {/* Sidebar */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800">Conversations</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition ${
                    selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold overflow-hidden">
                      {conv.avatar && conv.avatar.startsWith('data:image') ? (
                        <img src={conv.avatar} alt={conv.userName} className="w-full h-full object-cover" />
                      ) : (
                        conv.avatar || conv.userName?.charAt(0) || '👤'
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{conv.userName}</h3>
                      <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatTime(conv.timestamp)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold overflow-hidden">
                      {selectedConversation.avatar && selectedConversation.avatar.startsWith('data:image') ? (
                        <img src={selectedConversation.avatar} alt={selectedConversation.userName} className="w-full h-full object-cover" />
                      ) : (
                        selectedConversation.avatar || selectedConversation.userName?.charAt(0) || '👤'
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-800">{selectedConversation.userName}</h3>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map((msg) => {
                    const isOwn = msg.senderId === user.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            isOwn
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 border-t border-gray-200 flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button onClick={handleSend} variant="primary" className="flex items-center space-x-2">
                    <Send className="w-5 h-5" />
                    <span>Send</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;


