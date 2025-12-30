import { MessageCircle, X, Send } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';

const Chatbot = () => {
  const { user, isAuthenticated } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  // Only show chatbot for logged-in students who completed onboarding
  if (!isAuthenticated || user?.type !== 'student' || !user?.hasCompletedOnboarding) {
    return null;
  }
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I can help you with questions about learning and jobs!' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages([...messages, userMessage]);

    // Simple keyword matching
    const lowerInput = input.toLowerCase();
    let botResponse = "I can help you with questions about learning and jobs!";

    if (lowerInput.includes('improve') || lowerInput.includes('skill')) {
      botResponse = "To improve your skills, I recommend taking our skills assessment quiz! It will help you identify your strengths and create a personalized learning roadmap.";
    } else if (lowerInput.includes('job') || lowerInput.includes('find') || lowerInput.includes('search')) {
      botResponse = "You can find jobs by visiting the Jobs page. Browse available positions and apply directly! Make sure your profile is complete to increase your chances.";
    } else if (lowerInput.includes('roadmap') || lowerInput.includes('learn')) {
      botResponse = "A roadmap is your personalized learning path! After taking the quiz, you'll get a customized roadmap with video lessons and coding challenges to help you master your chosen field.";
    } else if (lowerInput.includes('apply') || lowerInput.includes('application')) {
      botResponse = "To apply for jobs, simply click the 'Apply Now' button on any job listing. Make sure your profile is up to date!";
    }

    setTimeout(() => {
      setMessages([...messages, userMessage, { type: 'bot', text: botResponse }]);
    }, 500);

    setInput('');
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition transform hover:scale-110 z-40"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-40">
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">SkillX Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 p-4 flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSend}
              className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;


