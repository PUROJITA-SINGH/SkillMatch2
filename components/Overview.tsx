import React from 'react';
import { AppView } from '../App';

interface OverviewProps {
    setActiveView: (view: AppView) => void;
}

// --- Icon Components --- //
const ResumeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const MarketIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const SkillsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
    </svg>
);

const FeatureCard: React.FC<{
    icon: React.ReactElement;
    title: string;
    description: string;
    buttonText: string;
    onClick: () => void;
}> = ({ icon, title, description, buttonText, onClick }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-lg">
        {icon}
        <h3 className="text-xl font-bold text-secondary mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <button
            onClick={onClick}
            className="w-full px-6 py-2 bg-primary text-on-primary font-semibold rounded-md hover:bg-red-700 transition-colors duration-200"
        >
            {buttonText}
        </button>
    </div>
);


const Overview: React.FC<OverviewProps> = ({ setActiveView }) => {
  return (
    <div className="max-w-6xl mx-auto text-center animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-extrabold text-secondary">Welcome to SkillMatch Analytics</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Your all-in-one AI-powered toolkit for career acceleration. Analyze, research, and develop your skills to land your dream job.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<ResumeIcon />}
          title="Resume Analytics"
          description="Get an instant ATS score, identify skill gaps between your resume and a job description, and receive AI-powered suggestions to improve."
          buttonText="Analyze Resume"
          onClick={() => setActiveView('resumeAnalytics')}
        />
        <FeatureCard
          icon={<MarketIcon />}
          title="Market Intelligence"
          description="Research any job title to discover current salary trends, in-demand skills, and get a real-time summary of the job market."
          buttonText="Explore Market"
          onClick={() => setActiveView('marketIntelligence')}
        />
        <FeatureCard
          icon={<SkillsIcon />}
          title="Skills Development"
          description="Choose any skill and receive a personalized, step-by-step learning path with curated resources to help you grow and achieve your goals."
          buttonText="Create a Path"
          onClick={() => setActiveView('skillsDevelopment')}
        />
      </div>
    </div>
  );
};

export default Overview;