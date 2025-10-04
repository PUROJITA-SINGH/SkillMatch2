import React from 'react';

interface SkillPillProps {
  skill: string;
  type: 'match' | 'missing';
}

const SkillPill: React.FC<SkillPillProps> = ({ skill, type }) => {
  const baseClasses = 'px-3 py-1 text-sm font-semibold rounded-full border';
  const typeClasses = {
    match: 'bg-green-100 text-green-800 border-green-300',
    missing: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <span className={`${baseClasses} ${typeClasses[type]}`}>
      {skill}
    </span>
  );
};

export default SkillPill;