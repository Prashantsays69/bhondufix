import fs from "fs";

const API_URL = "http://localhost:3000/api/analyze";

function evaluateSafetyGate(problem, steps, warnings, confidence) {
  if (confidence < 50 || problem.toLowerCase().includes("insufficient") || problem.toLowerCase().includes("unknown")) {
    return {
      level: "unknown",
      title: "Ambiguous Situation — Safety Unverifiable",
      reason: "BhonduFix cannot guarantee safety because the error context is ambiguous.",
      requiresExplicitConsent: false,
    };
  }

  const combinedText = [
    problem,
    ...warnings,
    ...steps.map((s) => `${s.title} ${s.instruction}`),
  ].join(" ").toLowerCase();

  const isDestructive =
    /rm\s+-rf|del\s+\/|format\s+[c-z]:|diskpart|drop\s+database|clean\s+install|factory\s+reset|registry|regedit|chmod\s+777|disable\s+firewall|taskkill\s+\/f/i.test(
      combinedText
    );

  if (isDestructive) {
    return {
      level: "risky",
      title: "Caution: Potentially Risky Action",
      reason: "This fix modifies system configuration or forcefully terminates system processes.",
      safeAlternative: "Ensure you have a current backup of your work.",
      requiresExplicitConsent: true,
    };
  }

  return {
    level: "safe",
    title: "Safe & Reversible Action",
    reason: "Standard, non-destructive troubleshooting steps supported by visual evidence.",
    requiresExplicitConsent: false,
  };
}

async function runM6Verification() {
  console.log("==================================================");
  console.log("    BHONDUFIX M6: RESULTS & SAFETY GATE TESTS    ");
  console.log("==================================================\n");

  const validB64 =
    "data:image/png;base64," +
    fs.readFileSync("public/test-screenshot.png").toString("base64");

  let allPassed = true;

  // 1. High-confidence safe issue
  console.log("1. HIGH-CONFIDENCE SAFE ISSUE");
  const res1 = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image: validB64,
      context: "dev server crashed port 3000",
      mode: "bhondu",
    }),
  });
  const data1 = await res1.json();
  const safety1 = evaluateSafetyGate(data1.problem, data1.steps, data1.warnings, data1.confidence);
  const test1Pass =
    res1.status === 200 &&
    data1.confidence >= 80 &&
    safety1.level === "safe" &&
    !safety1.requiresExplicitConsent &&
    data1.steps.length > 0;
  console.log(`   - Status: ${res1.status}`);
  console.log(`   - Confidence: ${data1.confidence}%`);
  console.log(`   - Safety Level: ${safety1.level.toUpperCase()} (${safety1.title})`);
  console.log(`   - Steps: ${data1.steps.length}`);
  console.log(`   - Result: ${test1Pass ? "PASSED ✅" : "FAILED ❌"}\n`);
  if (!test1Pass) allPassed = false;

  // 2. Low-confidence issue requiring context
  console.log("2. LOW-CONFIDENCE ISSUE REQUIRING CONTEXT");
  const res2 = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image: validB64,
      context: "blurry cropped screen",
      mode: "bhondu",
    }),
  });
  const data2 = await res2.json();
  const safety2 = evaluateSafetyGate(data2.problem, data2.steps, data2.warnings, data2.confidence);
  const test2Pass =
    res2.status === 200 &&
    data2.confidence < 60 &&
    data2.need_more_context === true &&
    safety2.level === "unknown";
  console.log(`   - Status: ${res2.status}`);
  console.log(`   - Confidence: ${data2.confidence}% (< 60)`);
  console.log(`   - Need More Context: ${data2.need_more_context}`);
  console.log(`   - Safety Gate: ${safety2.level.toUpperCase()} (${safety2.title})`);
  console.log(`   - Result: ${test2Pass ? "PASSED ✅" : "FAILED ❌"}\n`);
  if (!test2Pass) allPassed = false;

  // 3. Risky instruction & safety gate
  console.log("3. RISKY INSTRUCTION SAFETY GATE");
  const res3 = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image: validB64,
      context: "risky kill all processes force clean",
      mode: "bhondu",
    }),
  });
  const data3 = await res3.json();
  const safety3 = evaluateSafetyGate(data3.problem, data3.steps, data3.warnings, data3.confidence);
  const test3Pass =
    res3.status === 200 &&
    safety3.level === "risky" &&
    safety3.requiresExplicitConsent === true &&
    typeof safety3.safeAlternative === "string";
  console.log(`   - Status: ${res3.status}`);
  console.log(`   - Problem: "${data3.problem}"`);
  console.log(`   - Safety Level: ${safety3.level.toUpperCase()} (${safety3.title})`);
  console.log(`   - Requires Consent: ${safety3.requiresExplicitConsent}`);
  console.log(`   - Safer Alternative: "${safety3.safeAlternative}"`);
  console.log(`   - Result: ${test3Pass ? "PASSED ✅" : "FAILED ❌"}\n`);
  if (!test3Pass) allPassed = false;

  // 4. Verification loop: Successfully resolved follow-up
  console.log("4. VERIFICATION LOOP: RESOLVED ISSUE");
  const res4 = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image: validB64,
      context: "it works, port is ready and running",
      mode: "bhondu",
      previousContext: {
        problem: "Port 3000 Already in Use (EADDRINUSE)",
        attemptedSteps: ["Find and terminate ghost process"],
      },
    }),
  });
  const data4 = await res4.json();
  const test4Pass =
    res4.status === 200 &&
    data4.confidence >= 95 &&
    data4.problem.toLowerCase().includes("resolved");
  console.log(`   - Status: ${res4.status}`);
  console.log(`   - Confidence: ${data4.confidence}%`);
  console.log(`   - Problem: "${data4.problem}"`);
  console.log(`   - Result: ${test4Pass ? "PASSED ✅" : "FAILED ❌"}\n`);
  if (!test4Pass) allPassed = false;

  // 5. Verification loop: Still unresolved follow-up
  console.log("5. VERIFICATION LOOP: UNRESOLVED FOLLOW-UP");
  const res5 = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image: validB64,
      context: "nope, still cooked, port still locked",
      mode: "bhondu",
      previousContext: {
        problem: "Port 3000 Already in Use (EADDRINUSE)",
        attemptedSteps: ["Find and terminate ghost process"],
      },
    }),
  });
  const data5 = await res5.json();
  const test5Pass =
    res5.status === 200 &&
    data5.problem.includes("Cascading Issue") &&
    data5.steps.length > 0;
  console.log(`   - Status: ${res5.status}`);
  console.log(`   - Problem: "${data5.problem}"`);
  console.log(`   - Next Steps: ${data5.steps.length}`);
  console.log(`   - Result: ${test5Pass ? "PASSED ✅" : "FAILED ❌"}\n`);
  if (!test5Pass) allPassed = false;

  console.log("==================================================");
  console.log(`M6 TEST SUMMARY: ${allPassed ? "ALL TESTS PASSED ✅" : "SOME TESTS FAILED ❌"}`);
  console.log("==================================================");

  if (!allPassed) process.exit(1);
}

runM6Verification().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
