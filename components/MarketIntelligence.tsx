import React, { useState, useCallback } from 'react';
import { MarketIntelligenceResult } from '../types';
import { getMarketIntelligence } from '../services/geminiService';
import Loader from './Loader';
import SalaryDisplay from './SalaryDisplay';
import TrendingSkillCard from './TrendingSkillCard';

const MarketIntelligence: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('Mid-level');
  const [result, setResult] = useState<MarketIntelligenceResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!jobTitle || !location || !experience) {
      setError('Please fill in all fields to get market data.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setResult(null);
    try {
      const data = await getMarketIntelligence(jobTitle, location, experience);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [jobTitle, location, experience]);

  const experienceLevels = ['Entry-level', 'Mid-level', 'Senior-level', 'Lead', 'Manager'];

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-secondary">Market Intelligence</h2>
        <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
          Enter a job title, location, and experience level to discover trending skills and estimated salary ranges in the current market.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-6 bg-surface rounded-lg border border-gray-200">
        <div className="md:col-span-2">
          <label htmlFor="job-title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input 
            type="text" 
            id="job-title" 
            value={jobTitle} 
            onChange={e => setJobTitle(e.target.value)} 
            placeholder="e.g., Software Engineer"
            className="w-full p-2 bg-white border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input 
            type="text" 
            id="location" 
            value={location} 
            onChange={e => setLocation(e.target.value)} 
            placeholder="e.g., San Francisco, CA"
            className="w-full p-2 bg-white border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
          <select 
            id="experience" 
            value={experience} 
            onChange={e => setExperience(e.target.value)}
            className="w-full p-2 bg-white border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          >
            {experienceLevels.map(level => <option key={level} value={level}>{level}</option>)}
          </select>
        </div>
      </div>
       <div className="mt-6 flex justify-center">
            <button
                onClick={handleAnalyze}
                disabled={isLoading || !jobTitle || !location || !experience}
                className="w-full max-w-xs px-8 py-3 bg-primary text-on-primary font-bold rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105 disabled:transform-none"
            >
                {isLoading ? 'Analyzing Market...' : 'Get Market Insights'}
            </button>
        </div>

      {error && (
        <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg text-center">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      {isLoading && <Loader />}
      
      {result && !isLoading && (
        <div className="mt-12 animate-fade-in">
           <h3 className="text-2xl font-bold text-center mb-8 text-on-surface">Market Report</h3>
           <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8 bg-surface p-4 rounded-lg border border-gray-200">{result.marketSummary}</p>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                     <SalaryDisplay salaryData={result.salaryData} />
                </div>
                <div className="lg:col-span-2">
                    <h4 className="text-xl font-semibold mb-4 text-on-surface">Trending Skills</h4>
                    <div className="space-y-4">
                        {result.trendingSkills.map(skill => <TrendingSkillCard key={skill.skill} skill={skill} />)}
                    </div>
                </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MarketIntelligence;