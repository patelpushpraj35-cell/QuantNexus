/**
 * QuantNexus – Quantum Coding Challenges (Objective 4)
 * SIH 26140 Online Learning Platform
 *
 * 10 beginner-to-advanced quantum coding challenges with:
 * - In-browser Qiskit-style code parsing & simulation
 * - Auto-grading against expected measurement distributions
 * - Progress persistence via localStorage
 * - Dashboard integration
 */

/* ================================================================
   CHALLENGE DEFINITIONS
   ================================================================ */

const QUANTUM_CHALLENGES = [
  {
    id: 1,
    title: 'Hello Qubit',
    difficulty: 'Beginner',
    points: 100,
    icon: '',
    objective: 'Understand the basic structure of a Qiskit quantum circuit with one qubit.',
    description: 'Create a 1-qubit quantum circuit, apply no gates (leave the qubit in its default |0⟩ state), add a measurement, and run it for 1024 shots. The qubit starts in state |0⟩, so all measurements should return "0".',
    expected: 'All measurements should return "0". Expected distribution: {"0": ~1024 counts}',
    hints: [
      'Use QuantumCircuit(1, 1) to create a circuit with 1 qubit and 1 classical bit.',
      'Use qc.measure(0, 0) to measure qubit 0 into classical bit 0.',
      'You do not need to apply any gates — the default state is |0⟩.'
    ],
    starterCode: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# Create a 1-qubit, 1-classical-bit circuit
qc = QuantumCircuit(1, 1)

# TODO: Add your gates here (none needed for this challenge!)

# Measure qubit 0 into classical bit 0
qc.measure(0, 0)

# Run simulation
backend = AerSimulator()
job = backend.run(qc, shots=1024)
result = job.result()
counts = result.get_counts()
print("Counts:", counts)
`,
    grader: (ops, numQubits, numShots, counts) => {
      // Expect all measurements to be "0"
      const total = Object.values(counts).reduce((a,b)=>a+b, 0);
      const zero = counts['0'] || 0;
      const frac = zero / total;
      if (frac >= 0.95) {
        return { pass: true, message: 'All shots measured |0⟩. Your qubit stayed in its ground state!', score: 100 };
      }
      return { pass: false, message: `Expected ~100% "0" outcomes, but got ${Math.round(frac*100)}%. Make sure you have not applied any gates that flip the qubit.`, score: 0 };
    }
  },
  {
    id: 2,
    title: 'Apply an X Gate',
    difficulty: 'Beginner',
    points: 100,
    icon: '',
    objective: 'Learn the Pauli-X (NOT) gate — the quantum equivalent of a classical bit flip.',
    description: 'Create a 1-qubit circuit. Apply an X gate to qubit 0, then measure. The X gate flips |0⟩ to |1⟩, so all 1024 measurements should return "1".',
    expected: 'All measurements should return "1". Expected distribution: {"1": ~1024 counts}',
    hints: [
      'Use qc.x(0) to apply the X (Pauli-X / NOT) gate to qubit 0.',
      'Apply the gate BEFORE the measurement.',
      'The X gate maps |0⟩ → |1⟩ and |1⟩ → |0⟩.'
    ],
    starterCode: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# Create a 1-qubit, 1-classical-bit circuit
qc = QuantumCircuit(1, 1)

# TODO: Apply an X gate to qubit 0
# qc.x(0)

# Measure
qc.measure(0, 0)

# Run simulation
backend = AerSimulator()
job = backend.run(qc, shots=1024)
result = job.result()
counts = result.get_counts()
print("Counts:", counts)
`,
    grader: (ops, numQubits, numShots, counts) => {
      const total = Object.values(counts).reduce((a,b)=>a+b, 0);
      const one = counts['1'] || 0;
      const frac = one / total;
      if (frac >= 0.95) {
        return { pass: true, message: 'All shots measured |1⟩. The X gate successfully flipped your qubit!', score: 100 };
      }
      return { pass: false, message: `Expected ~100% "1" outcomes, but got ${Math.round(frac*100)}%. Did you apply qc.x(0) before the measurement?`, score: 0 };
    }
  },
  {
    id: 3,
    title: 'Superposition with H Gate',
    difficulty: 'Beginner',
    points: 150,
    icon: '',
    objective: 'Understand quantum superposition using the Hadamard gate.',
    description: 'Create a 1-qubit circuit. Apply a Hadamard (H) gate to qubit 0, then measure for 1024 shots. The H gate puts the qubit into an equal superposition of |0⟩ and |1⟩, so you should see roughly 50% "0" and 50% "1" measurements.',
    expected: 'Roughly equal split: {"0": ~512, "1": ~512}. Accept any result where each outcome is 40%–60% of total shots.',
    hints: [
      'Use qc.h(0) to apply the Hadamard gate to qubit 0.',
      'The H gate creates equal superposition: |0⟩ → (|0⟩ + |1⟩) / √2.',
      'Due to randomness, you will not get exactly 512/512, but both should be close to 50%.'
    ],
    starterCode: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# Create a 1-qubit, 1-classical-bit circuit
qc = QuantumCircuit(1, 1)

# TODO: Apply the Hadamard gate to qubit 0
# qc.h(0)

# Measure
qc.measure(0, 0)

# Run simulation
backend = AerSimulator()
job = backend.run(qc, shots=1024)
result = job.result()
counts = result.get_counts()
print("Counts:", counts)
`,
    grader: (ops, numQubits, numShots, counts) => {
      const total = Object.values(counts).reduce((a,b)=>a+b, 0);
      const zero = (counts['0'] || 0) / total;
      const one  = (counts['1'] || 0) / total;
      if (zero >= 0.35 && zero <= 0.65 && one >= 0.35 && one <= 0.65) {
        return { pass: true, message: `Superposition achieved! Got ~${Math.round(zero*100)}% |0⟩ and ~${Math.round(one*100)}% |1⟩. The Hadamard gate created equal superposition!`, score: 150 };
      }
      if (zero >= 0.95) {
        return { pass: false, message: 'Almost all shots returned "0" — did you forget to apply qc.h(0)?', score: 0 };
      }
      return { pass: false, message: `Got ${Math.round(zero*100)}% "0" and ${Math.round(one*100)}% "1". Expected each to be between 40% and 60%.`, score: 0 };
    }
  },
  {
    id: 4,
    title: 'Measure Multiple Qubits',
    difficulty: 'Beginner',
    points: 150,
    icon: '',
    objective: 'Learn how to create multi-qubit circuits and measure all qubits simultaneously.',
    description: 'Create a 2-qubit circuit. Apply an X gate to qubit 0 only (leave qubit 1 as |0⟩). Measure both qubits. You should see all shots give outcome "01" (qubit 1 = 0, qubit 0 = 1 in little-endian Qiskit notation).',
    expected: 'All measurements: "01" (qubit 0 flipped, qubit 1 unchanged). Expected: {"01": ~1024}',
    hints: [
      'Use QuantumCircuit(2, 2) for 2 qubits and 2 classical bits.',
      'Apply qc.x(0) to flip qubit 0.',
      'Measure with qc.measure([0,1], [0,1]) or two separate qc.measure() calls.',
      'In Qiskit, the rightmost bit in the string is qubit 0 (little-endian).'
    ],
    starterCode: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# Create a 2-qubit, 2-classical-bit circuit
qc = QuantumCircuit(2, 2)

# TODO: Apply X gate to qubit 0 only
# qc.x(0)

# TODO: Measure both qubits
# qc.measure([0, 1], [0, 1])

# Run simulation
backend = AerSimulator()
job = backend.run(qc, shots=1024)
result = job.result()
counts = result.get_counts()
print("Counts:", counts)
`,
    grader: (ops, numQubits, numShots, counts) => {
      const total = Object.values(counts).reduce((a,b)=>a+b, 0);
      // Accept both "01" (little-endian) and "10" (big-endian) representations
      const target01 = (counts['01'] || 0) / total;
      const target10 = (counts['10'] || 0) / total;
      const frac = Math.max(target01, target10);
      if (frac >= 0.90) {
        return { pass: true, message: `All shots gave the correct outcome! You successfully measured a 2-qubit circuit with qubit 0 flipped.`, score: 150 };
      }
      return { pass: false, message: `Expected ~100% "01" (or "10") outcomes. Got ${Math.round(frac*100)}%. Make sure you applied X to qubit 0 and measured both qubits.`, score: 0 };
    }
  },
  {
    id: 5,
    title: 'Bell State',
    difficulty: 'Intermediate',
    points: 200,
    icon: '',
    objective: 'Create quantum entanglement using a Bell state — one of the most fundamental states in quantum computing.',
    description: 'Create a 2-qubit circuit. Apply H to qubit 0, then a CNOT gate with qubit 0 as control and qubit 1 as target. Measure both qubits. The result is a Bell state (|00⟩ + |11⟩)/√2 — you should see roughly 50% "00" and 50% "11" with NO "01" or "10" outcomes.',
    expected: 'Only "00" and "11" outcomes, each ~50%. Expected: {"00": ~512, "11": ~512}. No "01" or "10" at all.',
    hints: [
      'Step 1: Apply qc.h(0) to put qubit 0 in superposition.',
      'Step 2: Apply qc.cx(0, 1) — a CNOT with qubit 0 as control and qubit 1 as target.',
      'This entangles the two qubits: if you measure qubit 0 as "0", qubit 1 must also be "0".',
      'Measure both: qc.measure([0,1], [0,1])'
    ],
    starterCode: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# Create a 2-qubit, 2-classical-bit circuit
qc = QuantumCircuit(2, 2)

# TODO: Step 1 – Apply H gate to qubit 0
# qc.h(0)

# TODO: Step 2 – Apply CNOT (CX) with control=0, target=1
# qc.cx(0, 1)

# Measure both qubits
qc.measure([0, 1], [0, 1])

# Run simulation
backend = AerSimulator()
job = backend.run(qc, shots=1024)
result = job.result()
counts = result.get_counts()
print("Counts:", counts)
`,
    grader: (ops, numQubits, numShots, counts) => {
      const total = Object.values(counts).reduce((a,b)=>a+b, 0);
      const c00 = (counts['00'] || 0) / total;
      const c11 = (counts['11'] || 0) / total;
      const c01 = (counts['01'] || 0) / total;
      const c10 = (counts['10'] || 0) / total;
      const bellFrac = c00 + c11;
      const wrongFrac = c01 + c10;
      if (bellFrac >= 0.90 && c00 >= 0.30 && c11 >= 0.30 && wrongFrac < 0.10) {
        return {
          pass: true,
          message: `Bell state created! Got ${Math.round(c00*100)}% |00⟩ and ${Math.round(c11*100)}% |11⟩ — the two qubits are entangled!`,
          score: 200
        };
      }
      if (c00 >= 0.85) {
        return { pass: false, message: 'All shots returned "00". You may have forgotten the H gate (qc.h(0)) or CNOT gate (qc.cx(0,1)).', score: 0 };
      }
      if (wrongFrac > 0.5) {
        return { pass: false, message: `Got too many "01" or "10" outcomes (${Math.round(wrongFrac*100)}%). A true Bell state should only produce "00" and "11". Check your gate sequence.`, score: 0 };
      }
      return { pass: false, message: `Got ${Math.round(c00*100)}% "00" and ${Math.round(c11*100)}% "11" — close! The Bell state needs ~50% each. Check the H + CNOT sequence.`, score: 0 };
    }
  },
  {
    id: 6,
    title: 'GHZ State (3 Qubits)',
    difficulty: 'Intermediate',
    points: 250,
    icon: '',
    objective: 'Extend entanglement to three qubits by creating a GHZ (Greenberger–Horne–Zeilinger) state.',
    description: 'Create a 3-qubit circuit. Apply H to qubit 0, then CNOT from qubit 0 to qubit 1, and another CNOT from qubit 0 to qubit 2. Measure all three qubits. The GHZ state (|000⟩ + |111⟩)/√2 should give ~50% "000" and ~50% "111" with no other outcomes.',
    expected: 'Only "000" and "111" outcomes, each ~50%. Expected: {"000": ~512, "111": ~512}',
    hints: [
      'Use QuantumCircuit(3, 3) for 3 qubits.',
      'Apply qc.h(0) — puts qubit 0 in superposition.',
      'Apply qc.cx(0, 1) — entangles qubit 1 with qubit 0.',
      'Apply qc.cx(0, 2) — entangles qubit 2 with qubit 0.',
      'Measure all: qc.measure([0,1,2], [0,1,2])'
    ],
    starterCode: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# Create a 3-qubit, 3-classical-bit circuit
qc = QuantumCircuit(3, 3)

# TODO: Step 1 – Apply H to qubit 0
# qc.h(0)

# TODO: Step 2 – CNOT from qubit 0 to qubit 1
# qc.cx(0, 1)

# TODO: Step 3 – CNOT from qubit 0 to qubit 2
# qc.cx(0, 2)

# Measure all qubits
qc.measure([0, 1, 2], [0, 1, 2])

# Run simulation
backend = AerSimulator()
job = backend.run(qc, shots=1024)
result = job.result()
counts = result.get_counts()
print("Counts:", counts)
`,
    grader: (ops, numQubits, numShots, counts) => {
      const total = Object.values(counts).reduce((a,b)=>a+b, 0);
      const c000 = (counts['000'] || 0) / total;
      const c111 = (counts['111'] || 0) / total;
      const ghzFrac = c000 + c111;
      const wrongFrac = 1 - ghzFrac;
      if (ghzFrac >= 0.88 && c000 >= 0.28 && c111 >= 0.28 && wrongFrac < 0.12) {
        return {
          pass: true,
          message: `GHZ state created! ${Math.round(c000*100)}% "000" and ${Math.round(c111*100)}% "111". Three qubits entangled simultaneously!`,
          score: 250
        };
      }
      if (wrongFrac > 0.3) {
        return { pass: false, message: `Got unexpected outcomes (${Math.round(wrongFrac*100)}% of shots). GHZ state should only give "000" and "111". Check your CNOT gates.`, score: 0 };
      }
      return { pass: false, message: `Got ${Math.round(c000*100)}% "000" and ${Math.round(c111*100)}% "111". Each should be ~50%. Check that you applied H(0), CX(0,1), and CX(0,2).`, score: 0 };
    }
  },
  {
    id: 7,
    title: 'Quantum Teleportation Setup',
    difficulty: 'Intermediate',
    points: 300,
    icon: '',
    objective: 'Understand quantum teleportation by preparing a Bell pair (entangled resource state).',
    description: 'Prepare a Bell pair between qubits 1 and 2 (the resource state for teleportation). Then apply an X gate to qubit 0 (the state to teleport). Apply CNOT(0, 1) and H(0) to perform Bell measurement. Measure all three qubits. Valid teleportation setups produce all 4 two-qubit measurement outcomes for qubits 0 and 1, each with ~25% probability.',
    expected: 'Four outcomes each ~25%: "000", "001", "010", "011" (or "100","101","110","111" patterns — any where qubits 0&1 each occur ~25% independently).',
    hints: [
      'Qubit layout: qubit 0 = message qubit, qubits 1 & 2 = Bell pair.',
      'Step 1: Create Bell pair between qubits 1 and 2: qc.h(1), qc.cx(1, 2).',
      'Step 2: Prepare message state on qubit 0: qc.x(0) to send |1⟩.',
      'Step 3: Bell measurement: qc.cx(0, 1), then qc.h(0).',
      'Step 4: Measure all 3 qubits.'
    ],
    starterCode: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# 3 qubits: qubit 0 = message, qubits 1 & 2 = Bell pair
qc = QuantumCircuit(3, 3)

# TODO: Step 1 – Create Bell pair between qubits 1 and 2
# qc.h(1)
# qc.cx(1, 2)

# TODO: Step 2 – Prepare message on qubit 0 (set to |1>)
# qc.x(0)

# TODO: Step 3 – Bell measurement on qubits 0 & 1
# qc.cx(0, 1)
# qc.h(0)

# Measure all 3 qubits
qc.measure([0, 1, 2], [0, 1, 2])

# Run simulation
backend = AerSimulator()
job = backend.run(qc, shots=1024)
result = job.result()
counts = result.get_counts()
print("Counts:", counts)
`,
    grader: (ops, numQubits, numShots, counts) => {
      const total = Object.values(counts).reduce((a,b)=>a+b, 0);
      // Expect 4 outcomes each ~25%
      const vals = Object.values(counts).map(c => c / total);
      const numOutcomes = Object.keys(counts).length;
      const allNear25 = vals.every(v => v >= 0.15 && v <= 0.40);
      if (numOutcomes >= 3 && allNear25) {
        return {
          pass: true,
          message: `Teleportation setup complete! All ${numOutcomes} measurement outcomes appear with roughly equal probability — the Bell measurement is working correctly!`,
          score: 300
        };
      }
      if (numOutcomes <= 1) {
        return { pass: false, message: 'Only one outcome appears — the circuit is not creating superposition or entanglement. Check your H and CX gates.', score: 0 };
      }
      return { pass: false, message: `Got ${numOutcomes} outcomes but distribution is uneven. Teleportation Bell measurement should give ~25% each for all 4 combinations. Check your gate sequence.`, score: 0 };
    }
  },
  {
    id: 8,
    title: 'Grover Search (2-Qubit)',
    difficulty: 'Advanced',
    points: 400,
    icon: '',
    objective: 'Implement a simplified Grover\'s search algorithm to find a marked element with quadratic speedup.',
    description: 'Implement Grover\'s algorithm for 2 qubits searching for the state |11⟩. Steps: (1) Apply H to both qubits. (2) Oracle: Apply Z to both qubits, then CZ (simulate with H, CX, H) to mark |11⟩. (3) Diffusion: Apply H to both, X to both, CZ, X to both, H to both. (4) Measure. The state |11⟩ should appear with >70% probability.',
    expected: '"11" (or "11" in big-endian) should appear with >70% probability after one Grover iteration.',
    hints: [
      'Start with H on all qubits: qc.h(0); qc.h(1)',
      'Oracle (marks |11>): qc.cz(0,1) marks the |11> state with a phase flip.',
      'Diffusion: H on all, X on all, CZ(0,1), X on all, H on all.',
      'For CZ in Qiskit: qc.cz(0, 1) or use H+CX+H decomposition.',
      'After 1 Grover iteration on 2 qubits, |11> has ~100% probability.'
    ],
    starterCode: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# 2-qubit Grover's search for |11>
qc = QuantumCircuit(2, 2)

# TODO: Step 1 – Initialize: H on all qubits
# qc.h(0)
# qc.h(1)

# TODO: Step 2 – Oracle: Mark |11> with phase flip (use CZ)
# qc.cz(0, 1)

# TODO: Step 3 – Diffusion operator
# (H, X, CZ, X, H on all qubits)
# qc.h([0, 1])
# qc.x([0, 1])
# qc.cz(0, 1)
# qc.x([0, 1])
# qc.h([0, 1])

# Measure
qc.measure([0, 1], [0, 1])

# Run
backend = AerSimulator()
job = backend.run(qc, shots=1024)
result = job.result()
counts = result.get_counts()
print("Counts:", counts)
`,
    grader: (ops, numQubits, numShots, counts) => {
      const total = Object.values(counts).reduce((a,b)=>a+b, 0);
      // Target state |11> in little-endian is "11"
      const c11 = (counts['11'] || 0) / total;
      if (c11 >= 0.65) {
        return {
          pass: true,
          message: `Grover's algorithm works! State "11" appears ${Math.round(c11*100)}% of the time — successfully amplified above classical search probability!`,
          score: 400
        };
      }
      if (c11 >= 0.40) {
        return { pass: false, message: `"11" appears ${Math.round(c11*100)}% — partially correct but needs >65%. Check your diffusion operator, especially the CZ gate.`, score: 0 };
      }
      return { pass: false, message: `"11" appears only ${Math.round(c11*100)}% of the time. Grover's algorithm should amplify it above 70%. Check all three steps: initialization, oracle, and diffusion.`, score: 0 };
    }
  },
  {
    id: 9,
    title: 'Deutsch-Jozsa Algorithm',
    difficulty: 'Advanced',
    points: 400,
    icon: '',
    objective: 'Implement the Deutsch-Jozsa algorithm to determine if a function is constant or balanced in one query.',
    description: 'For a 2-bit Deutsch-Jozsa problem: use 2 input qubits and 1 ancilla qubit. Apply H to input qubits, set ancilla to |−⟩ (X then H), apply the oracle (implement the balanced function: CNOT from qubit 0 to ancilla, CNOT from qubit 1 to ancilla), apply H to input qubits again, measure input qubits. A balanced function should give "11" (both inputs measured as 1).',
    expected: 'Measuring "11" on the two input qubits indicates the function is balanced. Expected: {"11": ~1024}',
    hints: [
      'Circuit: 3 qubits total (qubits 0, 1 = input; qubit 2 = ancilla).',
      'Initialize: qc.x(2); qc.h([0,1,2]) — ancilla goes to |−⟩.',
      'Balanced oracle (XOR of both inputs): qc.cx(0, 2); qc.cx(1, 2).',
      'Apply H again to input qubits: qc.h([0, 1]).',
      'Measure input qubits only: qc.measure([0,1], [0,1]).',
      'Constant function → "00", Balanced function → non-zero (here "11").'
    ],
    starterCode: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# 3 qubits: 0,1 = input qubits; 2 = ancilla
qc = QuantumCircuit(3, 2)

# TODO: Step 1 – Initialize ancilla: X then H on qubit 2
# qc.x(2)
# qc.h([0, 1, 2])

# TODO: Step 2 – Balanced oracle (f(x) = x0 XOR x1)
# qc.cx(0, 2)
# qc.cx(1, 2)

# TODO: Step 3 – Reverse H on input qubits
# qc.h([0, 1])

# Measure input qubits (0 and 1) only
qc.measure([0, 1], [0, 1])

# Run
backend = AerSimulator()
job = backend.run(qc, shots=1024)
result = job.result()
counts = result.get_counts()
print("Counts:", counts)
`,
    grader: (ops, numQubits, numShots, counts) => {
      const total = Object.values(counts).reduce((a,b)=>a+b, 0);
      // Balanced function should give "11" or "10" or "01" — anything non-zero
      const c00 = (counts['00'] || 0) / total;
      const c11 = (counts['11'] || 0) / total;
      if (c11 >= 0.85) {
        return {
          pass: true,
          message: `Deutsch-Jozsa complete! Got "11" with ${Math.round(c11*100)}% probability — correctly identified as a BALANCED function in a single query!`,
          score: 400
        };
      }
      if (c00 >= 0.85) {
        return { pass: false, message: 'All inputs measured "00" — this suggests a constant function oracle. Check that you implemented the balanced oracle (CX from qubit 0 and qubit 1 to ancilla).', score: 0 };
      }
      return { pass: false, message: `Expected ~100% "11" for balanced oracle detection. Got ${Math.round(c11*100)}% "11" and ${Math.round(c00*100)}% "00". Check your oracle and H gate placement.`, score: 0 };
    }
  },
  {
    id: 10,
    title: 'Phase Kickback Puzzle',
    difficulty: 'Expert',
    points: 500,
    icon: '',
    objective: 'Understand quantum phase kickback — a key technique used in many quantum algorithms.',
    description: 'Phase kickback occurs when a target qubit in an eigenstate kicks a phase back to the control qubit. Set up: Initialize qubit 0 in |+⟩ (H gate), initialize qubit 1 in |−⟩ (X then H). Apply CNOT with control=0, target=1. Then measure only qubit 0 (after applying H). If phase kickback works, qubit 0 will be flipped to |1⟩ (measuring "1" with high probability). This demonstrates how the oracle in Grover\'s algorithm works.',
    expected: 'After H+X+H on qubit 1, CNOT, then H on qubit 0 — measuring qubit 0 should give "1" with ~100% probability.',
    hints: [
      'Qubit 0 starts in |+⟩: qc.h(0)',
      'Qubit 1 starts in |−⟩: qc.x(1), then qc.h(1)',
      'Apply CNOT(0, 1): qc.cx(0, 1)',
      'Apply H on qubit 0 again: qc.h(0)',
      'Measure only qubit 0: qc.measure(0, 0)',
      'Phase kickback flips qubit 0 from |+⟩ to |−⟩, so after H it measures as |1⟩.'
    ],
    starterCode: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# 2 qubits, 1 classical bit (measure qubit 0 only)
qc = QuantumCircuit(2, 1)

# TODO: Prepare qubit 0 in |+> state
# qc.h(0)

# TODO: Prepare qubit 1 in |-> state
# qc.x(1)
# qc.h(1)

# TODO: Apply CNOT with control=0, target=1
# qc.cx(0, 1)

# TODO: Apply H to qubit 0 to observe kickback
# qc.h(0)

# Measure only qubit 0
qc.measure(0, 0)

# Run
backend = AerSimulator()
job = backend.run(qc, shots=1024)
result = job.result()
counts = result.get_counts()
print("Counts:", counts)
`,
    grader: (ops, numQubits, numShots, counts) => {
      const total = Object.values(counts).reduce((a,b)=>a+b, 0);
      const one = (counts['1'] || 0) / total;
      if (one >= 0.90) {
        return {
          pass: true,
          message: `Phase kickback demonstrated! Qubit 0 measured as "1" with ${Math.round(one*100)}% probability. The |−⟩ eigenstate of X kicked the phase back to the control qubit!`,
          score: 500
        };
      }
      if (one < 0.1) {
        return { pass: false, message: 'Qubit 0 measured mostly "0". Phase kickback did not occur. Check that qubit 1 is in |−⟩ state (X then H), and that you applied H to qubit 0 after the CNOT.', score: 0 };
      }
      return { pass: false, message: `Qubit 0 measured "1" only ${Math.round(one*100)}% of the time. Phase kickback should give ~100% "1". Check the state preparation and gate sequence.`, score: 0 };
    }
  }
];

/* ================================================================
   CHALLENGE PROGRESS STORAGE
   ================================================================ */

function getChallengeProgress(email) {
  const key = 'qn_challenges_' + email;
  const raw = localStorage.getItem(key);
  if (raw) return JSON.parse(raw);
  const prog = {};
  QUANTUM_CHALLENGES.forEach(ch => {
    prog[ch.id] = { status: 'not_started', score: 0, attempts: 0, lastCode: '' };
  });
  localStorage.setItem(key, JSON.stringify(prog));
  return prog;
}

function saveChallengeProgress(email, prog) {
  localStorage.setItem('qn_challenges_' + email, JSON.stringify(prog));
}

/* ================================================================
   PAGE STATE
   ================================================================ */

let currentUser = null;
let challengeProgress = {};
let activeChallengeId = null;

/* ================================================================
   INIT
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  currentUser = requireAuth();
  if (!currentUser) return;

  challengeProgress = getChallengeProgress(currentUser.email);
  renderChallengeList();
  updateProgressHeader();
  updateLineNumbers();
});

/* ================================================================
   RENDER CHALLENGE LIST
   ================================================================ */

function renderChallengeList() {
  const container = document.getElementById('challengeList');
  if (!container) return;

  container.innerHTML = '';
  QUANTUM_CHALLENGES.forEach(ch => {
    const prog = challengeProgress[ch.id] || { status: 'not_started', score: 0 };
    const isSolved = prog.status === 'passed';
    const isActive = ch.id === activeChallengeId;

    const item = document.createElement('div');
    item.className = `ch-list-item${isSolved ? ' solved' : ''}${isActive ? ' active' : ''}`;
    item.id = `ch-item-${ch.id}`;
    item.onclick = () => loadChallenge(ch.id);

    const statusIcon = isSolved ? '✓' : (prog.status === 'attempted' ? '●' : '○');
    const scoreText = prog.score > 0 ? `+${prog.score}pts` : '';

    item.innerHTML = `
      <div class="ch-item-num">${ch.id}</div>
      <div class="ch-item-body">
        <div class="ch-item-title">${ch.title}</div>
        <div class="ch-item-meta">
          <span class="ch-item-diff diff-${ch.difficulty.toLowerCase()}">${ch.difficulty}</span>
          ${scoreText ? `<span class="ch-item-score">${scoreText}</span>` : ''}
        </div>
      </div>
      <div class="ch-item-status">${statusIcon}</div>
    `;

    container.appendChild(item);
  });
}

/* ================================================================
   UPDATE PROGRESS HEADER
   ================================================================ */

function updateProgressHeader() {
  const solved = Object.values(challengeProgress).filter(p => p.status === 'passed').length;
  const total = QUANTUM_CHALLENGES.length;
  const pct = Math.round((solved / total) * 100);

  const solvedEl = document.getElementById('chSolvedCount');
  const barEl = document.getElementById('chOverallBar');
  if (solvedEl) solvedEl.textContent = solved;
  if (barEl) barEl.style.width = `${pct}%`;
}

/* ================================================================
   LOAD CHALLENGE
   ================================================================ */

function loadChallenge(id) {
  const ch = QUANTUM_CHALLENGES.find(c => c.id === id);
  if (!ch) return;

  activeChallengeId = id;
  const prog = challengeProgress[id] || { status: 'not_started', score: 0, attempts: 0, lastCode: '' };

  // Update active state in list
  document.querySelectorAll('.ch-list-item').forEach(el => el.classList.remove('active'));
  const activeItem = document.getElementById(`ch-item-${id}`);
  if (activeItem) activeItem.classList.add('active');

  // Update header
  document.getElementById('chIdBadge').textContent = `#${id}`;

  const diffBadge = document.getElementById('chDiffBadge');
  diffBadge.textContent = ch.difficulty;
  diffBadge.className = `ch-diff-badge diff-${ch.difficulty.toLowerCase()}`;

  const statusBadge = document.getElementById('chStatusBadge');
  if (prog.status === 'passed') {
    statusBadge.textContent = 'Passed';
    statusBadge.className = 'ch-status-badge status-passed';
  } else if (prog.status === 'attempted') {
    statusBadge.textContent = 'Attempted';
    statusBadge.className = 'ch-status-badge status-attempted';
  } else {
    statusBadge.textContent = 'Not Started';
    statusBadge.className = 'ch-status-badge status-not-started';
  }

  document.getElementById('chDetailTitle').textContent = ch.title;
  document.getElementById('chDetailDesc').textContent = `${ch.points} points · ${ch.difficulty}`;

  // Show problem content
  document.getElementById('chWelcomeState').style.display = 'none';
  document.getElementById('chProblemContent').style.display = 'block';

  document.getElementById('chObjective').textContent = ch.objective;
  document.getElementById('chDescription').textContent = ch.description;
  document.getElementById('chExpected').textContent = ch.expected;

  // Hints
  const hintsEl = document.getElementById('chHints');
  hintsEl.innerHTML = ch.hints.map((hint, i) => `
    <div class="ch-hint-item">
      <span class="ch-hint-num">${i + 1}</span>
      <span>${hint}</span>
    </div>
  `).join('');

  // Show Start Coding button
  document.getElementById('btnGoToEditor').style.display = 'inline-flex';

  // Load code (last saved or starter)
  const editor = document.getElementById('codeEditor');
  editor.value = prog.lastCode || ch.starterCode;
  syncEditor();

  // Switch to problem tab
  switchChallengeTab('problem');

  // Clear output panel
  clearOutput();
  document.getElementById('resultCard').classList.add('hidden');
}

/* ================================================================
   TAB SWITCHING
   ================================================================ */

function switchChallengeTab(tab) {
  const tabs = {
    problem: { btn: 'tabProblem', content: 'tabContentProblem' },
    code:    { btn: 'tabCode',    content: 'tabContentCode' },
    output:  { btn: 'tabOutput',  content: 'tabContentOutput' }
  };

  Object.values(tabs).forEach(t => {
    document.getElementById(t.btn)?.classList.remove('active');
    document.getElementById(t.content)?.classList.remove('active');
  });

  const chosen = tabs[tab];
  if (chosen) {
    document.getElementById(chosen.btn)?.classList.add('active');
    document.getElementById(chosen.content)?.classList.add('active');
  }

  if (tab === 'code') {
    updateLineNumbers();
  }
}

/* ================================================================
   CODE EDITOR HELPERS
   ================================================================ */

function syncEditor() {
  updateLineNumbers();
  // Save last code to progress
  if (activeChallengeId && currentUser) {
    if (!challengeProgress[activeChallengeId]) {
      challengeProgress[activeChallengeId] = { status: 'not_started', score: 0, attempts: 0, lastCode: '' };
    }
    challengeProgress[activeChallengeId].lastCode = document.getElementById('codeEditor').value;
    saveChallengeProgress(currentUser.email, challengeProgress);
  }
}

function syncScroll() {
  const ta = document.getElementById('codeEditor');
  const ln = document.getElementById('lineNumbers');
  if (ln) ln.scrollTop = ta.scrollTop;
}

function updateLineNumbers() {
  const ta = document.getElementById('codeEditor');
  const ln = document.getElementById('lineNumbers');
  if (!ta || !ln) return;
  const lineCount = (ta.value.match(/\n/g) || []).length + 1;
  ln.textContent = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
}

function handleEditorKeydown(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    const ta = e.target;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    ta.value = ta.value.substring(0, start) + '    ' + ta.value.substring(end);
    ta.selectionStart = ta.selectionEnd = start + 4;
    syncEditor();
  }
}

function resetCode() {
  if (!activeChallengeId) return;
  const ch = QUANTUM_CHALLENGES.find(c => c.id === activeChallengeId);
  if (!ch) return;
  if (confirm('Reset to starter code? Your changes will be lost.')) {
    document.getElementById('codeEditor').value = ch.starterCode;
    syncEditor();
  }
}

/* ================================================================
   OUTPUT HELPERS
   ================================================================ */

function clearOutput() {
  document.getElementById('outputPanel').innerHTML = `
    <div class="ch-output-placeholder">
      <div class="ch-output-icon">&#9889;</div>
      <div>Run your code to see output here.</div>
      <div class="ch-output-hint">Click <strong>Run Code</strong> in the Code Editor tab to execute your circuit.</div>
    </div>
  `;
}

function appendOutput(text, cls = 'out-data') {
  const panel = document.getElementById('outputPanel');
  // Remove placeholder if present
  const placeholder = panel.querySelector('.ch-output-placeholder');
  if (placeholder) placeholder.remove();

  const line = document.createElement('div');
  line.className = `out-line ${cls}`;
  line.textContent = text;
  panel.appendChild(line);
  panel.scrollTop = panel.scrollHeight;
}

function appendOutputDivider() {
  const panel = document.getElementById('outputPanel');
  const placeholder = panel.querySelector('.ch-output-placeholder');
  if (placeholder) placeholder.remove();
  const hr = document.createElement('hr');
  hr.className = 'out-divider';
  panel.appendChild(hr);
}

/* ================================================================
   QUANTUM CODE PARSER
   Parses Qiskit-like Python code and extracts circuit operations.
   This is a simplified parse for the challenge runner — it detects
   the most common gate calls used in the 10 challenges.
   ================================================================ */

function parseQiskitCode(code) {
  const lines = code.split('\n');
  let numQubits = 1;
  let numClassical = 1;
  let numShots = 1024;
  const ops = [];
  const errors = [];

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    const lineNum = i + 1;

    // Skip comments and empty lines
    if (!line || line.startsWith('#')) continue;

    // QuantumCircuit creation
    let m = line.match(/QuantumCircuit\s*\(\s*(\d+)\s*(?:,\s*(\d+))?\s*\)/);
    if (m) {
      numQubits = Math.min(parseInt(m[1]), 4);
      numClassical = m[2] ? parseInt(m[2]) : numQubits;
      continue;
    }

    // shots
    m = line.match(/shots\s*=\s*(\d+)/);
    if (m) { numShots = parseInt(m[1]); continue; }

    // Single-qubit gates: h, x, y, z, s, t, sx
    m = line.match(/qc\.(h|x|y|z|s|t|sx)\s*\(\s*(?:\[([^\]]+)\]|(\d+))\s*\)/);
    if (m) {
      const gate = m[1].toUpperCase();
      if (m[2]) {
        // List of qubits: qc.h([0, 1])
        m[2].split(',').forEach(q => {
          const qi = parseInt(q.trim());
          if (!isNaN(qi)) ops.push({ type: '1q', gate, qubit: qi, line: lineNum });
        });
      } else {
        ops.push({ type: '1q', gate, qubit: parseInt(m[3]), line: lineNum });
      }
      continue;
    }

    // CX / CNOT
    m = line.match(/qc\.(?:cx|cnot)\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
    if (m) {
      ops.push({ type: 'cnot', control: parseInt(m[1]), target: parseInt(m[2]), line: lineNum });
      continue;
    }

    // CZ gate — simulate as H + CX + H on target
    m = line.match(/qc\.cz\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
    if (m) {
      const ctrl = parseInt(m[1]);
      const tgt  = parseInt(m[2]);
      ops.push({ type: '1q', gate: 'H', qubit: tgt, line: lineNum });
      ops.push({ type: 'cnot', control: ctrl, target: tgt, line: lineNum });
      ops.push({ type: '1q', gate: 'H', qubit: tgt, line: lineNum });
      continue;
    }

    // SWAP
    m = line.match(/qc\.swap\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
    if (m) {
      ops.push({ type: 'swap', qubitA: parseInt(m[1]), qubitB: parseInt(m[2]), line: lineNum });
      continue;
    }

    // Barrier (no-op, skip)
    if (line.startsWith('qc.barrier')) continue;

    // measure() – detect to confirm measurement present
    // (simulation always measures at the end, so we just confirm)
    if (line.startsWith('qc.measure')) continue;
  }

  // Basic validation
  ops.forEach(op => {
    if (op.type === '1q' && (op.qubit < 0 || op.qubit >= numQubits)) {
      errors.push(`Line ${op.line}: Qubit index ${op.qubit} out of range for ${numQubits}-qubit circuit.`);
    }
    if (op.type === 'cnot' && (op.control >= numQubits || op.target >= numQubits)) {
      errors.push(`Line ${op.line}: CNOT qubit index out of range for ${numQubits}-qubit circuit.`);
    }
  });

  return { numQubits, numClassical, numShots, ops, errors };
}

/* ================================================================
   QUANTUM SIMULATION ENGINE
   Uses the existing QuantumCircuitEngine from backendAdapters.js
   ================================================================ */

function simulateCircuit(parsed) {
  const { numQubits, numShots, ops } = parsed;
  const engine = new QuantumCircuitEngine(numQubits);

  for (const op of ops) {
    if (op.type === '1q' && SIM_GATES[op.gate]) {
      engine.apply1QGate(SIM_GATES[op.gate], op.qubit);
    } else if (op.type === 'cnot') {
      engine.applyCNOT(op.control, op.target);
    } else if (op.type === 'swap') {
      engine.applySWAP(op.qubitA, op.qubitB);
    }
  }

  const rawCounts = engine.sampleShots(numShots);
  const exactProbs = engine.getExactProbabilities();

  // Little-endian Qiskit bit ordering
  const counts = {};
  const probabilities = {};
  for (let i = 0; i < engine.dim; i++) {
    const beBits = i.toString(2).padStart(numQubits, '0');
    const leKey = beBits.split('').reverse().join('');
    counts[leKey] = rawCounts[i];
    probabilities[leKey] = parseFloat((exactProbs[i]).toFixed(4));
  }

  // Filter out zero-count entries for display
  const filteredCounts = {};
  Object.entries(counts).forEach(([k, v]) => { if (v > 0) filteredCounts[k] = v; });

  return {
    counts: filteredCounts,
    allCounts: counts,
    probabilities,
    statevector: engine.state.map(c => ({ real: c.re, imag: c.im })),
    numQubits,
    numShots
  };
}

/* ================================================================
   RUN CODE
   ================================================================ */

function runCode() {
  if (!activeChallengeId) {
    alert('Please select a challenge first.');
    return;
  }

  const code = document.getElementById('codeEditor').value;
  if (!code.trim()) {
    alert('Your code editor is empty. Write some Qiskit code first!');
    return;
  }

  // Switch to output tab
  switchChallengeTab('output');
  clearOutput();

  const btnRun = document.getElementById('btnRun');
  btnRun.disabled = true;
  btnRun.textContent = 'Running...';

  // Simulate async execution
  setTimeout(() => {
    try {
      appendOutput('[ QuantNexus Quantum Simulator ]', 'out-header');
      appendOutput(`Running ${document.getElementById('chDetailTitle').textContent}...`, 'out-info');
      appendOutputDivider();

      // Parse code
      const parsed = parseQiskitCode(code);

      // Show parse warnings/errors
      if (parsed.errors.length > 0) {
        parsed.errors.forEach(err => appendOutput('[Warning] ' + err, 'out-warn'));
        appendOutputDivider();
      }

      appendOutput(`Circuit: ${parsed.numQubits} qubit(s), ${parsed.ops.length} gate(s), ${parsed.numShots} shots`, 'out-info');

      // List gates
      const gatesSummary = parsed.ops.map(op => {
        if (op.type === '1q') return `${op.gate}(${op.qubit})`;
        if (op.type === 'cnot') return `CX(${op.control},${op.target})`;
        if (op.type === 'swap') return `SWAP(${op.qubitA},${op.qubitB})`;
        return '?';
      }).join(', ');
      if (gatesSummary) appendOutput(`Gates: ${gatesSummary}`, 'out-info');

      appendOutputDivider();

      // Simulate
      const simResult = simulateCircuit(parsed);

      // Print counts (like Python print("Counts:", counts))
      const countsStr = JSON.stringify(simResult.counts).replace(/"/g, "'");
      appendOutput(`Counts: ${countsStr}`, 'out-result');

      appendOutputDivider();

      // Distribution breakdown
      appendOutput('Measurement Distribution:', 'out-info');
      const sortedEntries = Object.entries(simResult.counts).sort((a, b) => b[1] - a[1]);
      sortedEntries.forEach(([state, count]) => {
        const pct = ((count / parsed.numShots) * 100).toFixed(1);
        const bar = '█'.repeat(Math.round(count / parsed.numShots * 20));
        appendOutput(`  |${state}⟩  ${bar} ${count} shots (${pct}%)`, 'out-data');
      });

      appendOutputDivider();
      appendOutput('Execution complete.', 'out-success');

    } catch (err) {
      appendOutput('ERROR: ' + err.message, 'out-error');
      appendOutput('Check your code for syntax issues. (Note: This is a browser simulator — not all Python/Qiskit features are supported.)', 'out-warn');
    }

    btnRun.disabled = false;
    btnRun.textContent = 'Run Code';
  }, 600 + Math.random() * 400);
}

/* ================================================================
   SUBMIT CODE — AUTO-GRADER
   ================================================================ */

function submitCode() {
  if (!activeChallengeId) {
    alert('Please select a challenge first.');
    return;
  }

  const code = document.getElementById('codeEditor').value;
  if (!code.trim()) {
    alert('Your code editor is empty. Write some Qiskit code first!');
    return;
  }

  switchChallengeTab('output');
  clearOutput();
  document.getElementById('resultCard').classList.add('hidden');

  const btnSubmit = document.getElementById('btnSubmit');
  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Grading...';

  setTimeout(() => {
    try {
      appendOutput('[ QuantNexus Auto-Grader ]', 'out-header');
      appendOutput('Parsing and simulating your code...', 'out-info');

      const parsed = parseQiskitCode(code);

      if (parsed.errors.length > 0) {
        parsed.errors.forEach(err => appendOutput('[Warning] ' + err, 'out-warn'));
      }

      appendOutput(`Circuit: ${parsed.numQubits} qubit(s), ${parsed.ops.length} gate(s)`, 'out-info');
      appendOutputDivider();

      // Run with 2048 shots for more accurate grading
      const gradingParsed = { ...parsed, numShots: 2048 };
      const simResult = simulateCircuit(gradingParsed);

      // Display results
      const countsStr = JSON.stringify(simResult.counts).replace(/"/g, "'");
      appendOutput(`Counts: ${countsStr}`, 'out-result');
      appendOutputDivider();

      // Grade
      const ch = QUANTUM_CHALLENGES.find(c => c.id === activeChallengeId);
      const gradeResult = ch.grader(parsed.ops, parsed.numQubits, gradingParsed.numShots, simResult.counts);

      if (gradeResult.pass) {
        appendOutput('PASSED!', 'out-success');
        appendOutput(gradeResult.message, 'out-success');
        appendOutputDivider();
        appendOutput(`Score: +${gradeResult.score} points`, 'out-success');

        // Update progress
        const prog = challengeProgress[activeChallengeId];
        const isFirstPass = prog.status !== 'passed';
        prog.status = 'passed';
        prog.score = gradeResult.score;
        prog.attempts = (prog.attempts || 0) + 1;
        prog.lastCode = code;
        saveChallengeProgress(currentUser.email, challengeProgress);

        // Update UI
        showResultCard(true, gradeResult.score, gradeResult.message, isFirstPass);
        renderChallengeList();
        updateProgressHeader();
        updateStatusBadge('passed');
        updateChallengesDashboardWidget();

      } else {
        appendOutput('NOT PASSED', 'out-error');
        appendOutput(gradeResult.message, 'out-warn');
        appendOutputDivider();
        appendOutput('Review the problem description and hints, then try again.', 'out-info');

        // Update progress to attempted
        const prog = challengeProgress[activeChallengeId];
        if (prog.status === 'not_started') prog.status = 'attempted';
        prog.attempts = (prog.attempts || 0) + 1;
        prog.lastCode = code;
        saveChallengeProgress(currentUser.email, challengeProgress);

        showResultCard(false, 0, gradeResult.message, false);
        renderChallengeList();
        updateStatusBadge('attempted');
      }

    } catch (err) {
      appendOutput('RUNTIME ERROR: ' + err.message, 'out-error');
      appendOutput('Check your code for issues.', 'out-warn');
    }

    btnSubmit.disabled = false;
    btnSubmit.textContent = 'Submit';
  }, 800 + Math.random() * 600);
}

/* ================================================================
   RESULT CARD
   ================================================================ */

function showResultCard(pass, score, message, isNew) {
  const card = document.getElementById('resultCard');
  card.classList.remove('hidden', 'result-pass', 'result-fail');
  card.classList.add(pass ? 'result-pass' : 'result-fail');

  document.getElementById('resultIcon').textContent = pass ? '✓' : '✗';
  document.getElementById('resultTitle').textContent = pass
    ? (isNew ? 'Challenge Passed!' : 'Already Solved — Passed Again!')
    : 'Not Passed Yet';
  document.getElementById('resultDetail').textContent = message;
  document.getElementById('resultScore').textContent = pass ? `+${score}` : '';
}

function updateStatusBadge(status) {
  const badge = document.getElementById('chStatusBadge');
  if (!badge) return;
  if (status === 'passed') {
    badge.textContent = 'Passed';
    badge.className = 'ch-status-badge status-passed';
  } else if (status === 'attempted') {
    badge.textContent = 'Attempted';
    badge.className = 'ch-status-badge status-attempted';
  }
}

/* ================================================================
   DASHBOARD WIDGET UPDATE
   Updates the challenges progress in the dashboard shortcut card
   (if navigated back to dashboard after solving a challenge).
   ================================================================ */

function updateChallengesDashboardWidget() {
  // This updates a global key read by dashboard.js
  const solved = Object.values(challengeProgress).filter(p => p.status === 'passed').length;
  if (currentUser) {
    const key = 'qn_challenges_solved_' + currentUser.email;
    localStorage.setItem(key, solved.toString());
  }
}

/* ================================================================
   TOTAL SCORE HELPER (exported for dashboard)
   ================================================================ */

function getChallengesScore(email) {
  const prog = getChallengeProgress(email);
  return Object.values(prog).reduce((sum, p) => sum + (p.score || 0), 0);
}

function getChallengesSolved(email) {
  const prog = getChallengeProgress(email);
  return Object.values(prog).filter(p => p.status === 'passed').length;
}

// Expose for dashboard.js
window.getChallengesScore = getChallengesScore;
window.getChallengesSolved = getChallengesSolved;
window.QUANTUM_CHALLENGES = QUANTUM_CHALLENGES;
