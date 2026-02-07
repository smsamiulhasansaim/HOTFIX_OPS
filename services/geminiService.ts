
import { GoogleGenAI, Type } from "@google/genai";
import { BugTask } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async diagnoseBug(task: BugTask) {
    const prompt = `You are a Senior Web Developer. Analyze this bug report and provide a concise diagnosis and a minimal code fix.
    
    Bug Title: ${task.title}
    Description: ${task.description}
    Technical Context: ${task.technicalDetails}

    Return a JSON response with:
    1. diagnosis: A short sentence explaining the root cause.
    2. fix: A single-line or concise block of CSS/JS/PHP code to fix it.
    3. impact: What happens if not fixed.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              diagnosis: { type: Type.STRING },
              fix: { type: Type.STRING },
              impact: { type: Type.STRING },
            },
            required: ["diagnosis", "fix", "impact"]
          }
        }
      });

      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini Diagnosis Error:", error);
      return {
        diagnosis: "Unable to connect to diagnosis server.",
        fix: "Check network connection.",
        impact: "Unknown"
      };
    }
  }
}

export const geminiService = new GeminiService();
