/**
 * QuantNexus – Quantum Circuit Lab (Objective 2)
 * Graphical + Code-based Quantum Circuit Design & Simulation Engine
 */

// ── Quantum Complex Number Class ──
class Complex {
  constructor(re = 0, im = 0) {
    this.re = re;
    this.im = im;
  }
  add(c) { return new Complex(this.re + c.re, this.im + c.im); }
  sub(c) { return new Complex(this.re - c.re, this.im - c.im); }
  mul(c) {
    return new Complex(
      this.re * c.re - this.im * c.im,
      this.re * c.im + this.im * c.re
    );
  }
  magSq() { return this.re * this.re + this.im * this.im; }
  mag() { return Math.sqrt(this.magSq()); }
  phase() {
    let p = Math.atan2(this.im, this.re);
    if (p < 0) p += 2 * Math.PI;
    return p;
  }
  toString(precision = 3) {
    const r = this.re.toFixed(precision);
    const i = Math.abs(this.im).toFixed(precision);
    if (Math.abs(this.im) < 1e-4) return `${r}`;
    if (Math.abs(this.re) < 1e-4) return `${this.im < 0 ? '-' : ''}${i}i`;
    return `${r} ${this.im >= 0 ? '+' : '-'} ${i}i`;
  }
}

// ── Standard Quantum Gate Matrices ──
const SQ2 = 1 / Math.SQRT2;
const GATES = {
  H: [
    [new Complex(SQ2, 0), new Complex(SQ2, 0)],
    [new Complex(SQ2, 0), new Complex(-SQ2, 0)]
  ],
  X: [
    [new Complex(0, 0), new Complex(1, 0)],
    [new Complex(1, 0), new Complex(0, 0)]
  ],
  Y: [
    [new Complex(0, 0), new Complex(0, -1)],
    [new Complex(0, 1), new Complex(0, 0)]
  ],
  Z: [
    [new Complex(1, 0), new Complex(0, 0)],
    [new Complex(0, 0), new Complex(-1, 0)]
  ],
  S: [
    [new Complex(1, 0), new Complex(0, 0)],
    [new Complex(0, 0), new Complex(0, 1)]
  ],
  T: [
    [new Complex(1, 0), new Complex(0, 0)],
    [new Complex(0, 0), new Complex(SQ2, SQ2)]
  ]
};

// ── Simulator Engine ──
class QuantumSimulator {
  constructor(numQubits = 2) {
    this.numQubits = numQubits;
    this.dim = 1 << numQubits;
    this.state = [];
    this.reset();
  }

  reset() {
    this.state = new Array(this.dim).fill(null).map((_, i) => new Complex(i === 0 ? 1 : 0, 0));
  }

  apply1QGate(gateMatrix, targetQubit) {
    const n = this.numQubits;
    const newState = new Array(this.dim).fill(null).map(() => new Complex(0, 0));
    const targetMask = 1 << (n - 1 - targetQubit);

    for (let i = 0; i < this.dim; i++) {
      if ((i & targetMask) === 0) {
        const i0 = i;
        const i1 = i | targetMask;
        const v0 = this.state[i0];
        const v1 = this.state[i1];

        const m00 = gateMatrix[0][0];
        const m01 = gateMatrix[0][1];
        const m10 = gateMatrix[1][0];
        const m11 = gateMatrix[1][1];

        newState[i0] = m00.mul(v0).add(m01.mul(v1));
        newState[i1] = m10.mul(v0).add(m11.mul(v1));
      }
    }
    this.state = newState;
  }

  applyCNOT(controlQubit, targetQubit) {
    const n = this.numQubits;
    const ctrlMask = 1 << (n - 1 - controlQubit);
    const targetMask = 1 << (n - 1 - targetQubit);
    const newState = [...this.state];

    for (let i = 0; i < this.dim; i++) {
      if ((i & ctrlMask) !== 0 && (i & targetMask) === 0) {
        const i0 = i;
        const i1 = i | targetMask;
        const tmp = newState[i0];
        newState[i0] = newState[i1];
        newState[i1] = tmp;
      }
    }
    this.state = newState;
  }

  applyCZ(controlQubit, targetQubit) {
    const n = this.numQubits;
    const ctrlMask = 1 << (n - 1 - controlQubit);
    const targetMask = 1 << (n - 1 - targetQubit);

    for (let i = 0; i < this.dim; i++) {
      if ((i & ctrlMask) !== 0 && (i & targetMask) !== 0) {
        this.state[i] = new Complex(-this.state[i].re, -this.state[i].im);
      }
    }
  }

  applySWAP(qA, qB) {
    const n = this.numQubits;
    const maskA = 1 << (n - 1 - qA);
    const maskB = 1 << (n - 1 - qB);
    const newState = [...this.state];

    for (let i = 0; i < this.dim; i++) {
      const bitA = (i & maskA) !== 0 ? 1 : 0;
      const bitB = (i & maskB) !== 0 ? 1 : 0;
      if (bitA !== bitB && bitA === 1) {
        const swapped = (i ^ maskA) ^ maskB;
        const tmp = newState[i];
        newState[i] = newState[swapped];
        newState[swapped] = tmp;
      }
    }
    this.state = newState;
  }

  getProbabilities() {
    return this.state.map(c => Math.max(0, c.magSq()));
  }

  sampleShots(shots = 1024) {
    const probs = this.getProbabilities();
    const counts = {};
    const n = this.numQubits;

    for (let i = 0; i < this.dim; i++) {
      const bin = i.toString(2).padStart(n, '0');
      counts[bin] = 0;
    }

    // Cumulative distribution
    const cum = [];
    let sum = 0;
    for (let p of probs) {
      sum += p;
      cum.push(sum);
    }

    for (let s = 0; s < shots; s++) {
      const r = Math.random() * sum;
      let idx = cum.findIndex(c => r <= c);
      if (idx === -1) idx = this.dim - 1;
      const bin = idx.toString(2).padStart(n, '0');
      counts[bin]++;
    }
    return counts;
  }

  getBlochCoordinates(targetQubit = 0) {
    // Partial trace over other qubits to get single-qubit reduced density matrix
    const n = this.numQubits;
    const tMask = 1 << (n - 1 - targetQubit);
    let rho00 = 0, rho11 = 0;
    let rho01 = new Complex(0, 0);

    for (let i = 0; i < this.dim; i++) {
      if ((i & tMask) === 0) {
        const i0 = i;
        const i1 = i | tMask;
        const c0 = this.state[i0];
        const c1 = this.state[i1];

        rho00 += c0.magSq();
        rho11 += c1.magSq();
        // c0 * c1^*
        rho01 = rho01.add(new Complex(
          c0.re * c1.re + c0.im * c1.im,
          c0.im * c1.re - c0.re * c1.im
        ));
      }
    }

    const x = 2 * rho01.re;
    const y = 2 * rho01.im;
    const z = rho00 - rho11;

    // Spherical angles
    const r = Math.sqrt(x * x + y * y + z * z);
    const theta = Math.acos(Math.max(-1, Math.min(1, z / (r || 1))));
    let phi = Math.atan2(y, x);
    if (phi < 0) phi += 2 * Math.PI;

    return { x, y, z, r, theta, phi };
  }
}

// ── Circuit Model & State ──
const MAX_STEPS = 8;
let numQubits = 2;
// circuitGrid[qubit][step] = { gate, control, target } | null
let circuitGrid = [];
let selectedPaletteGate = null;
let currentShots = 1024;
let activeBlochQubit = 0;
let isCodeSyncing = false;

// ── Built-in Presets ──
const PRESETS = {
  bell: {
    name: "Bell State (|Φ⁺⟩)",
    qubits: 2,
    code: `# Bell State Generator (|00> + |11>) / sqrt(2)\nfrom qiskit import QuantumCircuit\n\nqc = QuantumCircuit(2, 2)\nqc.h(0)\nqc.cx(0, 1)\nqc.measure([0, 1], [0, 1])`,
    gates: [
      { step: 0, qubit: 0, gate: 'H' },
      { step: 1, qubit: 0, gate: 'CNOT', control: 0, target: 1 },
      { step: 2, qubit: 0, gate: 'M' },
      { step: 2, qubit: 1, gate: 'M' }
    ]
  },
  superposition: {
    name: "Superposition & Interference",
    qubits: 1,
    code: `# Hadamard Superposition & Relative Phase Interference\nfrom qiskit import QuantumCircuit\n\nqc = QuantumCircuit(1, 1)\nqc.h(0)\nqc.z(0)\nqc.h(0)\nqc.measure(0, 0)`,
    gates: [
      { step: 0, qubit: 0, gate: 'H' },
      { step: 1, qubit: 0, gate: 'Z' },
      { step: 2, qubit: 0, gate: 'H' },
      { step: 3, qubit: 0, gate: 'M' }
    ]
  },
  ghz: {
    name: "3-Qubit GHZ State",
    qubits: 3,
    code: `# 3-Qubit GHZ State (|000> + |111>) / sqrt(2)\nfrom qiskit import QuantumCircuit\n\nqc = QuantumCircuit(3, 3)\nqc.h(0)\nqc.cx(0, 1)\nqc.cx(1, 2)\nqc.measure([0, 1, 2], [0, 1, 2])`,
    gates: [
      { step: 0, qubit: 0, gate: 'H' },
      { step: 1, qubit: 0, gate: 'CNOT', control: 0, target: 1 },
      { step: 2, qubit: 1, gate: 'CNOT', control: 1, target: 2 },
      { step: 3, qubit: 0, gate: 'M' },
      { step: 3, qubit: 1, gate: 'M' },
      { step: 3, qubit: 2, gate: 'M' }
    ]
  },
  swap: {
    name: "SWAP Gate Test",
    qubits: 2,
    code: `# Initialize q0=|1> and q1=|0>, then swap them\nfrom qiskit import QuantumCircuit\n\nqc = QuantumCircuit(2, 2)\nqc.x(0)\nqc.swap(0, 1)\nqc.measure([0, 1], [0, 1])`,
    gates: [
      { step: 0, qubit: 0, gate: 'X' },
      { step: 1, qubit: 0, gate: 'SWAP', target: 1 },
      { step: 2, qubit: 0, gate: 'M' },
      { step: 2, qubit: 1, gate: 'M' }
    ]
  },
  teleportation_core: {
    name: "Teleportation Entangler",
    qubits: 3,
    code: `# Quantum Teleportation Core Entanglement Channel\nfrom qiskit import QuantumCircuit\n\nqc = QuantumCircuit(3, 3)\nqc.h(0)        # State to teleport\nqc.h(1)        # Bell pair between Alice & Bob\nqc.cx(1, 2)\nqc.cx(0, 1)    # Alice Bell measurement\nqc.h(0)\nqc.measure([0, 1], [0, 1])`,
    gates: [
      { step: 0, qubit: 0, gate: 'H' },
      { step: 0, qubit: 1, gate: 'H' },
      { step: 1, qubit: 1, gate: 'CNOT', control: 1, target: 2 },
      { step: 2, qubit: 0, gate: 'CNOT', control: 0, target: 1 },
      { step: 3, qubit: 0, gate: 'H' },
      { step: 4, qubit: 0, gate: 'M' },
      { step: 4, qubit: 1, gate: 'M' }
    ]
  },
  blank: {
    name: "Blank Canvas",
    qubits: 2,
    code: `# Start building your quantum circuit!\nfrom qiskit import QuantumCircuit\n\nqc = QuantumCircuit(2, 2)`,
    gates: []
  }
};

// ── Initialization ──
document.addEventListener('DOMContentLoaded', () => {
  const user = requireAuth();
  if (!user) return;

  const urlParams = new URLSearchParams(window.location.search);
  const chapterParam = urlParams.get('chapter');
  const presetParam = urlParams.get('preset');

  let initialPreset = 'bell';
  if (presetParam && PRESETS[presetParam]) {
    initialPreset = presetParam;
  } else if (chapterParam) {
    const ch = parseInt(chapterParam);
    if (ch === 1 || ch === 2 || ch === 3) initialPreset = 'superposition';
    else if (ch === 5 || ch === 20) initialPreset = 'bell';
    else if (ch === 6) initialPreset = 'teleportation_core';
    else if (ch === 10 || ch === 16) initialPreset = 'ghz';
    else if (ch === 14) initialPreset = 'swap';
    else initialPreset = 'bell';
  }

  initGrid(PRESETS[initialPreset].qubits);
  setupEventListeners();
  const presetSel = document.getElementById('presetSelect');
  if (presetSel) presetSel.value = initialPreset;
  loadPreset(initialPreset);
  runCircuitSimulation();
  renderSavedCircuitsList();
});

function initGrid(qubits = 2) {
  numQubits = qubits;
  circuitGrid = [];
  for (let q = 0; q < numQubits; q++) {
    circuitGrid.push(new Array(MAX_STEPS).fill(null));
  }
  updateQubitControlsUI();
  renderCircuitGrid();
}

function updateQubitControlsUI() {
  document.querySelectorAll('.qubit-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.qubits) === numQubits);
  });
  // Update Bloch sphere selector options
  const sel = document.getElementById('blochQubitSelect');
  if (sel) {
    sel.innerHTML = '';
    for (let q = 0; q < numQubits; q++) {
      const opt = document.createElement('option');
      opt.value = q;
      opt.textContent = `Qubit q[${q}]`;
      sel.appendChild(opt);
    }
    sel.value = Math.min(activeBlochQubit, numQubits - 1);
    activeBlochQubit = parseInt(sel.value);
  }
}

// ── Graphical Builder Rendering ──
function renderCircuitGrid() {
  const container = document.getElementById('circuitGrid');
  if (!container) return;
  container.innerHTML = '';

  for (let q = 0; q < numQubits; q++) {
    const row = document.createElement('div');
    row.className = 'wire-row';
    row.dataset.qubit = q;

    // Wire label
    const label = document.createElement('div');
    label.className = 'wire-label';
    label.innerHTML = `<span class="q-name">q[${q}]</span><span class="q-init">|0⟩</span>`;
    row.appendChild(label);

    // Slots container
    const slots = document.createElement('div');
    slots.className = 'wire-slots';

    for (let s = 0; s < MAX_STEPS; s++) {
      const slot = document.createElement('div');
      slot.className = 'circuit-slot';
      slot.dataset.qubit = q;
      slot.dataset.step = s;

      // Drag and drop handlers
      slot.addEventListener('dragover', handleDragOver);
      slot.addEventListener('dragleave', handleDragLeave);
      slot.addEventListener('drop', handleDrop);
      slot.addEventListener('click', handleSlotClick);

      const item = circuitGrid[q][s];
      if (item) {
        slot.classList.add('has-gate');
        const chip = document.createElement('div');
        chip.className = `gate-chip gate-${item.gate.toLowerCase()}`;
        chip.draggable = true;
        chip.dataset.qubit = q;
        chip.dataset.step = s;
        chip.addEventListener('dragstart', handleGateDragStart);

        if (item.gate === 'CNOT') {
          if (item.control === q) {
            chip.classList.add('cnot-control');
            chip.innerHTML = `<span class="dot">•</span><button class="gate-remove" onclick="removeGate(${q}, ${s}, event)">×</button>`;
          } else {
            chip.classList.add('cnot-target');
            chip.innerHTML = `<span class="oplus">⊕</span><button class="gate-remove" onclick="removeGate(${q}, ${s}, event)">×</button>`;
          }
        } else if (item.gate === 'SWAP') {
          chip.classList.add('swap-node');
          chip.innerHTML = `<span class="cross">✕</span><button class="gate-remove" onclick="removeGate(${q}, ${s}, event)">×</button>`;
        } else {
          chip.innerHTML = `<span>${item.gate}</span><button class="gate-remove" onclick="removeGate(${q}, ${s}, event)">×</button>`;
        }
        slot.appendChild(chip);
      }
      slots.appendChild(slot);
    }
    row.appendChild(slots);
    container.appendChild(row);
  }

  // Draw SVG multi-qubit connector wires
  drawMultiQubitWires();
}

function drawMultiQubitWires() {
  const svg = document.getElementById('circuitWireSvg');
  if (!svg) return;
  svg.innerHTML = '';

  for (let s = 0; s < MAX_STEPS; s++) {
    // Check for CNOT
    for (let q = 0; q < numQubits; q++) {
      const g = circuitGrid[q][s];
      if (g && g.gate === 'CNOT' && g.control === q) {
        const slotCtrl = document.querySelector(`.circuit-slot[data-qubit="${g.control}"][data-step="${s}"]`);
        const slotTgt = document.querySelector(`.circuit-slot[data-qubit="${g.target}"][data-step="${s}"]`);
        if (slotCtrl && slotTgt) {
          drawLineBetweenSlots(svg, slotCtrl, slotTgt, '#a78bfa');
        }
      } else if (g && g.gate === 'SWAP' && g.qubitA === q && g.qubitB > q) {
        const slotA = document.querySelector(`.circuit-slot[data-qubit="${g.qubitA}"][data-step="${s}"]`);
        const slotB = document.querySelector(`.circuit-slot[data-qubit="${g.qubitB}"][data-step="${s}"]`);
        if (slotA && slotB) {
          drawLineBetweenSlots(svg, slotA, slotB, '#06b6d4');
        }
      }
    }
  }
}

function drawLineBetweenSlots(svg, el1, el2, color = '#a78bfa') {
  const rGrid = document.getElementById('circuitGrid').getBoundingClientRect();
  const r1 = el1.getBoundingClientRect();
  const r2 = el2.getBoundingClientRect();

  const x = r1.left + r1.width / 2 - rGrid.left;
  const y1 = r1.top + r1.height / 2 - rGrid.top;
  const y2 = r2.top + r2.height / 2 - rGrid.top;

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x);
  line.setAttribute('y2', y2);
  line.setAttribute('stroke', color);
  line.setAttribute('stroke-width', '3');
  line.setAttribute('stroke-linecap', 'round');
  svg.appendChild(line);
}

// ── Drag & Drop & Click Handling ──
function handleDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drop-target');
}
function handleDragLeave(e) {
  e.currentTarget.classList.remove('drop-target');
}
function handleDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drop-target');

  const q = parseInt(e.currentTarget.dataset.qubit);
  const s = parseInt(e.currentTarget.dataset.step);

  const moveData = e.dataTransfer.getData('text/move-gate');
  if (moveData) {
    const { fromQ, fromS } = JSON.parse(moveData);
    moveGate(fromQ, fromS, q, s);
    return;
  }

  const gate = e.dataTransfer.getData('text/gate-type');
  if (gate) {
    placeGate(gate, q, s);
  }
}

function handleGateDragStart(e) {
  e.stopPropagation();
  const q = parseInt(e.target.dataset.qubit);
  const s = parseInt(e.target.dataset.step);
  e.dataTransfer.setData('text/move-gate', JSON.stringify({ fromQ: q, fromS: s }));
}

function handleSlotClick(e) {
  if (e.target.closest('.gate-remove')) return;
  const q = parseInt(e.currentTarget.dataset.qubit);
  const s = parseInt(e.currentTarget.dataset.step);

  if (selectedPaletteGate) {
    placeGate(selectedPaletteGate, q, s);
  } else if (circuitGrid[q][s]) {
    removeGate(q, s);
  }
}

function selectPaletteGate(gate) {
  selectedPaletteGate = (selectedPaletteGate === gate) ? null : gate;
  document.querySelectorAll('.palette-gate').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.gate === selectedPaletteGate);
  });
}

function placeGate(gate, qubit, step) {
  if (gate === 'CNOT') {
    if (numQubits < 2) {
      showError('CNOT requires at least 2 qubits. Switch to 2 or 3 qubits.');
      return;
    }
    const target = qubit === 0 ? 1 : 0;
    // Clear both slots at this step
    circuitGrid[qubit][step] = { gate: 'CNOT', control: qubit, target };
    circuitGrid[target][step] = { gate: 'CNOT', control: qubit, target };
  } else if (gate === 'SWAP') {
    if (numQubits < 2) {
      showError('SWAP requires at least 2 qubits.');
      return;
    }
    const other = qubit === 0 ? 1 : 0;
    circuitGrid[qubit][step] = { gate: 'SWAP', qubitA: Math.min(qubit, other), qubitB: Math.max(qubit, other) };
    circuitGrid[other][step] = { gate: 'SWAP', qubitA: Math.min(qubit, other), qubitB: Math.max(qubit, other) };
  } else {
    circuitGrid[qubit][step] = { gate };
  }

  renderCircuitGrid();
  syncCircuitToCode();
  runCircuitSimulation();
}

function moveGate(fromQ, fromS, toQ, toS) {
  const item = circuitGrid[fromQ][fromS];
  if (!item) return;
  removeGate(fromQ, fromS, null, false);
  placeGate(item.gate, toQ, toS);
}

function removeGate(qubit, step, e, autoSync = true) {
  if (e) e.stopPropagation();
  const item = circuitGrid[qubit][step];
  if (!item) return;

  if (item.gate === 'CNOT') {
    circuitGrid[item.control][step] = null;
    circuitGrid[item.target][step] = null;
  } else if (item.gate === 'SWAP') {
    circuitGrid[item.qubitA][step] = null;
    circuitGrid[item.qubitB][step] = null;
  } else {
    circuitGrid[qubit][step] = null;
  }

  if (autoSync) {
    renderCircuitGrid();
    syncCircuitToCode();
    runCircuitSimulation();
  }
}

function clearCircuit() {
  for (let q = 0; q < numQubits; q++) {
    circuitGrid[q] = new Array(MAX_STEPS).fill(null);
  }
  renderCircuitGrid();
  syncCircuitToCode();
  runCircuitSimulation();
}

function resetCircuit() {
  loadPreset('bell');
}

// ── Bi-Directional Code Syncing ──
function syncCircuitToCode() {
  if (isCodeSyncing) return;
  const lines = [
    `# Quantum Circuit generated by QuantNexus Lab`,
    `from qiskit import QuantumCircuit`,
    ``,
    `qc = QuantumCircuit(${numQubits}, ${numQubits})`
  ];

  const measureList = [];

  for (let s = 0; s < MAX_STEPS; s++) {
    const processedSteps = new Set();
    for (let q = 0; q < numQubits; q++) {
      const item = circuitGrid[q][s];
      if (!item) continue;

      if (item.gate === 'CNOT') {
        if (!processedSteps.has(`cnot_${item.control}_${item.target}`)) {
          lines.push(`qc.cx(${item.control}, ${item.target})`);
          processedSteps.add(`cnot_${item.control}_${item.target}`);
        }
      } else if (item.gate === 'SWAP') {
        if (!processedSteps.has(`swap_${item.qubitA}_${item.qubitB}`)) {
          lines.push(`qc.swap(${item.qubitA}, ${item.qubitB})`);
          processedSteps.add(`swap_${item.qubitA}_${item.qubitB}`);
        }
      } else if (item.gate === 'M') {
        measureList.push(q);
      } else {
        lines.push(`qc.${item.gate.toLowerCase()}(${q})`);
      }
    }
  }

  if (measureList.length) {
    const uniqueM = [...new Set(measureList)].sort((a,b) => a-b);
    if (uniqueM.length === numQubits) {
      lines.push(`qc.measure_all()`);
    } else {
      uniqueM.forEach(q => lines.push(`qc.measure(${q}, ${q})`));
    }
  }

  const codeArea = document.getElementById('codeEditor');
  if (codeArea) {
    codeArea.value = lines.join('\n');
    updateLineNumbers();
    clearCodeError();
    updateSyncBadge(true);
  }
}

function syncCodeToCircuit() {
  const codeArea = document.getElementById('codeEditor');
  if (!codeArea) return;
  const text = codeArea.value;

  try {
    isCodeSyncing = true;
    const parsed = parseQuantumCode(text);

    if (parsed.qubits !== numQubits) {
      initGrid(parsed.qubits);
    } else {
      for (let q = 0; q < numQubits; q++) {
        circuitGrid[q].fill(null);
      }
    }

    // Place parsed gates
    let stepCursor = 0;
    parsed.ops.forEach(op => {
      if (stepCursor >= MAX_STEPS) return;

      if (op.type === '1q') {
        circuitGrid[op.qubit][stepCursor] = { gate: op.gate };
        stepCursor++;
      } else if (op.type === 'cnot') {
        circuitGrid[op.control][stepCursor] = { gate: 'CNOT', control: op.control, target: op.target };
        circuitGrid[op.target][stepCursor] = { gate: 'CNOT', control: op.control, target: op.target };
        stepCursor++;
      } else if (op.type === 'swap') {
        circuitGrid[op.qubitA][stepCursor] = { gate: 'SWAP', qubitA: op.qubitA, qubitB: op.qubitB };
        circuitGrid[op.qubitB][stepCursor] = { gate: 'SWAP', qubitA: op.qubitA, qubitB: op.qubitB };
        stepCursor++;
      } else if (op.type === 'measure') {
        circuitGrid[op.qubit][stepCursor] = { gate: 'M' };
        stepCursor++;
      }
    });

    renderCircuitGrid();
    clearCodeError();
    updateSyncBadge(true);
    runCircuitSimulation();
  } catch (err) {
    showCodeError(err.message, err.lineNumber);
    updateSyncBadge(false);
  } finally {
    isCodeSyncing = false;
  }
}

// ── Code Parser with Syntax & Error Checking ──
function parseQuantumCode(code) {
  const lines = code.split('\n');
  let detectedQubits = 2;
  const ops = [];

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i].trim();
    if (!raw || raw.startsWith('#') || raw.startsWith('from ') || raw.startsWith('import ')) continue;

    // Check QuantumCircuit(n, m)
    const initMatch = raw.match(/QuantumCircuit\((\d+)/i);
    if (initMatch) {
      detectedQubits = parseInt(initMatch[1]);
      if (detectedQubits < 1 || detectedQubits > 3) {
        const e = new Error(`Only 1 to 3 qubits are supported (found ${detectedQubits}).`);
        e.lineNumber = i + 1;
        throw e;
      }
      continue;
    }

    // Single-qubit gates: qc.h(0), qc.x(1), qc.z(0), etc.
    const g1Match = raw.match(/^qc\.([hxyzst])\((\d+)\)/i);
    if (g1Match) {
      const gate = g1Match[1].toUpperCase();
      const q = parseInt(g1Match[2]);
      if (q >= detectedQubits) {
        const e = new Error(`Qubit index ${q} is out of bounds for ${detectedQubits}-qubit circuit.`);
        e.lineNumber = i + 1;
        throw e;
      }
      ops.push({ type: '1q', gate, qubit: q });
      continue;
    }

    // CNOT: qc.cx(0, 1) or qc.cnot(0, 1)
    const cxMatch = raw.match(/^qc\.(?:cx|cnot)\((\d+)\s*,\s*(\d+)\)/i);
    if (cxMatch) {
      const c = parseInt(cxMatch[1]);
      const t = parseInt(cxMatch[2]);
      if (c >= detectedQubits || t >= detectedQubits) {
        const e = new Error(`Qubit index out of bounds in cx(${c}, ${t}).`);
        e.lineNumber = i + 1;
        throw e;
      }
      if (c === t) {
        const e = new Error(`CNOT control and target cannot be the same qubit (${c}).`);
        e.lineNumber = i + 1;
        throw e;
      }
      ops.push({ type: 'cnot', control: c, target: t });
      continue;
    }

    // SWAP: qc.swap(0, 1)
    const swapMatch = raw.match(/^qc\.swap\((\d+)\s*,\s*(\d+)\)/i);
    if (swapMatch) {
      const a = parseInt(swapMatch[1]);
      const b = parseInt(swapMatch[2]);
      if (a >= detectedQubits || b >= detectedQubits) {
        const e = new Error(`Qubit index out of bounds in swap(${a}, ${b}).`);
        e.lineNumber = i + 1;
        throw e;
      }
      ops.push({ type: 'swap', qubitA: Math.min(a, b), qubitB: Math.max(a, b) });
      continue;
    }

    // Measurement: qc.measure(0, 0) or qc.measure_all()
    if (raw.match(/^qc\.measure_all\(\)/i)) {
      for (let q = 0; q < detectedQubits; q++) {
        ops.push({ type: 'measure', qubit: q });
      }
      continue;
    }
    const mMatch = raw.match(/^qc\.measure\((\d+)/i);
    if (mMatch) {
      const q = parseInt(mMatch[1]);
      if (q >= detectedQubits) {
        const e = new Error(`Qubit index ${q} is out of bounds in measure.`);
        e.lineNumber = i + 1;
        throw e;
      }
      ops.push({ type: 'measure', qubit: q });
      continue;
    }

    // Unrecognized instruction
    const e = new Error(`Unrecognized syntax: "${raw}". Check gate name or syntax.`);
    e.lineNumber = i + 1;
    throw e;
  }

  return { qubits: detectedQubits, ops };
}

function showCodeError(msg, line) {
  const errBox = document.getElementById('codeErrorBox');
  if (errBox) {
    errBox.innerHTML = `<strong>Line ${line || '?'}:</strong> ${msg}`;
    errBox.classList.remove('hidden');
  }
}
function clearCodeError() {
  const errBox = document.getElementById('codeErrorBox');
  if (errBox) errBox.classList.add('hidden');
}
function updateSyncBadge(inSync) {
  const badge = document.getElementById('syncBadge');
  if (badge) {
    if (inSync) {
      badge.className = 'sync-badge sync-ok';
      badge.innerHTML = `● Synchronized`;
    } else {
      badge.className = 'sync-badge sync-warn';
      badge.innerHTML = `● Unsaved Code Changes`;
    }
  }
}

// ── Simulation Runner ──
function runCircuitSimulation() {
  const sim = new QuantumSimulator(numQubits);
  let totalGates = 0;

  for (let s = 0; s < MAX_STEPS; s++) {
    const visited = new Set();
    for (let q = 0; q < numQubits; q++) {
      const item = circuitGrid[q][s];
      if (!item) continue;

      if (item.gate === 'CNOT') {
        if (!visited.has(`cnot_${item.control}_${item.target}`)) {
          sim.applyCNOT(item.control, item.target);
          visited.add(`cnot_${item.control}_${item.target}`);
          totalGates++;
        }
      } else if (item.gate === 'SWAP') {
        if (!visited.has(`swap_${item.qubitA}_${item.qubitB}`)) {
          sim.applySWAP(item.qubitA, item.qubitB);
          visited.add(`swap_${item.qubitA}_${item.qubitB}`);
          totalGates++;
        }
      } else if (item.gate !== 'M') {
        if (GATES[item.gate]) {
          sim.apply1QGate(GATES[item.gate], q);
          totalGates++;
        }
      }
    }
  }

  renderResults(sim, totalGates);
}

// ── Result Visualizers ──
function renderResults(sim, totalGates) {
  const probs = sim.getProbabilities();
  const counts = sim.sampleShots(currentShots);
  const n = numQubits;

  // 1. Histogram
  const histContainer = document.getElementById('histogramContainer');
  if (histContainer) {
    histContainer.innerHTML = '';
    const maxVal = Math.max(...Object.values(counts), 1);

    for (let i = 0; i < (1 << n); i++) {
      const bin = i.toString(2).padStart(n, '0');
      const c = counts[bin] || 0;
      const pct = (probs[i] * 100).toFixed(1);
      const barHeightPct = Math.round((c / maxVal) * 100);

      const col = document.createElement('div');
      col.className = 'hist-col';
      col.innerHTML = `
        <div class="hist-count">${c}</div>
        <div class="hist-bar-wrap">
          <div class="hist-bar" style="height:${barHeightPct}%" title="${bin}: ${pct}% (${c} counts)"></div>
        </div>
        <div class="hist-label">|${bin}⟩</div>
        <div class="hist-pct">${pct}%</div>
      `;
      histContainer.appendChild(col);
    }
  }

  // 2. Statevector Formula & Cards
  const svFormula = document.getElementById('svFormula');
  const svList = document.getElementById('svCards');
  if (svFormula && svList) {
    const formulaParts = [];
    svList.innerHTML = '';

    sim.state.forEach((amp, i) => {
      const bin = i.toString(2).padStart(n, '0');
      const mag = amp.mag();
      const prob = (mag * mag * 100).toFixed(1);
      const phaseDeg = Math.round((amp.phase() * 180) / Math.PI);

      if (mag > 0.001) {
        formulaParts.push(`${amp.toString(2)}|${bin}⟩`);
      }

      const card = document.createElement('div');
      card.className = `sv-card ${mag > 0.001 ? 'active' : ''}`;
      card.innerHTML = `
        <div class="sv-state">|${bin}⟩</div>
        <div class="sv-val">${amp.toString(3)}</div>
        <div class="sv-metrics">
          <span>Prob: <strong>${prob}%</strong></span>
          <span>Phase: <strong>${phaseDeg}°</strong></span>
        </div>
      `;
      svList.appendChild(card);
    });

    svFormula.innerHTML = formulaParts.length
      ? `|ψ⟩ = ${formulaParts.join(' + ')}`
      : `|ψ⟩ = 0`;
  }

  // 3. Bloch Sphere
  drawBlochSphere(sim.getBlochCoordinates(activeBlochQubit));

  // 4. Metrics & Explanation
  const metricsEl = document.getElementById('circuitMetrics');
  if (metricsEl) {
    metricsEl.innerHTML = `
      <span>Qubits: <strong>${numQubits}</strong></span>
      <span>Total Gates: <strong>${totalGates}</strong></span>
      <span>Shots: <strong>${currentShots}</strong></span>
    `;
  }
}

// ── 3D Isometric Bloch Sphere Canvas ──
function drawBlochSphere(coords) {
  const canvas = document.getElementById('blochCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2;
  const R = 85;

  ctx.clearRect(0, 0, W, H);

  // Background glow
  const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, R + 20);
  glow.addColorStop(0, 'rgba(124, 58, 237, 0.15)');
  glow.addColorStop(1, 'rgba(15, 15, 26, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Outer Sphere Rim
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, 2 * Math.PI);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Equator Ellipse
  ctx.beginPath();
  ctx.ellipse(cx, cy, R, R * 0.35, 0, 0, 2 * Math.PI);
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.setLineDash([]);

  // Z Axis (vertical)
  ctx.beginPath();
  ctx.moveTo(cx, cy - R - 15);
  ctx.lineTo(cx, cy + R + 15);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // X Axis (isometric slant)
  ctx.beginPath();
  ctx.moveTo(cx - R * 0.8, cy + R * 0.4);
  ctx.lineTo(cx + R * 0.8, cy - R * 0.4);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.stroke();

  // Axis Labels
  ctx.font = '11px JetBrains Mono';
  ctx.fillStyle = '#10b981';
  ctx.fillText('|0⟩ (+Z)', cx - 18, cy - R - 18);
  ctx.fillStyle = '#ef4444';
  ctx.fillText('|1⟩ (-Z)', cx - 18, cy + R + 26);
  ctx.fillStyle = '#06b6d4';
  ctx.fillText('|+⟩ (+X)', cx + R * 0.8 + 6, cy - R * 0.4);

  // State Vector Projection
  // Isometric projection: x' = x - y*0.5, y' = -z + y*0.25
  const isoX = cx + (coords.x * 0.85 - coords.y * 0.45) * R;
  const isoY = cy + (-coords.z + coords.y * 0.25) * R;

  // Vector Line
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(isoX, isoY);
  ctx.strokeStyle = '#a78bfa';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Vector Arrowhead / Tip
  ctx.beginPath();
  ctx.arc(isoX, isoY, 6, 0, 2 * Math.PI);
  ctx.fillStyle = '#f59e0b';
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Coordinates text
  const coordEl = document.getElementById('blochCoords');
  if (coordEl) {
    coordEl.innerHTML = `
      <span>(x, y, z) = (${coords.x.toFixed(2)}, ${coords.y.toFixed(2)}, ${coords.z.toFixed(2)})</span><br>
      <span>θ = ${(coords.theta * 180 / Math.PI).toFixed(0)}°, φ = ${(coords.phi * 180 / Math.PI).toFixed(0)}°</span>
    `;
  }
}

// ── Preset & Storage ──
function loadPreset(key) {
  const p = PRESETS[key];
  if (!p) return;

  initGrid(p.qubits);

  // Clear slots
  for (let q = 0; q < numQubits; q++) {
    circuitGrid[q].fill(null);
  }

  // Populate gates
  p.gates.forEach(g => {
    if (g.gate === 'CNOT') {
      circuitGrid[g.control][g.step] = { gate: 'CNOT', control: g.control, target: g.target };
      circuitGrid[g.target][g.step] = { gate: 'CNOT', control: g.control, target: g.target };
    } else if (g.gate === 'SWAP') {
      const qA = g.qubit;
      const qB = g.target;
      circuitGrid[qA][g.step] = { gate: 'SWAP', qubitA: qA, qubitB: qB };
      circuitGrid[qB][g.step] = { gate: 'SWAP', qubitA: qA, qubitB: qB };
    } else {
      circuitGrid[g.qubit][g.step] = { gate: g.gate };
    }
  });

  renderCircuitGrid();
  syncCircuitToCode();
  runCircuitSimulation();
}

function saveCurrentCircuit() {
  const name = prompt('Enter a name for your quantum circuit:', `Circuit ${new Date().toLocaleTimeString()}`);
  if (!name || !name.trim()) return;

  const saved = JSON.parse(localStorage.getItem('qn_saved_circuits') || '[]');
  saved.push({
    id: Date.now(),
    name: name.trim(),
    qubits: numQubits,
    grid: circuitGrid,
    code: document.getElementById('codeEditor').value,
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem('qn_saved_circuits', JSON.stringify(saved));
  renderSavedCircuitsList();
  alert(`Circuit "${name.trim()}" saved successfully!`);
}

function renderSavedCircuitsList() {
  const sel = document.getElementById('savedCircuitsSelect');
  if (!sel) return;
  const saved = JSON.parse(localStorage.getItem('qn_saved_circuits') || '[]');
  sel.innerHTML = `<option value="">Load Saved Circuit (${saved.length})</option>`;
  saved.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = `${c.name} (${c.qubits}Q, ${c.date})`;
    sel.appendChild(opt);
  });
}

function loadSavedCircuitById(id) {
  if (!id) return;
  const saved = JSON.parse(localStorage.getItem('qn_saved_circuits') || '[]');
  const found = saved.find(c => c.id == id);
  if (!found) return;

  initGrid(found.qubits);
  circuitGrid = found.grid;
  renderCircuitGrid();
  const codeArea = document.getElementById('codeEditor');
  if (codeArea) codeArea.value = found.code;
  runCircuitSimulation();
}

// ── Event Setup ──
function setupEventListeners() {
  // Palette gate click
  document.querySelectorAll('.palette-gate').forEach(btn => {
    btn.addEventListener('click', () => selectPaletteGate(btn.dataset.gate));
    btn.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/gate-type', btn.dataset.gate);
    });
  });

  // Qubit count buttons
  document.querySelectorAll('.qubit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = parseInt(btn.dataset.qubits);
      if (q !== numQubits) {
        initGrid(q);
        syncCircuitToCode();
        runCircuitSimulation();
      }
    });
  });

  // Code editor input
  const codeArea = document.getElementById('codeEditor');
  if (codeArea) {
    codeArea.addEventListener('input', () => {
      updateLineNumbers();
      updateSyncBadge(false);
    });
    codeArea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = codeArea.selectionStart;
        const end = codeArea.selectionEnd;
        codeArea.value = codeArea.value.substring(0, start) + '    ' + codeArea.value.substring(end);
        codeArea.selectionStart = codeArea.selectionEnd = start + 4;
        updateLineNumbers();
      }
    });
  }

  // Bloch qubit select
  const blochSel = document.getElementById('blochQubitSelect');
  if (blochSel) {
    blochSel.addEventListener('change', (e) => {
      activeBlochQubit = parseInt(e.target.value);
      runCircuitSimulation();
    });
  }

  // Shots select
  const shotsSel = document.getElementById('shotsSelect');
  if (shotsSel) {
    shotsSel.addEventListener('change', (e) => {
      currentShots = parseInt(e.target.value);
      runCircuitSimulation();
    });
  }

  // Saved circuits select
  const savedSel = document.getElementById('savedCircuitsSelect');
  if (savedSel) {
    savedSel.addEventListener('change', (e) => {
      loadSavedCircuitById(e.target.value);
    });
  }

  // Presets select
  const presetSel = document.getElementById('presetSelect');
  if (presetSel) {
    presetSel.addEventListener('change', (e) => {
      if (e.target.value) loadPreset(e.target.value);
    });
  }
}

function updateLineNumbers() {
  const codeArea = document.getElementById('codeEditor');
  const lineGutter = document.getElementById('codeLineNumbers');
  if (!codeArea || !lineGutter) return;
  const count = codeArea.value.split('\n').length;
  lineGutter.innerHTML = Array.from({ length: count }, (_, i) => i + 1).join('<br>');
}

// ── Send Circuit to Objective 3 Multi-Backend Simulation Lab ──
function sendToSimulationLab() {
  const codeArea = document.getElementById('codeEditor');
  const shared = {
    source: 'circuit_lab',
    name: `Circuit Lab Design (${numQubits}Q)`,
    qubits: numQubits,
    grid: circuitGrid,
    code: codeArea ? codeArea.value : '',
    timestamp: Date.now()
  };
  localStorage.setItem('quantnexus_shared_circuit', JSON.stringify(shared));
  window.location.href = 'simulation-lab.html';
}

window.sendToSimulationLab = sendToSimulationLab;

