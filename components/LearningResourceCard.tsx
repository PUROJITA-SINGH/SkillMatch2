import React from 'react';
import { LearningResource } from '../types';

interface LearningResourceCardProps {
    resource: LearningResource;
}

const ExternalLinkIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline text-gray-400 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const LearningResourceCard: React.FC<LearningResourceCardProps> = ({ resource }) => {
    return (
        <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gray-50 rounded-md border border-gray-200 hover:border-primary hover:bg-gray-100 transition-all duration-200 group"
        >
            <div className="flex justify-between items-start">
                <p className="font-semibold text-on-surface group-hover:text-primary flex-1 pr-2">{resource.name}</p>
                <span className="text-xs flex-shrink-0 px-2 py-0.5 bg-gray-200 text-gray-700 rounded">{resource.type}</span>
            </div>
             <p className="text-xs text-primary truncate mt-2 group-hover:underline">{resource.url}<ExternalLinkIcon /></p>
        </a>
    );
};

export default LearningResourceCard;