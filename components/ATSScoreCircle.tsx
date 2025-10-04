
import React from 'react';

interface ATSScoreCircleProps {
  score: number;
}

const ATSScoreCircle: React.FC<ATSScoreCircleProps> = ({ score }) => {
  const size = 160;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = (s: number) => {
    if (s < 40) return 'text-red-500';
    if (s < 75) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getTrackColor = (s: number) => {
    if (s < 40) return '#DC2626'; // primary (red)
    if (s < 75) return '#FBBF24'; // yellow-400
    return '#4ADE80'; // green-400
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-gray-200"
          fill="transparent"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={getTrackColor(score)}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center text-4xl font-extrabold ${getScoreColor(score)}`}>
        {score}
        <span className="text-xl font-bold ml-1">%</span>
      </div>
    </div>
  );
};

export default ATSScoreCircle;