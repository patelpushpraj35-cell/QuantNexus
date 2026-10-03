/**
 * QuantNexus – Quantum Simulation Lab Controller (Objective 3)
 * Manages UI interactions, circuit loading, multi-backend execution, and comparative visualization.
 */

// ── Simulation State ──
let simManager = null;
let currentCircuit = {
  name: "2-Qubit Bell State (|Φ⁺⟩)",
  qubits: 2,
  grid: [],
  operations: []
};
let currentShots = 1024;
let activeBackendId = 'qiskit_aer';
let lastSingleResult = null;
let lastCompareResult = null;
let isComparing = false;

// ── Standard Presets ──
const SIM_PRESETS = {
  bell: {
    name: "2-Qubit Bell State (|Φ⁺⟩)",
    qubits: 2,
    operations: [
      { type: '1q', gate: 'H', qubit: 0 },
      { type: 'cnot', control: 0, target: 1 }
    ],
    grid: [
      [{ gate: 'H' }, { gate: 'CNOT', control: 0, target: 1 }, { gate: 'M' }],
      [null, { gate: 'CNOT', control: 0, target: 1 }, { gate: 'M' }]
    ]
  },
  superposition: {
    name: "Hadamard Phase Interference (H-Z-H)",
    qubits: 1,
    operations: [
      { type: '1q', gate: 'H', qubit: 0 },
      { type: '1q', gate: 'Z', qubit: 0 },
      { type: '1q', gate: 'H', qubit: 0 }
    ],
    grid: [
      [{ gate: 'H' }, { gate: 'Z' }, { gate: 'H' }, { gate: 'M' }]
    ]
  },
  ghz: {
    name: "3-Qubit Greenberger-Horne-Zeilinger (|GHZ⟩)",
    qubits: 3,
    operations: [
      { type: '1q', gate: 'H', qubit: 0 },
      { type: 'cnot', control: 0, target: 1 },
      { type: 'cnot', control: 1, target: 2 }
    ],
    grid: [
      [{ gate: 'H' }, { gate: 'CNOT', control: 0, target: 1 }, null, { gate: 'M' }],
      [null, { gate: 'CNOT', control: 0, target: 1 }, { gate: 'CNOT', control: 1, target: 2 }, { gate: 'M' }],
      [null, null, { gate: 'CNOT', control: 1, target: 2 }, { gate: 'M' }]
    ]
  },
  swap: {
    name: "SWAP Gate State Transfer (|10⟩ → |01⟩)",
    qubits: 2,
    operations: [
      { type: '1q', gate: 'X', qubit: 0 },
      { type: 'swap', qubitA: 0, qubitB: 1 }
    ],
    grid: [
      [{ gate: 'X' }, { gate: 'SWAP', qubitA: 0, qubitB: 1 }, { gate: 'M' }],
      [null, { gate: 'SWAP', qubitA: 0, qubitB: 1 }, { gate: 'M' }]
    ]
  },
  teleportation: {
    name: "Quantum Teleportation State Prep",
    qubits: 3,
    operations: [
      { type: '1q', gate: 'H', qubit: 0 },
      { type: '1q', gate: 'H', qubit: 1 },
      { type: 'cnot', control: 1, target: 2 },
      { type: 'cnot', control: 0, target: 1 },
      { type: '1q', gate: 'H', qubit: 0 }
    ],
    grid: [
      [{ gate: 'H' }, null, null, { gate: 'CNOT', control: 0, target: 1 }, { gate: 'H' }, { gate: 'M' }],
      [null, { gate: 'H' }, { gate: 'CNOT', control: 1, target: 2 }, { gate: 'CNOT', control: 0, target: 1 }, null, { gate: 'M' }],
      [null, null, { gate: 'CNOT', control: 1, target: 2 }, null, null, { gate: 'M' }]
    ]
  }
};

// ── Initialization ──
document.addEventListener('DOMContentLoaded', () => {
  // Ensure authentication and apply role UI rules
  const user = requireAuth();
  if (!user) return;
  renderUserInfo(user);

  // Initialize simulation manager
  simManager = new SimulationManager();

  // Load circuit from localStorage or fallback to preset
  initCircuitSource();

  // Update backend status indicators
  updateBackendStatusIndicator();

  // Run initial simulation
  executeSelectedBackend();
});

function renderUserInfo(user) {
  const avatar = document.getElementById('sidebarAvatar');
  const name = document.getElementById('sidebarName');
  if (avatar && user.name) avatar.textContent = user.name[0].toUpperCase();
  if (name && user.name) name.textContent = user.name;
}

// ── Circuit Loading & Source Management ──
function initCircuitSource() {
  const sharedRaw = localStorage.getItem('quantnexus_shared_circuit');
  if (sharedRaw) {
    try {
      const parsed = JSON.parse(sharedRaw);
      if (parsed && parsed.qubits && parsed.grid) {
        currentCircuit = {
          name: parsed.name || `Circuit from Lab (${parsed.qubits} Qubits)`,
          qubits: parsed.qubits,
          grid: parsed.grid,
          operations: extractOpsFromGrid(parsed.grid, parsed.qubits),
          source: 'circuit_lab'
        };

        const badge = document.getElementById('circuitSourceBadge');
        if (badge) {
          badge.textContent = 'Transferred from Circuit Lab';
          badge.className = 'sim-badge badge-active-source';
        }
        const title = document.getElementById('currentCircuitTitle');
        if (title) title.textContent = `Active Circuit: ${currentCircuit.name}`;

        const sel = document.getElementById('simPresetSelect');
        if (sel) sel.value = 'current';

        renderCircuitPreview();
        return;
      }
    } catch (e) {
      console.warn('Could not parse quantnexus_shared_circuit:', e);
    }
  }

  // Fallback to Bell State
  loadPreset('bell');
}

function extractOpsFromGrid(grid, numQ) {
  const ops = [];
  const maxSteps = grid[0] ? grid[0].length : 8;
  const processed = new Set();

  for (let s = 0; s < maxSteps; s++) {
    for (let q = 0; q < numQ; q++) {
      const item = grid[q] ? grid[q][s] : null;
      if (!item || item.gate === 'M') continue;

      if (item.gate === 'CNOT') {
        const key = `cnot_${item.control}_${item.target}_${s}`;
        if (!processed.has(key)) {
          ops.push({ type: 'cnot', control: item.control, target: item.target });
          processed.add(key);
        }
      } else if (item.gate === 'SWAP') {
        const key = `swap_${item.qubitA}_${item.qubitB}_${s}`;
        if (!processed.has(key)) {
          ops.push({ type: 'swap', qubitA: item.qubitA, qubitB: item.qubitB });
          processed.add(key);
        }
      } else if (window.SIM_GATES && window.SIM_GATES[item.gate]) {
        ops.push({ type: '1q', gate: item.gate, qubit: q });
      }
    }
  }
  return ops;
}

function loadPreset(presetKey) {
  const preset = SIM_PRESETS[presetKey];
  if (!preset) return;

  currentCircuit = {
    name: preset.name,
    qubits: preset.qubits,
    grid: preset.grid,
    operations: preset.operations,
    source: 'preset'
  };

  const badge = document.getElementById('circuitSourceBadge');
  if (badge) {
    badge.textContent = `Preset: ${preset.name.split(' ')[0]}`;
    badge.className = 'sim-badge';
  }
  const title = document.getElementById('currentCircuitTitle');
  if (title) title.textContent = `Active Circuit: ${preset.name}`;

  renderCircuitPreview();
  if (isComparing) {
    executeCompareAll();
  } else {
    executeSelectedBackend();
  }
}

function onPresetChange(val) {
  if (val === 'current') {
    initCircuitSource();
  } else if (SIM_PRESETS[val]) {
    loadPreset(val);
  }
}

// ── Visual Circuit Strip Preview ──
function renderCircuitPreview() {
  const container = document.getElementById('circuitStripPreview');
  const qubitPill = document.getElementById('simQubitCountPill');
  const gatePill = document.getElementById('simGateCountPill');

  if (qubitPill) qubitPill.textContent = `${currentCircuit.qubits} Qubit${currentCircuit.qubits > 1 ? 's' : ''}`;
  if (gatePill) gatePill.textContent = `${currentCircuit.operations.length} Gate${currentCircuit.operations.length !== 1 ? 's' : ''}`;

  if (!container) return;
  container.innerHTML = '';

  const n = currentCircuit.qubits;
  const grid = currentCircuit.grid || [];
  const maxSteps = grid[0] ? grid[0].length : 6;

  const wrapper = document.createElement('div');
  wrapper.className = 'circuit-strip-wires';

  for (let q = 0; q < n; q++) {
    const wireRow = document.createElement('div');
    wireRow.className = 'strip-wire-row';

    const label = document.createElement('div');
    label.className = 'strip-qubit-label';
    label.innerHTML = `<strong>q<sub>${q}</sub></strong> |0⟩`;
    wireRow.appendChild(label);

    const wireLine = document.createElement('div');
    wireLine.className = 'strip-wire-line';

    for (let s = 0; s < maxSteps; s++) {
      const cell = document.createElement('div');
      cell.className = 'strip-wire-cell';

      const item = grid[q] ? grid[q][s] : null;
      if (item) {
        if (item.gate === 'CNOT') {
          if (item.control === q) {
            cell.innerHTML = `<span class="strip-gate strip-cnot-ctrl" title="CNOT Control on q${q}">●</span>`;
          } else {
            cell.innerHTML = `<span class="strip-gate strip-cnot-tgt" title="CNOT Target on q${q}">⊕</span>`;
          }
        } else if (item.gate === 'SWAP') {
          cell.innerHTML = `<span class="strip-gate strip-swap" title="SWAP on q${q}">✕</span>`;
        } else if (item.gate === 'M') {
          cell.innerHTML = `<span class="strip-gate strip-m" title="Measurement">M</span>`;
        } else {
          cell.innerHTML = `<span class="strip-gate strip-1q" title="${item.gate} Gate on q${q}">${item.gate}</span>`;
        }
      } else {
        cell.innerHTML = `<span class="strip-empty-dash">───</span>`;
      }
      wireLine.appendChild(cell);
    }
    wireRow.appendChild(wireLine);
    wrapper.appendChild(wireRow);
  }
  container.appendChild(wrapper);
}

// ── Backend Controls & Selection ──
function onBackendChange() {
  const sel = document.getElementById('backendSelect');
  if (sel) activeBackendId = sel.value;
  updateBackendStatusIndicator();
  if (!isComparing) {
    executeSelectedBackend();
  }
}

function updateBackendStatusIndicator() {
  const indicator = document.getElementById('backendStatusIndicator');
  if (!indicator) return;

  if (activeBackendId === 'qbraid') {
    const qb = simManager.adapters.qbraid;
    if (qb && qb.isConfigured()) {
      indicator.className = 'backend-status-indicator configured';
      indicator.textContent = '● Configured (Cloud)';
    } else {
      indicator.className = 'backend-status-indicator unconfigured';
      indicator.textContent = '● Not Configured';
    }
  } else {
    indicator.className = 'backend-status-indicator ready';
    indicator.textContent = '● Ready (In-Browser)';
  }
}

function onShotsPresetChange(val) {
  const customField = document.getElementById('customShotsInput');
  if (val === 'custom') {
    if (customField) {
      customField.classList.remove('hidden');
      customField.focus();
    }
  } else {
    if (customField) customField.classList.add('hidden');
    currentShots = parseInt(val) || 1024;
    if (!isComparing) {
      executeSelectedBackend();
    } else {
      executeCompareAll();
    }
  }
}

function getShotsValue() {
  const presetSel = document.getElementById('shotsPresetSelect');
  if (presetSel && presetSel.value === 'custom') {
    const customField = document.getElementById('customShotsInput');
    const val = parseInt(customField.value);
    if (!val || val < 1) return 1024;
    return Math.min(val, 50000);
  }
  return parseInt(presetSel ? presetSel.value : 1024) || 1024;
}

function switchBackend(bId) {
  const sel = document.getElementById('backendSelect');
  if (sel) {
    sel.value = bId;
    activeBackendId = bId;
    onBackendChange();
  }
}

// ── Execute Single Backend ──
async function executeSelectedBackend() {
  isComparing = false;
  document.getElementById('singleResultContainer').classList.remove('hidden');
  document.getElementById('compareResultContainer').classList.add('hidden');

  const sel = document.getElementById('backendSelect');
  activeBackendId = sel ? sel.value : 'qiskit_aer';
  currentShots = getShotsValue();

  showNotification('Running simulation on ' + activeBackendId + '...', 'running');

  try {
    const result = await simManager.runSimulation(activeBackendId, currentCircuit, currentShots);
    lastSingleResult = result;
    renderSingleResult(result);
    hideNotification();
  } catch (err) {
    console.error('Simulation execution error:', err);
    showNotification('Simulation error: ' + err.message, 'error');
  }
}

// ── Render Single Backend Result ──
function renderSingleResult(res) {
  // Update Overview Metric Cards
  document.getElementById('resBackendName').textContent = res.backend;
  document.getElementById('resBackendProvider').textContent = res.provider;
  document.getElementById('resShotsCount').textContent = (res.shots || currentShots).toLocaleString();
  document.getElementById('resTranspileDepth').textContent = `Depth: ${res.transpiledDepth || 0} cycles | ${res.gateCount || 0} gates`;

  // Status Badge
  const statusEl = document.getElementById('resStatusBadge');
  const errorCallout = document.getElementById('resErrorCallout');
  const visualGrid = document.getElementById('resVisualGrid');

  if (res.status === 'SUCCESS') {
    statusEl.innerHTML = `<span class="status-pill status-success">● SUCCESS</span>`;
    document.getElementById('resExecutionTime').textContent = `Runtime: ${res.executionTimeMs} ms`;
    errorCallout.classList.add('hidden');
    visualGrid.classList.remove('hidden');
  } else if (res.status === 'UNAVAILABLE') {
    statusEl.innerHTML = `<span class="status-pill status-warn">UNAVAILABLE</span>`;
    document.getElementById('resExecutionTime').textContent = 'Configuration required';
    document.getElementById('errorCalloutTitle').textContent = `${res.backend} Unavailable`;
    document.getElementById('errorCalloutMessage').textContent = res.message || 'Adapter credentials are not configured.';
    errorCallout.classList.remove('hidden');
    visualGrid.classList.add('hidden');
  } else {
    // ERROR
    statusEl.innerHTML = `<span class="status-pill status-error">ERROR</span>`;
    document.getElementById('resExecutionTime').textContent = 'Failed';
    document.getElementById('errorCalloutTitle').textContent = `Simulation Error`;
    document.getElementById('errorCalloutMessage').textContent = res.message || res.error || 'Execution failed';
    errorCallout.classList.remove('hidden');
    visualGrid.classList.add('hidden');
  }

  // Bit Ordering Display
  const isLittle = (res.bitOrdering || '').includes('Little-Endian');
  document.getElementById('resBitOrdering').textContent = isLittle ? 'Little-Endian' : 'Big-Endian';
  document.getElementById('resBitOrderingSub').textContent = isLittle
    ? '|qN-1 ... q0⟩ (IBM standard)'
    : '|q0 ... qN-1⟩ (Wire standard)';

  // If successfully simulated, render histogram and table
  if (res.status === 'SUCCESS') {
    renderHistogram(res);
    renderCountsTable(res);
    renderBackendDetails(res);
  }

  // Code snippet is always available for educational review!
  renderCodeViewer(res);
}

// ── Render SVG Measurement Histogram ──
function renderHistogram(res) {
  const container = document.getElementById('simHistogramChart');
  const shotsTag = document.getElementById('histShotsTag');
  if (shotsTag) shotsTag.textContent = `${res.shots.toLocaleString()} Shots`;
  if (!container) return;

  container.innerHTML = '';

  const counts = res.counts || {};
  const states = Object.keys(counts).sort();
  if (states.length === 0) {
    container.innerHTML = `<div class="empty-state-notice">No measurement outcomes recorded.</div>`;
    return;
  }

  const maxCount = Math.max(...Object.values(counts), 1);
  const chartHeight = 220;
  const barWidth = Math.min(64, Math.max(36, Math.floor(400 / states.length) - 16));

  const svgWrap = document.createElement('div');
  svgWrap.className = 'hist-bars-flex';

  states.forEach(state => {
    const count = counts[state] || 0;
    const prob = (count / res.shots);
    const pct = (prob * 100).toFixed(1);
    const barHeight = Math.max(4, Math.round((count / maxCount) * (chartHeight - 40)));

    const col = document.createElement('div');
    col.className = 'hist-col';

    col.innerHTML = `
      <div class="hist-pct-label">${pct}%</div>
      <div class="hist-bar-track">
        <div class="hist-bar-fill" style="height: ${barHeight}px;" title="|${state}⟩: ${count.toLocaleString()} shots (${pct}%)">
          <div class="bar-shine"></div>
        </div>
      </div>
      <div class="hist-basis-label">|${state}⟩</div>
      <div class="hist-count-sub">${count.toLocaleString()}</div>
    `;

    svgWrap.appendChild(col);
  });

  container.appendChild(svgWrap);
}

// ── Render Counts & Probabilities Table ──
function renderCountsTable(res) {
  const tbody = document.getElementById('countsTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const counts = res.counts || {};
  const states = Object.keys(counts).sort();
  const shots = res.shots || 1;

  states.forEach(state => {
    const c = counts[state] || 0;
    const prob = (c / shots);
    const pct = (prob * 100).toFixed(2);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="basis-chip">|${state}⟩</span></td>
      <td><strong>${c.toLocaleString()}</strong></td>
      <td><span class="prob-num">${pct}%</span> <small>(${prob.toFixed(4)})</small></td>
      <td>
        <div class="table-prob-bar-track">
          <div class="table-prob-bar-fill" style="width: ${Math.min(100, Math.max(2, pct))}%;"></div>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderBackendDetails(res) {
  const list = document.getElementById('backendDetailsList');
  if (!list) return;
  list.innerHTML = '';

  const details = res.details || {};
  const items = [
    { label: 'Version / Engine', val: details.frameworkVersion || 'Native Simulator' },
    { label: 'Bit Ordering', val: res.bitOrdering || 'Standard' },
    { label: 'Simulation Mode', val: details.simulatorMethod || 'Statevector Exact + Shots' },
    { label: 'Notes', val: details.notes || 'Executed with high fidelity.' }
  ];

  items.forEach(it => {
    const div = document.createElement('div');
    div.className = 'detail-item-row';
    div.innerHTML = `<span class="d-label">${it.label}:</span> <span class="d-val">${it.val}</span>`;
    list.appendChild(div);
  });
}

function renderCodeViewer(res) {
  const codeEl = document.getElementById('simCodeDisplay');
  const tag = document.getElementById('codeLanguageTag');
  if (!codeEl) return;

  codeEl.textContent = res.codeSnippet || '# Code snippet unavailable';
  if (tag) {
    if (res.backendId === 'qiskit_aer') tag.textContent = 'Qiskit Python (v1.x)';
    else if (res.backendId === 'pennylane') tag.textContent = 'PennyLane Python (QNode)';
    else if (res.backendId === 'cirq') tag.textContent = 'Google Cirq Python';
    else if (res.backendId === 'qbraid') tag.textContent = 'qBraid SDK Python';
  }
}

function copyBackendCode() {
  const codeEl = document.getElementById('simCodeDisplay');
  const btn = document.getElementById('btnCopyCode');
  if (!codeEl) return;

  navigator.clipboard.writeText(codeEl.textContent).then(() => {
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<span>Copied!</span>';
      setTimeout(() => { btn.innerHTML = orig; }, 1800);
    }
  });
}

// ── Compare All Backends Feature ──
async function executeCompareAll() {
  isComparing = true;
  document.getElementById('singleResultContainer').classList.add('hidden');
  document.getElementById('compareResultContainer').classList.remove('hidden');

  currentShots = getShotsValue();
  showNotification('Running comparative simulation across Qiskit Aer, PennyLane, and Cirq...', 'running');

  try {
    const comparison = await simManager.compareBackends(currentCircuit, currentShots);
    lastCompareResult = comparison;
    renderCompareResults(comparison);
    hideNotification();
  } catch (err) {
    console.error('Comparative simulation error:', err);
    showNotification('Comparison error: ' + err.message, 'error');
  }
}

function renderCompareResults(comp) {
  if (comp.status !== 'SUCCESS') {
    showNotification('Comparative run failed: ' + comp.error, 'error');
    return;
  }

  // Agreement Score
  const scoreEl = document.getElementById('compareAgreementScore');
  if (scoreEl) scoreEl.textContent = `${comp.agreementPercent}%`;

  // Render Grouped Histogram
  renderGroupedHistogram(comp);

  // Render Multi-Backend Breakdown Table
  renderCompareTable(comp);

  // Default code comparison tab
  switchCompareCodeTab('qiskit_aer');
}

function renderGroupedHistogram(comp) {
  const container = document.getElementById('compareHistogramChart');
  if (!container) return;
  container.innerHTML = '';

  const states = comp.states;
  const backends = ['qiskit_aer', 'pennylane', 'cirq'];
  const colors = {
    qiskit_aer: '#8b5cf6',
    pennylane: '#06b6d4',
    cirq: '#f59e0b'
  };

  const chartHeight = 220;

  // Find max probability among all
  let maxP = 0.05;
  states.forEach(s => {
    backends.forEach(b => {
      const p = comp.standardizedProbs[b][s] || 0;
      if (p > maxP) maxP = p;
    });
  });

  const chartFlex = document.createElement('div');
  chartFlex.className = 'compare-bars-flex';

  states.forEach(state => {
    const groupCol = document.createElement('div');
    groupCol.className = 'compare-state-group';

    const barsWrap = document.createElement('div');
    barsWrap.className = 'compare-bars-cluster';

    backends.forEach(bId => {
      const p = comp.standardizedProbs[bId][state] || 0;
      const pct = (p * 100).toFixed(1);
      const bHeight = Math.max(4, Math.round((p / maxP) * (chartHeight - 40)));
      const count = comp.results[bId].counts[state] || (comp.results[bId].shots * p);

      const bar = document.createElement('div');
      bar.className = 'compare-bar-item';
      bar.style.height = `${bHeight}px`;
      bar.style.backgroundColor = colors[bId];
      bar.title = `${comp.results[bId].backend} | State |${state}⟩: ${pct}% (~${Math.round(count)} shots)`;

      barsWrap.appendChild(bar);
    });

    groupCol.appendChild(barsWrap);

    const lbl = document.createElement('div');
    lbl.className = 'compare-basis-label';
    lbl.textContent = `|${state}⟩`;
    groupCol.appendChild(lbl);

    chartFlex.appendChild(groupCol);
  });

  container.appendChild(chartFlex);
}

function renderCompareTable(comp) {
  const tbody = document.getElementById('compareTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const states = comp.states;
  const qRes = comp.results.qiskit_aer;
  const pRes = comp.results.pennylane;
  const cRes = comp.results.cirq;

  states.forEach(state => {
    // Qiskit native little-endian representation
    const qKey = state.split('').reverse().join('');
    const qCount = qRes.counts[qKey] || 0;
    const qPct = ((qCount / qRes.shots) * 100).toFixed(1);

    // PennyLane big-endian
    const pCount = pRes.counts[state] || 0;
    const pPct = ((pCount / pRes.shots) * 100).toFixed(1);

    // Cirq big-endian
    const cCount = cRes.counts[state] || 0;
    const cPct = ((cCount / cRes.shots) * 100).toFixed(1);

    // Numerical variance between backends
    const pVals = [parseFloat(qPct), parseFloat(pPct), parseFloat(cPct)];
    const variance = (Math.max(...pVals) - Math.min(...pVals)).toFixed(1);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="basis-chip chip-physical">|${state}⟩</span></td>
      <td>
        <div class="cell-val"><strong>${qPct}%</strong> (${qCount} shots)</div>
        <small class="cell-sub">Key: |${qKey}⟩</small>
      </td>
      <td>
        <div class="cell-val"><strong>${pPct}%</strong> (${pCount} shots)</div>
        <small class="cell-sub">Key: |${state}⟩</small>
      </td>
      <td>
        <div class="cell-val"><strong>${cPct}%</strong> (${cCount} shots)</div>
        <small class="cell-sub">Key: |${state}⟩</small>
      </td>
      <td>
        <span class="theory-badge">${(parseFloat(qPct) > 10 ? 'Active Superposition' : '0.00%')}</span>
      </td>
      <td>
        <span class="variance-pill ${parseFloat(variance) < 2 ? 'var-low' : 'var-med'}">±${variance}%</span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function switchCompareCodeTab(bId) {
  document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
  const clicked = event ? event.target : null;
  if (clicked && clicked.classList) clicked.classList.add('active');

  const codeEl = document.getElementById('compareCodeDisplay');
  if (!codeEl) return;

  const adapter = simManager.adapters[bId];
  if (adapter) {
    codeEl.textContent = adapter.generateCode(currentCircuit, currentShots);
  }
}

function returnToSingleBackend() {
  isComparing = false;
  document.getElementById('compareResultContainer').classList.add('hidden');
  document.getElementById('singleResultContainer').classList.remove('hidden');
  executeSelectedBackend();
}

// ── qBraid Cloud Modal & Credentials ──
function openQbraidModal() {
  const modal = document.getElementById('qbraidModal');
  const input = document.getElementById('qbraidApiKeyInput');
  const devSelect = document.getElementById('qbraidDeviceSelect');
  const statusBox = document.getElementById('qbraidStatusBox');
  const statusText = document.getElementById('qbraidStatusText');

  const savedKey = localStorage.getItem('quantnexus_qbraid_api_key') || '';
  const savedDev = localStorage.getItem('quantnexus_qbraid_device') || 'qbraid_qir_simulator';

  if (input) input.value = savedKey;
  if (devSelect) devSelect.value = savedDev;

  if (statusBox && statusText) {
    if (savedKey.trim().length >= 10) {
      statusBox.className = 'qbraid-status-box configured';
      statusText.textContent = `Status: Configured (${savedKey.slice(0, 4)}••••${savedKey.slice(-4)}) – Remote Gateway Ready`;
    } else {
      statusBox.className = 'qbraid-status-box unconfigured';
      statusText.textContent = 'Status: Unconfigured (Enter key to enable cloud execution)';
    }
  }

  if (modal) modal.classList.remove('hidden');
}

function closeQbraidModal() {
  const modal = document.getElementById('qbraidModal');
  if (modal) modal.classList.add('hidden');
}

function saveQbraidCredentials() {
  const input = document.getElementById('qbraidApiKeyInput');
  const devSelect = document.getElementById('qbraidDeviceSelect');
  const val = input ? input.value.trim() : '';
  const dev = devSelect ? devSelect.value : 'qbraid_qir_simulator';

  if (val) {
    localStorage.setItem('quantnexus_qbraid_api_key', val);
    localStorage.setItem('quantnexus_qbraid_device', dev);
    alert('qBraid API credentials saved successfully in browser storage.');
  } else {
    localStorage.removeItem('quantnexus_qbraid_api_key');
  }

  closeQbraidModal();
  updateBackendStatusIndicator();
  if (activeBackendId === 'qbraid') {
    executeSelectedBackend();
  }
}

function clearQbraidCredentials() {
  localStorage.removeItem('quantnexus_qbraid_api_key');
  const input = document.getElementById('qbraidApiKeyInput');
  if (input) input.value = '';
  alert('qBraid credentials cleared.');
  closeQbraidModal();
  updateBackendStatusIndicator();
  if (activeBackendId === 'qbraid') {
    executeSelectedBackend();
  }
}

function toggleApiKeyVisibility() {
  const input = document.getElementById('qbraidApiKeyInput');
  const btn = document.getElementById('btnEye');
  if (!input) return;

  if (input.type === 'password') {
    input.type = 'text';
    if (btn) btn.textContent = 'Hide';
  } else {
    input.type = 'password';
    if (btn) btn.textContent = 'Show';
  }
}

// ── Notifications Helper ──
function showNotification(text, type = 'info') {
  const bar = document.getElementById('simNotificationBar');
  const txt = document.getElementById('simNotificationText');
  const icon = document.getElementById('simNotificationIcon');
  if (!bar) return;

  bar.className = `sim-notification-bar ${type}`;
  if (txt) txt.textContent = text;
  if (icon) {
    if (type === 'running') icon.textContent = '●';
    else if (type === 'error') icon.textContent = '!';
    else icon.textContent = '●';
  }
  bar.classList.remove('hidden');
}

function hideNotification() {
  const bar = document.getElementById('simNotificationBar');
  if (bar) bar.classList.add('hidden');
}

// Expose handlers globally
window.onPresetChange = onPresetChange;
window.onBackendChange = onBackendChange;
window.onShotsPresetChange = onShotsPresetChange;
window.executeSelectedBackend = executeSelectedBackend;
window.executeCompareAll = executeCompareAll;
window.switchBackend = switchBackend;
window.copyBackendCode = copyBackendCode;
window.switchCompareCodeTab = switchCompareCodeTab;
window.returnToSingleBackend = returnToSingleBackend;
window.openQbraidModal = openQbraidModal;
window.closeQbraidModal = closeQbraidModal;
window.saveQbraidCredentials = saveQbraidCredentials;
window.clearQbraidCredentials = clearQbraidCredentials;
window.toggleApiKeyVisibility = toggleApiKeyVisibility;
