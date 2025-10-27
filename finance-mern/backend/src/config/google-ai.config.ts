import { GoogleGenAI } from "@google/genai";
import { Env } from "./env.config";

export const genAI = new GoogleGenAI({ apiKey: Env.GEMINI_API_KEY });
export const genAIModel = "gemini-2.0-flash";
