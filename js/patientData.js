/* =========================================================
   patientData.js — PERSON 2's FILE
   Task 1: "Create sample patient data"

   Job of this file: hold the raw patient info + weekly
   symptom numbers. No calculations happen here — just data.

   3 patients, each demonstrating a different case:
     1. Ravi Kumar   — clear deviation  (recovery stalling)
     2. Priya Nair    — normal recovery (tracks the plan)
     3. Suresh Iyer   — borderline      (lagging, but under
                         the alarm threshold — good talking
                         point about where the cutoff sits)

   Change `demoPatientRaw` at the bottom to switch which one
   the dashboard renders.
========================================================= */

const patients = [
  {
    name: "Ravi Kumar",
    surgeryType: "Knee Replacement",
    // Recovery stalls hard after week 2 — pain climbs back up,
    // walking distance regresses instead of improving.
    weeklyExpected: [15, 32, 50, 68, 82, 95],
    weeklyActual:   [14, 28, 32, 29, 25, 28],
    expectedSymptoms: { pain: "down", 
                        walking: "up", 
                        swelling: "down" 
                    },
    actualSymptoms:   { pain: "up",
                        walking: "down", 
                        swelling: "up" 
                    },
    expectedTimelineWeeks: 6
  },
  {
    name: "Priya Nair",
    surgeryType: "Appendectomy",
    // Appendectomy recovers faster than joint surgery — the
    // curve is steeper, and actual tracks expected closely.
    weeklyExpected: [30, 55, 75, 88, 95, 99],
    weeklyActual:   [28, 53, 74, 87, 94, 98],
    expectedSymptoms: { pain: "down", 
                        walking: "up", 
                        swelling: "down" 
                    },
    actualSymptoms:   { pain: "down", 
                        walking: "up", 
                        swelling: "down" 
                    },
    expectedTimelineWeeks: 4
  },
  {
    name: "Suresh Iyer",
    surgeryType: "Spinal Fusion",
    // Slower overall (spinal fusion has a longer curve), and
    // consistently a bit behind schedule — not collapsing like
    // Ravi, but not fully on track either.
    weeklyExpected: [10, 25, 42, 60, 75, 88],
    weeklyActual:   [8, 18, 28, 38, 48, 58],
    expectedSymptoms: { pain: "down",
                        walking: "up", 
                        swelling: "down" 
                    },
    actualSymptoms:   { pain: "down", 
                        walking: "up", 
                        swelling: "down" 
                    },
    expectedTimelineWeeks: 8
  }
];

// Change this to patients[1] or patients[2] to demo a different case.
const demoPatientRaw = patients[1];