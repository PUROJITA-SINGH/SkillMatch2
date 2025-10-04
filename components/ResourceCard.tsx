import React from 'react';
import { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
}

const ExternalLinkIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 bg-white rounded-md border border-gray-200 hover:border-primary hover:bg-gray-50 transition-all duration-200 group"
    >
      <p className="font-semibold text-sm text-gray-800 group-hover:text-primary truncate">{resource.name}</p>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">{resource.type}</span>
        <ExternalLinkIcon />
      </div>
    </a>
  );
};

export default ResourceCard;