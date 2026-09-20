import { NextRequest, NextResponse } from "next/server";
import { AnalyzeRequestSchema, AIResponseContractSchema } from "@/lib/schema";
import { analyzeScreenshotService } from "@/lib/services/ai-service";
import { evaluateInputSafety } from "@/lib/services/safety-service";
import { validateUploadedImage } from "@/lib/services/upload-validation";

export async function POST(req: NextRequest) {
  try {
    // 1. Parse JSON payload with malformed syntax protection
    let rawBody: any;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        {
          error: "Malformed JSON request body.",
          code: "MALFORMED_JSON_BODY",
        },
        { status: 400 }
      );
    }

    // 2. Validate request body against schema
    const parseResult = AnalyzeRequestSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          code: "INVALID_PAYLOAD",
          details: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const payload = parseResult.data;

    // 3. Deep Server-Side Image & Signature Validation (MIME, magic bytes, size)
    const imageValidation = validateUploadedImage(payload.image);
    if (!imageValidation.isValid) {
      const statusCode =
        imageValidation.code === "PAYLOAD_TOO_LARGE"
          ? 413
          : imageValidation.code === "UNSUPPORTED_MEDIA_TYPE"
          ? 415
          : 400;

      return NextResponse.json(
        {
          error: imageValidation.error || "Invalid image upload.",
          code: imageValidation.code || "INVALID_IMAGE",
        },
        { status: statusCode }
      );
    }

    // 4. Input safety and prompt injection check
    const safetyCheck = evaluateInputSafety(payload.context || "");
    if (!safetyCheck.isSafe && safetyCheck.requiresGate) {
      return NextResponse.json(
        {
          error: "Safety policy triggered: Destructive commands or credential requests detected.",
          code: "SAFETY_GATE_TRIGGERED",
          warnings: safetyCheck.warnings,
        },
        { status: 422 }
      );
    }

    // 5. Backend Service Pipeline Handover (AI Vision service)
    const analysis = await analyzeScreenshotService({
      ...payload,
      context: safetyCheck.sanitizedContext,
    });

    // 6. Enforce strict M1 contract compliance
    const validatedContract = AIResponseContractSchema.parse(analysis);

    return NextResponse.json(validatedContract, { status: 200 });
  } catch (error: any) {
    console.error("API /api/analyze error:", error);
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred while analyzing the screenshot",
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "BhonduFix Visual Analysis API",
    contractVersion: "1.0.0",
    backendValidation: "active",
    supportedModes: ["bhondu", "normal"],
    safetyGate: "active",
    maxUploadSizeBytes: 10 * 1024 * 1024,
  });
}
