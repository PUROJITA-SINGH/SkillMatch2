import React from 'react';
import { AppView } from '../App';

interface HeaderProps {
    activeView: AppView;
    setActiveView: (view: AppView) => void;
}


// --- Icon Components --- //
const LogoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6" />
    </svg>
);

const OverviewIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
    </svg>
);

const ResumeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const MarketIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const SkillsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
    </svg>
);

const RefreshIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l16 16" />
    </svg>
);

const ProfileIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);


// --- Main Header Component --- //
const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  const navItems: { name: string; view: AppView; icon: React.ReactElement }[] = [
    { name: 'Overview', view: 'overview', icon: <OverviewIcon /> },
    { name: 'Resume Analytics', view: 'resumeAnalytics', icon: <ResumeIcon /> },
    { name: 'Market Intelligence', view: 'marketIntelligence', icon: <MarketIcon /> },
    { name: 'Skills Development', view: 'skillsDevelopment', icon: <SkillsIcon /> },
  ];

  return (
    <header className="bg-white text-gray-700 shadow-sm border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between p-3">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-3">
          <div className="bg-primary p-2 rounded-lg">
            <LogoIcon />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">SkillMatch</h1>
            <p className="text-sm text-gray-500">Analytics</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {navItems.map((item) => {
                const isActive = activeView === item.view;
                return (
                    <li key={item.name}>
                        <button 
                            onClick={() => setActiveView(item.view)}
                            className={`flex items-center space-x-2 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                        >
                        {item.icon}
                        <span className={`font-medium ${isActive ? 'font-bold' : ''}`}>{item.name}</span>
                        </button>
                    </li>
                );
            })}
          </ul>
        </nav>

        {/* Profile and Actions */}
        <div className="flex items-center space-x-6 text-gray-600">
           <button className="hover:text-primary transition-colors duration-200" aria-label="Refresh">
               <RefreshIcon />
           </button>
           <a href="#" className="flex items-center space-x-2 hover:text-primary transition-colors duration-200">
               <ProfileIcon />
               <span className="font-medium">Profile</span>
           </a>
        </div>
      </div>
    </header>
  );
};

export default Header;