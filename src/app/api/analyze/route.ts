import { NextResponse } from "next/server";
import { ai } from "@/lib/ai/client";
import { SYSTEM_PROMPT } from "@/lib/ai/prompt";
import { analysisSchema } from "@/lib/ai/schema";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a valid message to analyze." },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${SYSTEM_PROMPT}

User message to analyze:
${message}`,
      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "object",

          properties: {
            riskScore: {
              type: "integer",
              minimum: 0,
              maximum: 100,
            },

            riskLevel: {
              type: "string",
              enum: ["Safe", "Suspicious", "High Risk"],
            },

            category: {
              type: "string",
              enum: [
                "Phishing",
                "Prize/Lottery Scam",
                "Romance Scam",
                "Job Scam",
                "Investment/Crypto Scam",
                "Impersonation Scam",
                "Package/Delivery Scam",
                "Not a Scam",
              ],
            },

            redFlags: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  phrase: {
                    type: "string",
                  },
                  reason: {
                    type: "string",
                  },
                },
                required: ["phrase", "reason"],
              },
            },

            explanation: {
              type: "string",
            },

            recommendedActions: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },

          required: [
            "riskScore",
            "riskLevel",
            "category",
            "redFlags",
            "explanation",
            "recommendedActions",
          ],
        },
      },
    });

    const result = JSON.parse(response.text ?? "");

    const validatedResult = analysisSchema.parse(result);

    return NextResponse.json(validatedResult);
  } catch (error) {
    console.error("Analysis error:", error);

    return NextResponse.json(
      { error: "Failed to analyze the message." },
      { status: 500 }
    );
  }
}