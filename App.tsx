import React, { useState } from 'react';
import Header from './components/Header';
import ResumeAnalytics from './components/ResumeAnalytics';
import MarketIntelligence from './components/MarketIntelligence';
import SkillsDevelopment from './components/SkillsDevelopment';
import Overview from './components/Overview'; // Import the new Overview component

export type AppView = 'overview' | 'resumeAnalytics' | 'marketIntelligence' | 'skillsDevelopment';

const App: React.FC = () => {
  // Set 'overview' as the default view
  const [activeView, setActiveView] = useState<AppView>('overview');

  const renderContent = () => {
    switch (activeView) {
      case 'resumeAnalytics':
        return <ResumeAnalytics />;
      case 'marketIntelligence':
        return <MarketIntelligence />;
      case 'skillsDevelopment':
        return <SkillsDevelopment />;
      case 'overview':
      default:
        // Render the new Overview component
        return <Overview setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="bg-background min-h-screen text-on-surface font-sans">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;