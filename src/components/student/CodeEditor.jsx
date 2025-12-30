import { useState } from 'react';
import { CheckCircle, XCircle, Play } from 'lucide-react';
import Button from '../shared/Button';

const CodeEditor = ({ task, onComplete }) => {
  const [code, setCode] = useState(task.starterCode || '');
  const [result, setResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  // Validation function for CSS Layout Challenge (Flexbox/Grid)
  const validateFlexboxGridChallenge = (code) => {
    const codeStr = code.toLowerCase();
    
    const hasFlexbox = codeStr.includes('display: flex') || codeStr.includes('display:flex');
    const hasGrid = codeStr.includes('display: grid') || codeStr.includes('display:grid');
    const hasResponsive = 
      codeStr.includes('flex-wrap') || 
      codeStr.includes('grid-template-columns') ||
      codeStr.includes('auto-fit') ||
      codeStr.includes('auto-fill') ||
      codeStr.includes('minmax') ||
      codeStr.includes('repeat');
    
    if ((hasFlexbox || hasGrid) && hasResponsive) {
      return {
        success: true,
        message: '✅ Perfect! Your responsive layout is correct!'
      };
    } else if (hasFlexbox || hasGrid) {
      return {
        success: false,
        message: '❌ You used Flexbox/Grid but the layout is not responsive. Add flex-wrap or grid responsive properties like grid-template-columns with repeat() or auto-fit.'
      };
    } else {
      return {
        success: false,
        message: '❌ Please use Flexbox (display: flex) or Grid (display: grid) to create the layout.'
      };
    }
  };

  // Validation function for HTML Exercise
  const validateHTMLChallenge = (code) => {
    const codeStr = code.toLowerCase();
    const hasHeader = codeStr.includes('<header>') || codeStr.includes('<header');
    const hasMain = codeStr.includes('<main>') || codeStr.includes('<main');
    const hasFooter = codeStr.includes('<footer>') || codeStr.includes('<footer');
    
    if (hasHeader && hasMain && hasFooter) {
      return {
        success: true,
        message: '✅ Great! Your HTML structure is correct with header, main, and footer!'
      };
    } else {
      const missing = [];
      if (!hasHeader) missing.push('header');
      if (!hasMain) missing.push('main');
      if (!hasFooter) missing.push('footer');
      return {
        success: false,
        message: `❌ Your HTML is missing: ${missing.join(', ')}. Make sure to include all required elements.`
      };
    }
  };

  // Validation function for JavaScript DOM Exercise
  const validateJSDOMChallenge = (code) => {
    const codeStr = code.toLowerCase();
    const hasQuerySelector = codeStr.includes('queryselector');
    const hasEventListener = codeStr.includes('addeventlistener');
    
    if (hasQuerySelector && hasEventListener) {
      return {
        success: true,
        message: '✅ Excellent! You\'re using querySelector and addEventListener correctly!'
      };
    } else {
      const missing = [];
      if (!hasQuerySelector) missing.push('querySelector');
      if (!hasEventListener) missing.push('addEventListener');
      return {
        success: false,
        message: `❌ Your code is missing: ${missing.join(' and ')}. Make sure to select an element and add an event listener.`
      };
    }
  };

  // Validation function for React Component Exercise
  const validateReactChallenge = (code) => {
    const codeStr = code.toLowerCase();
    const hasFunction = codeStr.includes('function') || codeStr.includes('const') || codeStr.includes('=>');
    const hasReturn = codeStr.includes('return');
    const hasReact = codeStr.includes('react') || codeStr.includes('jsx');
    
    if (hasFunction && hasReturn && hasReact) {
      return {
        success: true,
        message: '✅ Perfect! Your React component is correctly structured!'
      };
    } else {
      const missing = [];
      if (!hasFunction) missing.push('function/component definition');
      if (!hasReturn) missing.push('return statement');
      if (!hasReact) missing.push('React/JSX');
      return {
        success: false,
        message: `❌ Your component is missing: ${missing.join(', ')}. Make sure to create a function that returns JSX.`
      };
    }
  };

  // Generic validation for other tasks
  const validateGeneric = (code) => {
    const validation = task.validation || [];
    if (validation.length === 0) {
      return {
        success: true,
        message: '✅ Code submitted successfully!'
      };
    }
    
    const codeLower = code.toLowerCase();
    const allFound = validation.every(keyword => codeLower.includes(keyword.toLowerCase()));
    
    if (allFound) {
      return {
        success: true,
        message: '✅ Great job! Your code meets all the requirements!'
      };
    } else {
      const missing = validation.filter(keyword => !codeLower.includes(keyword.toLowerCase()));
      return {
        success: false,
        message: `❌ Your code is missing required elements: ${missing.join(', ')}.`
      };
    }
  };

  const handleRun = () => {
    if (!code.trim()) {
      setResult('error');
      setValidationMessage('❌ Please write some code before running.');
      return;
    }

    setIsValidating(true);
    setResult(null);
    setValidationMessage('');

    // Simulate validation delay
    setTimeout(() => {
      let validationResult;
      
      // Task-specific validation
      if (task.id === 'css_layout') {
        validationResult = validateFlexboxGridChallenge(code);
      } else if (task.id === 'html_exercise') {
        validationResult = validateHTMLChallenge(code);
      } else if (task.id === 'js_dom') {
        validationResult = validateJSDOMChallenge(code);
      } else if (task.id === 'react_component') {
        validationResult = validateReactChallenge(code);
      } else {
        validationResult = validateGeneric(code);
      }

      setResult(validationResult.success ? 'success' : 'error');
      setValidationMessage(validationResult.message);
      setIsValidating(false);
    }, 800);
  };

  const handleComplete = () => {
    if (result === 'success') {
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Challenge</h3>
        <p className="text-gray-700 mb-4">{task.challenge}</p>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
          <span className="text-gray-300 text-sm font-medium">Code Editor</span>
          <span className="text-gray-400 text-xs">Monospace</span>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full min-h-[400px] bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-b-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
          placeholder="Write your code here..."
          spellCheck="false"
        />
      </div>

      <div className="flex justify-between items-center">
        <Button
          onClick={handleRun}
          variant="primary"
          disabled={isValidating || !code.trim()}
          className="flex items-center space-x-2"
        >
          <Play className="w-5 h-5" />
          <span>{isValidating ? 'Validating...' : 'Run Code'}</span>
        </Button>
        <p className="text-sm text-gray-500">
          {code.length} characters
        </p>
      </div>

      {result && (
        <div
          className={`p-4 rounded-lg flex items-start space-x-3 animate-fade-in ${
            result === 'success'
              ? 'bg-green-50 border-2 border-green-500'
              : 'bg-red-50 border-2 border-red-500'
          }`}
        >
          {result === 'success' ? (
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className={`font-semibold ${result === 'success' ? 'text-green-800' : 'text-red-800'}`}>
              {validationMessage || (result === 'success' ? 'Great job! Your code is correct!' : 'Try again!')}
            </p>
            {result === 'success' ? (
              <Button
                onClick={handleComplete}
                variant="primary"
                className="mt-3 bg-green-500 hover:bg-green-600"
              >
                Mark as Complete
              </Button>
            ) : (
              <p className="text-sm text-red-600 mt-2">
                Review the challenge requirements and try again. Check the hints above for guidance.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;


