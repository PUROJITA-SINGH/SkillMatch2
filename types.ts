export interface Resource {
    name: string;
    url: string;
    type: 'Article' | 'Video' | 'Course' | 'Documentation' | 'Other';
}

export interface MissingSkill {
    skill: string;
    reason: string;
    resources: Resource[];
}

export interface ResumeSuggestion {
    area: 'Summary' | 'Experience' | 'Skills' | 'Projects' | 'General';
    suggestion: string;
}

export interface AnalysisResult {
    atsScore: number;
    summary: string;
    matchingSkills: string[];
    missingSkills: MissingSkill[];
    resumeSuggestions: ResumeSuggestion[];
    tunedResumeText: string; // Added field for the full tuned resume
}

export interface SalaryData {
    average: number;
    rangeLow: number;
    rangeHigh: number;
    currency: string;
}

export interface TrendingSkill {
    skill: string;
    demand: 'High' | 'Medium' | 'Low';
    description: string;
}

export interface MarketIntelligenceResult {
    marketSummary: string;
    salaryData: SalaryData;
    trendingSkills: TrendingSkill[];
}

// For Skills Development
export interface LearningResource {
    name: string;
    url: string;
    type: 'Article' | 'Video' | 'Course' | 'Documentation' | 'Project Idea' | 'Other';
}

export interface LearningStep {
    title: string;
    description: string;
    resources: LearningResource[];
}

export interface LearningPath {
    skill: string;
    summary: string;
    steps: LearningStep[];
}