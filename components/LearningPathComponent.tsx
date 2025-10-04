import React from 'react';
import { LearningPath } from '../types';
import LearningStepCard from './LearningStepCard';

interface LearningPathComponentProps {
    path: LearningPath;
}

const LearningPathComponent: React.FC<LearningPathComponentProps> = ({ path }) => {
    return (
        <div>
            <div className="text-center mb-8 bg-surface p-6 rounded-lg border border-gray-200">
                <h2 className="text-3xl font-bold text-primary">{path.skill}</h2>
                <p className="text-gray-600 mt-3 max-w-3xl mx-auto">{path.summary}</p>
            </div>
            <div className="space-y-6">
                {path.steps.map((step, index) => (
                    <LearningStepCard key={index} step={step} stepNumber={index + 1} />
                ))}
            </div>
        </div>
    );
};

export default LearningPathComponent;