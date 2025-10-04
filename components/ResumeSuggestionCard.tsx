import React, { useState } from 'react';
import { ResumeSuggestion } from '../types';

interface ResumeSuggestionCardProps {
  suggestion: ResumeSuggestion;
}

const LightbulbIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M12 21V11a5 5 0 00-5-5H7a5 5 0 00-5 5v.586a1 1 0 00.293.707l3.414 3.414a1 1 0 00.707.293H12z" />
    </svg>
);

const CopyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const ResumeSuggestionCard: React.FC<ResumeSuggestionCardProps> = ({ suggestion }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(suggestion.suggestion).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <LightbulbIcon />
            <h4 className="font-semibold text-on-surface">Suggestion for: <span className="font-bold text-primary">{suggestion.area}</span></h4>
          </div>
          <p className="text-gray-600 whitespace-pre-wrap font-mono text-sm">{suggestion.suggestion}</p>
        </div>
        <button
          onClick={handleCopy}
          className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-colors duration-200 ${copied ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          aria-label="Copy suggestion"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
};

export default ResumeSuggestionCard;