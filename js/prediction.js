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
 * getDeviationStatus(riskScore)
 * 3-tier status instead of a single on/off cutoff:
 *   "on-track"  — riskScore < 25
 *   "watch"     — 25 <= riskScore < 40 (behind schedule, but
 *                 not severe enough to call a full deviation —
 *                 worth monitoring, not yet alarming)
 *   "deviation" — riskScore >= 40 (clear deviation, alert)
 *
 * Tweak the cutoffs here if you want the bands to shift.
 */
function getDeviationStatus(riskScore) {
  if (riskScore >= 40) return "deviation";
  if (riskScore >= 25) return "watch";
  return "on-track";
}

/**
 * symptomToArrow(direction)
 * Converts "up"/"down" into the arrow strings the UI expects.
 */
function symptomToArrow(label, direction) {
  return `${label} ${direction === "up" ? "↑" : "↓"}`;
}

/*
 * getPatientList()
 * Small helper so the UI can build a patient picker without
 * ever touching the raw `patients` array directly. Returns
 * just enough to label each option in a dropdown.
 */
function getPatientList() {
  return patients.map((p, index) => ({
    index,
    name: p.name,
    surgeryType: p.surgeryType
  }));
}
 
/**
 * getPatientResult(patientIndex)
 * THE CONTRACT. Must always return an object with exactly
 * these keys — app.js depends on this shape:
 *
 * {
 *   name, surgeryType, recoveryScore,
 *   weeklyExpected: [6 numbers], weeklyActual: [6 numbers],
 *   expected: [3 strings], actual: [3 strings],
 *   expectedTimeline, actualTimeline,
 *   deviationDetected: boolean, riskScore: number,
 *   deviationStatus: "on-track" | "watch" | "deviation",
 *   alarmTitle: string, alarmSub: string
 * }
 *
 * deviationStatus/alarmTitle/alarmSub are NEW additive keys —
 * deviationDetected is kept exactly as before (true only for
 * the "deviation" tier) so nothing that already reads it breaks.
 *
 * patientIndex is optional — omitting it (or calling with no
 * args, like the original version did) still works and falls
 * back to the original demo patient, so nothing that already
 * calls getPatientResult() with no arguments breaks.
 */
function getPatientResult(patientIndex) {
  const p = typeof patientIndex === "number" ? patients[patientIndex] : demoPatientRaw;
  const riskScore = calculateRiskScore(p.weeklyExpected, p.weeklyActual);
  const deviationStatus = getDeviationStatus(riskScore);
  const deviationDetected = deviationStatus === "deviation";
  const latestActual = p.weeklyActual[p.weeklyActual.length - 1];

  const alarmCopy = {
    "on-track": { title: "", sub: "" }, // banner is hidden for this tier, text unused
    watch: {
      title: "RECOVERY DELAY — WORTH WATCHING",
      sub: `Risk Score ${riskScore}% — behind schedule, recommend monitoring`
    },
    deviation: {
      title: "RECOVERY DEVIATION DETECTED",
      sub: `Risk Score ${riskScore}% — recommend early follow-up`
    }
  }[deviationStatus];

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
    deviationStatus,
    alarmTitle: alarmCopy.title,
    alarmSub: alarmCopy.sub,
    riskScore
  };
}
