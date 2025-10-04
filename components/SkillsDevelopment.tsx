import React, { useState, useCallback } from 'react';
import { LearningPath } from '../types';
import { getLearningPath } from '../services/geminiService';
import Loader from './Loader';
import LearningPathComponent from './LearningPathComponent';

const SkillsDevelopment: React.FC = () => {
    const [skill, setSkill] = useState('');
    const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGeneratePath = useCallback(async () => {
        if (!skill) {
            setError('Please enter a skill to generate a learning path.');
            return;
        }
        setError(null);
        setIsLoading(true);
        setLearningPath(null);
        try {
            const data = await getLearningPath(skill);
            setLearningPath(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred while generating the learning path.');
        } finally {
            setIsLoading(false);
        }
    }, [skill]);

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-secondary">Skills Development Planner</h2>
                <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
                    Enter any skill you want to learn, and our AI will generate a personalized, step-by-step learning path with curated resources.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center p-6 bg-surface rounded-lg border border-gray-200">
                <div className="flex-grow w-full">
                    <label htmlFor="skill-input" className="sr-only">Skill to learn</label>
                    <input
                        type="text"
                        id="skill-input"
                        value={skill}
                        onChange={e => setSkill(e.target.value)}
                        placeholder="e.g., React, Python for Data Science, Public Speaking..."
                        className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-lg"
                    />
                </div>
                <button
                    onClick={handleGeneratePath}
                    disabled={isLoading || !skill}
                    className="w-full md:w-auto px-8 py-3 bg-primary text-on-primary font-bold rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105 disabled:transform-none"
                >
                    {isLoading ? 'Generating...' : 'Generate Learning Path'}
                </button>
            </div>
            
            {error && (
                <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg text-center">
                    <p><strong>Error:</strong> {error}</p>
                </div>
            )}

            {isLoading && <Loader />}

            {learningPath && !isLoading && (
                <div className="mt-12 animate-fade-in">
                    <LearningPathComponent path={learningPath} />
                </div>
            )}
        </div>
    );
};

export default SkillsDevelopment;