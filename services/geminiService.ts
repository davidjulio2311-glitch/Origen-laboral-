
import { GoogleGenAI, Type } from "@google/genai";
import { Job } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function searchJobs(query: string): Promise<Job[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Eres un experto laboral en Maicao, La Guajira. 
      Genera 5 ofertas de empleo reales para la búsqueda: "${query}".
      
      REGLAS CRÍTICAS:
      1. EXPERIENCIA: Todas deben tener experienceYears: 0. Son para personas sin experiencia.
      2. REQUISITOS PROPORCIONALES:
         - Si es un "trabajo pequeño" (mesero, ayudante, vigilante, ventas): Los requisitos deben ser simples (ej: "Ser Bachiller", "Vivir en Maicao", "Buena actitud", "Puntualidad").
         - Si es un cargo profesional (contador, abogado, admin): El requisito debe ser "Título Universitario" y habilidades académicas, PERO NUNCA experiencia laboral.
      3. EDUCACIÓN: Debe ser 'Bachiller' o 'Universitario'.
      4. UBICACIÓN: Siempre Maicao.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              company: { type: Type.STRING },
              salary: { type: Type.STRING },
              type: { type: Type.STRING },
              location: { type: Type.STRING },
              schedule: { type: Type.STRING },
              educationLevel: { type: Type.STRING },
              noDegreeRequired: { type: Type.BOOLEAN },
              description: { type: Type.STRING },
              requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
              skills: { type: Type.ARRAY, items: { type: Type.STRING } },
              personalQualities: { type: Type.ARRAY, items: { type: Type.STRING } },
              experienceYears: { type: Type.NUMBER },
              contactEmail: { type: Type.STRING },
              contactPhone: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } },
              postedAt: { type: Type.STRING }
            },
            required: ["id", "title", "company", "educationLevel", "experienceYears", "requirements"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error fetching jobs from Gemini:", error);
    return [];
  }
}

export async function generateJobDetails(title: string): Promise<Partial<Job>> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Genera los requisitos para el cargo "${title}" en un negocio de Maicao.
      - Si es un empleo sencillo, pon solo 3 requisitos básicos (Bachiller, actitud, residencia en Maicao).
      - Si es complejo, pon el título universitario como requisito principal.
      - IMPORTANTE: No pidas años de experiencia. experienceYears: 0.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            educationLevel: { type: Type.STRING },
            requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            personalQualities: { type: Type.ARRAY, items: { type: Type.STRING } },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            salary: { type: Type.STRING },
            experienceYears: { type: Type.NUMBER }
          }
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error generating job details:", error);
    return {};
  }
}
