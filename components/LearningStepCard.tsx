import React from 'react';
import { LearningStep } from '../types';
import LearningResourceCard from './LearningResourceCard';

interface LearningStepCardProps {
    step: LearningStep;
    stepNumber: number;
}

const LearningStepCard: React.FC<LearningStepCardProps> = ({ step, stepNumber }) => {
    return (
        <div className="p-6 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 border-2 border-primary text-primary font-bold text-xl">
                    {stepNumber}
                </div>
                <h3 className="text-2xl font-bold text-on-surface">{step.title}</h3>
            </div>
            <p className="text-gray-600 mb-6 ml-16">{step.description}</p>
            <div className="ml-16">
                 <h4 className="font-semibold text-gray-700 mb-3">Recommended Resources:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {step.resources.map(resource => (
                        <LearningResourceCard key={resource.url} resource={resource} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningStepCard;