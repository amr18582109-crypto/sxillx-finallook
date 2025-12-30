import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { mockQuestions } from '../../data/mockQuestions';
import Button from '../shared/Button';
import QuizResults from './QuizResults';

const Quiz = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    // Redirect if skills not selected
    if (!user?.skillsSelected || !user?.skills || user.skills.length === 0) {
      navigate('/skills-selection');
      return;
    }

    // If quiz already completed, show results
    if (user?.quizCompleted && user?.quizResults) {
      setShowResults(true);
      return;
    }

    // Generate 15 questions based on selected skills
    const questions = [];
    const skills = user?.skills || [];
    
    // Determine which categories to include
    const hasProgramming = skills.some(s => ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Java'].includes(s));
    const hasDesign = skills.some(s => ['UI/UX', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator'].includes(s));
    const hasMarketing = skills.some(s => ['SEO', 'Social Media', 'Content Writing', 'Email Marketing'].includes(s));

    // Add 5 questions from each selected category
    if (hasProgramming) {
      questions.push(...mockQuestions.programming.slice(0, 5).map(q => ({ ...q, category: 'programming' })));
    }
    if (hasDesign) {
      questions.push(...mockQuestions.design.slice(0, 5).map(q => ({ ...q, category: 'design' })));
    }
    if (hasMarketing) {
      questions.push(...mockQuestions.marketing.slice(0, 5).map(q => ({ ...q, category: 'marketing' })));
    }

    // If no skills selected, use all categories
    if (questions.length === 0) {
      questions.push(
        ...mockQuestions.programming.slice(0, 5).map(q => ({ ...q, category: 'programming' })),
        ...mockQuestions.design.slice(0, 5).map(q => ({ ...q, category: 'design' })),
        ...mockQuestions.marketing.slice(0, 5).map(q => ({ ...q, category: 'marketing' }))
      );
    }

    // Shuffle and take 15
    const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, 15);
    setAllQuestions(shuffled);
  }, [user, navigate]);

  const handleAnswer = (answerIndex) => {
    setAnswers({ ...answers, [currentQuestion]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate results
    const results = { programming: 0, design: 0, marketing: 0 };
    let totalCorrect = 0;

    allQuestions.forEach((q, idx) => {
      const userAnswer = answers[idx];
      if (userAnswer === q.correct) {
        totalCorrect++;
        results[q.category]++;
      }
    });

    // Convert to percentages
    const total = allQuestions.length;
    const programmingPercent = Math.round((results.programming / 5) * 100) || 0;
    const designPercent = Math.round((results.design / 5) * 100) || 0;
    const marketingPercent = Math.round((results.marketing / 5) * 100) || 0;

    const quizResults = {
      programming: programmingPercent,
      design: designPercent,
      marketing: marketingPercent,
      totalScore: Math.round((totalCorrect / total) * 100),
    };

    // Determine recommended field
    const recommended = Object.entries(quizResults)
      .filter(([key]) => key !== 'totalScore')
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'programming';

    updateUser({
      quizResults,
      recommendedField: recommended,
      quizCompleted: true,
    });

    setShowResults(true);
  };

  if (showResults) {
    return <QuizResults onClose={() => navigate('/roadmap')} />;
  }

  if (allQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  const question = allQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / allQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestion + 1} of {allQuestions.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-800">{question.question}</h2>

          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  answers[currentQuestion] === index
                    ? 'border-primary bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion] === index
                        ? 'border-primary bg-primary'
                        : 'border-gray-300'
                    }`}
                  >
                    {answers[currentQuestion] === index && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            {currentQuestion === allQuestions.length - 1 ? (
              <Button onClick={handleSubmit} variant="primary">
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                variant="primary"
                disabled={answers[currentQuestion] === undefined}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;


