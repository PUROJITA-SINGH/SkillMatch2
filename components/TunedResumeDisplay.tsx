import React, { useState } from 'react';

interface TunedResumeDisplayProps {
  tunedText: string;
}

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


const TunedResumeDisplay: React.FC<TunedResumeDisplayProps> = ({ tunedText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tunedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 relative">
        <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">This is a rewritten, ATS-friendly version of your resume tailored for the job description.</p>
            <button
                onClick={handleCopy}
                className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 transition-all duration-200 ${copied ? 'bg-green-600 text-white' : 'bg-primary hover:bg-red-700 text-on-primary'}`}
                aria-label="Copy full resume text"
            >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Full Resume'}</span>
            </button>
        </div>
      
      <textarea
        readOnly
        value={tunedText}
        className="w-full h-96 p-4 bg-gray-50 border border-gray-300 rounded-md font-mono text-sm text-gray-800 resize-y focus:ring-2 focus:ring-primary focus:border-primary"
        aria-label="AI-Tuned Resume Text"
      />
    </div>
  );
};

export default TunedResumeDisplay;