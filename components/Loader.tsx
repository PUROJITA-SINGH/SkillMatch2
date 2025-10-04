import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-12">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      <p className="mt-4 text-lg font-semibold text-on-surface">AI is analyzing your documents...</p>
      <p className="text-gray-500">This may take a moment.</p>
    </div>
  );
};

export default Loader;