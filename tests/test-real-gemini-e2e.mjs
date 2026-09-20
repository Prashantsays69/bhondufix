import fs from "fs";
import { z } from "zod";

const StepItemSchema = z.object({
  title: z.string().min(1),
  instruction: z.string().min(1),
});

const AIResponseContractSchema = z.object({
  problem: z.string().min(1),
  explanation: z.string().min(1),
  confidence: z.number().min(0).max(100),
  steps: z.array(StepItemSchema),
  warnings: z.array(z.string()),
  verification: z.string(),
  need_more_context: z.boolean(),
  follow_up_request: z.string(),
});

async function runRealGeminiE2ETest() {
  console.log("==================================================");
  console.log("   BHONDUFIX REAL GEMINI E2E SCREENSHOT TEST      ");
  console.log("==================================================\n");

  // Verify GEMINI_API_KEY presence without printing value
  const envContent = fs.readFileSync(".env.local", "utf8");
  const keyDetected = /^GEMINI_API_KEY\s*=\s*.+/m.test(envContent);
  console.log(`1. Gemini Key Detected: ${keyDetected ? "yes" : "no"}`);

  if (!keyDetected) {
    console.error("FATAL: GEMINI_API_KEY is not detected in .env.local");
    process.exit(1);
  }

  // Load actual screenshot
  const imageBuffer = fs.readFileSync("public/real-screenshot.jpg");
  const base64Image = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
  console.log(`2. Actual Screenshot Loaded: ${imageBuffer.length} bytes`);

  const startTime = Date.now();
  const response = await fetch("http://localhost:3000/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image: base64Image,
      context: "Dev server crashed on npm run dev",
      mode: "bhondu",
    }),
  });
  const durationMs = Date.now() - startTime;

  console.log(`3. API Response Status: ${response.status} (took ${durationMs}ms)`);
  const data = await response.json();

  if (response.status !== 200) {
    console.error("API Error Response:", JSON.stringify(data, null, 2));
    process.exit(1);
  }

  // Validate response against contract schema
  const validationResult = AIResponseContractSchema.safeParse(data);
  console.log(`4. Structured Response Validation: ${validationResult.success ? "pass" : "fail"}`);
  if (!validationResult.success) {
    console.error("Validation Errors:", validationResult.error);
    process.exit(1);
  }

  // Check if deterministic fallback was used
  const isDeterministicCannedExplanation =
    data.explanation.includes("camping on Port 3000 like an uninvited wedding guest");
  const isDeterministicProblem =
    data.problem === "Port 3000 Already in Use (EADDRINUSE)";

  const fallbackUsed = isDeterministicCannedExplanation && isDeterministicProblem;
  console.log(`5. Fallback Used: ${fallbackUsed ? "yes" : "no"}`);

  console.log("\n--- Full Diagnosis Received from Gemini Vision ---");
  console.log(`Problem:     ${data.problem}`);
  console.log(`Explanation: ${data.explanation}`);
  console.log(`Confidence:  ${data.confidence}%`);
  console.log(`Steps (${data.steps.length}):`);
  data.steps.forEach((s, idx) => {
    console.log(`   [${idx + 1}] ${s.title}: ${s.instruction}`);
  });
  console.log(`Warnings:    ${data.warnings.join("; ") || "None"}`);
  console.log(`Verification: ${data.verification}`);
  console.log(`Need More Context: ${data.need_more_context}`);
  console.log("--------------------------------------------------\n");

  if (fallbackUsed) {
    console.error("FAILED: The response matched the deterministic engine instead of Gemini Vision!");
    process.exit(1);
  }

  console.log("✅ REAL GEMINI VISION END-TO-END TEST PASSED!");
}

runRealGeminiE2ETest().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
