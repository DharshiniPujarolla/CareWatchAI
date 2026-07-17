/* =========================================================
   prediction.js — PERSON 2's FILE
   Tasks 2-5: expected recovery data, expected vs actual
   comparison, risk score, alerts.

   Job of this file: take the raw data from patientData.js
   and turn it into the EXACT shape app.js expects. app.js
   only ever calls getPatientResult() — never touches
   patientData.js directly. That function is the contract
   between your work and Person 1's.
========================================================= */

/**
 * calculateRiskScore(weeklyExpected, weeklyActual)
 * Simple starting formula: average gap between expected and
 * actual, scaled to 0-100. Replace with your real logic —
 * this is just a placeholder that already works.
 */
function calculateRiskScore(weeklyExpected, weeklyActual) {
  const gaps = weeklyExpected.map((v, i) => v - weeklyActual[i]);
  const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;
  const risk = Math.round(Math.max(0, Math.min(100, avgGap * 2)));
  return risk;
}

/**
 * detectDeviation(riskScore)
 * Threshold logic — tweak the cutoff as you like.
 */
function detectDeviation(riskScore) {
  return riskScore >= 40;
}

/**
 * symptomToArrow(direction)
 * Converts "up"/"down" into the arrow strings the UI expects.
 */
function symptomToArrow(label, direction) {
  return `${label} ${direction === "up" ? "↑" : "↓"}`;
}

/**
 * getPatientResult()
 * THE CONTRACT. Must always return an object with exactly
 * these keys — app.js depends on this shape:
 *
 * {
 *   name, surgeryType, recoveryScore,
 *   weeklyExpected: [6 numbers], weeklyActual: [6 numbers],
 *   expected: [3 strings], actual: [3 strings],
 *   expectedTimeline, actualTimeline,
 *   deviationDetected: boolean, riskScore: number
 * }
 */
function getPatientResult() {
  const p = demoPatientRaw;
  const riskScore = calculateRiskScore(p.weeklyExpected, p.weeklyActual);
  const deviationDetected = detectDeviation(riskScore);
  const latestActual = p.weeklyActual[p.weeklyActual.length - 1];

  return {
    name: p.name,
    surgeryType: p.surgeryType,
    recoveryScore: `${latestActual}%`,
    weeklyExpected: p.weeklyExpected,
    weeklyActual: p.weeklyActual,
    expected: [
      symptomToArrow("Pain", p.expectedSymptoms.pain),
      symptomToArrow("Walking", p.expectedSymptoms.walking),
      symptomToArrow("Swelling", p.expectedSymptoms.swelling)
    ],
    actual: [
      symptomToArrow("Pain", p.actualSymptoms.pain),
      symptomToArrow("Walking", p.actualSymptoms.walking),
      symptomToArrow("Swelling", p.actualSymptoms.swelling)
    ],
    expectedTimeline: `${p.expectedTimelineWeeks} weeks`,
    actualTimeline: deviationDetected
      ? `${p.expectedTimelineWeeks + 3}+ weeks (projected)`
      : `${p.expectedTimelineWeeks} weeks (on track)`,
    deviationDetected,
    riskScore
  };
}
