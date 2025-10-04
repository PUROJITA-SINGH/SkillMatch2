import React, { useState, useCallback } from 'react';
import { AnalysisResult } from '../types';
import { analyzeResumeAndJob } from '../services/geminiService';
import JobDescriptionInput from './JobDescriptionInput';
import FileUpload from './FileUpload';
import ResultsDisplay from './ResultsDisplay';
import Loader from './Loader';

const ResumeAnalytics: React.FC = () => {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!jobDescription || !resumeFile) {
      setError('Please provide both a job description and a resume file.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeResumeAndJob(jobDescription, resumeFile);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [jobDescription, resumeFile]);

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-secondary">Resume Analytics</h2>
        <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
          Upload your resume and paste a job description to get an instant analysis of your skill alignment, an ATS score, and personalized resources to bridge any gaps.
        </p>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
          <FileUpload file={resumeFile} onFileSelect={setResumeFile} />
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !jobDescription || !resumeFile}
            className="w-full max-w-xs px-8 py-4 bg-primary text-on-primary font-bold rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105 disabled:transform-none"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Now'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg text-center">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      {isLoading && <Loader />}

      {analysisResult && !isLoading && (
        <div className="mt-12">
          <ResultsDisplay result={analysisResult} />
        </div>
      )}
    </div>
  );
};

export default ResumeAnalytics;