import React from 'react';
import { AnalysisResult } from '../types';
import ATSScoreCircle from './ATSScoreCircle';
import SkillPill from './SkillPill';
import ResourceCard from './ResourceCard';
import ResumeSuggestionCard from './ResumeSuggestionCard';
import TunedResumeDisplay from './TunedResumeDisplay';

interface ResultsDisplayProps {
  result: AnalysisResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  return (
    <div className="bg-surface p-6 md:p-8 rounded-lg border border-gray-200 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-8 text-on-surface">Analysis Report</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-on-surface">ATS Match Score</h3>
          <ATSScoreCircle score={result.atsScore} />
          <p className="text-center text-gray-600 mt-4">{result.summary}</p>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-on-surface">Matching Skills</h3>
            {result.matchingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {result.matchingSkills.map(skill => <SkillPill key={skill} skill={skill} type="match" />)}
                </div>
            ) : (
                <p className="text-gray-500">No direct skill matches found.</p>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-on-surface">Skills to Develop</h3>
            {result.missingSkills.length > 0 ? (
                <div className="space-y-6">
                    {result.missingSkills.map(ms => (
                        <div key={ms.skill} className="p-4 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center gap-3">
                                <SkillPill skill={ms.skill} type="missing" />
                            </div>
                            <p className="text-gray-600 my-3">{ms.reason}</p>
                            <h4 className="font-semibold text-gray-700 mb-2">Recommended Resources:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {ms.resources.map(resource => <ResourceCard key={resource.url} resource={resource} />)}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-800">Excellent match! No critical skill gaps were found.</p>
                </div>
            )}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-on-surface">Resume Tuning Suggestions</h3>
             {result.resumeSuggestions?.length > 0 ? (
                <div className="space-y-4">
                    {result.resumeSuggestions.map((s, index) => (
                        <ResumeSuggestionCard key={index} suggestion={s} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No specific resume tuning suggestions were generated.</p>
            )}
          </div>

        </div>
      </div>

      {result.tunedResumeText && (
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-6 text-on-surface">Your AI-Tuned Resume</h3>
            <TunedResumeDisplay tunedText={result.tunedResumeText} />
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;