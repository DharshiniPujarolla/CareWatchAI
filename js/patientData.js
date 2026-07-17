/* =========================================================
   patientData.js — PERSON 2's FILE
   Task 1: "Create sample patient data"

   Job of this file: hold the raw patient info + weekly
   symptom numbers. No calculations happen here — just data.

   Feel free to add more patients to this array. Whichever
   one you want to demo, set `demoPatientRaw` to point at it
   at the bottom of the file.
========================================================= */

const patients = [
  {
    name: "Ravi Kumar",
    surgeryType: "Knee Replacement",
    // raw weekly readings — replace with your real sample data
    weeklyExpected: [15, 32, 50, 68, 82, 95],
    weeklyActual:   [14, 28, 34, 30, 27, 31],
    expectedSymptoms: { pain: "down", walking: "up", swelling: "down" },
    actualSymptoms:   { pain: "up", walking: "down", swelling: "down" },
    expectedTimelineWeeks: 6
  },
  {
    name: "Anita Rao",
    surgeryType: "Hip Replacement",
    weeklyExpected: [20, 40, 58, 74, 88, 96],
    weeklyActual:   [22, 42, 60, 76, 89, 97],
    expectedSymptoms: { pain: "down", walking: "up", swelling: "down" },
    actualSymptoms:   { pain: "down", walking: "up", swelling: "down" },
    expectedTimelineWeeks: 6
  }
];

// Change this to patients[1] to demo the "normal, no deviation" patient
const demoPatientRaw = patients[0];
