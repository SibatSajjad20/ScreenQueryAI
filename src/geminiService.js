import { GoogleGenAI } from '@google/genai'

export async function queryGemini(apiKey, base64Image, prompt) {
  const ai = new GoogleGenAI({ apiKey, apiVersion: 'v1' })

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite',
    contents: [
      {
        parts: [
          { inlineData: { mimeType: 'image/png', data: base64Image } },
          { text: prompt },
        ],
      },
    ],
  })

  return response.text
}
