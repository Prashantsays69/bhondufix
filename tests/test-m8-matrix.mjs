import fs from "fs";

const API_URL = "http://localhost:3000/api/analyze";

async function runM8FinalQA() {
  console.log("================================================================================");
  console.log("             BHONDUFIX M8: FINAL QA & TEST MATRIX EXECUTION                    ");
  console.log("================================================================================\n");

  const validB64 =
    "data:image/png;base64," +
    fs.readFileSync("public/test-screenshot.png").toString("base64");

  let allPassed = true;
  const results = [];

  function record(name, passed, details) {
    results.push({ name, passed, details });
    console.log(`[${passed ? "PASS ✅" : "FAIL ❌"}] ${name}`);
    console.log(`       Details: ${details}\n`);
    if (!passed) allPassed = false;
  }

  // 1. Valid Screenshot standard flow
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: validB64,
        context: "Port 3000 EADDRINUSE",
        mode: "bhondu",
      }),
    });
    const data = await res.json();
    const ok = res.status === 200 && data.confidence >= 80 && Array.isArray(data.steps) && data.steps.length > 0;
    record("1. Valid Screenshot Standard Flow", ok, `Status ${res.status}, Confidence ${data.confidence}%, Steps: ${data.steps?.length}`);
  } catch (err) {
    record("1. Valid Screenshot Standard Flow", false, err.message);
  }

  // 2. Unsupported Media Type (TIFF/SVG, expected 415)
  try {
    const fakeTiffB64 = "data:image/tiff;base64," + Buffer.alloc(128, 0x49).toString("base64");
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: fakeTiffB64,
        context: "unsupported format test",
      }),
    });
    const data = await res.json();
    const ok = res.status === 415 && data.error && !data.error.includes("stack");
    record("2. Unsupported Media Type Rejection", ok, `Status ${res.status} (Expected 415), Error: "${data.error}"`);
  } catch (err) {
    record("2. Unsupported Media Type Rejection", false, err.message);
  }

  // 2b. Corrupted File Signature / Magic Bytes Mismatch (expected 400)
  try {
    const fakeCorruptBuf = Buffer.alloc(512, 0x7a); // 512 bytes of non-PNG data declared as PNG
    const fakeCorruptB64 = "data:image/png;base64," + fakeCorruptBuf.toString("base64");
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: fakeCorruptB64,
        context: "corrupted signature test",
      }),
    });
    const data = await res.json();
    const ok = res.status === 400 && data.code === "INVALID_IMAGE_SIGNATURE";
    record("2b. Corrupted Magic Bytes Signature Rejection", ok, `Status ${res.status} (Expected 400), Code: "${data.code}"`);
  } catch (err) {
    record("2b. Corrupted Magic Bytes Signature Rejection", false, err.message);
  }

  // 3. Oversized File (>10MB)
  try {
    const hugeBuf = Buffer.alloc(11 * 1024 * 1024);
    const hugeB64 = "data:image/png;base64," + hugeBuf.toString("base64");
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: hugeB64,
      }),
    });
    const data = await res.json();
    const ok = res.status === 413 && data.error && !data.error.includes("stack");
    record("3. Oversized File (>10MB) Rejection", ok, `Status ${res.status} (Expected 413), Error: "${data.error}"`);
  } catch (err) {
    record("3. Oversized File (>10MB) Rejection", false, err.message);
  }

  // 4. Missing Screenshot
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        context: "Where is my image?",
      }),
    });
    const data = await res.json();
    const ok = res.status === 400 && data.error && !data.error.includes("stack");
    record("4. Missing Screenshot Payload Rejection", ok, `Status ${res.status} (Expected 400), Error: "${data.error}"`);
  } catch (err) {
    record("4. Missing Screenshot Payload Rejection", false, err.message);
  }

  // 5. Low-Confidence Analysis (Unclear / blurry)
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: validB64,
        context: "blurry cropped screen",
      }),
    });
    const data = await res.json();
    const ok = res.status === 200 && data.confidence < 60 && data.need_more_context === true && data.follow_up_request.length > 0;
    record("5. Low-Confidence & Missing Context Branch", ok, `Status ${res.status}, Confidence: ${data.confidence}%, need_more_context: ${data.need_more_context}`);
  } catch (err) {
    record("5. Low-Confidence & Missing Context Branch", false, err.message);
  }

  // 6. Safe Diagnosis
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: validB64,
        context: "port 3000 already in use",
        mode: "normal",
      }),
    });
    const data = await res.json();
    const isSafe = data.warnings.length === 0 && !data.problem.toLowerCase().includes("risky");
    const ok = res.status === 200 && isSafe && data.confidence >= 80;
    record("6. Safe Diagnosis (Standard Reversible Actions)", ok, `Status ${res.status}, Problem: "${data.problem}", Warnings: ${data.warnings.length}`);
  } catch (err) {
    record("6. Safe Diagnosis (Standard Reversible Actions)", false, err.message);
  }

  // 7. Risky / Dangerous Instruction Detection
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: validB64,
        context: "risky kill all processes force clean del /f",
      }),
    });
    const data = await res.json();
    const hasWarning = data.warnings.length > 0;
    const ok = res.status === 200 && hasWarning;
    record("7. Risky Situation Detection & Warning", ok, `Status ${res.status}, Warning: "${data.warnings[0]}"`);
  } catch (err) {
    record("7. Risky Situation Detection & Warning", false, err.message);
  }

  // 8. AI / Provider Fallback & Graceful Degradation
  try {
    // With no live credentials, service must execute deterministic vision analysis gracefully with 0 crashes
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: validB64,
        context: "dependency conflict npm install ERESOLVE",
      }),
    });
    const data = await res.json();
    const ok = res.status === 200 && data.confidence > 90 && data.problem.includes("ERESOLVE");
    record("8. AI Provider Fallback & Graceful Degradation", ok, `Status ${res.status}, Handled via deterministic engine without unhandled error`);
  } catch (err) {
    record("8. AI Provider Fallback & Graceful Degradation", false, err.message);
  }

  // 9. Verification Loop: Resolved
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: validB64,
        context: "it works, fixed and running",
        previousContext: {
          problem: "Port 3000 in use",
          attemptedSteps: ["Killed port 3000"],
        },
      }),
    });
    const data = await res.json();
    const ok = res.status === 200 && data.problem.includes("Resolved") && data.confidence >= 95;
    record("9. Verification Loop: Resolved Confirmation", ok, `Status ${res.status}, Problem: "${data.problem}", Confidence: ${data.confidence}%`);
  } catch (err) {
    record("9. Verification Loop: Resolved Confirmation", false, err.message);
  }

  // 10. Verification Loop: Unresolved Cascading
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: validB64,
        context: "still broken, port 3000 error persists",
        previousContext: {
          problem: "Port 3000 in use",
          attemptedSteps: ["Killed port 3000"],
        },
      }),
    });
    const data = await res.json();
    const ok = res.status === 200 && data.problem.includes("Cascading Issue") && data.steps.length > 0;
    record("10. Verification Loop: Escalation on Persisting Error", ok, `Status ${res.status}, Problem: "${data.problem}", Next Steps: ${data.steps.length}`);
  } catch (err) {
    record("10. Verification Loop: Escalation on Persisting Error", false, err.message);
  }

  console.log("================================================================================");
  console.log(`M8 QA MATRIX SUMMARY: ${allPassed ? "10/10 TESTS PASSED ✅" : "TESTS FAILED ❌"}`);
  console.log("================================================================================");

  if (!allPassed) process.exit(1);
}

runM8FinalQA().catch((err) => {
  console.error("FATAL QA FAILURE:", err);
  process.exit(1);
});
