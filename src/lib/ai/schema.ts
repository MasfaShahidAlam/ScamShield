import { z } from "zod";

// This schema describes the exact shape we require the AI's JSON response
// to match. If the AI returns anything that doesn't fit, validation fails
// and we can catch that instead of showing broken data to the user.
export const analysisSchema = z.object({
  // Whole number from 0 to 100 representing scam risk
  riskScore: z.number().int().min(0).max(100),

  // Overall risk level, must be exactly one of these three strings
  riskLevel: z.enum(["Safe", "Suspicious", "High Risk"]),

  // The type of scam this message most closely matches
  category: z.enum([
    "Phishing",
    "Prize/Lottery Scam",
    "Romance Scam",
    "Job Scam",
    "Investment/Crypto Scam",
    "Impersonation Scam",
    "Package/Delivery Scam",
    "Not a Scam",
  ]),

  // List of suspicious phrases found in the message, each with a reason
  redFlags: z.array(
    z.object({
      phrase: z.string(),
      reason: z.string(),
    })
  ),

  // Plain-English summary of why the message got this risk level
  explanation: z.string(),

  // Short list of things the user should do next
  recommendedActions: z.array(z.string()),
});

// TypeScript type generated automatically from the schema above.
// We use this everywhere in the app instead of writing the type by hand,
// so the type and the validation rule can never drift apart.
export type Analysis = z.infer<typeof analysisSchema>;