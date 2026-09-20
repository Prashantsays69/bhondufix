import { z } from "zod";

export const StepItemSchema = z.object({
  title: z.string().min(1, "Step title cannot be empty"),
  instruction: z.string().min(1, "Step instruction cannot be empty"),
});

export const AIResponseContractSchema = z.object({
  problem: z.string().min(1, "Problem description is required"),
  explanation: z.string().min(1, "Explanation is required"),
  confidence: z.preprocess((val) => {
    let num = val;
    if (typeof val === "string") {
      num = Number(val.replace("%", "").trim());
    }
    if (typeof num === "number" && !isNaN(num)) {
      if (num > 0 && num <= 1) {
        return Math.round(num * 100);
      }
      return Math.round(num);
    }
    return val;
  }, z.number().min(0).max(100)),
  steps: z.array(StepItemSchema).default([]),
  warnings: z.array(z.string()).default([]),
  verification: z.string().default(""),
  need_more_context: z.boolean().default(false),
  follow_up_request: z.string().default(""),
});

export const AnalyzeRequestSchema = z.object({
  image: z.string().min(1, "Image payload is required"),
  context: z.string().max(1000).optional().default(""),
  mode: z.enum(["bhondu", "normal"]).default("bhondu"),
  category: z.string().optional(),
  previousContext: z
    .object({
      problem: z.string().optional(),
      attemptedSteps: z.array(z.string()).optional(),
    })
    .optional(),
});

export type AIResponseContractValidated = z.infer<typeof AIResponseContractSchema>;
export type AnalyzeRequestValidated = z.infer<typeof AnalyzeRequestSchema>;
