import { GoogleGenAI, Type } from "@google/genai";
import { FortuneData, ErrorResponse } from '../types';
import { GEMINI_MODEL, FORTUNE_TELLER_SYSTEM_INSTRUCTION } from '../constants';

/**
 * Generates a fortune using the Gemini API based on a given prompt.
 * The model acts as a fortune teller and returns structured data.
 * @param prompt The user's prompt (e.g., "おみくじを引く").
 * @returns A Promise that resolves to FortuneData or rejects with an ErrorResponse.
 */
export const generateFortune = async (prompt: string): Promise<FortuneData> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: FORTUNE_TELLER_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fortune: {
              type: Type.STRING,
              description: '今日の運勢 (e.g., 大吉, 中吉, 小吉, 凶)'
            },
            luckyItem: {
              type: Type.STRING,
              description: '今日のラッキーアイテム'
            },
            advice: {
              type: Type.STRING,
              description: '今日の一言アドバイス'
            }
          },
          required: ['fortune', 'luckyItem', 'advice'],
          propertyOrdering: ['fortune', 'luckyItem', 'advice']
        },
      },
    });

    const jsonStr = response.text?.trim();

    if (!jsonStr) {
      throw new Error("No response text received from the model.");
    }

    try {
      const parsedData: FortuneData = JSON.parse(jsonStr);
      // Basic validation for the parsed data
      if (
        typeof parsedData.fortune === 'string' &&
        typeof parsedData.luckyItem === 'string' &&
        typeof parsedData.advice === 'string'
      ) {
        return parsedData;
      } else {
        throw new Error("Invalid structure for fortune data received.");
      }
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      console.error("Raw JSON string:", jsonStr);
      throw new Error(`Failed to parse response from Gemini. Raw: ${jsonStr}`);
    }

  } catch (error: any) {
    console.error("Error generating fortune:", error);
    const errorResponse: ErrorResponse = {
      message: error.message || "An unknown error occurred during fortune generation.",
      code: error.code || 500
    };
    throw errorResponse;
  }
};
