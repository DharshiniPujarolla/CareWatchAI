/* =========================================================
   app.js — Person 1's job: UI BEHAVIOR ONLY.
   Reads whatever getPatientResult() returns and puts it on
   the page. Contains ZERO patient data and ZERO risk-score
   math — that all lives in patientData.js + prediction.js
   (Person 2's files). This keeps the two of you from editing
   the same file at the same time.
========================================================= */

function buildPoints(values, width, height, maxValue) {
  const stepX = width / (values.length - 1);
  return values
    .map((v, i) => {
      const x = i * stepX;
      const y = height - (v / maxValue) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function drawTraceChart(patient) {
  const svg = document.getElementById("traceChart");
  const W = 640, H = 220, PAD = 20;
  const innerW = W - PAD * 2, innerH = H - PAD * 2;
  const maxVal = 100;

  const expectedPts = buildPoints(patient.weeklyExpected, innerW, innerH, maxVal);
  const actualPts = buildPoints(patient.weeklyActual, innerW, innerH, maxVal);

  let worstIdx = 0, worstGap = -1;
  patient.weeklyExpected.forEach((v, i) => {
    const gap = v - patient.weeklyActual[i];
    if (gap > worstGap) { worstGap = gap; worstIdx = i; }
  });
  const stepX = innerW / (patient.weeklyExpected.length - 1);
  const markerX = worstIdx * stepX;
  const markerY = innerH - (patient.weeklyActual[worstIdx] / maxVal) * innerH;

  svg.innerHTML = `
    <g transform="translate(${PAD},${PAD})">
      ${[0,0.25,0.5,0.75,1].map(f => `<line x1="0" y1="${innerH*f}" x2="${innerW}" y2="${innerH*f}" stroke="#26303b" stroke-width="1" />`).join("")}
      <polyline points="${expectedPts}" fill="none" stroke="#4fb8a6" stroke-width="2.5" stroke-dasharray="6 5" />
      <polyline points="${actualPts}" fill="none" stroke="#e0a458" stroke-width="2.5" />
      ${patient.deviationDetected ? `
        <circle cx="${markerX}" cy="${markerY}" r="5" fill="#d9534f" />
        <circle cx="${markerX}" cy="${markerY}" r="9" fill="none" stroke="#d9534f" stroke-width="1.5" opacity="0.6" />
      ` : ""}
    </g>
  `;
}

function renderDashboard(patient) {
  document.getElementById("patientName").innerText = patient.name;
  document.getElementById("surgeryType").innerText = patient.surgeryType;
  document.getElementById("recoveryScore").innerText = patient.recoveryScore;

  const expectedList = document.getElementById("expectedList");
  const actualList = document.getElementById("actualList");
  expectedList.innerHTML = "";
  actualList.innerHTML = "";

  patient.expected.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    expectedList.appendChild(li);
  });

  patient.actual.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    actualList.appendChild(li);
  });

  document.getElementById("expectedTimeline").innerText = patient.expectedTimeline;
  document.getElementById("actualTimeline").innerText = patient.actualTimeline;

  const alarm = document.getElementById("deviationAlert");
  if (patient.deviationDetected) {
    document.getElementById("riskScore").innerText = patient.riskScore;
    alarm.classList.add("active");
  } else {
    alarm.classList.remove("active");
  }

  drawTraceChart(patient);
}

/* =========================================================
   INTEGRATION POINT
   getPatientResult() is expected to exist globally once
   Person 2's prediction.js is loaded (see patientData.js
   placeholder for the exact function/shape they need to
   provide). app.js never reads raw patient data itself —
   it only ever calls this one function.
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const patient = getPatientResult();
  renderDashboard(patient);
});
