import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, MarketIntelligenceResult, LearningPath } from '../types';

// FIX: Correctly initialize the GoogleGenAI client with a named apiKey parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to convert file to base64
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    atsScore: { type: Type.NUMBER, description: "Applicant Tracking System (ATS) match score from 0 to 100." },
    summary: { type: Type.STRING, description: "A brief, 2-3 sentence summary of how well the resume matches the job description." },
    matchingSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of skills present in both the resume and the job description." },
    missingSkills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          skill: { type: Type.STRING, description: "A skill required by the job but missing from the resume." },
          reason: { type: Type.STRING, description: "A brief explanation of why this skill is important for the role." },
          resources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "The title of the learning resource." },
                url: { type: Type.STRING, description: "A URL to the learning resource." },
                type: { type: Type.STRING, description: "The type of resource (e.g., Article, Video, Course)." },
              },
              required: ["name", "url", "type"],
            },
            description: "A list of 2-3 recommended resources to learn this skill."
          },
        },
        required: ["skill", "reason", "resources"],
      },
      description: "A list of critical skills that are missing from the resume."
    },
    resumeSuggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          area: { type: Type.STRING, description: "The section of the resume to improve (e.g., Summary, Experience, Skills)." },
          suggestion: { type: Type.STRING, description: "A specific, actionable suggestion for improving that area of the resume. Provide concrete examples." }
        },
        required: ["area", "suggestion"]
      },
      description: "A list of suggestions to improve the resume."
    },
    tunedResumeText: { type: Type.STRING, description: "The full text of the user's resume, rewritten and optimized to match the job description in an ATS-friendly plain text format." },
  },
  required: ["atsScore", "summary", "matchingSkills", "missingSkills", "resumeSuggestions", "tunedResumeText"],
};


export const analyzeResumeAndJob = async (jobDescription: string, resumeFile: File): Promise<AnalysisResult> => {
  const resumePart = await fileToGenerativePart(resumeFile);
  const prompt = `Analyze the provided resume against the job description. Based on this analysis, provide a detailed report.

  Job Description:
  ---
  ${jobDescription}
  ---
  
  Evaluate the resume and provide the following in JSON format:
  1.  **atsScore**: An integer score from 0-100 representing the match quality.
  2.  **summary**: A 2-3 sentence summary of the candidate's fit for the role.
  3.  **matchingSkills**: A list of key skills found in both the resume and the job description.
  4.  **missingSkills**: A list of 3-5 critical skills required by the job that are missing from the resume. For each missing skill, explain its importance and provide 2-3 diverse online learning resources (articles, courses, videos).
  5.  **resumeSuggestions**: 2-3 actionable suggestions to better tailor the resume to the job description, focusing on different areas like the summary, experience bullet points, or skills section. Provide concrete examples where possible.
  6.  **tunedResumeText**: Rewrite the entire resume in a clean, ATS-friendly plain text format. The rewritten resume must be tailored to highlight the skills and experiences most relevant to the provided job description, using keywords from the description where appropriate. Ensure all original information (like company names, dates, and core responsibilities) is preserved but rephrased for maximum impact for this specific job application.
  `;

  // FIX: Use the 'gemini-2.5-flash' model for text generation tasks.
  // FIX: Use ai.models.generateContent to generate content.
  // FIX: Added responseSchema to the config to get a structured JSON response.
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [{ text: prompt }, resumePart] },
    config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
    }
  });

  // FIX: The response text is a JSON string that needs to be parsed.
  // FIX: The generated text is directly on `response.text`.
  const jsonText = response.text.trim();
  return JSON.parse(jsonText) as AnalysisResult;
};

const marketIntelligenceSchema = {
    type: Type.OBJECT,
    properties: {
        marketSummary: { type: Type.STRING, description: "A 2-4 sentence summary of the current job market for the specified role, location, and experience level." },
        salaryData: {
            type: Type.OBJECT,
            properties: {
                average: { type: Type.NUMBER, description: "The estimated average annual salary." },
                rangeLow: { type: Type.NUMBER, description: "The low end of the typical salary range." },
                rangeHigh: { type: Type.NUMBER, description: "The high end of the typical salary range." },
                currency: { type: Type.STRING, description: "The currency code (e.g., INR)." },
            },
            required: ["average", "rangeLow", "rangeHigh", "currency"]
        },
        trendingSkills: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "A trending or in-demand skill for this role." },
                    demand: { type: Type.STRING, description: "The demand level: 'High', 'Medium', or 'Low'." },
                    description: { type: Type.STRING, description: "A brief explanation of why this skill is trending." }
                },
                required: ["skill", "demand", "description"]
            },
            description: "A list of 5-7 trending skills for this role."
        }
    },
    required: ["marketSummary", "salaryData", "trendingSkills"]
};

export const getMarketIntelligence = async (jobTitle: string, location: string, experience: string): Promise<MarketIntelligenceResult> => {
    const prompt = `Provide a market intelligence report for a "${jobTitle}" position in "${location}" with an experience level of "${experience}".
    
    The report should be in JSON format and include:
    1. **marketSummary**: A brief overview of the job market for this role.
    2. **salaryData**: An estimated annual salary including average, low range, high range, and currency (INR). Ensure the salary is appropriate for the Indian market and is in Indian Rupees (INR).
    3. **trendingSkills**: A list of 5-7 top trending skills, each with a demand level ('High', 'Medium', 'Low') and a short description.
    `;

    // FIX: Use ai.models.generateContent to generate content.
    // FIX: Use the 'gemini-2.5-flash' model for text generation tasks.
    // FIX: Added responseSchema to the config to get a structured JSON response.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: marketIntelligenceSchema,
        }
    });
    
    // FIX: The generated text is directly on `response.text`.
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as MarketIntelligenceResult;
}

const learningPathSchema = {
    type: Type.OBJECT,
    properties: {
        skill: { type: Type.STRING },
        summary: { type: Type.STRING, description: "A brief summary of what the learning path covers." },
        steps: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The title of the learning step." },
                    description: { type: Type.STRING, description: "A detailed description of what to learn in this step." },
                    resources: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                url: { type: Type.STRING },
                                type: { type: Type.STRING, description: "e.g., Article, Video, Course, Project Idea" }
                            },
                            required: ["name", "url", "type"]
                        },
                        description: "A list of 2-4 resources for this learning step."
                    }
                },
                required: ["title", "description", "resources"]
            }
        }
    },
    required: ["skill", "summary", "steps"]
};

export const getLearningPath = async (skill: string): Promise<LearningPath> => {
    const prompt = `Create a detailed, step-by-step learning path for someone looking to master "${skill}". The user is likely a professional looking to upskill.

    The learning path should be structured in a logical sequence, from fundamentals to advanced topics.
    
    Provide the output in JSON format with the following structure:
    - **skill**: The name of the skill.
    - **summary**: A short paragraph summarizing the learning path.
    - **steps**: An array of learning steps. Each step should include:
        - **title**: A clear title for the step (e.g., "Understanding Core Concepts").
        - **description**: A paragraph explaining the key topics and goals of this step.
        - **resources**: An array of 2-4 diverse, high-quality online resources (articles, videos, courses, documentation, project ideas) to complete the step. Each resource should have a name, URL, and type.
    `;
    
    // FIX: Use ai.models.generateContent to generate content.
    // FIX: Use the 'gemini-2.5-flash' model for text generation tasks.
    // FIX: Added responseSchema to the config to get a structured JSON response.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: learningPathSchema,
        }
    });

    // FIX: The generated text is directly on `response.text`.
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as LearningPath;
}