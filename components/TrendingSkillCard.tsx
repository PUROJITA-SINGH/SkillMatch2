import React from 'react';
import { TrendingSkill } from '../types';

interface TrendingSkillCardProps {
  skill: TrendingSkill;
}

const TrendingSkillCard: React.FC<TrendingSkillCardProps> = ({ skill }) => {
  const demandColors = {
    High: 'bg-green-100 text-green-800 border-green-300',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Low: 'bg-gray-100 text-gray-700 border-gray-300',
  };

  const demandClass = demandColors[skill.demand] || demandColors.Low;

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h5 className="font-bold text-lg text-on-surface">{skill.skill}</h5>
        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${demandClass}`}>
          {skill.demand} Demand
        </span>
      </div>
      <p className="text-gray-600 text-sm">{skill.description}</p>
    </div>
  );
};

export default TrendingSkillCard;