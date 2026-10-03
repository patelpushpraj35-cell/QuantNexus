/**
 * QuantNexus – Chapter & Content Data
 * Source: SIH 26140 Learning Dataset
 */

const CHAPTERS_DATA = [
  {
    id: 1,
    title: "Introduction to Quantum Computing",
    difficulty: "Beginner",
    icon: "",
    overview: "Learn what quantum computing is, how it differs from classical computing, and why concepts such as qubits, superposition and entanglement need interactive learning.",
    objectives: [
      "Understand the purpose of quantum computing.",
      "Know the difference between a classical bit and a qubit.",
      "Recognize the core terms used throughout the platform."
    ],
    sections: [
      {
        id: "1.1",
        title: "What is Quantum Computing?",
        explanation: "Quantum computing is a fundamentally different way of processing information. Instead of classical bits (0s and 1s), it uses quantum-mechanical phenomena like superposition and entanglement to perform calculations that would be impossibly slow on traditional computers.",
        analogy: "Think of a classical computer like a maze-runner who tries every path one at a time. A quantum computer is like a magic maze-runner who can try ALL paths at the same time and instantly finds the exit.",
        example: "Google's quantum computer Sycamore solved a problem in 200 seconds that would take the world's fastest classical supercomputer 10,000 years!",
        points: [
          { term: "Quantum Computing", detail: "Processing info using quantum-mechanical phenomena (superposition, entanglement)" },
          { term: "Quantum Information", detail: "Data encoded in quantum systems such as qubits, photons, or trapped ions" },
          { term: "Why It's Different", detail: "Quantum computers can be in many states simultaneously, solving certain problems exponentially faster" },
          { term: "Where It's Useful", detail: "Drug discovery, cryptography, materials science, optimization problems, AI acceleration" }
        ],
        interactive: "flip"
      },
      {
        id: "1.2",
        title: "Classical vs Quantum Computing",
        explanation: "Classical computers use binary digits — bits that are either 0 or 1. Quantum computers use qubits, which can exist in a combination of 0 and 1 at the same time (superposition), and can be correlated with other qubits (entanglement). This gives quantum computers an exponential advantage for certain tasks.",
        analogy: "A classical bit is like a coin that must be either heads (1) or tails (0). A qubit is like a coin spinning in the air — it's simultaneously heads AND tails until you look at it (measure it).",
        example: "With 3 classical bits you can represent 1 of 8 values. With 3 qubits in superposition, you can represent all 8 values simultaneously!",
        points: [
          { term: "Classical Bit", detail: "Exactly 0 or 1 — binary, deterministic, physical switches (transistors)" },
          { term: "Quantum Bit (Qubit)", detail: "Can be |0⟩, |1⟩, or any superposition α|0⟩ + β|1⟩" },
          { term: "Classical Logic Gates", detail: "AND, OR, NOT — deterministic, irreversible operations on bits" },
          { term: "Quantum Gates", detail: "Unitary operations — reversible transformations on qubits" },
          { term: "Conceptual Comparison", detail: "Classical = serial/parallel binary; Quantum = simultaneous superposition + interference" }
        ],
        interactive: "comparison"
      },
      {
        id: "1.3",
        title: "Why Learn Quantum Computing Interactively?",
        explanation: "Quantum concepts are highly abstract. Equations alone don't build intuition. An interactive platform lets you build circuits, run simulations, and see visual results — making the invisible quantum world tangible and understandable.",
        analogy: "Reading about swimming vs. actually getting in the water. You learn quantum computing best by doing — building circuits and watching quantum states evolve.",
        example: "When you apply a Hadamard gate to |0⟩ in the simulator, you immediately see the statevector split equally between |0⟩ and |1⟩ — that's superposition made visible!",
        points: [
          { term: "Theory", detail: "Mathematical foundations — bra-ket notation, probability amplitudes, unitary matrices" },
          { term: "Interactive Circuit", detail: "Drag-and-drop gates onto qubit wires and see the circuit form in real time" },
          { term: "Simulation", detail: "Run your circuit on a software quantum simulator (no hardware needed!)" },
          { term: "Visualization", detail: "See histograms, statevectors, and Bloch sphere views of your results" },
          { term: "Practice", detail: "Quizzes and challenges reinforce your understanding after each concept" }
        ],
        interactive: "flip"
      },
      {
        id: "1.4",
        title: "Quantum Computing Vocabulary",
        explanation: "Before building quantum circuits, it's essential to speak the language. These are the 8 core terms you'll encounter throughout this course. Master these and everything else clicks into place.",
        analogy: "Learning quantum vocabulary is like learning musical notation before playing an instrument — it gives you the shared language to read, write, and discuss quantum ideas precisely.",
        example: "When someone says 'apply an H gate to qubit 0 and measure', you'll know exactly what that means after this section!",
        points: [
          { term: "Qubit", detail: "The quantum bit — basic unit of quantum information; can be in superposition" },
          { term: "Gate", detail: "A quantum operation applied to one or more qubits (e.g., H, X, CNOT)" },
          { term: "Circuit", detail: "An ordered sequence of quantum gates applied to qubits" },
          { term: "Measurement", detail: "Reading the state of a qubit, collapsing superposition to 0 or 1" },
          { term: "State", detail: "The complete quantum description of a system (e.g., |0⟩, |1⟩, or |+⟩)" },
          { term: "Superposition", detail: "A qubit existing in a combination of |0⟩ and |1⟩ simultaneously" },
          { term: "Entanglement", detail: "Quantum correlation between qubits — measuring one instantly affects the other" },
          { term: "Algorithm", detail: "A step-by-step quantum procedure designed to solve a specific problem" }
        ],
        interactive: "flip"
      }
    ],
    takeaways: [
      "Quantum computing processes information using quantum phenomena (superposition, entanglement).",
      "Classical bits are 0 or 1; qubits can be in a superposition of both simultaneously.",
      "Core vocabulary: qubit, gate, circuit, measurement, state, superposition, entanglement, algorithm."
    ]
  },
  {
    id: 2,
    title: "Qubits and Quantum States",
    difficulty: "Beginner",
    icon: "",
    overview: "Understand the qubit, computational basis states, state representation and the basic idea of a statevector.",
    objectives: [
      "Identify |0⟩ and |1⟩ as computational basis states.",
      "Understand the purpose of a statevector display.",
      "Connect circuit operations with changes in quantum state."
    ],
    sections: [
      {
        id: "2.1",
        title: "What is a Qubit?",
        explanation: "A qubit (quantum bit) is the fundamental unit of quantum information. Unlike a classical bit that is definitively 0 or 1, a qubit's state is described by a complex vector. It can be prepared in a specific state, transformed by quantum gates, and ultimately measured to extract a classical 0 or 1.",
        analogy: "A qubit is like a 3D compass needle — it can point in any direction on a sphere (called the Bloch sphere), not just up (|1⟩) or down (|0⟩).",
        example: "Physical qubit implementations include: superconducting circuits (IBM, Google), trapped ions (IonQ), photons, and quantum dots. Each works differently but obeys the same quantum rules.",
        points: [
          { term: "Qubit Definition", detail: "A two-level quantum system described by the state α|0⟩ + β|1⟩, where α,β are complex amplitudes and |α|²+|β|²=1" },
          { term: "Single-Qubit Circuit", detail: "The simplest quantum circuit: one qubit wire with gates applied in left-to-right order, ending in measurement" },
          { term: "Qubit as Quantum Information", detail: "A qubit carries quantum information — it can participate in superposition and entanglement, unlike classical bits" }
        ],
        interactive: "flip"
      },
      {
        id: "2.2",
        title: "Computational Basis States",
        explanation: "The two computational basis states |0⟩ and |1⟩ are the quantum equivalent of classical 0 and 1. They are the standard 'reference points' for all quantum computations. Every qubit state can be expressed as a combination (superposition) of these two basis states.",
        analogy: "|0⟩ and |1⟩ are like the primary colors — all other qubit states are 'mixed' from them, just as orange is red + yellow.",
        example: "In Dirac (bra-ket) notation: |0⟩ = [1, 0] and |1⟩ = [0, 1] as column vectors. The superposition |+⟩ = (|0⟩ + |1⟩)/√2 = [1/√2, 1/√2].",
        points: [
          { term: "|0⟩ (ket zero)", detail: "Ground state / spin-up — represented as column vector [1, 0]. Classical analog: bit = 0" },
          { term: "|1⟩ (ket one)", detail: "Excited state / spin-down — represented as column vector [0, 1]. Classical analog: bit = 1" },
          { term: "Basis-State Notation", detail: "Dirac's 'ket' notation |ψ⟩ represents a quantum state vector. The '|' and '⟩' are just brackets." },
          { term: "Reading Basis States", detail: "Measurement collapses any state to |0⟩ or |1⟩. The probability of each outcome depends on the amplitudes." }
        ],
        interactive: "flip"
      },
      {
        id: "2.3",
        title: "Quantum State Representation",
        explanation: "A qubit state is fully described by its statevector: a list of complex amplitudes, one for each basis state. For one qubit, the statevector has 2 entries. For n qubits, it has 2ⁿ entries — this exponential growth is why quantum computers are so powerful for certain problems.",
        analogy: "The statevector is like the recipe for a quantum state — it tells you the exact 'ingredients' (amplitudes) of each possible classical outcome.",
        example: "After applying an H gate to |0⟩: statevector = [0.707, 0.707]. Squaring these amplitudes gives probabilities: 50% chance of measuring 0, 50% chance of measuring 1.",
        points: [
          { term: "State Representation", detail: "A qubit state ψ = α|0⟩ + β|1⟩ is fully described by the complex numbers α and β" },
          { term: "Amplitudes", detail: "Complex numbers α, β where |α|² is the probability of measuring |0⟩ and |β|² is the probability of measuring |1⟩" },
          { term: "Statevector Concept", detail: "A column vector [α, β] that completely describes the quantum state — the simulator shows this after each circuit run" },
          { term: "Reading State Information", detail: "Look at amplitude magnitudes for probabilities; phase (angle) matters for interference effects" }
        ],
        interactive: "flip"
      },
      {
        id: "2.4",
        title: "State Changes",
        explanation: "Quantum gates transform qubit states by applying matrix multiplication to the statevector. Each gate is a reversible transformation. You can compare the state before and after a gate to understand its effect — this is the fundamental way we learn what quantum gates do.",
        analogy: "Applying a quantum gate is like rotating the compass needle on the Bloch sphere. The X gate flips it from 'north' to 'south' (|0⟩ to |1⟩), the H gate rotates it to 'east' (superposition).",
        example: "X gate on |0⟩ → |1⟩ (bit flip). H gate on |0⟩ → |+⟩ = (|0⟩+|1⟩)/√2 (superposition). Z gate on |+⟩ → |−⟩ = (|0⟩−|1⟩)/√2 (phase flip).",
        points: [
          { term: "Initial State", detail: "All qubits start in |0⟩ by default. You can also initialize to |1⟩ by applying an X gate first." },
          { term: "Gate Operation", detail: "Mathematically: new_state = Gate_Matrix × old_state. All gate matrices are unitary (reversible)." },
          { term: "Resulting State", detail: "The output statevector after applying the gate — shown in the simulator results panel." },
          { term: "State Comparison", detail: "Compare before/after statevectors to understand exactly what each gate does to the qubit." }
        ],
        interactive: "flip"
      },
      {
        id: "2.5",
        title: "Interactive State Explorer",
        explanation: "Now it's time to explore! In the quantum lab, you prepare a qubit in |0⟩, apply a gate (H, X, or Z), run the circuit, and inspect the resulting state. This hands-on process builds an intuition for how quantum states behave under different operations.",
        analogy: "This is like a chemistry lab — you mix reagents (gates) and observe the result. Each experiment deepens your understanding of quantum behavior.",
        example: "Try this: Start with |0⟩ → Apply H → Measure 1024 shots. You'll get approximately 512 zeros and 512 ones — equal probability, that's superposition!",
        points: [
          { term: "Prepare |0⟩", detail: "Every circuit starts with all qubits in the ground state |0⟩ — the quantum equivalent of zeroing your memory." },
          { term: "Apply H/X/Z", detail: "H creates superposition. X flips the bit (|0⟩↔|1⟩). Z adds a phase flip (changes sign of |1⟩ amplitude)." },
          { term: "Run", detail: "Execute the circuit on the simulator with a chosen number of shots (repetitions) to collect statistics." },
          { term: "Inspect Result", detail: "View the statevector display, measurement histogram, and probability distribution output from the simulator." }
        ],
        interactive: "flip"
      }
    ],
    takeaways: [
      "A qubit can be in state |0⟩, |1⟩, or any superposition α|0⟩ + β|1⟩.",
      "The statevector [α, β] completely describes a qubit's quantum state.",
      "Quantum gates are matrix operations that transform (rotate) the statevector."
    ]
  },
  {
    id: 3,
    title: "Superposition and Measurement",
    difficulty: "Beginner",
    icon: "",
    overview: "Learn superposition using simple circuits and understand how measurement and repeated shots produce observable outcome distributions.",
    objectives: [
      "Explain the introductory idea of superposition.",
      "Understand why repeated shots (repetitions) are useful.",
      "Read and interpret a measurement histogram."
    ],
    sections: [
      {
        id: "3.1",
        title: "Concept of Superposition",
        explanation: "Superposition is one of the most fundamental and counterintuitive quantum phenomena. A qubit in superposition exists in both |0⟩ and |1⟩ simultaneously — not one or the other, but truly both at once. This is not a lack of knowledge about the state; the qubit genuinely has no definite value until it is measured.",
        analogy: "Imagine a magic coin that is simultaneously heads AND tails while in the air. The moment it lands (measurement), it becomes definitely heads or definitely tails. Superposition is the 'in-the-air' state.",
        example: "Schrödinger's Cat is a famous thought experiment: a cat in a box is 'both alive and dead' until you open the box (measure). A qubit in superposition is the quantum equivalent — both 0 and 1 until measured.",
        points: [
          { term: "Meaning of Superposition", detail: "A quantum state that is a linear combination of multiple basis states — not just one. Written as α|0⟩ + β|1⟩." },
          { term: "Single-Qubit Example", detail: "Applying H to |0⟩ creates |+⟩ = (|0⟩+|1⟩)/√2 — a perfect 50/50 superposition." },
          { term: "State Before Measurement", detail: "Before measurement, the qubit TRULY has no definite value. It's a quantum superposition, not just unknown information." }
        ],
        interactive: "flip"
      },
      {
        id: "3.2",
        title: "Hadamard Gate",
        explanation: "The Hadamard gate (H) is the most important single-qubit gate for creating superposition. It transforms |0⟩ into an equal superposition of |0⟩ and |1⟩. Applied to |1⟩, it creates the opposite phase superposition. The H gate is the quantum equivalent of flipping a coin.",
        analogy: "H is the quantum 'coin-flipper'. Applying H to |0⟩ puts the qubit into a perfect 50/50 superposition — like flipping a perfectly fair coin and catching it mid-air.",
        example: "H gate matrix: [[1,1],[1,-1]]/√2. H|0⟩ = |+⟩ = (|0⟩+|1⟩)/√2. H|1⟩ = |−⟩ = (|0⟩−|1⟩)/√2. Apply H twice: you get back to the original state!",
        points: [
          { term: "H Gate", detail: "Hadamard gate — maps |0⟩ to |+⟩ and |1⟩ to |−⟩. Self-inverse: H² = I (identity)." },
          { term: "Apply H to |0⟩", detail: "Result: |+⟩ = (|0⟩+|1⟩)/√2. Both amplitudes are 1/√2 ≈ 0.707." },
          { term: "Expected Probability", detail: "Since |1/√2|² = 0.5, measuring the resulting state gives 0 with 50% probability and 1 with 50% probability." },
          { term: "Interactive Example", detail: "Build: |0⟩ → H → Measure. Run 1000 shots. Observe approximately 500 '0's and 500 '1's in the histogram." }
        ],
        interactive: "flip"
      },
      {
        id: "3.3",
        title: "Measurement",
        explanation: "Measurement is the bridge between the quantum world and our classical world. When you measure a qubit in superposition, it 'collapses' to a definite classical state — either 0 or 1. The probability of each outcome is the square of the corresponding amplitude (Born rule).",
        analogy: "Measurement is like finally looking at Schrödinger's cat — the quantum uncertainty collapses and you get a definite answer (alive or dead, 0 or 1).",
        example: "A qubit in state |+⟩ = 0.707|0⟩ + 0.707|1⟩, measured: probability of getting 0 = |0.707|² = 0.5 (50%); probability of getting 1 = |0.707|² = 0.5 (50%).",
        points: [
          { term: "Measurement Operation", detail: "Projective measurement in the computational basis — observes the qubit and extracts a classical bit (0 or 1)." },
          { term: "Classical Outcome", detail: "After measurement you get a classical result: 0 or 1. The quantum superposition is destroyed (collapsed)." },
          { term: "Measurement in a Circuit", detail: "In circuit diagrams, measurement is shown as a meter symbol (⊠) at the end of a qubit wire." }
        ],
        interactive: "flip"
      },
      {
        id: "3.4",
        title: "Shots and Probability",
        explanation: "Because quantum measurement is probabilistic, running a circuit once tells you very little. To estimate probabilities, you run the circuit many times (shots) and count the outcomes. More shots = more accurate probability estimates. This is fundamental to quantum computing experiments.",
        analogy: "Shots are like coin flips. One flip tells you little. Flip a coin 1000 times and you'll see ~500 heads and ~500 tails, demonstrating it's a fair coin. Same idea for qubits!",
        example: "Running |0⟩→H→Measure with 10 shots might give 7 zeros and 3 ones (variance is high). With 10,000 shots you'll get very close to 5000/5000.",
        points: [
          { term: "Shots", detail: "The number of times a quantum circuit is run. More shots = better statistics. Common: 1024 or 8192 shots." },
          { term: "Counts", detail: "Raw count of how many times each outcome ('0', '1', '00', etc.) appeared in all the shots." },
          { term: "Probability", detail: "Estimated from counts: P(outcome) = count(outcome) / total_shots. Approaches true probability as shots → ∞." },
          { term: "Repeated Execution", detail: "Quantum circuits must be run repeatedly because each run has inherent randomness (Born rule). No way around it!" }
        ],
        interactive: "flip"
      },
      {
        id: "3.5",
        title: "Measurement Histogram",
        explanation: "A measurement histogram is the standard visualization for quantum circuit results. Each bar represents a possible measurement outcome (e.g., '0' or '1' for one qubit, '00', '01', '10', '11' for two qubits). The height shows how many times that outcome occurred across all shots.",
        analogy: "A histogram is like a tally chart for your quantum experiment results — it shows at a glance which outcomes are likely and which are rare.",
        example: "For a Bell state circuit (two entangled qubits), the histogram shows only two bars: '00' at 50% and '11' at 50%. The '01' and '10' bars are zero — that's entanglement!",
        points: [
          { term: "Bars", detail: "Each bar represents one possible measurement outcome. Bar height = count (or probability)." },
          { term: "Outcome Labels", detail: "Labels on x-axis show the bit string of the measurement result. '0'=zero qubit, '1'=one qubit, '01'=two qubits." },
          { term: "Counts", detail: "Y-axis shows the raw count of that outcome. Can also be shown as probabilities (count/shots)." },
          { term: "Probability Interpretation", detail: "A tall bar means that outcome is likely. Equal bars (for H on |0⟩) mean equal probability — superposition at work." }
        ],
        interactive: "flip"
      },
      {
        id: "3.6",
        title: "Understanding Results",
        explanation: "Comparing what you expect from theory with what the simulator actually produces is the core scientific skill of quantum computing. Slight differences from perfect theoretical values are due to sampling variation (finite shots). True hardware also introduces noise and errors.",
        analogy: "If you expect 50/50 heads/tails but got 48/52, that's just sampling variation — not evidence the coin is unfair. Same principle applies to quantum measurement results.",
        example: "Expected: |0⟩→H→Measure gives exactly 50% zeros. Actual (1024 shots): might be 503 zeros (49.1%) and 521 ones (50.9%). That difference is normal sampling variation.",
        points: [
          { term: "Expected vs Observed", detail: "Theory predicts exact probabilities; simulation gives approximate counts due to sampling randomness." },
          { term: "Sampling Variation", detail: "The difference between expected and observed values decreases as shots increase (law of large numbers)." },
          { term: "Result Interpretation", detail: "Focus on the pattern and relative heights, not exact numbers. A 48/52 split still confirms superposition." }
        ],
        interactive: "flip"
      }
    ],
    takeaways: [
      "Superposition is a qubit existing in multiple states simultaneously — not just unknown.",
      "The Hadamard gate creates an equal superposition from |0⟩, giving 50/50 measurement odds.",
      "Run many shots to build a histogram that approximates the true probability distribution."
    ]
  },
  {
    id: 4,
    title: "Quantum Gates and Circuits",
    difficulty: "Beginner",
    icon: "",
    overview: "Learn common quantum gates and how gates are arranged into single- and multi-qubit circuits.",
    objectives: [
      "Recognize and understand common single-qubit and two-qubit gates.",
      "Read a quantum circuit diagram.",
      "Build a basic multi-qubit circuit."
    ],
    sections: [
      {
        id: "4.1",
        title: "Quantum Gates",
        explanation: "Quantum gates are the operations that manipulate qubits. Every gate is a reversible, unitary transformation — meaning information is never lost. Gates are the quantum equivalent of classical logic gates, but they can create superposition and entanglement, which classical gates cannot.",
        analogy: "Quantum gates are like musical notes — individually simple, but arranged into a circuit (musical score), they create complex, powerful compositions (algorithms).",
        example: "A simple circuit: |0⟩ →[H]→[X]→[Measure]. First H creates superposition, then X flips the amplitudes. The result is a flipped superposition state.",
        points: [
          { term: "Gate Concept", detail: "A quantum gate is a unitary matrix applied to qubit(s). Must be reversible (no information loss). Written as a box on a circuit wire." },
          { term: "Gate Sequence", detail: "Gates applied left to right in time. The order matters — gates generally don't commute: HX ≠ XH." },
          { term: "Gate Placement", detail: "In circuit diagrams, gates sit on qubit wires at specific time steps. Multi-qubit gates span multiple wires." }
        ],
        interactive: "flip"
      },
      {
        id: "4.2",
        title: "H Gate (Hadamard)",
        explanation: "The Hadamard gate is the most used single-qubit gate. It creates superposition and is the starting point for most quantum algorithms. H maps basis states to equal superpositions and is its own inverse (H² = I). It's the quantum equivalent of a coin flip.",
        analogy: "The H gate is like a perfectly balanced fork in the road — it sends a qubit down both paths with equal probability.",
        example: "H|0⟩ = |+⟩ = (|0⟩+|1⟩)/√2 → measure → 50% '0', 50% '1'. H|1⟩ = |−⟩ = (|0⟩−|1⟩)/√2 → measure → also 50%/50%, but phase differs!",
        points: [
          { term: "H Operation", detail: "Matrix: [[1,1],[1,-1]]/√2. Rotates qubit state by 180° about the X+Z axis on the Bloch sphere." },
          { term: "Single-Qubit Circuit", detail: "Simplest use: |0⟩ → [H] → [M]. Demonstrates superposition with a 50/50 output histogram." },
          { term: "Simulation", detail: "Run |0⟩→H→M with 1024 shots. Statevector shows [0.707, 0.707]. Histogram shows ~512 each outcome." }
        ],
        interactive: "flip"
      },
      {
        id: "4.3",
        title: "X, Y and Z Gates",
        explanation: "The Pauli gates (X, Y, Z) are three fundamental single-qubit gates. X is the quantum bit-flip (like NOT). Y combines a bit-flip and phase-flip. Z adds a phase flip — it changes the sign of the |1⟩ amplitude without changing measurement probabilities. All three are their own inverses.",
        analogy: "Think of X, Y, Z as 180° rotations around the X, Y, and Z axes of the Bloch sphere — they rotate the qubit state like rotating a 3D object.",
        example: "X|0⟩ = |1⟩ (flip). X|1⟩ = |0⟩ (flip back). Z|+⟩ = |−⟩ (phase flip, no change in measurement probs). Z|0⟩ = |0⟩ (Z doesn't affect |0⟩ — zero phase!).",
        points: [
          { term: "X Gate (NOT)", detail: "Bit-flip: |0⟩↔|1⟩. Matrix: [[0,1],[1,0]]. Like classical NOT. X² = I." },
          { term: "Y Gate", detail: "Combined bit+phase flip. Matrix: [[0,-i],[i,0]]. Y² = I. Rotates around Bloch Y-axis." },
          { term: "Z Gate", detail: "Phase-flip: |0⟩→|0⟩, |1⟩→−|1⟩. Matrix: [[1,0],[0,-1]]. No effect on measurement probs of basis states." },
          { term: "State Changes", detail: "These gates change the direction of the statevector on the Bloch sphere — a key conceptual tool for intuition." }
        ],
        interactive: "flip"
      },
      {
        id: "4.4",
        title: "S and T Gates",
        explanation: "The S gate (phase gate) and T gate (π/8 gate) are single-qubit phase gates. They don't change measurement probabilities of basis states, but they change the phase relationship between amplitudes — critical for interference effects in algorithms like Quantum Fourier Transform.",
        analogy: "S and T gates are like fine-tuning dials — they don't change what your qubit 'looks like' when measured directly, but they subtly alter its quantum relationship with other qubits, enabling interference.",
        example: "S gate: |+⟩ → |i⟩ = (|0⟩+i|1⟩)/√2. T gate: |+⟩ → (|0⟩+e^(iπ/4)|1⟩)/√2. Used in QFT and algorithms that exploit phase interference.",
        points: [
          { term: "S Gate", detail: "Phase gate: |0⟩→|0⟩, |1⟩→i|1⟩. S = [[1,0],[0,i]]. S² = Z. Quarter-turn around Z-axis on Bloch sphere." },
          { term: "T Gate", detail: "π/8 gate: |0⟩→|0⟩, |1⟩→e^(iπ/4)|1⟩. T = [[1,0],[0,e^(iπ/4)]]. T⁴ = Z. T² = S." },
          { term: "Phase Concept", detail: "Phase gates don't change |α|² or |β|² (probabilities), but they change the relative phase between amplitudes — critical for quantum interference." }
        ],
        interactive: "flip"
      },
      {
        id: "4.5",
        title: "CNOT Gate",
        explanation: "The CNOT (Controlled-NOT) gate is the most important two-qubit gate. It has a control qubit and a target qubit. If the control is |1⟩, it flips the target. If the control is |0⟩, the target is unchanged. CNOT is essential for creating entanglement.",
        analogy: "CNOT is like a quantum conditional: 'IF the control qubit is 1, THEN flip the target qubit.' It's the quantum version of a conditional statement in programming.",
        example: "CNOT|00⟩=|00⟩, CNOT|01⟩=|01⟩, CNOT|10⟩=|11⟩, CNOT|11⟩=|10⟩. Combined with H: H on q0 then CNOT creates a Bell state (entangled!).",
        points: [
          { term: "Control Qubit", detail: "The qubit that 'decides' — if it's |1⟩, the target is flipped. If |0⟩, nothing happens to the target." },
          { term: "Target Qubit", detail: "The qubit that gets flipped (X gate applied) when the control is |1⟩." },
          { term: "CNOT Placement", detail: "In circuit diagrams: control is shown as a filled dot (•), target as ⊕ (XOR symbol). A vertical line connects them." },
          { term: "Two-Qubit Circuit", detail: "CNOT is the key two-qubit gate. Combined with H, it creates the Bell state — the simplest entangled state." }
        ],
        interactive: "flip"
      },
      {
        id: "4.6",
        title: "SWAP Gate",
        explanation: "The SWAP gate exchanges the complete quantum states of two qubits. It's equivalent to three CNOT gates applied in sequence. SWAP is used to move quantum information between qubits, especially important in hardware where not all qubits are directly connected.",
        analogy: "SWAP is like swapping the contents of two glasses — after SWAP, each glass has what the other had. If qubit 0 was |1⟩ and qubit 1 was |0⟩, after SWAP, qubit 0 is |0⟩ and qubit 1 is |1⟩.",
        example: "SWAP|01⟩ = |10⟩, SWAP|10⟩ = |01⟩, SWAP|00⟩ = |00⟩, SWAP|11⟩ = |11⟩. SWAP also works on superposition states — it swaps the entire statevector contribution.",
        points: [
          { term: "Two-Qubit Operation", detail: "SWAP acts on two qubits simultaneously, completely exchanging their quantum states." },
          { term: "SWAP Placement", detail: "In circuit diagrams: shown as two X symbols (×) connected by a vertical line on the two qubit wires." },
          { term: "Circuit Example", detail: "Build: qubit 0 in |1⟩ (apply X), qubit 1 in |0⟩. Apply SWAP. Measure both: qubit 0 → 0, qubit 1 → 1." }
        ],
        interactive: "flip"
      },
      {
        id: "4.7",
        title: "Circuit Diagram",
        explanation: "A quantum circuit diagram is the standard visual language for representing quantum algorithms. Time flows left to right. Each horizontal line is a qubit wire. Gates are boxes on wires. Multi-qubit gates span multiple wires with connecting lines. Measurement symbols end each wire.",
        analogy: "A circuit diagram is like sheet music for quantum computing — it tells you exactly which operations (notes) to perform on which qubits (instruments) in what order (time).",
        example: "A Bell-state circuit: two horizontal wires (q0, q1), H box on q0, then CNOT (dot on q0, ⊕ on q1), then measurement meters on both. Read left to right.",
        points: [
          { term: "Qubit Wires", detail: "Horizontal lines, one per qubit. Usually labeled q0, q1, q2, etc. (top to bottom = most significant to least significant bit)." },
          { term: "Gate Symbols", detail: "Boxes on wires with gate name inside (H, X, Z, etc.). Multi-qubit gates show connections between wires." },
          { term: "Operation Order", detail: "Left to right = earlier to later. Gates at the same horizontal position execute simultaneously." },
          { term: "Measurement", detail: "A meter symbol (⊠ or ⧖) at the right end of a qubit wire means that qubit is measured, producing a classical bit." }
        ],
        interactive: "flip"
      },
      {
        id: "4.8",
        title: "Multi-Qubit Circuits",
        explanation: "Most useful quantum circuits use multiple qubits working together. A multi-qubit circuit combines single-qubit gates (H, X, Z) and two-qubit gates (CNOT, SWAP) in a specific sequence. The 2ⁿ-dimensional statevector describes the joint quantum state of all n qubits together.",
        analogy: "A multi-qubit circuit is like an orchestra — each qubit is an instrument (qubit wire), gates are musical phrases, and the full statevector is the sound of all instruments playing together.",
        example: "Two-qubit Bell state circuit: q0=|0⟩, q1=|0⟩ → H on q0 → CNOT(control=q0, target=q1) → Measure both. Result: 50% '00' and 50% '11' — never '01' or '10'. That's entanglement!",
        points: [
          { term: "Two-Qubit Circuit", detail: "Operates on a 4-dimensional statevector: |00⟩, |01⟩, |10⟩, |11⟩. State is a superposition of all four." },
          { term: "Gate Sequence", detail: "Order matters: H then CNOT creates entanglement. CNOT then H creates a different state. Sequence is critical." },
          { term: "Measurement", detail: "Measuring both qubits gives a 2-bit classical outcome. The joint probability is determined by the joint statevector." }
        ],
        interactive: "flip"
      }
    ],
    takeaways: [
      "Quantum gates are reversible unitary operations — H, X, Y, Z are common single-qubit gates.",
      "CNOT is the key two-qubit gate: it flips the target when the control qubit is |1⟩.",
      "Circuit diagrams show time left to right, qubits as horizontal wires, gates as labeled boxes."
    ]
  },
  {
    id: 5,
    title: "Entanglement",
    difficulty: "Intermediate",
    icon: "",
    overview: "Learn the introductory concept of entanglement and construct a simple Bell-state circuit.",
    objectives: [
      "Explain entanglement at an introductory level.",
      "Build a Bell-state circuit using H and CNOT gates.",
      "Interpret the correlated measurement pattern of a Bell state."
    ],
    sections: [
      {
        id: "5.1",
        title: "What is Entanglement?",
        explanation: "Quantum entanglement is a correlation between two or more qubits that has no classical equivalent. When qubits are entangled, measuring one instantly determines the state of the other — no matter how far apart they are. This correlation is not due to hidden information; it's a fundamental quantum property.",
        analogy: "Imagine two magic dice that always land the same number, no matter how far apart you roll them. That's entanglement — a non-classical correlation that cannot be explained by pre-determined states.",
        example: "Einstein called entanglement 'spooky action at a distance'. In a Bell state, if you measure qubit 0 and get '0', you instantly know qubit 1 is also '0' — and vice versa. The correlation is 100%.",
        points: [
          { term: "Entanglement Concept", detail: "A quantum state that cannot be written as a product of individual qubit states — the qubits are fundamentally connected." },
          { term: "Two-Qubit Systems", detail: "For two qubits, the joint state lives in a 4-dimensional space. Entangled states occupy the 'corners' of this space." },
          { term: "Correlation", detail: "Measuring one qubit of an entangled pair instantly determines the other's state, regardless of distance (faster than light communication is still impossible though)." }
        ],
        interactive: "flip"
      },
      {
        id: "5.2",
        title: "Bell State",
        explanation: "The Bell state (or Bell pair) is the simplest and most famous example of entanglement. The state |Φ+⟩ = (|00⟩ + |11⟩)/√2 means the two qubits are always correlated: both 0 or both 1, never different. It's created with just one H gate and one CNOT gate.",
        analogy: "A Bell pair is like quantum twins — they always agree when measured, even when separated by great distances. Their answers are correlated but individually random.",
        example: "|Φ+⟩ = (|00⟩ + |11⟩)/√2. Measuring: 50% get '00' and 50% get '11'. Notice '01' and '10' NEVER occur — that's the entanglement signature.",
        points: [
          { term: "Bell State", detail: "|Φ+⟩ = (|00⟩+|11⟩)/√2 — maximally entangled state of 2 qubits. Four Bell states exist total." },
          { term: "Two Qubits", detail: "Both qubits start in |0⟩. After the Bell circuit, their states cannot be described independently." },
          { term: "H + CNOT", detail: "The recipe: H gate on qubit 0 (creates superposition), then CNOT with q0 as control and q1 as target (creates entanglement)." }
        ],
        interactive: "flip"
      },
      {
        id: "5.3",
        title: "Building the Circuit",
        explanation: "Let's build the Bell state circuit step by step. This is a 2-qubit circuit that you can construct in the visual editor. Each step transforms the quantum state, and by the end, you have two entangled qubits that exhibit perfect correlations.",
        analogy: "Building a Bell state circuit is like following a recipe — each step has a specific purpose, and the final 'dish' is entanglement.",
        example: "Step-by-step state evolution: |00⟩ → [H on q0] → (|00⟩+|10⟩)/√2 → [CNOT q0→q1] → (|00⟩+|11⟩)/√2 = |Φ+⟩. Done!",
        points: [
          { term: "Place H", detail: "Add Hadamard gate to qubit 0 (q0). This puts q0 into superposition: (|0⟩+|1⟩)/√2. q1 still in |0⟩." },
          { term: "Place CNOT", detail: "Add CNOT with control=q0, target=q1. Now q1 flips when q0 is |1⟩ — creating entanglement." },
          { term: "Add Measurement", detail: "Place measurement gates at the end of both qubit wires (q0 and q1) to read the classical outcome." },
          { term: "Run", detail: "Execute with 1024 shots. Observe the histogram: only '00' and '11' bars appear, each ~50%. '01' and '10' are absent." }
        ],
        interactive: "flip"
      },
      {
        id: "5.4",
        title: "Correlated Results",
        explanation: "The measurement histogram of a Bell state tells a striking story: only '00' and '11' outcomes appear. This perfect correlation between both qubits — never '01' or '10' — is the experimental signature of entanglement. Classical correlations cannot replicate this pattern without pre-agreement.",
        analogy: "If you and a friend each roll one of the 'entangled dice', you'll always get matching numbers. If you get 3, they get 3. If you get 5, they get 5. Never different. No cheating, no prior agreement needed — that's quantum!",
        example: "1000 shots of the Bell state: approximately 498 '00's and 502 '11's. Zero '01' or '10'. The histogram visually shows entanglement — only two outcomes possible.",
        points: [
          { term: "Measurement Outcomes", detail: "Bell state collapses to '00' with 50% probability and '11' with 50% probability — never '01' or '10'." },
          { term: "Correlation", detail: "The two qubits are 100% correlated: measuring q0 tells you exactly what q1 will be. That's maximal entanglement." },
          { term: "Histogram", detail: "Visually: exactly two bars of equal height at '00' and '11'. The absence of '01' and '10' bars is the key visual signature." }
        ],
        interactive: "flip"
      },
      {
        id: "5.5",
        title: "Entanglement Lab Exercise",
        explanation: "Now you build the Bell state circuit yourself, run it, and explain what you observe. This is the core of interactive quantum learning — doing builds deeper understanding than reading alone. After running the circuit, interpret the histogram and connect it back to the theory of entanglement.",
        analogy: "This is your hands-on quantum experiment — like a physics lab where you set up the apparatus, run the experiment, and record your observations.",
        example: "Your task: Build the Bell circuit (H on q0, CNOT q0→q1, measure both), run with 2048 shots, look at the histogram, and answer: 'Why do you only see 00 and 11?'",
        points: [
          { term: "Build", detail: "Use the circuit builder: add qubit 0, add qubit 1, place H on q0, place CNOT (control q0, target q1), add measurements." },
          { term: "Run", detail: "Select 1024 or 2048 shots and execute the circuit on the simulator. Wait for the results." },
          { term: "Observe", detail: "Look at the histogram carefully. Note which outcomes appear and which are absent. Record the approximate percentages." },
          { term: "Explain", detail: "Write or say in your own words: why does the Bell state only produce '00' and '11'? What does this tell us about entanglement?" }
        ],
        interactive: "flip"
      }
    ],
    takeaways: [
      "Entanglement is a non-classical quantum correlation — entangled qubits share a joint state that cannot be factored individually.",
      "The Bell state |Φ+⟩ = (|00⟩+|11⟩)/√2 is created with H on q0 followed by CNOT(q0→q1).",
      "Bell state histogram shows only '00' and '11' — the absence of '01' and '10' is the entanglement signature."
    ]
  },
  {
    id: 6,
    title: "Quantum Circuit Design and Programming",
    difficulty: "Intermediate",
    icon: "",
    overview: "Learn how to construct circuits visually and with code, validate them and execute them in the quantum lab.",
    objectives: [
      "Build quantum circuits using a visual drag-and-drop interface.",
      "Write basic quantum circuit code using Python (Qiskit-style).",
      "Validate a circuit for errors before running it."
    ],
    sections: [
      {
        id: "6.1", title: "Drag-and-Drop Circuit Builder",
        explanation: "The visual circuit builder is the most intuitive way to design quantum circuits. You select gates from a palette and drop them onto qubit wires at the desired position. This approach lets you focus on circuit logic rather than syntax.",
        analogy: "The circuit builder is like Lego — you snap gates (bricks) onto qubit wires (a baseplate) to build quantum circuits without needing to write code first.",
        example: "To build H→CNOT circuit: drag H from palette onto q0 wire at time step 1, then drag CNOT with control point on q0 and target point on q1 at time step 2.",
        points: [
          { term: "Gate Palette", detail: "Sidebar showing all available gates (H, X, Y, Z, S, T, CNOT, SWAP, etc.). Click or drag to use." },
          { term: "Qubit Grid", detail: "The main canvas showing qubit wires as horizontal lines with time steps as columns. Gates drop into cells." },
          { term: "Drag and Drop", detail: "Click a gate in the palette, drag it to the desired position on the qubit wire, and release to place it." },
          { term: "Delete", detail: "Click an existing gate on the canvas to select it, then press Delete or click the trash icon to remove it." }
        ], interactive: "flip"
      },
      {
        id: "6.2", title: "Circuit Editing",
        explanation: "Circuits evolve as you learn. Being able to modify, undo, redo, clear, or reset your circuit is essential for iterative learning. These editing tools make it easy to experiment without fear of making mistakes.",
        analogy: "Editing a quantum circuit is like using a word processor — Ctrl+Z to undo a mistake, Ctrl+Y to redo it, and 'Clear All' to start fresh.",
        example: "Workflow: Build H→X circuit, realize you wanted H→Z, undo the X gate placement, add Z instead. Or hit 'Reset' to return to a clean default circuit.",
        points: [
          { term: "Undo", detail: "Reverts the last action (gate placement or deletion). Keyboard shortcut: Ctrl+Z." },
          { term: "Redo", detail: "Re-applies an undone action. Keyboard shortcut: Ctrl+Y." },
          { term: "Clear", detail: "Removes all gates from the circuit canvas but keeps the qubit wires." },
          { term: "Reset", detail: "Returns the circuit to its initial default state (or a template for the current lesson)." },
          { term: "Move/Delete Gate", detail: "Click a placed gate to select it; drag it to move or press Delete key to remove it." }
        ], interactive: "flip"
      },
      {
        id: "6.3", title: "Multi-Qubit Gate Placement",
        explanation: "Multi-qubit gates like CNOT and SWAP span two qubit wires in the circuit diagram. Placing them correctly requires specifying which wire is the control and which is the target. The visual editor handles this with special placement handles.",
        analogy: "Placing a CNOT is like connecting two floors of a building with a specific staircase — you must designate which floor is the 'control' (top) and which is the 'target' (where the action happens).",
        example: "For CNOT(control=q0, target=q1): in the editor, first click q0 to set the control dot, then click q1 to set the target circle. A vertical line connects them automatically.",
        points: [
          { term: "CNOT", detail: "Two-qubit controlled gate. First click sets control qubit (solid dot), second click sets target qubit (⊕ circle)." },
          { term: "SWAP", detail: "Two-qubit exchange gate. Click both qubits to connect them with the × symbol. Order doesn't matter for SWAP." },
          { term: "Control/Target", detail: "For controlled gates (CNOT, CZ), the control qubit determines if the gate fires; target qubit receives the operation." },
          { term: "Validation", detail: "Editor highlights invalid placements (e.g., control and target on same qubit, or gate extending beyond circuit bounds)." }
        ], interactive: "flip"
      },
      {
        id: "6.4", title: "Code-Based Circuit Creation",
        explanation: "Quantum circuits can also be created programmatically using Python-based frameworks like Qiskit. Writing code gives you precise control, reproducibility, and the ability to create parameterized or dynamically generated circuits that the visual editor can't easily handle.",
        analogy: "If the visual editor is like painting by hand, code-based creation is like using a digital drawing tool with mathematical precision — you can describe exact shapes and reproduce them perfectly.",
        example: "Qiskit code for Bell state:\n```python\nfrom qiskit import QuantumCircuit\nqc = QuantumCircuit(2, 2)\nqc.h(0)\nqc.cx(0, 1)\nqc.measure([0,1], [0,1])\n```",
        points: [
          { term: "QuantumCircuit", detail: "The main Qiskit class: QuantumCircuit(n_qubits, n_classical_bits). Creates an empty circuit ready for gates." },
          { term: "Gate Calls", detail: "Methods like qc.h(0), qc.x(1), qc.cx(0,1) add gates to specific qubit indices." },
          { term: "Measurement", detail: "qc.measure(qubit_index, classical_bit_index) adds a measurement and routes output to a classical register." },
          { term: "Execution", detail: "Run with: from qiskit_aer import AerSimulator; sim = AerSimulator(); job = sim.run(qc, shots=1024); counts = job.result().get_counts()." }
        ], interactive: "flip"
      },
      {
        id: "6.5", title: "Code Editor",
        explanation: "The platform's built-in code editor provides a comfortable environment for writing quantum circuit code. It includes syntax highlighting, line numbers, and error reporting to help you catch mistakes before running. The editor is integrated with the circuit visualizer so you can see your code as a circuit.",
        analogy: "The code editor is like a smart notebook — it highlights your writing in colors to show structure, and alerts you if you're about to make a mistake.",
        example: "Type your Qiskit code, click 'Run'. The platform executes it, shows the circuit diagram rendering, then displays measurement results as a histogram.",
        points: [
          { term: "Editor", detail: "A text editing area supporting Python quantum circuit code. Supports cut/copy/paste and keyboard shortcuts." },
          { term: "Syntax Highlighting", detail: "Keywords, strings, and function calls are color-coded to improve readability and spot errors faster." },
          { term: "Run", detail: "Executes the code in a sandboxed Python environment and returns circuit visualization + simulation results." },
          { term: "Reset", detail: "Clears the code editor back to a template for the current lesson — useful when you want a fresh start." }
        ], interactive: "flip"
      },
      {
        id: "6.6", title: "Circuit Validation",
        explanation: "Before running a quantum circuit, it should be validated for common errors. Validation checks that gates are placed on valid qubits, multi-qubit gates have proper control/target assignments, all qubits are measured, and no conflicting operations exist. Catching errors early saves time.",
        analogy: "Circuit validation is like a spell-checker for your quantum circuit — it catches obvious mistakes before you 'publish' (run) the circuit and get confusing results.",
        example: "Common validation errors: 'CNOT control and target are the same qubit', 'Gate applied to qubit 3 but circuit only has 2 qubits', 'No measurement at end of circuit'.",
        points: [
          { term: "Invalid Gate Placement", detail: "Error: A gate placed at an invalid position — e.g., two gates on the same qubit at the same time step." },
          { term: "Missing Measurement", detail: "Warning: A qubit has no measurement gate — its state won't be read, making it invisible in results." },
          { term: "Qubit Index Validation", detail: "Error: Gate references a qubit index that doesn't exist (e.g., qc.h(5) when circuit only has 3 qubits: 0,1,2)." }
        ], interactive: "flip"
      },
      {
        id: "6.7", title: "Visual and Code Views",
        explanation: "The platform provides two views of the same circuit: the visual (graphical) representation and the code (programmatic) representation. Switching between them helps you understand both ways of expressing a quantum circuit and builds a bridge between visual intuition and mathematical precision.",
        analogy: "Visual and code views are like a map (visual) and GPS coordinates (code) for the same location — both describe the same thing, just in different languages for different purposes.",
        example: "The same Bell state circuit: Visual view shows H box on q0, CNOT with dot-line-circle from q0 to q1. Code view shows: qc.h(0), qc.cx(0,1). Same circuit, two languages.",
        points: [
          { term: "Visual Representation", detail: "The circuit diagram showing gates as boxes/symbols on qubit wires. Intuitive, easy to follow for simple circuits." },
          { term: "Code Representation", detail: "Python/Qiskit code that programmatically builds the same circuit. Precise, reproducible, handles complex circuits." },
          { term: "Comparison", detail: "Use both: build visually to explore, then look at the code view to learn the programming syntax for the circuit you built." }
        ], interactive: "flip"
      }
    ],
    takeaways: [
      "Visual drag-and-drop and code-based editors are two ways to create the same quantum circuit.",
      "Key Qiskit classes: QuantumCircuit(n,m), methods .h(), .x(), .cx(), .measure().",
      "Always validate circuits before running — catch qubit index errors and missing measurements early."
    ]
  },
  {
    id: 7,
    title: "Quantum Simulation and Frameworks",
    difficulty: "Intermediate",
    icon: "",
    overview: "Understand how software simulators execute quantum circuits and how the platform exposes multiple frameworks and backends.",
    objectives: [
      "Understand why software simulation is useful for learning quantum computing.",
      "Recognize the major quantum frameworks: Qiskit Aer, PennyLane, Cirq, Qbraid.",
      "Read and interpret basic simulation output (shots, counts, probabilities)."
    ],
    sections: [
      {
        id: "7.1", title: "What is Quantum Simulation?",
        explanation: "A quantum simulator is software that models the behavior of a quantum computer. It maintains a statevector (or density matrix) in classical memory and applies quantum gate operations mathematically. Simulators are essential for learning because real quantum hardware is scarce, noisy, and expensive to access.",
        analogy: "A quantum simulator is like a flight simulator — it lets you practice flying (quantum computing) without an actual airplane (quantum hardware). Perfect for learning, experimenting, and testing.",
        example: "A 20-qubit system has 2²⁰ = ~1 million complex amplitudes to track. A simulator can handle this in seconds. Real hardware with 20 qubits might take days to schedule access on a cloud service.",
        points: [
          { term: "Simulation", detail: "Software that classically models quantum circuit execution by tracking the complete statevector — mathematically exact (for ideal simulators)." },
          { term: "Circuit Execution", detail: "The simulator applies each gate as a matrix multiplication on the statevector, in left-to-right order." },
          { term: "Results", detail: "Simulator outputs: statevector (exact amplitudes), measurement counts (probabilistic sampling), and execution time." }
        ], interactive: "flip"
      },
      {
        id: "7.2", title: "Qiskit Aer",
        explanation: "Qiskit Aer is IBM's high-performance quantum circuit simulator. It's the primary simulation backend in the SIH 26140 problem statement. Aer can simulate ideal quantum circuits (statevector simulator) or noisy circuits that model real hardware imperfections (QASM simulator with noise models).",
        analogy: "Qiskit Aer is like a professional-grade physics engine in a video game — it models quantum physics as accurately as a classical computer can, with options for both ideal and noisy physics.",
        example: "from qiskit_aer import AerSimulator\nsim = AerSimulator()\njob = sim.run(circuit, shots=1024)\nresult = job.result()\ncounts = result.get_counts()\nprint(counts)  # e.g., {'00': 512, '11': 512}",
        points: [
          { term: "Backend Selection", detail: "AerSimulator can use different methods: 'statevector' (exact), 'qasm_simulator' (sampling), 'density_matrix' (noisy)." },
          { term: "Shots", detail: "Number of circuit executions. More shots = better statistics but longer runtime. Default: 1024." },
          { term: "Counts", detail: "Dictionary of {outcome_string: count}. Example: {'00': 498, '11': 526} for a Bell state with 1024 shots." },
          { term: "Simulation Result", detail: "The job.result() object contains counts, statevector (if requested), and metadata like execution time." }
        ], interactive: "flip"
      },
      {
        id: "7.3", title: "PennyLane",
        explanation: "PennyLane is a cross-platform quantum machine learning library. It's especially powerful for variational quantum algorithms (VQE, QAOA) and differentiable quantum computing. PennyLane uses a 'device' abstraction — you define a quantum device and run QNodes (quantum functions) on it.",
        analogy: "PennyLane is like a universal adapter — it lets your quantum circuits run on many different backends (Qiskit, Cirq, real hardware) using the same code.",
        example: "import pennylane as qml\ndev = qml.device('default.qubit', wires=2)\n@qml.qnode(dev)\ndef circuit():\n    qml.Hadamard(wires=0)\n    qml.CNOT(wires=[0,1])\n    return qml.probs(wires=[0,1])\nprint(circuit())  # [0.5, 0, 0, 0.5]",
        points: [
          { term: "Framework Concept", detail: "PennyLane focuses on differentiable quantum computing and quantum ML. Supports gradient computation for optimization." },
          { term: "Circuit Execution", detail: "Circuits are Python functions decorated with @qml.qnode. The device argument specifies the backend simulator or hardware." },
          { term: "Result Handling", detail: "Returns measurements as NumPy arrays. Supports probs(), expval(), sample() as return types." }
        ], interactive: "flip"
      },
      {
        id: "7.4", title: "Cirq",
        explanation: "Cirq is Google's open-source quantum computing framework. It's designed with a focus on near-term quantum hardware, providing fine-grained control over circuit construction and execution. Cirq circuits are built from Moment objects (collections of simultaneous operations) rather than a simple gate sequence.",
        analogy: "If Qiskit is a high-level language (Python), Cirq is more like assembly — it gives you extremely precise control over hardware-level details, which is great for researchers and hardware-aware circuit optimization.",
        example: "import cirq\nq0, q1 = cirq.LineQubit.range(2)\ncircuit = cirq.Circuit(\n    cirq.H(q0),\n    cirq.CNOT(q0, q1),\n    cirq.measure(q0, q1, key='result')\n)\nsim = cirq.Simulator()\nresult = sim.run(circuit, repetitions=1000)",
        points: [
          { term: "Framework Concept", detail: "Google's quantum framework, focusing on NISQ (Noisy Intermediate-Scale Quantum) hardware compatibility and precise circuit control." },
          { term: "Circuit Representation", detail: "Cirq uses cirq.Circuit with Moments — each Moment contains gates that run simultaneously. Explicit, hardware-aligned structure." },
          { term: "Simulation", detail: "Cirq has built-in simulators: cirq.Simulator() for statevector, cirq.DensityMatrixSimulator() for noisy circuits." }
        ], interactive: "flip"
      },
      {
        id: "7.5", title: "Qbraid",
        explanation: "Qbraid is a cloud platform that provides access to multiple quantum computing frameworks and hardware backends through a unified interface. It lets you run quantum circuits on IBM, Amazon Braket, IonQ, and other hardware without managing separate accounts and SDKs for each.",
        analogy: "Qbraid is like a universal quantum cloud — a single dashboard where you can access different quantum computers and simulators from various providers, like a multi-cloud service for quantum computing.",
        example: "With Qbraid, you can submit the same circuit to IBM's Fake hardware simulator, then Amazon Braket's SV1 simulator, then IonQ trapped-ion hardware — all from one interface. Compare results across backends!",
        points: [
          { term: "Platform/Integration Concept", detail: "Qbraid provides a cloud environment with pre-installed quantum SDKs (Qiskit, Cirq, PennyLane, Braket) and hardware access." },
          { term: "Backend Access", detail: "Access IBM quantum computers, Amazon Braket, IonQ, and more through Qbraid's unified API and cloud dashboard." },
          { term: "Result Workflow", detail: "Submit a job, track its status, retrieve results, and compare across backends — all in one place." }
        ], interactive: "flip"
      },
      {
        id: "7.6", title: "Backend Selection",
        explanation: "The platform lets you select different backends (simulators or hardware) before executing your circuit. Different backends may give slightly different results — ideal simulators are exact, noisy simulators model hardware errors, and real hardware introduces actual quantum noise. Comparing backends is a great learning exercise.",
        analogy: "Choosing a backend is like choosing a calculator for a math problem — a scientific calculator (ideal simulator) is precise, a cheap calculator (noisy simulator) might have small errors, and mental math (real hardware) might introduce human errors.",
        example: "Run the same Bell state circuit on: (1) AerSimulator statevector → perfect 50/50. (2) AerSimulator QASM with noise model → ~48/52 or similar. (3) Real IBM hardware → might see some '01' and '10' counts from hardware errors.",
        points: [
          { term: "Backend Dropdown", detail: "Select from: AerSimulator (ideal), AerSimulator+Noise, and (if connected) real hardware providers." },
          { term: "Execution", detail: "Submit the circuit to the selected backend. Job may be queued for real hardware — simulators are instant." },
          { term: "Result Comparison", detail: "Compare histograms from different backends side by side. Differences reveal noise and hardware imperfections." }
        ], interactive: "flip"
      },
      {
        id: "7.7", title: "Shots and Results",
        explanation: "Understanding simulation output is crucial. Every run produces: shot counts (how many times each outcome occurred), derived probabilities (count/shots), the statevector (if using a statevector simulator), and metadata like execution time. Knowing how to read these is a core quantum computing skill.",
        analogy: "Reading simulation results is like reading a scientific experiment report — counts are the raw data, probabilities are the analysis, the statevector is the underlying theory, and execution time is the lab time.",
        example: "Results for Bell state (1024 shots):\nCounts: {'00': 503, '11': 521}\nProbabilities: {'00': 0.491, '11': 0.509}\nExecution time: 2.3ms\nStatevector: [0.707, 0, 0, 0.707] (indexed as 00, 01, 10, 11)",
        points: [
          { term: "Shots", detail: "Total number of circuit runs. More shots = smoother histogram, better probability estimates. Trade-off: runtime." },
          { term: "Counts", detail: "Dictionary {outcome: count}. Raw data from all shots. Sum of all counts = total shots." },
          { term: "Probabilities", detail: "Derived from counts: probability[outcome] = counts[outcome] / total_shots. Approaches true quantum probability." },
          { term: "Execution Time", detail: "Time to run the circuit (simulation). Grows exponentially with qubit count for exact simulators. 20+ qubits is very slow." }
        ], interactive: "flip"
      }
    ],
    takeaways: [
      "Quantum simulators model quantum circuits on classical hardware — essential for learning without real quantum computers.",
      "Key frameworks: Qiskit Aer (IBM), PennyLane (ML-focused), Cirq (Google, NISQ-oriented), Qbraid (multi-platform cloud).",
      "Simulation output: counts, probabilities, statevector, execution time — each tells you something different."
    ]
  },
  {
    id: 8,
    title: "Quantum Algorithms",
    difficulty: "Intermediate",
    icon: "",
    overview: "Explore the standard algorithms named in the SIH 26140 problem statement through structured explanations and circuit examples.",
    objectives: [
      "Recognize and understand the four named algorithms: Deutsch-Jozsa, Grover's, QAOA, and VQE.",
      "Understand the high-level purpose and problem each algorithm solves.",
      "Interpret the circuit structure and expected outputs of each algorithm."
    ],
    sections: [
      {
        id: "8.1", title: "What is a Quantum Algorithm?",
        explanation: "A quantum algorithm is a step-by-step procedure that uses quantum mechanical properties (superposition, entanglement, interference) to solve computational problems, often exponentially faster than the best known classical algorithms. Quantum algorithms exploit interference to amplify correct answers and cancel wrong ones.",
        analogy: "A quantum algorithm is like solving a maze by simultaneously exploring all paths (superposition) and using interference to cancel dead-end paths while amplifying the correct path.",
        example: "Classical search in an unsorted list of N items: O(N) steps. Grover's quantum search: O(√N) steps. For N=1,000,000 items, that's 1,000,000 vs ~1,000 steps — a 1000x speedup!",
        points: [
          { term: "Algorithm Concept", detail: "A finite sequence of quantum operations designed to solve a specific computational problem with quantum advantage." },
          { term: "Circuit Representation", detail: "Quantum algorithms are expressed as quantum circuits — sequences of gates applied to initialized qubits." },
          { term: "Execution", detail: "The algorithm is run on a quantum processor or simulator. Results are extracted through measurement and statistical analysis." }
        ], interactive: "flip"
      },
      {
        id: "8.2", title: "Deutsch-Jozsa Algorithm",
        explanation: "The Deutsch-Jozsa algorithm was the first quantum algorithm to demonstrate exponential speedup over classical computation. It determines whether a function f(x) is constant (same output for all inputs) or balanced (outputs 0 for half, 1 for other half) using only ONE query to a quantum oracle, while a classical computer needs up to 2^(n-1)+1 queries.",
        analogy: "Imagine a coin that is either all-heads or half-heads-half-tails. Classically you might flip it many times to determine which. The Deutsch-Jozsa algorithm 'flips' it just once using quantum superposition and tells you definitively.",
        example: "For a 1-qubit function: Deutsch's algorithm uses circuit |0⟩|1⟩ → [H⊗H] → [Oracle] → [H⊗I] → Measure q0. If q0=0: function is constant. If q0=1: function is balanced. One query, certain answer!",
        points: [
          { term: "Problem Idea", detail: "Given oracle f:{0,1}^n → {0,1}, determine if f is constant (all same) or balanced (half 0, half 1) with minimum queries." },
          { term: "Oracle Concept", detail: "A 'black box' quantum gate that encodes the function f. The algorithm queries it once — the key quantum advantage." },
          { term: "Circuit", detail: "Initialize qubits → Apply H to all → Apply oracle → Apply H to input qubits → Measure. All zeros = constant; any one = balanced." },
          { term: "Simulation", detail: "Build the circuit with a constant oracle (all outputs same) and run. See all-zero measurement. Swap to balanced oracle: see non-zero measurement." },
          { term: "Result", detail: "Measurement of all input qubits = 0 → constant function. Any non-zero measurement → balanced. Determined in ONE shot (no need for multiple)." }
        ], interactive: "flip"
      },
      {
        id: "8.3", title: "Grover's Algorithm",
        explanation: "Grover's algorithm is the quantum search algorithm. For an unsorted database of N items, it finds the target item in O(√N) queries — a quadratic speedup over classical O(N). It works by amplifying the amplitude of the target state through repeated oracle+diffusion operator cycles.",
        analogy: "Grover's is like a quantum flashlight — it shines brightest on the answer. Each iteration makes the target state brighter (higher amplitude) and all wrong answers dimmer. After √N steps, the target is blazing and you measure it with high probability.",
        example: "Search 4 items (|00⟩,|01⟩,|10⟩,|11⟩) for |11⟩. Classical: up to 4 checks. Grover's: 1 iteration → target amplitude becomes ~1.0 (100% chance of finding it). Speedup: 4 vs ~2 steps.",
        points: [
          { term: "Search Problem", detail: "Find the unique item x* satisfying f(x*)=1 in an unstructured database of N items, with minimal queries." },
          { term: "Oracle Concept", detail: "A quantum oracle that flips the phase of the target state: |x*⟩ → -|x*⟩. All other states unchanged." },
          { term: "Amplification Concept", detail: "The diffusion operator (Grover's diffuser) inverts all amplitudes about their average — amplifying the target, reducing others." },
          { term: "Circuit", detail: "H^⊗n → [Oracle → Diffuser] × π√N/4 iterations → Measure. Each iteration boosts target amplitude." },
          { term: "Histogram", detail: "After optimal iterations, the histogram shows a dominant spike at the target state — essentially 100% probability." }
        ], interactive: "flip"
      },
      {
        id: "8.4", title: "QAOA",
        explanation: "QAOA (Quantum Approximate Optimization Algorithm) is a variational hybrid algorithm for combinatorial optimization problems like MaxCut, graph coloring, and logistics. It uses a parameterized quantum circuit (with tunable angles) that is optimized by a classical optimizer to minimize a cost function.",
        analogy: "QAOA is like a quantum GPS navigating a complex landscape of solutions — it starts at a random point, uses quantum effects to sample the landscape, and a classical optimizer (GPS) guides it toward the best solution.",
        example: "MaxCut on a 3-node graph: QAOA creates a parameterized circuit with angles (β,γ). A classical optimizer (COBYLA, SLSQP) adjusts β and γ to maximize the expected cut size. Each quantum circuit evaluation is one 'probe' of the solution landscape.",
        points: [
          { term: "Optimization Concept", detail: "QAOA solves combinatorial optimization: find the assignment of variables that minimizes/maximizes a cost function." },
          { term: "Parameterized Circuit", detail: "The QAOA circuit has p layers, each with a problem (phase) unitary U_C(γ) and a mixer unitary U_B(β)." },
          { term: "Parameters", detail: "The angles γ (gamma) and β (beta) are tunable. Classical optimization finds the best values to maximize solution quality." },
          { term: "Simulation", detail: "Run the parameterized circuit on the simulator, measure the expectation value of the cost operator, feed back to classical optimizer." }
        ], interactive: "flip"
      },
      {
        id: "8.5", title: "VQE",
        explanation: "VQE (Variational Quantum Eigensolver) is a hybrid quantum-classical algorithm designed to find the ground state energy of a quantum system (like a molecule). It's highly relevant to quantum chemistry and materials science — computing molecular energies that are intractable for classical computers.",
        analogy: "VQE is like finding the lowest point in a mountainous energy landscape. The quantum circuit probes the landscape (evaluates energy), and the classical optimizer guides you downhill toward the global minimum.",
        example: "For the H₂ molecule: VQE uses a parameterized ansatz circuit (e.g., UCCSD) to prepare a trial wavefunction. A classical optimizer adjusts parameters until the measured energy matches the true ground state energy of H₂.",
        points: [
          { term: "Variational Concept", detail: "VQE exploits the variational principle: ⟨ψ|H|ψ⟩ ≥ E₀ for any trial state |ψ⟩. Minimize ⟨H⟩ to approach the true ground state E₀." },
          { term: "Parameterized Circuit", detail: "An ansatz circuit with tunable parameters θ prepares the trial quantum state |ψ(θ)⟩. Choice of ansatz is problem-specific." },
          { term: "Evaluation", detail: "Measure the expectation value ⟨ψ(θ)|H|ψ(θ)⟩ on the quantum processor. This requires measuring in multiple Pauli bases." },
          { term: "Result", detail: "The final optimized energy ⟨H⟩_min approximates the ground state energy of the system. Used in quantum chemistry simulations." }
        ], interactive: "flip"
      },
      {
        id: "8.6", title: "Algorithm Comparison",
        explanation: "Each quantum algorithm addresses a different class of problem. Understanding where each fits — and why quantum offers an advantage — helps you choose the right tool for a problem. Some provide provable quantum speedup; others are heuristic approaches for near-term hardware.",
        analogy: "Quantum algorithms are like specialized tools in a toolbox — a hammer (Grover) for search problems, a wrench (Deutsch-Jozsa) for function classification, a drill (QAOA) for optimization, and a precision instrument (VQE) for chemistry.",
        example: "Problem types: Database search → Grover. Constant/balanced function → Deutsch-Jozsa. Combinatorial optimization → QAOA. Molecular ground state → VQE. Matching the problem to the right algorithm is the art of quantum algorithm design.",
        points: [
          { term: "Deutsch-Jozsa", detail: "Purpose: function classification (constant vs balanced). Speedup: exponential. Type: query complexity, provable speedup." },
          { term: "Grover's Algorithm", detail: "Purpose: unstructured search. Speedup: quadratic (O(N)→O(√N)). Type: black-box search, provable speedup." },
          { term: "QAOA", detail: "Purpose: combinatorial optimization (MaxCut, TSP). Speedup: heuristic (not proven). Type: variational hybrid, NISQ-era." },
          { term: "VQE", detail: "Purpose: quantum chemistry (ground state energy). Speedup: heuristic. Type: variational hybrid, near-term quantum hardware." },
          { term: "Result Interpretation", detail: "Provable speedup algorithms (DJ, Grover) always win on their problem class. Variational algorithms (QAOA, VQE) depend on ansatz quality and optimization landscape." }
        ], interactive: "flip"
      }
    ],
    takeaways: [
      "Quantum algorithms exploit superposition, entanglement, and interference for computational advantage.",
      "Deutsch-Jozsa: exponential speedup for function classification. Grover: quadratic speedup for search.",
      "QAOA and VQE are variational hybrid algorithms for near-term quantum hardware (optimization + chemistry)."
    ]
  },
  {
    id: 9,
    title: "Quantum State and Result Visualization",
    difficulty: "Intermediate",
    icon: "",
    overview: "Learn to interpret the visual outputs required by the platform: circuit rendering, measurement histograms, statevectors and Bloch sphere views.",
    objectives: [
      "Read and interpret a circuit rendering diagram.",
      "Interpret measurement histograms and statevector information.",
      "Use the Bloch sphere as an interactive single-qubit visualization."
    ],
    sections: [
      {
        id: "9.1", title: "Circuit Rendering",
        explanation: "A circuit rendering is the standard visual representation of a quantum circuit. It shows qubits as horizontal wires, gates as labeled boxes, and measurements as meter symbols. Reading circuit renderings is a fundamental skill — it's the common language for communicating quantum algorithms.",
        analogy: "Circuit rendering is to quantum computing what sheet music is to music — a universal visual notation that lets anyone understand and reproduce the algorithm.",
        example: "A 3-qubit QFT circuit rendering: three horizontal lines (q0, q1, q2), H gates, controlled-R gates at various positions, and SWAP gates at the end. Reading left to right gives the operation sequence.",
        points: [
          { term: "Qubit Wires", detail: "Horizontal lines, one per qubit. Labeled q0, q1, etc. (top to bottom in standard convention). Time flows left to right." },
          { term: "Gate Symbols", detail: "Single-qubit gates: labeled boxes (H, X, Z, etc.). Multi-qubit gates: connected symbols (CNOT, SWAP). Phase gates: circles." },
          { term: "Operation Order", detail: "Gates at the same horizontal position run simultaneously. Reading columns left to right gives the time sequence." }
        ], interactive: "flip"
      },
      {
        id: "9.2", title: "Measurement Histogram",
        explanation: "The measurement histogram is the primary result visualization for quantum circuits. Each bar represents a measurement outcome, with height proportional to count or probability. It's the clearest way to see the probability distribution produced by a quantum circuit.",
        analogy: "The measurement histogram is like a scoreboard for quantum experiments — it shows at a glance which outcomes won (tall bars) and which lost (short or absent bars).",
        example: "Bell state histogram: two bars of equal height at '00' and '11', zero bars at '01' and '10'. H gate histogram: two equal bars at '0' and '1'. X gate histogram: one bar at '1' only.",
        points: [
          { term: "Outcome Labels", detail: "X-axis labels show measurement bit strings. For n qubits: 2^n possible outcomes. Unlabeled = zero count." },
          { term: "Counts", detail: "Y-axis shows raw count of each outcome. Sum of all bar heights = total shots." },
          { term: "Probabilities", detail: "Can toggle Y-axis to show probability (count/shots) instead of counts. True probabilities are in range [0,1]." },
          { term: "Comparison", detail: "Compare histograms from different circuits or backends side by side to see how gates and noise change the distribution." }
        ], interactive: "flip"
      },
      {
        id: "9.3", title: "Probability Distribution",
        explanation: "The probability distribution is the idealized version of the measurement histogram. While the histogram shows empirical counts from finite shots, the probability distribution shows the exact theoretical probabilities from the statevector. As shots → ∞, the histogram converges to the probability distribution.",
        analogy: "The histogram is the experimental result; the probability distribution is the theoretical prediction. More shots makes the experiment match the theory more closely.",
        example: "For |+⟩ state: theoretical probability distribution is P(0)=0.5, P(1)=0.5. With 100 shots you might get P(0)=0.46, P(1)=0.54. With 100,000 shots: P(0)≈0.500, P(1)≈0.500.",
        points: [
          { term: "Frequency", detail: "Relative frequency from the histogram: count(outcome)/total_shots. An empirical estimate of probability." },
          { term: "Probability", detail: "True theoretical probability: |amplitude|² from the statevector. Exact value that empirical frequency approaches." },
          { term: "Distribution", detail: "The complete assignment of probabilities to all possible outcomes. For a Bell state: {|00⟩: 0.5, |01⟩: 0, |10⟩: 0, |11⟩: 0.5}." }
        ], interactive: "flip"
      },
      {
        id: "9.4", title: "Statevector Display",
        explanation: "The statevector display shows the complete quantum state of your circuit as a list of complex amplitudes — one for each computational basis state. It's available when using a statevector simulator. The statevector gives you perfect information about the quantum state, before any measurement collapse.",
        analogy: "The statevector is like a complete X-ray of the quantum state — it reveals everything about the quantum system in full mathematical detail, not just the observable measurement outcomes.",
        example: "Bell state statevector: [0.707+0j, 0+0j, 0+0j, 0.707+0j] for basis states [|00⟩, |01⟩, |10⟩, |11⟩]. Squaring amplitudes: [0.5, 0, 0, 0.5] = probabilities.",
        points: [
          { term: "Statevector", detail: "A complex vector of length 2^n for n qubits. Each entry is the amplitude for one computational basis state." },
          { term: "Amplitudes", detail: "Complex numbers (real+imaginary). Their magnitudes squared give probabilities. Phases encode quantum interference information." },
          { term: "Basis States", detail: "The reference framework: |00⟩, |01⟩, |10⟩, |11⟩ for 2 qubits. The statevector gives the amplitude for each basis state." }
        ], interactive: "flip"
      },
      {
        id: "9.5", title: "Bloch Sphere",
        explanation: "The Bloch sphere is a geometric visualization of single-qubit states as points on (or inside) a sphere. The north pole represents |0⟩, the south pole |1⟩, and points on the equator represent equal superpositions. Every single-qubit gate corresponds to a rotation of the state vector on this sphere.",
        analogy: "The Bloch sphere is like a 3D compass for quantum states — instead of north/south/east/west, it has quantum directions (|0⟩, |1⟩, |+⟩, |−⟩, |i⟩, |−i⟩). A gate rotates the compass needle.",
        example: "H gate: rotates |0⟩ (north pole) to |+⟩ (equator, X-axis). X gate: rotates |0⟩ to |1⟩ (north to south pole, 180° around X-axis). Z gate: rotates |+⟩ to |−⟩ (180° around Z-axis).",
        points: [
          { term: "Axes", detail: "Z-axis: |0⟩ (top) to |1⟩ (bottom). X-axis: |+⟩ (right) to |−⟩ (left). Y-axis: |i⟩ (front) to |−i⟩ (back)." },
          { term: "State Direction", detail: "Every single-qubit pure state is a point on the sphere surface. The Bloch vector points from the origin to that point." },
          { term: "Before/After Gate Comparison", detail: "Apply a gate and watch the Bloch vector rotate. H: 180° around (X+Z)/√2 axis. X: 180° around X. Z: 180° around Z." }
        ], interactive: "flip"
      },
      {
        id: "9.6", title: "Reading Visual Results",
        explanation: "Connecting visual outputs back to the circuit that produced them is the key skill of quantum result interpretation. The circuit shows what you did; the statevector and histogram show what happened. This feedback loop — circuit to visualization to understanding — is the core of interactive quantum learning.",
        analogy: "Reading visual results is like reviewing cooking results — you made a dish (ran the circuit), tasted it (saw the histogram), and understand what the recipe (circuit) caused.",
        example: "Circuit: |0⟩→X→H→Measure. What do you expect? X flips to |1⟩. H on |1⟩ gives |−⟩=(|0⟩-|1⟩)/√2. Measurement: 50/50, but with negative phase on |1⟩. Histogram looks same as H on |0⟩, but the phase is different (invisible to measurement)!",
        points: [
          { term: "Circuit", detail: "The recipe — shows exactly what gates were applied to which qubits, in what order." },
          { term: "State", detail: "The statevector — shows the exact quantum state after each gate. Complex amplitudes reveal phases invisible to measurement." },
          { term: "Measurement", detail: "The histogram — shows observable outcomes. Probabilities are |amplitude|². Phase information is lost upon measurement." },
          { term: "Interpretation", detail: "Connect: this circuit creates this state which produces this distribution. Build intuition through repeated cycles of run-observe-explain." }
        ], interactive: "flip"
      },
      {
        id: "9.7", title: "Interactive Visualization Exercise",
        explanation: "In this exercise, you modify a circuit, rerun it, and compare the resulting visualizations. The key insight: small changes to a circuit (like adding one gate or changing an angle) can dramatically change the statevector, histogram, and Bloch sphere view. Experimentation builds deep quantum intuition.",
        analogy: "This is your quantum laboratory session — you're a quantum scientist tweaking an experiment (circuit) and observing how the results (visualizations) change. Each change teaches you something new.",
        example: "Start: |0⟩→H→Measure (50/50 histogram). Add Z gate after H: |0⟩→H→Z→Measure (still 50/50!). But the Bloch vector flips from |+⟩ to |−⟩. Measurement can't tell them apart — but another gate would reveal the difference (interference).",
        points: [
          { term: "Modify", detail: "Change one thing at a time: add a gate, remove a gate, change gate type, or change gate position." },
          { term: "Run", detail: "Execute the modified circuit and collect new visualization data (histogram, statevector, Bloch sphere)." },
          { term: "Compare", detail: "Place old and new visualizations side by side. What changed? What stayed the same? Why?" },
          { term: "Explain", detail: "Articulate in words: 'I added Z after H. The phase of |1⟩ flipped but measurement probabilities didn't change because measurement is phase-insensitive.'" }
        ], interactive: "flip"
      }
    ],
    takeaways: [
      "Circuit renderings, histograms, statevectors, and Bloch spheres are four complementary ways to understand a quantum computation.",
      "The histogram shows measurement probabilities; the statevector reveals phases invisible to measurement.",
      "The Bloch sphere maps single-qubit states geometrically — every gate is a rotation on this sphere."
    ]
  },
  {
    id: 10,
    title: "Assessment, Challenges and Learning Progress",
    difficulty: "Intermediate",
    icon: "",
    overview: "Check your learning through quizzes and challenges, understand grading, and track your overall progress across the platform.",
    objectives: [
      "Successfully complete assessments and challenges.",
      "Understand how automatic grading and feedback works.",
      "Track and interpret your learning progress and performance."
    ],
    sections: [
      {
        id: "10.1", title: "Learning Assessment",
        explanation: "Assessments on QuantNexus verify that you've understood the core concepts of each chapter before moving on. After completing a chapter's content, you take a short quiz. Passing the quiz (≥60%) unlocks the next chapter. Assessments use multiple-choice questions designed to test conceptual understanding, not memorization.",
        analogy: "Assessments are like checkpoints in a video game — you can't proceed to the next level until you've demonstrated mastery of the current one. They ensure you build a solid foundation before advancing.",
        example: "After Chapter 3 (Superposition & Measurement), the quiz might ask: 'What does the Hadamard gate do to |0⟩?' with options including the correct answer '(|0⟩+|1⟩)/√2'. Correct answers show green; wrong show red with explanation.",
        points: [
          { term: "Quiz", detail: "5-question multiple-choice assessment at the end of each chapter. Covers key concepts from all sections." },
          { term: "MCQ", detail: "Multiple-choice questions with 4 options each. Only one correct answer. Immediate feedback after answering." },
          { term: "Score", detail: "Percentage of correct answers. ≥60% = pass (unlocks next chapter). <60% = can retry after review." },
          { term: "Feedback", detail: "After each question: correct answers shown in green, wrong answers shown in red with an explanation of why." }
        ], interactive: "flip"
      },
      {
        id: "10.2", title: "MCQ Quizzes",
        explanation: "Multiple-choice quizzes are the primary assessment format. Each quiz has 5 questions, each with 4 options. Questions are designed to test genuine understanding of quantum concepts — not trick questions, but conceptually meaningful checks of whether you understood the chapter.",
        analogy: "MCQ quizzes are like a knowledgeable friend asking you questions after you studied — they reveal what you understood and what you need to revisit.",
        example: "Question: 'What is the result of measuring a qubit in state |+⟩?' Options: A) Always 0. B) Always 1. C) 50% chance of 0, 50% chance of 1. D) 0 and 1 simultaneously. Answer: C, because |amplitude|² = |1/√2|² = 0.5.",
        points: [
          { term: "Question", detail: "A conceptual question about the chapter content. Tests understanding of mechanisms, not just vocabulary." },
          { term: "Options", detail: "Four plausible answers (A, B, C, D). Distractors are common misconceptions, not obviously wrong." },
          { term: "Correct Answer", detail: "One definitive correct answer based on quantum physics. Shown in green after you submit." },
          { term: "Explanation", detail: "After answering, a brief explanation appears showing why the correct answer is right — reinforces learning even when wrong." }
        ], interactive: "flip"
      },
      {
        id: "10.3", title: "Coding Challenges",
        explanation: "Coding challenges ask you to write quantum circuit code to accomplish a specific task. For example: 'Write code that creates a Bell state using Qiskit' or 'Write a circuit that applies H then measures'. Your code is executed, the output is checked against expected results, and you receive automated feedback.",
        analogy: "Coding challenges are like programming homework — you write the code, it runs, and an automated grader checks if your output matches the expected result.",
        example: "Challenge: 'Create a circuit that puts qubit 0 in superposition.' Expected: a circuit with H on q0. Your code runs, produces a histogram showing 50/50 distribution, and the grader confirms it matches the expected statevector.",
        points: [
          { term: "Problem Statement", detail: "Clear description of what circuit you need to build. Includes hints about which gates to use." },
          { term: "Code Editor", detail: "Built-in Python editor with Qiskit support. Write your circuit code here." },
          { term: "Run", detail: "Execute your code. The platform runs it and shows you the circuit diagram and measurement results." },
          { term: "Submit", detail: "Submit for grading. The automated grader compares your circuit's statevector or counts against the expected answer." }
        ], interactive: "flip"
      },
      {
        id: "10.4", title: "Circuit Challenges",
        explanation: "Circuit challenges ask you to build a target circuit using the visual circuit designer — no code required. You're given a description (e.g., 'Build the Bell state circuit') and must assemble the correct gates on the correct qubits. The platform validates your visual circuit against the expected structure.",
        analogy: "Circuit challenges are like a jigsaw puzzle — you're given the pieces (gates) and must arrange them correctly to match the target picture (circuit).",
        example: "Challenge: 'Build a GHZ state for 3 qubits.' You need to place H on q0, CNOT(q0→q1), CNOT(q0→q2), then measure all three. The validator checks your gate placement and reports pass/fail.",
        points: [
          { term: "Instructions", detail: "Description of the target circuit — what gates, which qubits, and what outcome to achieve." },
          { term: "Build", detail: "Use the visual circuit builder to drag and drop gates onto the correct qubit wires in the correct order." },
          { term: "Validate", detail: "The platform checks your circuit structure against the expected circuit — compares gate types, positions, and qubit assignments." },
          { term: "Submit", detail: "Once validated (or attempted), submit to record your score. Partial credit may apply for partially correct circuits." }
        ], interactive: "flip"
      },
      {
        id: "10.5", title: "Automated Grading",
        explanation: "All assessments use automated grading — no manual review required. The grading system checks your answers or circuits against predefined correct answers using deterministic rules. For MCQs: correct answer = 1 point. For circuits: structure validation and/or output comparison.",
        analogy: "Automated grading is like a digital answer key — instant, consistent, unbiased feedback on every question you submit.",
        example: "MCQ grading: you answer 4 out of 5 correctly → score = 80% (pass!). Circuit grading: your Bell state circuit has H on q0 and CNOT(q0→q1) → structure matches expected → pass. Incorrect qubit order → fail with explanation.",
        points: [
          { term: "Expected Structure", detail: "For circuits: the set of gates, their positions, and qubit assignments. Checked against your submission." },
          { term: "Validation", detail: "Rules: gate type must match, qubit index must match, gate order must match. Any mismatch = incorrect." },
          { term: "Score", detail: "MCQ: correct/total questions. Circuit: pass/fail or partial credit. Combined into chapter completion score." },
          { term: "Feedback", detail: "Detailed explanation of right/wrong answers. For circuits: shows which gates are wrong and what was expected." }
        ], interactive: "flip"
      },
      {
        id: "10.6", title: "Progress Tracking",
        explanation: "The platform tracks your learning journey automatically. Every completed section, quiz score, and chapter completion is stored in your profile. The dashboard shows your overall progress ring, chapter-by-chapter status, and cumulative quiz average — giving you a clear picture of how far you've come.",
        analogy: "Progress tracking is like a fitness app for your brain — it records every 'quantum workout', shows your improvement over time, and motivates you to keep going.",
        example: "Your dashboard shows: 6/10 chapters completed (60% ring), 3 chapters locked, quiz average 78%. Chapter 5 (Entanglement) shows a green checkmark with your quiz score of 85%.",
        points: [
          { term: "Completion", detail: "Each chapter marked as 'Completed' once you finish all sections AND pass the quiz (≥60%). Shown with green checkmark." },
          { term: "Scores", detail: "Quiz score for each completed chapter is stored and shown. Also displayed in the chapter list." },
          { term: "Attempts", detail: "Number of quiz attempts recorded. You can retake quizzes after reviewing content. Best score is kept." },
          { term: "Overall Progress", detail: "Dashboard shows total chapters completed/10, progress ring percentage, and unlocked chapters count." }
        ], interactive: "flip"
      },
      {
        id: "10.7", title: "Performance Analytics",
        explanation: "Performance analytics summarize your learning journey with meaningful metrics. You can see which topics you excelled at, which quizzes you struggled with, your average score across all chapters, and which areas need more review. This data helps you direct your study time effectively.",
        analogy: "Performance analytics is like a teacher's progress report — it tells you honestly where you're strong, where you need improvement, and celebrates your achievements.",
        example: "Analytics might show: Strong areas: Chapters 1-3 (avg 90%). Needs review: Chapter 7 (Simulation, 62%). Suggestion: 'Review Qiskit Aer backend selection (section 7.2) before Chapter 8.'",
        points: [
          { term: "Topic Performance", detail: "Chapter-by-chapter breakdown of quiz scores. Highlights strengths and weaknesses across the curriculum." },
          { term: "Quiz Average", detail: "Mean score across all completed chapter quizzes. Target: ≥70% average for strong understanding." },
          { term: "Challenge Performance", detail: "Success rate on coding and circuit challenges. Shows hands-on skills vs theoretical knowledge." },
          { term: "Weak Areas", detail: "Automatically identified chapters or sections where your score was lowest — recommended for review." }
        ], interactive: "flip"
      },
      {
        id: "10.8", title: "Instructor Dashboard",
        explanation: "The platform includes an instructor view where teachers can monitor the progress of all enrolled students. The instructor dashboard shows each student's chapter completion, quiz scores, time spent, and identifies common weak areas — enabling targeted intervention and personalized support.",
        analogy: "The instructor dashboard is like a class gradebook but with quantum superpowers — it shows not just final scores but the entire learning journey, identifying who needs help before they fall too far behind.",
        example: "Instructor sees: Student A completed 8/10 chapters, avg score 85%. Student B stuck on Chapter 5 (Entanglement), score 45% after 3 attempts. Instructor can send a targeted hint or schedule a help session.",
        points: [
          { term: "Student List", detail: "All enrolled students visible with their current progress status, last active time, and overall completion percentage." },
          { term: "Progress", detail: "Per-student breakdown: which chapters completed, which in-progress, which locked. Shown as timeline or grid." },
          { term: "Performance", detail: "Quiz scores, attempt counts, and time-per-chapter for each student. Sortable by any metric." },
          { term: "Weak Topics", detail: "Automatically flagged chapters/topics where class-wide average is below threshold — helps instructors plan group reviews." }
        ], interactive: "flip"
      },
      {
        id: "10.9", title: "Authentication and Web Application",
        explanation: "The platform is a full web application with user authentication. Students register with name, email, and password. Login grants access to personalized progress data. All progress is stored per-user (in browser localStorage for this version). The interface is fully responsive — works on desktop, tablet, and mobile.",
        analogy: "Authentication is like a library card — you register once, and then the library (platform) knows which books (chapters) you've checked out and keeps track of your reading progress.",
        example: "Register → verify email → login → see personalized dashboard with YOUR progress → complete chapters → progress saves automatically → logout → login again → progress is right where you left it.",
        points: [
          { term: "Register", detail: "Create account with full name, email, and password. Account stored securely. Instant access after registration." },
          { term: "Login", detail: "Authenticate with email + password. Session persists across browser tabs (within same device/browser)." },
          { term: "Protected Pages", detail: "Dashboard, chapters, and learn pages require login. Attempting to access without login redirects to the login page." },
          { term: "Responsive UI", detail: "The entire platform is mobile-responsive — works on phone (360px+), tablet (768px+), and desktop (1024px+)." }
        ], interactive: "flip"
      }
    ],
    takeaways: [
      "Chapter quizzes (5 MCQs, pass at ≥60%) gate progression — passing unlocks the next chapter.",
      "All quiz scores and chapter completions are tracked and displayed on your dashboard and in performance analytics.",
      "The platform is a complete web application with authentication, progress tracking, and responsive design."
    ]
  }
,
  {
      "id": 11,
      "title": "Advanced Qubit Concepts",
      "difficulty": "Intermediate",
      "icon": "\ud83c\udf10",
      "overview": "Deepen your understanding of quantum states, complex probability amplitudes, relative vs global phase, Bloch sphere representations, and rigorous state preparation.",
      "objectives": [
          "Understand complex amplitudes, state vectors, and normalization conditions.",
          "Distinguish between global phase (physically unobservable) and relative phase (drives quantum interference).",
          "Explore single-qubit rotations on the Bloch sphere and construct state preparation circuits."
      ],
      "sections": [
          {
              "id": "11.1",
              "title": "Qubit State and Amplitudes",
              "explanation": "A pure quantum state of a single qubit is written as |\u03c8\u27e9 = \u03b1|0\u27e9 + \u03b2|1\u27e9, where \u03b1 and \u03b2 are complex numbers known as probability amplitudes. The Born rule states that upon measuring in the computational basis, the probability of obtaining outcome 0 is |\u03b1|\u00b2 and outcome 1 is |\u03b2|\u00b2. The fundamental normalization constraint demands that |\u03b1|\u00b2 + |\u03b2|\u00b2 = 1, ensuring total probability is conserved.",
              "analogy": "Imagine a 2D vector of length 1 pointing anywhere on a unit circle. The projections onto the horizontal and vertical axes give the amplitudes; squaring those shadow lengths gives the exact likelihood of the particle manifesting in state 0 or 1.",
              "example": "Applying a Hadamard gate H to |0\u27e9 creates (|0\u27e9 + |1\u27e9)/\u221a2. Here \u03b1 = 1/\u221a2 and \u03b2 = 1/\u221a2. The probabilities are |1/\u221a2|\u00b2 = 1/2 (50%) for |0\u27e9 and 1/2 (50%) for |1\u27e9. Sum: 1/2 + 1/2 = 1.0.",
              "points": [
                  {
                      "term": "Complex Amplitudes",
                      "detail": "Numbers \u03b1, \u03b2 \u2208 \u2102 containing both magnitude and phase information about the qubit state."
                  },
                  {
                      "term": "Born Rule",
                      "detail": "P(0) = |\u03b1|\u00b2 and P(1) = |\u03b2|\u00b2 \u2014 amplitudes must be squared in magnitude to yield observable probabilities."
                  },
                  {
                      "term": "Normalization Condition",
                      "detail": "|\u03b1|\u00b2 + |\u03b2|\u00b2 = 1 ensures probability is conserved throughout any unitary evolution."
                  },
                  {
                      "term": "Statevector",
                      "detail": "The column vector [\u03b1, \u03b2]\u1d40 describing the complete quantum state in the computational basis."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "11.2",
              "title": "Phase and Relative Phase",
              "explanation": "Quantum phase exists in two varieties: global phase and relative phase. A global phase e^(i\u03b8)|\u03c8\u27e9 multiplies all amplitudes equally; because |e^(i\u03b8)|\u00b2 = 1, it produces identical measurement statistics and cannot be observed. In contrast, a relative phase differences between components, such as |+\u27e9 = (|0\u27e9+|1\u27e9)/\u221a2 and |-\u27e9 = (|0\u27e9-|1\u27e9)/\u221a2, directly causes constructive or destructive interference when gates like Hadamard are applied.",
              "analogy": "Global phase is like changing the ocean's tide level everywhere equally \u2014 ships float normally without noticing. Relative phase is like two intersecting water waves creating peaks and troughs through interference.",
              "example": "Consider |-\u27e9 = (|0\u27e9 - |1\u27e9)/\u221a2. Measuring |-\u27e9 gives 50% |0\u27e9 and 50% |1\u27e9, identical to |+\u27e9! But apply H: H|+\u27e9 = |0\u27e9 with 100% certainty, while H|-\u27e9 = |1\u27e9 with 100% certainty! The relative phase completely flips the outcome.",
              "points": [
                  {
                      "term": "Global Phase",
                      "detail": "An overall multiplier e^(i\u03b8) with no observable physical effect on measurement statistics."
                  },
                  {
                      "term": "Relative Phase",
                      "detail": "The phase difference between basis states (|0\u27e9 + e^(i\u03c6)|1\u27e9) that controls quantum interference."
                  },
                  {
                      "term": "Z & S Gates",
                      "detail": "Z imparts a \u03c0 phase flip (|1\u27e9 \u2192 -|1\u27e9); S imparts a \u03c0/2 phase rotation (|1\u27e9 \u2192 i|1\u27e9)."
                  },
                  {
                      "term": "Interference Control",
                      "detail": "Quantum algorithms achieve speedups by tuning relative phases so wrong answers cancel and right answers reinforce."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "11.3",
              "title": "Single-Qubit State Exploration",
              "explanation": "Any pure single-qubit state can be represented as a point on the surface of a three-dimensional unit sphere called the Bloch sphere: |\u03c8\u27e9 = cos(\u03b8/2)|0\u27e9 + e^(i\u03c6)sin(\u03b8/2)|1\u27e9. Here, \u03b8 (0 \u2264 \u03b8 \u2264 \u03c0) determines polar angle (amplitude balance) and \u03c6 (0 \u2264 \u03c6 < 2\u03c0) determines azimuthal angle (relative phase). Quantum gates act as rotations around specific axes of this sphere.",
              "analogy": "The Bloch sphere is a globe: North Pole is |0\u27e9, South Pole is |1\u27e9, the Equator contains equal superpositions like |+\u27e9, |-\u27e9, |i\u27e9, and |-i\u27e9. Quantum gates are flight paths that rotate your position across the globe.",
              "example": "Starting at North Pole (|0\u27e9):\n1. Apply H: rotates 90\u00b0 about Y then 180\u00b0 about X, landing on the +X axis (|+\u27e9).\n2. Apply Z: rotates 180\u00b0 about Z-axis, moving from +X axis to -X axis (|-\u27e9).\n3. Apply H again: returns to South Pole (|1\u27e9).",
              "points": [
                  {
                      "term": "Bloch Coordinates",
                      "detail": "Angles (\u03b8, \u03c6) mapping any pure state to a unique vector (x, y, z) = (sin\u03b8 cos\u03c6, sin\u03b8 sin\u03c6, cos\u03b8)."
                  },
                  {
                      "term": "Pauli Rotations",
                      "detail": "Rx(\u03b8), Ry(\u03b8), and Rz(\u03b8) rotate the statevector continuously around the respective Cartesian axes."
                  },
                  {
                      "term": "Equator States",
                      "detail": "States with \u03b8 = \u03c0/2 having equal 50/50 probability but differing relative phases (|+\u27e9, |-\u27e9, |i\u27e9, |-i\u27e9)."
                  },
                  {
                      "term": "Purity & Mixed States",
                      "detail": "Pure states lie on the sphere's surface (|r| = 1); decohered or mixed states lie inside the sphere (|r| < 1)."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "11.4",
              "title": "State Preparation",
              "explanation": "State preparation is the first stage of every quantum algorithm: transforming initial default ground states |0...0\u27e9 into custom superposition, entangled, or encoded states. Using parameterized rotations Ry(\u03b8) and Rz(\u03c6), any desired single-qubit state \u03b1|0\u27e9 + \u03b2|1\u27e9 can be synthesized deterministically with minimal gate overhead.",
              "analogy": "State preparation is like tuning musical instruments before a concert: you must dial in exact frequencies and starting configurations before playing the symphony of quantum gates.",
              "example": "To prepare |\u03c8\u27e9 = \u221a0.8|0\u27e9 + \u221a0.2|1\u27e9:\nSet cos(\u03b8/2) = \u221a0.8 => \u03b8 = 2 * arccos(\u221a0.8) \u2248 0.927 rad (53.13\u00b0).\nApply circuit: Ry(0.927) on qubit 0 initialized at |0\u27e9.\nResulting state has exactly 80% probability for 0 and 20% for 1!",
              "points": [
                  {
                      "term": "Ground State Initialization",
                      "detail": "Hardware inherently resets qubits to |0\u27e9 using optical pumping, cooling, or active reset."
                  },
                  {
                      "term": "Arbitrary Single-Qubit Prep",
                      "detail": "A sequence of Rz(\u03c6)Ry(\u03b8) prepares any (\u03b1, \u03b2) from |0\u27e9 with zero unwanted phase."
                  },
                  {
                      "term": "Superposition Basis Prep",
                      "detail": "Applying H transforms computational basis {|0\u27e9, |1\u27e9} into Hadamard basis {|+\u27e9, |-\u27e9}."
                  },
                  {
                      "term": "Entangled State Prep",
                      "detail": "Applying H followed by CNOT creates the maximally entangled Bell state (|00\u27e9 + |11\u27e9)/\u221a2."
                  }
              ],
              "interactive": "comparison"
          }
      ],
      "takeaways": [
          "Quantum state amplitudes are complex numbers whose squared magnitudes dictate physical measurement probabilities.",
          "Relative phase controls quantum interference, whereas global phase has no observable consequence.",
          "The Bloch sphere visualizes single-qubit states and gates as 3D geometric rotations.",
          "State preparation initializes ground states into computational configurations using rotation and entangling gates."
      ]
  },
  {
      "id": 12,
      "title": "Quantum Measurement in Depth",
      "difficulty": "Intermediate",
      "icon": "\ud83c\udfaf",
      "overview": "Explore quantum measurement mechanics, computational vs non-computational bases, shot noise, statistical sampling variations, hardware noise models, and systematic analysis of quantum experiments.",
      "objectives": [
          "Understand how measurement bases affect outcomes and how to measure in X and Y bases using basis-change gates.",
          "Analyze the statistical nature of shots and finite sampling uncertainty in quantum results.",
          "Differentiate ideal statevector simulation from noisy hardware runs.",
          "Master the 4-step framework for interpreting quantum experimental histograms."
      ],
      "sections": [
          {
              "id": "12.1",
              "title": "Measurement in Different Bases",
              "explanation": "Standard quantum hardware only measures qubits directly in the computational Z-basis {|0\u27e9, |1\u27e9}. To measure in another basis (such as the X-basis {|+\u27e9, |-\u27e9} or Y-basis {|i\u27e9, |-i\u27e9}), we perform a unitary basis transformation immediately before the Z measurement. For the X-basis, applying H rotates {|+\u27e9, |-\u27e9} into {|0\u27e9, |1\u27e9}. For the Y-basis, applying S\u2020 followed by H rotates {|i\u27e9, |-i\u27e9} into {|0\u27e9, |1\u27e9}.",
              "analogy": "Imagine polarizing sunglasses. To measure light polarized at a 45\u00b0 angle, you don't rebuild your eyes; you simply tilt the filter glasses 45\u00b0 to align with the incoming light orientation.",
              "example": "```python\n# Measuring qubit 0 in the X-basis\nqc.h(0)          # Basis rotation: |+> -> |0>, |-> -> |1>\nqc.measure(0, 0) # Standard Z-measurement\n```\nIf state was |+\u27e9, the measured bit is '0' 100% of the time!",
              "points": [
                  {
                      "term": "Z-Basis Measurement",
                      "detail": "The native measurement projecting states onto eigenstates |0\u27e9 and |1\u27e9."
                  },
                  {
                      "term": "X-Basis Measurement",
                      "detail": "Apply Hadamard (H) gate before measurement; distinguishes |+\u27e9 and |-\u27e9."
                  },
                  {
                      "term": "Y-Basis Measurement",
                      "detail": "Apply S\u2020 (or S then Z) then H before measurement; distinguishes |i\u27e9 and |-i\u27e9."
                  },
                  {
                      "term": "Basis Transformation",
                      "detail": "Unitary mapping U that rotates arbitrary observable eigenbases into the computational basis."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "12.2",
              "title": "Measurement Statistics",
              "explanation": "Quantum measurement is intrinsically probabilistic. A single run ('shot') produces only one binary string. To estimate the underlying state probabilities P(x), quantum circuits must be executed over multiple repetitions (shots, e.g., 100, 1024, or 8192). The statistical variance of the estimated frequency follows the binomial distribution: standard error scales as 1/\u221a(shots).",
              "analogy": "Flipping a fair coin 10 times might give 7 heads and 3 tails (70% heads). Flipping it 10,000 times will almost certainly give very close to 50.0% heads due to the Law of Large Numbers.",
              "example": "Simulating a balanced Bell state with shots:\n- 100 shots: {'00': 46, '11': 54} (46% vs 54%)\n- 1000 shots: {'00': 508, '11': 492} (50.8% vs 49.2%)\n- 10000 shots: {'00': 4991, '11': 5009} (49.91% vs 50.09%)",
              "points": [
                  {
                      "term": "Shots",
                      "detail": "The number of independent circuit executions and measurements conducted."
                  },
                  {
                      "term": "Counts",
                      "detail": "The integer tally of how many times each specific bitstring was observed across all shots."
                  },
                  {
                      "term": "Shot Noise",
                      "detail": "Statistical variance inherent in finite sampling, decreasing proportionally to 1/\u221aN."
                  },
                  {
                      "term": "Frequency vs Probability",
                      "detail": "Observed frequency Count(x)/Shots converges to true probability |\u27e8x|\u03c8\u27e9|\u00b2 as shots \u2192 \u221e."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "12.3",
              "title": "Noise and Imperfect Results",
              "explanation": "Real NISQ (Noisy Intermediate-Scale Quantum) devices suffer from environmental decoherence, gate infidelities, and readout errors. While an ideal simulator produces only theoretical states, a physical quantum processor exhibits counts on forbidden states (e.g., observing '01' or '10' from an entangled pair). Noise models help quantify T1 (relaxation time) and T2 (dephasing time).",
              "analogy": "Ideal simulation is like listening to an audio track through studio monitors in a soundproof room. Real quantum hardware is like listening to a vintage vinyl record through an old radio with clicks, pops, and background hiss.",
              "example": "Measuring Bell state (|00\u27e9+|11\u27e9)/\u221a2 on hardware (1024 shots):\n- Ideal Simulator: {'00': 512, '11': 512}\n- Real Device: {'00': 480, '11': 472, '01': 38, '10': 34}\nThe spurious '01' and '10' counts are artifacts of readout errors and decoherence.",
              "points": [
                  {
                      "term": "T1 Relaxation",
                      "detail": "Energy relaxation time for an excited qubit |1\u27e9 to decay spontaneously to ground state |0\u27e9."
                  },
                  {
                      "term": "T2 Dephasing",
                      "detail": "Phase coherence time over which a superposition loses its relative phase relationship."
                  },
                  {
                      "term": "Readout Error",
                      "detail": "False measurement reporting where a qubit in state 0 is recorded as 1 or vice-versa."
                  },
                  {
                      "term": "Error Mitigation",
                      "detail": "Algorithmic techniques (like Zero-Noise Extrapolation and Readout Calibration) to recover ideal signals."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "12.4",
              "title": "Reading Experimental Results",
              "explanation": "To rigorously evaluate a quantum experiment, follow the standard 4-Step Analysis Framework: 1) Circuit Review: Verify gate order and qubit registers; 2) Backend & Shots: Note whether the run used an exact statevector simulator, noisy simulator, or real QPU with shot count; 3) Histogram Inspection: Identify dominant signal peaks vs noise floor; 4) Quantum Inference: Compare empirical distribution against theoretical expectations.",
              "analogy": "Reading a quantum experiment is like reading an X-ray or medical lab report: you check patient setup (circuit), machine calibration (backend), image features (peaks), and provide a diagnosis (conclusion).",
              "example": "4-Step Walkthrough:\n1. Circuit: H(0), CNOT(0,1), Measure(0,1)\n2. Backend: AerSimulator, shots=2048\n3. Histogram: '00' has 1030 counts, '11' has 1018 counts, others 0\n4. Conclusion: High-fidelity generation of Bell state |\u03a6+\u27e9 with 50.3% / 49.7% symmetric correlation.",
              "points": [
                  {
                      "term": "Step 1: Circuit Context",
                      "detail": "Examine wire allocation, gate dependencies, and classical register assignments."
                  },
                  {
                      "term": "Step 2: Execution Metadata",
                      "detail": "Check simulator seed, noise configuration, shot volume, and device calibration timestamp."
                  },
                  {
                      "term": "Step 3: Signal vs Noise Floor",
                      "detail": "Distinguish algorithmically intended outcome peaks from random background thermal noise."
                  },
                  {
                      "term": "Step 4: Formal Conclusion",
                      "detail": "Document fidelity, statistical significance, and agreement with theoretical bounds."
                  }
              ],
              "interactive": "comparison"
          }
      ],
      "takeaways": [
          "Measurement in bases other than Z requires pre-rotation gates (e.g. H for X-basis, S\u2020H for Y-basis).",
          "Quantum measurement is statistical; increasing shot count reduces sampling variance as 1/\u221a(shots).",
          "Real quantum devices have noise (T1, T2, readout error) resulting in non-zero counts on unintended states.",
          "The 4-step framework (Circuit, Backend, Histogram, Conclusion) guarantees sound experimental interpretation."
      ]
  },
  {
      "id": 13,
      "title": "Quantum Circuit Programming with Qiskit",
      "difficulty": "Intermediate",
      "icon": "\ud83d\udcbb",
      "overview": "Learn practical quantum circuit construction with IBM Qiskit: initializing QuantumCircuit objects, multi-qubit topologies, local Aer simulation, counts extraction, and systematic circuit debugging.",
      "objectives": [
          "Build single and multi-qubit quantum circuits using Qiskit SDK.",
          "Implement entangling gates and classical register measurement bindings.",
          "Execute circuits using AerSimulator and visualize result histograms.",
          "Diagnose and fix common Qiskit bugs: qubit indexing, endianness, missing measurements."
      ],
      "sections": [
          {
              "id": "13.1",
              "title": "Qiskit Circuit Basics",
              "explanation": "IBM Qiskit is the world's most widely adopted open-source quantum SDK. A circuit is created using the QuantumCircuit class, specifying the number of quantum registers (qubits) and classical registers (bits). Gates are applied as method calls on the circuit object (qc.h(0), qc.x(0)), and measurements bind qubit outcomes to classical bits.",
              "analogy": "A QuantumCircuit object is like a musical score: the horizontal lines are qubit wires, and musical notes placed along the timeline are quantum gate operations.",
              "example": "```python\nfrom qiskit import QuantumCircuit\n\n# Create a circuit with 1 qubit and 1 classical bit\nqc = QuantumCircuit(1, 1)\nqc.h(0)            # Put qubit 0 into superposition\nqc.measure(0, 0)   # Measure qubit 0 into classical bit 0\nprint(qc.draw())\n```",
              "points": [
                  {
                      "term": "QuantumCircuit",
                      "detail": "The core Qiskit container defining quantum registers, gates, and classical measurement targets."
                  },
                  {
                      "term": "Gate Methods",
                      "detail": "Methods like qc.h(), qc.x(), qc.y(), qc.z(), and qc.p() appended sequentially to qubit indices."
                  },
                  {
                      "term": "Classical Registers",
                      "detail": "Memory locations that store irreversible classical outcomes (0 or 1) from measurement."
                  },
                  {
                      "term": "Circuit Drawing",
                      "detail": "qc.draw('text') or qc.draw('mpl') renders an ASCII or graphical circuit diagram."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "13.2",
              "title": "Building Multi-Qubit Circuits",
              "explanation": "Multi-qubit circuits enable quantum entanglement and multi-body interactions. The controlled-NOT gate (qc.cx(control, target)) flips the target qubit if and only if the control qubit is |1\u27e9. Together with single-qubit gates, CNOT forms a universal gate set capable of expressing any arbitrary quantum computation.",
              "analogy": "CNOT is like a conditional switch in electrical wiring: the target light only turns on if the master control switch is actively closed.",
              "example": "```python\n# 2-qubit Bell State Circuit\nqc = QuantumCircuit(2, 2)\nqc.h(0)          # Superposition on control qubit\nqc.cx(0, 1)      # Entangle qubit 0 with qubit 1\nqc.measure([0, 1], [0, 1]) # Measure both qubits\n```",
              "points": [
                  {
                      "term": "Control & Target",
                      "detail": "Control qubit dictates whether an operation fires; target qubit undergoes the transformation."
                  },
                  {
                      "term": "Bell State (|\u03a6+\u27e9)",
                      "detail": "Generated via H on qubit 0 followed by CNOT(0, 1), yielding (|00\u27e9 + |11\u27e9)/\u221a2."
                  },
                  {
                      "term": "GHZ State",
                      "detail": "3+ qubit entanglement: H(0) followed by CNOT(0,1) and CNOT(1,2), yielding (|000\u27e9+|111\u27e9)/\u221a2."
                  },
                  {
                      "term": "Qiskit Endianness",
                      "detail": "Note: Qiskit orders bitstrings right-to-left: qubit 0 is the rightmost bit ('q1 q0')."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "13.3",
              "title": "Simulation with Qiskit Aer",
              "explanation": "Qiskit Aer provides high-performance C++ simulator backends for running quantum circuits on local classical computers. Using AerSimulator, circuits are compiled and simulated across thousands of shots. The resulting Job object returns result counts, which can be visualized directly as bar charts using plot_histogram.",
              "analogy": "Aer is like a flight flight-simulator program for pilots: it tests circuit behavior on your laptop with 100% safety before launching on actual cryogenic hardware.",
              "example": "```python\nfrom qiskit_aer import AerSimulator\n\nbackend = AerSimulator()\njob = backend.run(qc, shots=1024)\nresult = job.result()\ncounts = result.get_counts()\nprint(counts)  # e.g., {'00': 518, '11': 506}\n```",
              "points": [
                  {
                      "term": "AerSimulator",
                      "detail": "Primary Qiskit backend modeling both ideal statevector execution and realistic device noise."
                  },
                  {
                      "term": "backend.run()",
                      "detail": "Dispatches the circuit and execution parameters (shots, seed) asynchronously, returning a Job."
                  },
                  {
                      "term": "result.get_counts()",
                      "detail": "Extracts dictionary mapping observed bitstrings to their respective occurrences."
                  },
                  {
                      "term": "StatevectorSimulator",
                      "detail": "Directly computes mathematical statevector without shot noise, revealing exact complex amplitudes."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "13.4",
              "title": "Circuit Debugging",
              "explanation": "Debugging quantum software requires recognizing both classical coding errors and quantum-specific pitfalls. Common bugs include: 1) Forgetting measurement operations (producing empty counts); 2) Misinterpreting little-endian bitstring ordering; 3) Out-of-bounds qubit indices; 4) Inadvertently measuring before algorithmic phase interference is complete.",
              "analogy": "Quantum debugging is like tracing a plumbing system with clear pipes: if no water flows out the tap (counts), verify the valve wasn't left shut (missing measurement) or attached to the wrong pipe (qubit index).",
              "example": "```python\n# Buggy Code:\nqc = QuantumCircuit(2, 2)\nqc.h(0)\nqc.cx(0, 1)\n# BUG: Forgot qc.measure([0, 1], [0, 1])!\n# Fix:\nqc.measure_all() # Or qc.measure([0, 1], [0, 1])\n```",
              "points": [
                  {
                      "term": "Missing Measurement",
                      "detail": "Simulator cannot produce bitstring counts if no classical measurement gates are appended."
                  },
                  {
                      "term": "Endian Confusion",
                      "detail": "Qiskit counts {'01': 500} means qubit 0 is 1 and qubit 1 is 0 (right-to-left order)."
                  },
                  {
                      "term": "Premature Measurement",
                      "detail": "Measuring an intermediate qubit destroys its superposition and collapses entangled partners."
                  },
                  {
                      "term": "Transpiler Warnings",
                      "detail": "Transpiler maps abstract gates to native hardware basis gates; warning indicates unroutable connectivity."
                  }
              ],
              "interactive": "comparison"
          }
      ],
      "takeaways": [
          "Qiskit uses QuantumCircuit(qubits, bits) with gate methods to assemble quantum algorithms.",
          "Multi-qubit entanglement is generated through combinations of Hadamard and controlled gates like CNOT.",
          "Qiskit Aer provides local classical simulation with customizable shot counts and noise profiles.",
          "Beware Qiskit's little-endian bitstring convention and ensure all required measurement operations are bound."
      ]
  },
  {
      "id": 14,
      "title": "Quantum Programming with Other Frameworks",
      "difficulty": "Intermediate",
      "icon": "\ud83d\udd00",
      "overview": "Expand your quantum development toolkit across diverse frameworks: differentiable quantum computing in PennyLane, Google Cirq for superconducting hardware, and cloud-native workflows in Qbraid.",
      "objectives": [
          "Define variational quantum circuits and devices in Xanadu PennyLane.",
          "Construct grid-based quantum circuits and Moments in Google Cirq.",
          "Understand multi-framework orchestration and cloud access using Qbraid.",
          "Compare cross-framework syntax for core quantum primitives (superposition, entanglement, measurement)."
      ],
      "sections": [
          {
              "id": "14.1",
              "title": "PennyLane Circuit Workflow",
              "explanation": "Xanadu PennyLane is built for quantum machine learning (QML) and optimization. It treats quantum circuits as differentiable nodes (qnodes) that integrate seamlessly with PyTorch, TensorFlow, and JAX. You define a device (backend) and decorate Python functions with @qml.qnode(dev) to compute automatic gradients of quantum expectations.",
              "analogy": "If Qiskit is like building custom hardware circuits, PennyLane is like wrapping a neural network layer around a quantum computer, allowing backpropagation through quantum gates.",
              "example": "```python\nimport pennylane as qml\n\ndev = qml.device('default.qubit', wires=2)\n\n@qml.qnode(dev)\ndef circuit(x):\n    qml.RX(x, wires=0)\n    qml.CNOT(wires=[0, 1])\n    return qml.expval(qml.PauliZ(0))\n\ngrad = qml.grad(circuit)(0.54) # Automatic quantum gradient!\n```",
              "points": [
                  {
                      "term": "QNode",
                      "detail": "A quantum circuit bound to a computational device that can evaluate expectations and gradients."
                  },
                  {
                      "term": "qml.device()",
                      "detail": "Specifies execution backend (e.g. 'default.qubit', Amazon Braket, IBM Qiskit, or Rigetti)."
                  },
                  {
                      "term": "Automatic Differentiation",
                      "detail": "Calculates analytic parameter-shift gradients for optimizing variational algorithms."
                  },
                  {
                      "term": "Observable Returns",
                      "detail": "Returns expectation values (expval), variances (var), sample counts, or state probabilities."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "14.2",
              "title": "Cirq Circuit Workflow",
              "explanation": "Google Cirq is designed for NISQ algorithms on superconducting quantum processors (such as Google Sycamore). In Cirq, circuits are structured into explicit 'Moments' \u2014 discrete time slices during which non-overlapping gates act simultaneously on physical GridQubit objects that reflect 2D chip geometries.",
              "analogy": "Cirq is like a ballet choreographer planning dancers' positions moment by moment, ensuring no two movements collide during the exact same musical measure.",
              "example": "```python\nimport cirq\n\nq0, q1 = cirq.LineQubit.range(2)\ncircuit = cirq.Circuit(\n    cirq.H(q0),\n    cirq.CNOT(q0, q1),\n    cirq.measure(q0, q1, key='result')\n)\nsim = cirq.Simulator()\nresult = sim.run(circuit, repetitions=1000)\nprint(result.histogram(key='result'))\n```",
              "points": [
                  {
                      "term": "GridQubit & LineQubit",
                      "detail": "Qubit objects with explicit geometric coordinates (row, col) matching hardware layout."
                  },
                  {
                      "term": "Moment",
                      "detail": "A collection of operations that occur concurrently during the same clock cycle."
                  },
                  {
                      "term": "cirq.Simulator",
                      "detail": "Wavefunction simulator executing circuits and returning measurement repetitions."
                  },
                  {
                      "term": "Native Sycamore Gates",
                      "detail": "Specialized gates like PhasedFSim and Sycamore gate optimized for Google superconducting chips."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "14.3",
              "title": "Qbraid Workflow",
              "explanation": "Qbraid is a cloud-based quantum virtualization and development platform. It provides pre-configured environments with all quantum frameworks installed and a unified API that lets developers write code in Qiskit, Cirq, or PennyLane and transpile between them seamlessly for submission to AWS, IBM, or QuEra backends.",
              "analogy": "Qbraid is like an all-in-one universal travel adapter: no matter what plug your quantum code uses (Qiskit, Cirq, PennyLane), it connects to any international power outlet (IBM, Rigetti, IonQ).",
              "example": "```python\n# Transpiling across frameworks with Qbraid\nfrom qbraid import circuit_wrapper\n\nqiskit_circ = QuantumCircuit(2)\nqiskit_circ.h(0)\nqiskit_circ.cx(0, 1)\n\n# Convert Qiskit circuit to Cirq in one line\ncirq_circ = circuit_wrapper(qiskit_circ).to('cirq')\n```",
              "points": [
                  {
                      "term": "Unified Cloud Environment",
                      "detail": "Zero-install Jupyter notebooks with pre-configured SDK versions and dependencies."
                  },
                  {
                      "term": "Quantum Transpiler",
                      "detail": "Cross-framework translation converting ASTs between Qiskit, Cirq, PyQuil, and OpenQASM."
                  },
                  {
                      "term": "Hardware Brokerage",
                      "detail": "Single API key route to multiple quantum hardware providers (IBM, AWS Braket, OQC)."
                  },
                  {
                      "term": "Educational Sandbox",
                      "detail": "Provides student access quotas without needing commercial cloud vendor credit cards."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "14.4",
              "title": "Framework Comparison",
              "explanation": "Each framework has unique strengths: Qiskit excels at comprehensive educational documentation, pulse-level control, and IBM hardware integration. PennyLane is the standard for quantum machine learning and automatic differentiation. Cirq offers precise low-level control over NISQ hardware scheduling and Google processors.",
              "analogy": "Choosing a quantum framework is like choosing a programming language: Python (Qiskit) for general versatility, Julia/Rust (PennyLane) for fast gradients and ML, and C (Cirq) for bare-metal hardware control.",
              "example": "Comparison Matrix for Bell State:\n- Qiskit: `qc.h(0); qc.cx(0, 1)`\n- Cirq: `cirq.Circuit(cirq.H(q0), cirq.CNOT(q0, q1))`\n- PennyLane: `qml.Hadamard(wires=0); qml.CNOT(wires=[0, 1])`",
              "points": [
                  {
                      "term": "Qiskit Ecosystem",
                      "detail": "Best for general learning, community support, transpilation, and IBM Quantum hardware."
                  },
                  {
                      "term": "PennyLane Ecosystem",
                      "detail": "Best for hybrid classical-quantum ML, variational algorithms, and gradient optimization."
                  },
                  {
                      "term": "Cirq Ecosystem",
                      "detail": "Best for low-level NISQ control, Google hardware, and custom pulse/moment scheduling."
                  },
                  {
                      "term": "Interoperability",
                      "detail": "OpenQASM acts as the common assembly language shared across all modern frameworks."
                  }
              ],
              "interactive": "comparison"
          }
      ],
      "takeaways": [
          "PennyLane integrates quantum circuits with machine learning libraries via differentiable QNodes.",
          "Google Cirq models physical hardware architectures using geometric qubits and concurrent Moments.",
          "Qbraid provides an interoperable cloud platform supporting seamless cross-framework transpilation.",
          "OpenQASM and cross-compilers allow quantum developers to move code fluidly between ecosystems."
      ]
  },
  {
      "id": 15,
      "title": "Advanced Quantum Circuit Design",
      "difficulty": "Advanced",
      "icon": "\ud83d\udcd0",
      "overview": "Master architectural circuit metrics (width, depth, gate count), multi-qubit controlled gates, parameterized variational circuits, and circuit optimization techniques.",
      "objectives": [
          "Calculate and minimize quantum circuit depth, width, and two-qubit gate counts.",
          "Construct multi-controlled gates (Toffoli, Multi-Controlled X) and decompose them into native bases.",
          "Implement parameterized rotation circuits for variational quantum algorithms.",
          "Apply circuit cancellation and commutation rules to optimize circuit efficiency."
      ],
      "sections": [
          {
              "id": "15.1",
              "title": "Circuit Depth and Width",
              "explanation": "Two primary metrics determine whether a quantum circuit can execute successfully on NISQ hardware: Width (the number of qubits required) and Depth (the longest path of sequential gates between input and output, assuming independent gates execute in parallel). Minimizing depth is critical because circuits must complete execution before qubit decoherence times (T1, T2) elapse.",
              "analogy": "Circuit width is the number of lanes on a highway; circuit depth is the length of time cars take to drive through all toll booths along that highway.",
              "example": "Two independent Hadamard gates applied to qubits 0 and 1 execute in parallel:\n- Number of gates = 2\n- Circuit Width = 2 qubits\n- Circuit Depth = 1 time step\nIf followed by CNOT(0, 1), the depth increases to 2.",
              "points": [
                  {
                      "term": "Circuit Width",
                      "detail": "The total number of quantum wires (qubits) allocated in the algorithm."
                  },
                  {
                      "term": "Circuit Depth",
                      "detail": "The number of discrete time slices required to execute all dependent gate layers."
                  },
                  {
                      "term": "Gate Count",
                      "detail": "Total tally of operations, especially noisy 2-qubit CNOT gates that dominate error budgets."
                  },
                  {
                      "term": "Coherence Budget",
                      "detail": "Total execution duration (Depth \u00d7 Gate Time) must remain strictly smaller than T2 dephasing time."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "15.2",
              "title": "Controlled Operations",
              "explanation": "Controlled gates generalize conditional execution to multiple controls and arbitrary single-qubit unitaries. The Toffoli gate (CCNOT) flips the target only when both controls are 1, enabling reversible classical logic (AND, XOR). Any unitary U can be controlled (C(U)), and multi-controlled gates decompose into ladders of basic CNOT and single-qubit rotations.",
              "analogy": "A controlled-U gate is like a biometric bank vault: the vault door (unitary U) only unlocks when both keys (control qubits) are simultaneously turned in the locks.",
              "example": "```python\n# Toffoli (CCX) in Qiskit\nqc = QuantumCircuit(3, 1)\nqc.x(0)          # Control 1 = 1\nqc.x(1)          # Control 2 = 1\nqc.ccx(0, 1, 2)  # Target qubit 2 flips to 1\nqc.measure(2, 0) # Measures 1 with 100% certainty\n```",
              "points": [
                  {
                      "term": "Toffoli Gate (CCX)",
                      "detail": "Universal 3-qubit gate performing reversible Boolean AND logic: |c1, c2, t\u27e9 \u2192 |c1, c2, t \u2295 (c1\u00b7c2)\u27e9."
                  },
                  {
                      "term": "Controlled-Phase (CZ)",
                      "detail": "Symmetric 2-qubit gate imparting a \u03c0 phase flip only when both qubits are in state |11\u27e9."
                  },
                  {
                      "term": "Barenco Decomposition",
                      "detail": "Standard theorem proving any multi-controlled gate decomposes into single-qubit gates and CNOTs."
                  },
                  {
                      "term": "Ancilla Qubits",
                      "detail": "Auxiliary workspace qubits used to hold intermediate flags and reduce multi-controlled gate depth."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "15.3",
              "title": "Parameterized Circuits",
              "explanation": "Parameterized quantum circuits (also called ansatzes) contain gates whose rotation angles are variables: \u03b8 = [\u03b8\u2081, \u03b8\u2082, ...]. Instead of hardcoding fixed values, parameters are assigned dynamically at runtime. This enables hybrid quantum-classical algorithms (like VQE and QAOA) where a classical optimizer repeatedly evaluates and updates \u03b8 to minimize an objective function.",
              "analogy": "A parameterized circuit is like a camera lens with manual focus and aperture rings: you tweak the parameter dials until the picture sharpens to peak clarity.",
              "example": "```python\nfrom qiskit.circuit import Parameter\n\ntheta = Parameter('\u03b8')\nqc = QuantumCircuit(1)\nqc.rx(theta, 0)\n\n# Bind parameter value at runtime:\nbound_qc = qc.assign_parameters({theta: 3.14159})\n```",
              "points": [
                  {
                      "term": "Parameter Object",
                      "detail": "Symbolic placeholder in circuit graphs allowing rapid rebinding without recompiling."
                  },
                  {
                      "term": "Variational Ansatz",
                      "detail": "Parameterized circuit template designed to explore a subspace of the Hilbert space."
                  },
                  {
                      "term": "Hardware-Efficient Ansatz",
                      "detail": "Circuit topology tailored to native physical coupling maps to avoid SWAP routing overhead."
                  },
                  {
                      "term": "Barren Plateaus",
                      "detail": "Phenomenon in deep random ansatzes where cost function gradients vanish exponentially."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "15.4",
              "title": "Circuit Optimization Basics",
              "explanation": "Circuit transpilation and optimization compilers rewrite circuits into equivalent, more efficient representations. Key rules include: Gate cancellation (two consecutive self-inverse gates like X\u00b7X = I or H\u00b7H = I cancel completely), Commutation (commuting gates can be reordered to group cancellations), and Gate Synthesis (combining consecutive single-qubit rotations into one composite U3 gate).",
              "analogy": "Circuit optimization is like simplifying an algebraic equation: cancelling out terms like +5 and -5 simplifies 3x + 5 - 5 into 3x without changing the value.",
              "example": "Optimization Rules:\n- Inversion: H followed immediately by H = Identity (0 gates)\n- Inversion: CNOT(0,1) followed by CNOT(0,1) = Identity\n- Rotation Merge: Rz(\u03b8\u2081) \u00b7 Rz(\u03b8\u2082) = Rz(\u03b8\u2081 + \u03b8\u2082)\n- Transpiler Level: Qiskit `transpile(qc, optimization_level=3)` automatically applies these rules.",
              "points": [
                  {
                      "term": "Self-Inverse Cancellation",
                      "detail": "Hermitian unitary gates satisfy U\u00b2 = I; adjacent duplicates cancel into identity."
                  },
                  {
                      "term": "Commutation Relations",
                      "detail": "Gates that commute ([A, B] = 0) can slide past each other to unlock further cancellations."
                  },
                  {
                      "term": "Basis Gate Translation",
                      "detail": "Decomposing high-level operations into hardware-native sets (e.g. {ECR, RZ, SX, X})."
                  },
                  {
                      "term": "Qiskit Transpiler Levels",
                      "detail": "Levels 0 to 3 apply increasingly aggressive heuristic synthesis and routing algorithms."
                  }
              ],
              "interactive": "comparison"
          }
      ],
      "takeaways": [
          "Circuit width and depth directly constrain algorithm feasibility within hardware coherence limits.",
          "Multi-controlled unitaries (such as the Toffoli gate) form the foundation of reversible computation.",
          "Parameterized circuits allow classical optimizers to train quantum models for VQE and QAOA.",
          "Transpiler optimization eliminates redundant gates, merges rotations, and maps circuits efficiently to physical hardware."
      ]
  },
  {
      "id": 16,
      "title": "Quantum Algorithm Circuit Labs",
      "difficulty": "Advanced",
      "icon": "\ud83e\uddea",
      "overview": "Hands-on implementation of flagship quantum algorithms: Deutsch-Jozsa oracle verification, Grover's search with amplitude amplification, and near-term variational algorithms (QAOA and VQE).",
      "objectives": [
          "Construct and simulate the Deutsch-Jozsa algorithm to distinguish constant from balanced functions in one query.",
          "Build Grover search circuits with phase oracle and diffusion operator for quadratic speedup.",
          "Understand QAOA problem Hamiltonian mapping for combinatorial optimization.",
          "Trace the hybrid VQE closed-loop workflow for molecular ground-state energy estimation."
      ],
      "sections": [
          {
              "id": "16.1",
              "title": "Deutsch-Jozsa Circuit Lab",
              "explanation": "The Deutsch-Jozsa algorithm determines whether an unknown black-box Boolean function f: {0,1}\u207f \u2192 {0,1} is constant (outputs all 0s or all 1s) or balanced (outputs 0 for exactly half of inputs and 1 for the other half). A classical computer requires up to 2\u207f\u207b\u00b9 + 1 evaluations in the worst case; Deutsch-Jozsa solves this with exactly ONE quantum evaluation using quantum parallelism and destructive interference.",
              "analogy": "Imagine a coin that is either double-headed/double-tailed (constant) or standard heads/tails (balanced). A classical check requires looking at both sides. A quantum check shines a laser through both sides at once and reads the interference pattern instantly.",
              "example": "Algorithm Stages:\n1. Initialize n input qubits to |0\u27e9 and ancilla to |1\u27e9.\n2. Apply H to all qubits: puts input into superposition, ancilla into |-\n3. Apply Oracle U_f: phase-kickback flips relative phases according to f(x).\n4. Apply H to input qubits and measure.\nOutcome: If all measured bits are 00...0, f is constant; otherwise balanced!",
              "points": [
                  {
                      "term": "Quantum Parallelism",
                      "detail": "Evaluating the oracle on a superposition of all 2\u207f states simultaneously in one pass."
                  },
                  {
                      "term": "Phase Kickback",
                      "detail": "Writing function outputs f(x) into the phase of the input state using an ancilla in |-\u27e9."
                  },
                  {
                      "term": "Interference Filter",
                      "detail": "Hadamard transform produces constructive interference at |00...0\u27e9 if and only if f is constant."
                  },
                  {
                      "term": "Exponential Advantage",
                      "detail": "Demonstrates deterministic quantum speedup over classical deterministic querying."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "16.2",
              "title": "Grover Circuit Lab",
              "explanation": "Grover's algorithm searches an unstructured database of N = 2\u207f items for a target item in O(\u221aN) evaluations, compared to classical O(N). The circuit alternates two stages: 1) Oracle: Flips the phase of the target marked state |w\u27e9; 2) Diffusion Operator (Inversion about the Average): Amplifies the amplitude of the marked state while suppressing non-target states. Repeating this Grover iterate ~ (\u03c0/4)\u221aN times peaks target probability near 100%.",
              "analogy": "Searching for a friend in a crowded stadium: the oracle tags your friend with an invisible sticker, and the diffusion operator acts like an amplifier that raises your friend onto a pedestal while lowering everyone else's seats.",
              "example": "Searching N=4 states (2 qubits), target = |11\u27e9:\n1. H on both qubits: uniform superposition (|00\u27e9+|01\u27e9+|10\u27e9+|11\u27e9)/2.\n2. Oracle (CZ gate): flips phase of |11\u27e9 -> -|11\u27e9.\n3. Diffusion: H gates, X gates, CZ, X gates, H gates.\nAfter just 1 iteration: measuring gives |11\u27e9 with 100% probability!",
              "points": [
                  {
                      "term": "Phase Oracle",
                      "detail": "Unitary transformation R_w = I - 2|w\u27e9\u27e8w| that negates the amplitude of marked items."
                  },
                  {
                      "term": "Diffusion Operator",
                      "detail": "Inversion about average D = 2|s\u27e9\u27e8s| - I that boosts above-average amplitudes."
                  },
                  {
                      "term": "Grover Iterations",
                      "detail": "Optimal repetition count k \u2248 (\u03c0/4)\u221a(2\u207f); over-rotating causes probability to drop."
                  },
                  {
                      "term": "Quadratic Speedup",
                      "detail": "Transforms search complexity from N/2 classical operations to \u221aN quantum queries."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "16.3",
              "title": "QAOA Circuit Lab",
              "explanation": "The Quantum Approximate Optimization Algorithm (QAOA) is a hybrid variational algorithm designed to solve NP-hard combinatorial optimization problems (e.g., Max-Cut, Traveling Salesperson). QAOA alternates layers of problem Hamiltonian evolution e^(-i\u03b3 H_C) (which encodes problem constraints) and mixer Hamiltonian evolution e^(-i\u03b2 H_M) (which explores state space), tuning parameters (\u03b3, \u03b2) via classical feedback.",
              "analogy": "QAOA is like navigating a hilly terrain at night: the problem Hamiltonian raises valleys and peaks according to problem penalties, and the mixer gives the particle quantum momentum to settle into the lowest valley.",
              "example": "Max-Cut QAOA on a 2-node graph:\n1. Initialize: |+\u27e9|+\u27e9\n2. Cost layer: e^(-i\u03b3 Z\u2080Z\u2081) applied using CNOT, Rz(2\u03b3), CNOT\n3. Mixer layer: Rx(2\u03b2) on each qubit\n4. Classical optimizer updates (\u03b3, \u03b2) until measured cuts are maximized.",
              "points": [
                  {
                      "term": "Cost Hamiltonian (H_C)",
                      "detail": "Encodes objective function into Pauli-Z operators such that ground state is optimal solution."
                  },
                  {
                      "term": "Mixer Hamiltonian (H_M)",
                      "detail": "Sum of Pauli-X operators creating quantum tunneling between candidate configurations."
                  },
                  {
                      "term": "Circuit Depth (p)",
                      "detail": "Number of alternating cost-mixer layers; higher p yields better approximation ratios."
                  },
                  {
                      "term": "Approximation Ratio",
                      "detail": "Ratio between the expected quantum solution value and the true theoretical optimum."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "16.4",
              "title": "VQE Circuit Lab",
              "explanation": "The Variational Quantum Eigensolver (VQE) estimates the ground-state energy of molecular and materials Hamiltonians. By the Rayleigh-Ritz variational principle, the expectation value \u27e8\u03c8(\u03b8)|H|\u03c8(\u03b8)\u27e9 is strictly greater than or equal to the true ground-state energy E\u2080. The quantum processor prepares state |\u03c8(\u03b8)\u27e9 and measures energy terms, while a classical optimizer tunes \u03b8 to find the minimum.",
              "analogy": "VQE is like sculpting clay: the quantum chip shapes the clay according to dial settings (parameters), a digital scale weighs the sculpture's energy, and a classical sculptor adjusts the dials until the lightest possible form is discovered.",
              "example": "VQE for Hydrogen Molecule (H\u2082):\n1. Map electronic Hamiltonian to Pauli terms: H = c\u2080I + c\u2081Z\u2080 + c\u2082Z\u2081 + c\u2083Z\u2080Z\u2081 + c\u2084X\u2080X\u2081\n2. Prepare parameterized ansatz state |\u03c8(\u03b8)\u27e9 on 2 qubits.\n3. Measure each Pauli expectation value on quantum backend.\n4. Classical gradient descent adjusts \u03b8 until energy converges to ground state (-1.137 Hartree).",
              "points": [
                  {
                      "term": "Variational Principle",
                      "detail": "Guarantees \u27e8\u03c8(\u03b8)|H|\u03c8(\u03b8)\u27e9 \u2265 E\u2080 \u2014 trial energy is a rigorous upper bound on true ground energy."
                  },
                  {
                      "term": "Molecular Hamiltonian",
                      "detail": "Jordan-Wigner or Bravyi-Kitaev transformation maps fermionic orbitals into qubit Pauli strings."
                  },
                  {
                      "term": "Hybrid Loop",
                      "detail": "Quantum processor measures expectation values; classical CPU updates continuous parameter vectors."
                  },
                  {
                      "term": "NISQ Suitability",
                      "detail": "Low circuit depth and built-in resilience to coherent gate errors make VQE ideal for current hardware."
                  }
              ],
              "interactive": "comparison"
          }
      ],
      "takeaways": [
          "Deutsch-Jozsa demonstrates exponential deterministic query advantage via phase kickback and interference.",
          "Grover's algorithm provides quadratic speedup for unstructured search using oracle reflections and diffusion.",
          "QAOA maps combinatorial graph optimization problems to alternating cost and mixer unitary layers.",
          "VQE applies the variational principle in a hybrid quantum-classical loop to find molecular ground-state energies."
      ]
  },
  {
      "id": 17,
      "title": "Visualization and Interactive Quantum Lab",
      "difficulty": "Intermediate",
      "icon": "\ud83d\udd2c",
      "overview": "Interactive tools for inspecting quantum phenomena: multi-qubit circuit simulation workspaces, dynamic 3D Bloch sphere vector rotations, statevector amplitude plots, and side-by-side experiment comparisons.",
      "objectives": [
          "Navigate full-stack interactive circuit construction, execution, and output rendering.",
          "Track single-qubit trajectories on the 3D Bloch sphere across gate sequences.",
          "Correlate complex statevector amplitudes with measurement probability histograms.",
          "Perform side-by-side comparative analysis of distinct quantum circuits."
      ],
      "sections": [
          {
              "id": "17.1",
              "title": "Interactive Circuit Playground",
              "explanation": "A complete interactive quantum laboratory integrates circuit construction, parameter configuration, execution backend selection, and visual diagnostics in a single responsive interface. Students can arrange gates on timeline tracks, run instant simulations, inspect statevectors, and clear or step through circuits interactively.",
              "analogy": "The playground is like an electronic breadboard with an integrated oscilloscope: place components onto the board, toggle the power switch, and immediately see voltage waves displayed on screen.",
              "example": "Playground Workflow:\n1. Add H to wire 0 -> observe statevector split (|0\u27e9 and |1\u27e9 equal amplitudes).\n2. Add CNOT(0, 1) -> observe entangled two-qubit statevector.\n3. Toggle measurement gates -> run 1024 shots -> view output probability histogram.",
              "points": [
                  {
                      "term": "Timeline Editor",
                      "detail": "Multi-wire circuit canvas allowing gate placement, parameter modification, and reordering."
                  },
                  {
                      "term": "Real-Time Simulation",
                      "detail": "Instantaneous local matrix evaluation showing state changes after each gate placement."
                  },
                  {
                      "term": "Backend Dispatch",
                      "detail": "Toggle between ideal statevector calculations and finite shot-sampled simulation."
                  },
                  {
                      "term": "Reset & Step Control",
                      "detail": "Step forward/backward through gate execution to observe state evolution incrementally."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "17.2",
              "title": "Bloch Sphere Exploration",
              "explanation": "Visualizing single-qubit transformations on the 3D Bloch sphere bridges abstract complex algebra and geometric intuition. Applying Pauli X performs a 180\u00b0 rotation around the X-axis (North Pole |0\u27e9 to South Pole |1\u27e9). Pauli Z rotates 180\u00b0 around the Z-axis, swapping |+\u27e9 and |-\u27e9 along the equator. Hadamard performs a 180\u00b0 rotation around the diagonal X+Z axis.",
              "analogy": "Imagine a 3D globe in your hands: rotating it horizontally spins along lines of latitude (phase gates Rz), while tipping it upside down flips poles (bit-flip gates Rx and X).",
              "example": "Gate Paths on the Bloch Sphere:\n- Starting at North Pole (0, 0, 1):\n  - Gate X: rotates to South Pole (0, 0, -1)\n  - Gate H: rotates to +X Equator (1, 0, 0)\n  - Gate S: rotates 90\u00b0 about Z to +Y Equator (0, 1, 0)\n  - Gate Z: rotates 180\u00b0 about Z to -X Equator (-1, 0, 0)",
              "points": [
                  {
                      "term": "Z-Axis Poles",
                      "detail": "North Pole represents computational state |0\u27e9; South Pole represents |1\u27e9."
                  },
                  {
                      "term": "Equatorial Plane",
                      "detail": "States with equal 50% measurement probabilities, differentiated by azimuthal phase \u03c6."
                  },
                  {
                      "term": "Unitary Rotations",
                      "detail": "Every single-qubit gate corresponds to an SO(3) 3D rigid rotation of the state vector."
                  },
                  {
                      "term": "Limitation",
                      "detail": "The Bloch sphere directly represents 1 qubit; multi-qubit entangled states cannot be shown on a single sphere."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "17.3",
              "title": "Statevector and Probability Explorer",
              "explanation": "Before measurement occurs, a quantum system is described by an exact statevector: a list of 2\u207f complex numbers. The Statevector Explorer displays each amplitude's magnitude (|\u03b1|) and phase angle (arg(\u03b1)). Squaring the magnitudes immediately yields the exact theoretical probability bar chart, demonstrating how amplitudes map to empirical histograms.",
              "analogy": "The statevector is like the complete musical composition written on sheet music (including volume and pitch); the measurement histogram is what an audience hears when recording with a microphone.",
              "example": "State: |\u03c8\u27e9 = (1/2)|00\u27e9 + (i/2)|01\u27e9 + (1/\u221a2)|11\u27e9\n- Magnitudes: |00|=0.5, |01|=0.5, |10|=0.0, |11|=0.707\n- Phases: |00|=0 rad, |01|=\u03c0/2 (90\u00b0), |11|=0 rad\n- Probabilities: |00|=25%, |01|=25%, |10|=0%, |11|=50%",
              "points": [
                  {
                      "term": "Phase Angle (Color/Direction)",
                      "detail": "Often visualized as a phasor clock or color wheel representing arg(\u03b1) from 0 to 2\u03c0."
                  },
                  {
                      "term": "Amplitude Bar Height",
                      "detail": "Represents magnitude |\u03b1|, where bar height squared equals probability."
                  },
                  {
                      "term": "City Plot / Q-Sphere",
                      "detail": "Advanced visualizations plotting real and imaginary components of density matrices."
                  },
                  {
                      "term": "Superposition Inspection",
                      "detail": "Instantly verify whether a state is balanced, unentangled, or concentrated in a single subspace."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "17.4",
              "title": "Experiment Comparison",
              "explanation": "A critical practice in quantum engineering is side-by-side comparative analysis: running two distinct circuits or comparing the same circuit under ideal vs noisy simulator conditions. Comparing histograms reveals how adding or removing a single phase gate (like Z) transforms constructive interference into destructive cancellation.",
              "analogy": "Like looking at two photographs side-by-side in a 'spot the difference' game: comparing the baseline circuit with the modified circuit highlights exactly which quantum effects changed the outcome.",
              "example": "Comparing Circuit A vs Circuit B:\n- Circuit A: H(0) -> H(0) -> Measure -> 100% '0'\n- Circuit B: H(0) -> Z(0) -> H(0) -> Measure -> 100% '1'!\nA single Z gate flipped the entire outcome from 0 to 1 via relative phase interference.",
              "points": [
                  {
                      "term": "A/B Circuit Testing",
                      "detail": "Comparing two circuit designs side-by-side to isolate the impact of specific gate additions."
                  },
                  {
                      "term": "Ideal vs Noisy Comparison",
                      "detail": "Overlaying theoretical probabilities on noisy simulation to evaluate hardware fidelity."
                  },
                  {
                      "term": "Statistical Overlap (Fidelity)",
                      "detail": "Computing classical Bhattacharyya coefficient or quantum state fidelity between two runs."
                  },
                  {
                      "term": "Verification & Validation",
                      "detail": "Ensuring circuit optimizations preserve exact functional input-output semantics."
                  }
              ],
              "interactive": "comparison"
          }
      ],
      "takeaways": [
          "Interactive circuit environments unite editing, simulation, statevector tracking, and histogram visualization.",
          "The 3D Bloch sphere provides clear geometric intuition for single-qubit rotations, axes, and phases.",
          "The statevector reveals underlying complex amplitudes and phases before measurement collapse occurs.",
          "Side-by-side experiment comparison validates algorithmic behavior and reveals noise characteristics."
      ]
  },
  {
      "id": 18,
      "title": "Quantum Problem Solving and Practice",
      "difficulty": "Advanced",
      "icon": "\ud83e\udde9",
      "overview": "Synthesize quantum principles into practical engineering problem-solving: translating specifications to circuits, hand-predicting state evolution, algorithm selection frameworks, and end-to-end mini projects.",
      "objectives": [
          "Translate natural language specifications into concrete quantum state-preparation circuits.",
          "Predict intermediate states and measurement distributions by manual circuit tracing.",
          "Select optimal quantum algorithms (Grover, QAOA, VQE, QPE) for given problem classes.",
          "Execute an end-to-end mini quantum project encompassing design, simulation, and reporting."
      ],
      "sections": [
          {
              "id": "18.1",
              "title": "From Problem to Circuit",
              "explanation": "Solving a problem with a quantum computer follows a systematic 4-phase pipeline: 1) Problem Encoding: Formulate binary or continuous inputs into qubits; 2) Transformation Design: Select gates that execute required logical operations or state rotations; 3) Measurement Binding: Choose measurement bases and map classical register bits; 4) Interpretation: Decode classical bitstrings back into problem domain answers.",
              "analogy": "Building a quantum circuit from a problem is like designing an architectural blueprint: determine the building purpose (problem), lay the foundation (qubit registers), construct walls and rooms (gates), and install the doorways (measurements).",
              "example": "Task: Create an entangled 3-qubit state where all qubits agree (GHZ state: (|000\u27e9+|111\u27e9)/\u221a2).\nPipeline:\n1. Allocate 3 qubits initialized to |000\u27e9.\n2. Apply H to qubit 0 -> (|0\u27e9+|1\u27e9)/\u221a2 \u2297 |00\u27e9.\n3. Apply CNOT(0, 1) -> (|00\u27e9+|11\u27e9)/\u221a2 \u2297 |0\u27e9.\n4. Apply CNOT(1, 2) -> (|000\u27e9+|111\u27e9)/\u221a2.\n5. Measure all 3 qubits -> observe either '000' or '111' with equal 50% probability.",
              "points": [
                  {
                      "term": "Phase 1: Encoding",
                      "detail": "Decide between basis encoding, amplitude encoding, or angle encoding for problem data."
                  },
                  {
                      "term": "Phase 2: Gate Selection",
                      "detail": "Assemble unitary transformations that manipulate phase and create necessary correlations."
                  },
                  {
                      "term": "Phase 3: Measurement",
                      "detail": "Align measurement bases with the observable observables required by the problem."
                  },
                  {
                      "term": "Phase 4: Post-Processing",
                      "detail": "Analyze counts, compute cost functions, or extract optimal bitstring candidates."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "18.2",
              "title": "Circuit Prediction Exercises",
              "explanation": "A core hallmark of quantum proficiency is the ability to predict the output distribution of a circuit before running a simulator. By tracking the state vector step-by-step using Dirac notation, you calculate exact amplitudes and relative phases, verifying whether operations produce constructive or destructive interference.",
              "analogy": "Like a chess grandmaster calculating moves three steps ahead in their head before touching a piece on the board.",
              "example": "Circuit to Trace: Input |0\u27e9 -> H -> Z -> H -> Measure\n- Start: |0\u27e9\n- After H: (1/\u221a2)(|0\u27e9 + |1\u27e9) = |+\u27e9\n- After Z: (1/\u221a2)(|0\u27e9 - |1\u27e9) = |-\u27e9\n- After H: H|-\u27e9 = |1\u27e9\n- Prediction: Exactly 100% probability of measuring '1'.\nSimulate to verify: Counts = {'1': 1024, '0': 0}. Prediction confirmed!",
              "points": [
                  {
                      "term": "Step-by-Step Tracing",
                      "detail": "Writing the quantum state vector algebraically after each individual gate layer."
                  },
                  {
                      "term": "Dirac Bra-Ket Math",
                      "detail": "Manipulating superpositions using linearity: U(\u03b1|0\u27e9 + \u03b2|1\u27e9) = \u03b1U|0\u27e9 + \u03b2U|1\u27e9."
                  },
                  {
                      "term": "Tensor Products",
                      "detail": "Calculating joint states of multiple qubits: |q\u2081\u27e9 \u2297 |q\u2080\u27e9 = |q\u2081q\u2080\u27e9."
                  },
                  {
                      "term": "Verification Habit",
                      "detail": "Predict theoretical expectation first, then simulate to catch reasoning discrepancies."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "18.3",
              "title": "Algorithm Selection Practice",
              "explanation": "Quantum algorithms are not one-size-fits-all. Different problems demand specific algorithmic paradigms: Unstructured search or database inversion requires Grover's Algorithm; Finding eigenvalues, periods, or breaking RSA requires Quantum Phase Estimation (QPE) or Shor's Algorithm; Combinatorial graph optimization on NISQ hardware uses QAOA; Ground-state molecular simulation uses VQE.",
              "analogy": "Matching the algorithm to the problem is like choosing the right vehicle: you don't take a submarine across the desert; you pick a 4x4 truck (QAOA) for rough hills and a supersonic jet (Shor's) for long-distance factoring.",
              "example": "Selection Decision Tree:\n- Task: Find optimal assignment for graph coloring -> Combinatorial Optimization -> Select QAOA.\n- Task: Find secret key in unstructured database of 1,000,000 hashes -> Database Search -> Select Grover.\n- Task: Calculate dissociation energy of Lithium Hydride -> Quantum Chemistry -> Select VQE.",
              "points": [
                  {
                      "term": "Grover Domain",
                      "detail": "Unstructured search, satisfiability (SAT), global optimization, quadratic speedup."
                  },
                  {
                      "term": "Shor / QPE Domain",
                      "detail": "Period finding, discrete logarithms, integer factorization, exponential speedup."
                  },
                  {
                      "term": "VQE Domain",
                      "detail": "Quantum chemistry, condensed matter physics, molecular orbital ground states."
                  },
                  {
                      "term": "QAOA Domain",
                      "detail": "Combinatorial optimization, Max-Cut, TSP, binary constraint satisfaction."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "18.4",
              "title": "Mini Quantum Project",
              "explanation": "A complete mini quantum project demonstrates holistic engineering mastery: select a real-world scenario (e.g., Quantum Random Number Generator, Bell Test, or Quantum Teleportation), formulate the circuit, execute across multiple backends, evaluate noise impact, and document findings in a structured scientific experiment report.",
              "analogy": "A mini project is your capstone portfolio piece: taking everything you've learned from theory, circuits, coding, and simulation to build a complete working prototype.",
              "example": "Mini Project: Quantum Teleportation Protocol\n1. Prepare arbitrary state |\u03c8\u27e9 on qubit 0.\n2. Share Bell pair between Alice (qubit 1) and Bob (qubit 2).\n3. Alice performs Bell measurement on qubits 0 and 1.\n4. Send classical bits to Bob; Bob applies conditional X and Z gates.\n5. Verify Bob's qubit 2 matches |\u03c8\u27e9 with 100% state fidelity.",
              "points": [
                  {
                      "term": "Topic Selection",
                      "detail": "Choose from Teleportation, Superdense Coding, QRNG, or Deutsch-Jozsa."
                  },
                  {
                      "term": "Implementation",
                      "detail": "Write clean, modular code in Qiskit, PennyLane, or Cirq with comments."
                  },
                  {
                      "term": "Simulation & Data",
                      "detail": "Collect shot distributions, calculate fidelity metrics, and plot histograms."
                  },
                  {
                      "term": "Structured Report",
                      "detail": "Document Background, Methodology, Circuit Diagram, Results, and Conclusions."
                  }
              ],
              "interactive": "comparison"
          }
      ],
      "takeaways": [
          "Translating problems to quantum circuits requires methodical encoding, gate design, measurement, and decoding.",
          "Manual step-by-step statevector tracing builds rigorous intuition for constructive and destructive interference.",
          "Carefully match problem requirements to algorithm paradigms (Grover, Shor, QAOA, VQE).",
          "End-to-end mini projects synthesize circuit design, simulation, and empirical reporting."
      ]
  },
  {
      "id": 19,
      "title": "Assessment, Coding Challenges and Learning Analytics",
      "difficulty": "Advanced",
      "icon": "\ud83d\udcca",
      "overview": "Master performance evaluation, hands-on coding challenges, visual circuit target reconstruction, and student learning analytics dashboards for tracking mastery and identifying knowledge gaps.",
      "objectives": [
          "Leverage progressive chapter quizzes for active recall and diagnostic feedback.",
          "Solve automated quantum coding challenges with unit test verification.",
          "Construct target quantum circuits matching specific matrix and state criteria.",
          "Analyze learning analytics dashboards to track progress, score trends, and weak topics."
      ],
      "sections": [
          {
              "id": "19.1",
              "title": "Progressive Quizzes",
              "explanation": "Progressive chapter quizzes enforce active recall and verify conceptual mastery before unlocking subsequent chapters. Immediate per-question feedback explains not only why the correct answer is right, but why common misconceptions are wrong. Scoring at least 60% unlocks the next chapter, encouraging students to review material and retake assessments when needed.",
              "analogy": "Quizzes are like checkpoints in a video game: they ensure you've acquired the necessary keys and abilities before letting you open the door to the next level.",
              "example": "Quiz Mechanics:\n- 5 multiple-choice questions per chapter.\n- Instant color-coded feedback upon option selection (green for correct, red for wrong).\n- Detailed scientific explanation shown immediately.\n- Score calculation (e.g. 4/5 = 80% -> Pass!).\n- Next chapter unlocks upon passing.",
              "points": [
                  {
                      "term": "Active Recall",
                      "detail": "Testing knowledge directly strengthens neural memory retention far more than passive re-reading."
                  },
                  {
                      "term": "Diagnostic Feedback",
                      "detail": "Explanations provide targeted remediation for incorrect answers."
                  },
                  {
                      "term": "Mastery Gating",
                      "detail": "Ensures foundational concepts are cemented before introducing higher-level algorithms."
                  },
                  {
                      "term": "Unlimited Retries",
                      "detail": "Encourages a growth mindset: review the chapter text and retake the quiz to improve scores."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "19.2",
              "title": "Quantum Coding Challenges",
              "explanation": "Coding challenges transition learners from passive concept absorption to active code synthesis. Students write concise Python functions using Qiskit or PennyLane to solve specific tasks (e.g., preparing a Bell state, constructing a Grover diffuser). Automated test suites validate the generated QuantumCircuit against expected statevectors and unitary matrices.",
              "analogy": "Coding challenges are like flight simulator flight tests: you are given flight coordinates and weather conditions, and you must pilot the aircraft successfully to the destination runway.",
              "example": "Challenge Prompt: 'Write a function `create_bell_pair()` that returns a 2-qubit QuantumCircuit in state (|01\u27e9+|10\u27e9)/\u221a2.'\nSolution:\n```python\ndef create_bell_pair():\n    qc = QuantumCircuit(2)\n    qc.x(0)      # |10>\n    qc.h(0)      # Superposition\n    qc.cx(0, 1)  # Entangle -> (|01>+|10>)/\u221a2\n    return qc\n```\nTest Suite verifies statevector equals [0, 1/\u221a2, 1/\u221a2, 0]\u1d40.",
              "points": [
                  {
                      "term": "Automated Unit Tests",
                      "detail": "Validates circuit output by checking statevector equality within numerical tolerance (1e-6)."
                  },
                  {
                      "term": "Test Oracles",
                      "detail": "Asserts invariant properties without requiring hardcoded gate sequences."
                  },
                  {
                      "term": "Error Diagnostics",
                      "detail": "Returns clear feedback on assertion failures (e.g., 'Expected state |00\u27e9 probability 0.5, got 0.0')."
                  },
                  {
                      "term": "Incremental Difficulty",
                      "detail": "Progresses from single-qubit gates to multi-qubit entanglement and algorithm oracles."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "19.3",
              "title": "Circuit Challenges",
              "explanation": "Circuit challenges test visual and topological circuit assembly. Given a target output distribution (e.g., generating equal counts for '00' and '11' with zero counts for '01' and '10'), students must select the minimal set of gates, place them on the correct wires, and execute within specified depth constraints.",
              "analogy": "Circuit challenges are like mechanical puzzle locks: you must slide the right tumblers (gates) into the exact slots to unlock the safe door.",
              "example": "Target: Prepare state |\u03a8-\u27e9 = (|01\u27e9 - |10\u27e9)/\u221a2\nConstraints: Maximum 4 gates, width = 2 qubits.\nWinning Sequence:\n1. X(0)\n2. X(1)\n3. H(0)\n4. CNOT(0, 1)\nResulting state precisely matches the singlet state with optimal depth!",
              "points": [
                  {
                      "term": "Goal-Driven Assembly",
                      "detail": "Reverse-engineer circuit architectures from given statevectors or unitary matrices."
                  },
                  {
                      "term": "Resource Constraints",
                      "detail": "Challenges enforce gate count limits and depth caps to foster optimization habits."
                  },
                  {
                      "term": "Equivalence Checking",
                      "detail": "Multiple distinct gate orders can produce the same state; grading checks matrix equality."
                  },
                  {
                      "term": "Visual Feedback",
                      "detail": "Direct visual comparison between candidate circuit output and target goal."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "19.4",
              "title": "Performance Analytics",
              "explanation": "Learning analytics transform raw student activity into actionable pedagogical insights. Dashboards display completion percentage, average quiz score, chapter attempt counts, and learning streaks. Algorithms automatically detect 'weak topics' (chapters with low initial quiz scores or high retry counts) to recommend targeted review modules.",
              "analogy": "A fitness tracker for your brain: showing daily active minutes, calories burned (concepts learned), personal records (quiz scores), and areas needing more conditioning.",
              "example": "Student Analytics Summary:\n- Chapters Completed: 18 / 20 (90%)\n- Average Quiz Score: 84%\n- Day Streak: 5 days \ud83d\udd25\n- Strongest Topic: Chapter 13 (Qiskit Circuit Basics - 100%)\n- Flagged for Review: Chapter 11 (Phase & Relative Phase - 60% on first attempt)",
              "points": [
                  {
                      "term": "Completion Tracking",
                      "detail": "Visual progress rings and milestone indicators across all 20 curriculum chapters."
                  },
                  {
                      "term": "Score Trends",
                      "detail": "Historical tracking of initial vs best quiz scores over time."
                  },
                  {
                      "term": "Attempt Metrics",
                      "detail": "Logs retry attempts to distinguish instant mastery from topics requiring multiple passes."
                  },
                  {
                      "term": "Adaptive Recommendations",
                      "detail": "Prompts students to revisit flagged weak chapters before attempting final capstone assessments."
                  }
              ],
              "interactive": "comparison"
          }
      ],
      "takeaways": [
          "Progressive chapter quizzes use active recall and diagnostic feedback to solidify understanding.",
          "Automated coding challenges test programmatic circuit generation against rigorous unit test oracles.",
          "Circuit challenges teach minimal-depth circuit synthesis under strict gate budget constraints.",
          "Learning analytics provide clear visibility into completion, scores, study streaks, and weak areas."
      ]
  },
  {
      "id": 20,
      "title": "Complete Quantum Learning Journey and Platform Use",
      "difficulty": "Advanced",
      "icon": "\ud83c\udf93",
      "overview": "The capstone chapter synthesizing the full 20-chapter learning path: final experimental labs, comprehensive multi-domain assessment, learner completion certification, instructor management portals, and AI-assisted learning integration.",
      "objectives": [
          "Review the structured progression across all 20 curriculum chapters from fundamentals to algorithms.",
          "Execute the comprehensive Final Quantum Lab combining design, simulation, and analysis.",
          "Complete the summative Final Assessment covering theoretical, circuit, and coding competencies.",
          "Understand instructor management oversight, cloud infrastructure, and AI learning support capabilities."
      ],
      "sections": [
          {
              "id": "20.1",
              "title": "Learning Path",
              "explanation": "The 20-chapter QuantNexus curriculum forms an unbroken conceptual ladder: Foundations (Chapters 1-5: Qubits, Gates, Circuits, Superposition, Entanglement), Advanced Principles (Chapters 6-10: Teleportation, Algorithms, Noise, Cryptography, Modern Platform), Deep Dives (Chapters 11-15: Amplitudes, Measurement, Qiskit, Frameworks, Advanced Design), and Hands-On Labs (Chapters 16-20: Algorithm Labs, Visual Lab, Problem Solving, Analytics, Capstone).",
              "analogy": "Climbing a well-constructed mountain trail: each switchback builds elevation from gentle basecamp meadows (qubit basics) to the high-altitude summit (variational algorithm design).",
              "example": "Curriculum Milestones:\n- Ch 1-5: The Quantum Vocabulary & Mechanics\n- Ch 6-10: Quantum Information & Protocol Foundations\n- Ch 11-15: SDK Programming & Circuit Architecture\n- Ch 16-20: Algorithm Labs, Optimization, and Capstone Mastery",
              "points": [
                  {
                      "term": "Progressive Prerequisite Structure",
                      "detail": "Each chapter unlocks only after passing the prior assessment, ensuring no conceptual gaps."
                  },
                  {
                      "term": "Theory + Code + Visuals",
                      "detail": "Every concept balances mathematical explanation, code snippets, and interactive flip cards."
                  },
                  {
                      "term": "Self-Paced Navigation",
                      "detail": "Learners can review completed chapters anytime while advancing toward course completion."
                  },
                  {
                      "term": "Comprehensive Coverage",
                      "detail": "Encompasses the entire problem scope required by the SIH 26140 national standard."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "20.2",
              "title": "Final Quantum Lab",
              "explanation": "The Final Quantum Lab is an open-ended capstone experiment combining every skill acquired across the platform. Students select a complex protocol (such as 3-qubit Quantum Error Correction or a 3-node QAOA Max-Cut instance), construct the circuit from scratch, transpile for a simulated noisy backend, analyze output distributions, and formulate a formal scientific write-up.",
              "analogy": "The master thesis of your quantum course: taking off the training wheels and proving you can navigate a real scientific experiment from hypothesis to conclusion.",
              "example": "Capstone Lab Workflow:\n1. Problem Definition: Implement the 3-Qubit Bit-Flip Error Correction Code.\n2. Encode: State |\u03c8\u27e9 protected across 3 physical qubits using CNOT gates.\n3. Error Injection: Introduce simulated X noise on qubit 1.\n4. Syndrome Measurement: Detect error location using ancilla qubits without collapsing |\u03c8\u27e9.\n5. Correction: Apply conditional X gate to restore original state with 100% fidelity.",
              "points": [
                  {
                      "term": "Full Lifecycle",
                      "detail": "Spans hypothesis, circuit schematic, code implementation, simulation, and data extraction."
                  },
                  {
                      "term": "Noise Resilience Analysis",
                      "detail": "Evaluates how realistic gate errors degrade algorithmic success rates."
                  },
                  {
                      "term": "Data Synthesis",
                      "detail": "Combines statevector visualization, Bloch coordinates, and shot counts into unified charts."
                  },
                  {
                      "term": "Portfolio Ready",
                      "detail": "Produces an exportable experiment report suitable for student academic portfolios."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "20.3",
              "title": "Final Assessment",
              "explanation": "The Final Assessment evaluates comprehensive student mastery across all dimensions of quantum education: 1) Theoretical understanding of linear algebra, superposition, and entanglement; 2) Circuit prediction and debugging; 3) Framework programming in Qiskit; 4) Algorithmic problem matching and complexity analysis.",
              "analogy": "A comprehensive certification exam that verifies you have earned true quantum computational literacy.",
              "example": "Assessment Domains:\n- Domain 1: Quantum Foundations (Statevectors, Born rule, Phase)\n- Domain 2: Gates & Topologies (Unitary matrices, Bell states, Toffoli)\n- Domain 3: Programming (Qiskit syntax, shots, registers, Aer)\n- Domain 4: Algorithms (Grover, Deutsch-Jozsa, QAOA, VQE)",
              "points": [
                  {
                      "term": "Summative Evaluation",
                      "detail": "Synthesizes concepts spanning the entire 20-chapter curriculum."
                  },
                  {
                      "term": "Multi-Modal Questions",
                      "detail": "Combines conceptual multiple-choice, code snippet evaluation, and circuit tracing."
                  },
                  {
                      "term": "Certification Benchmark",
                      "detail": "Achieving \u226560% awards the Official QuantNexus Quantum Learning Certificate."
                  },
                  {
                      "term": "Detailed Breakdown",
                      "detail": "Reports per-domain competency scores to highlight areas of exceptional strength."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "20.4",
              "title": "Learner Dashboard and Completion",
              "explanation": "Upon completing all 20 chapters and passing the Final Assessment, the Learner Dashboard displays 100% course completion! Students gain access to their downloadable Certificate of Completion, full performance transcripts, cumulative score averages, and access to advanced project sandboxes.",
              "analogy": "Graduation day: receiving your diploma on stage, surrounded by all the projects, quizzes, and circuits you've conquered over your educational journey.",
              "example": "Completion State:\n- 20 / 20 Chapters Unlocked & Completed (100%)\n- Progress Ring: Fully animated 360\u00b0 gradient ring\n- Status: '\ud83c\udfc6 Quantum Scholar \u2014 Full Course Completed!'\n- Unlocks: Permanent access to all chapters for reference and review.",
              "points": [
                  {
                      "term": "100% Completion Badge",
                      "detail": "Golden badge displayed on the dashboard honoring mastery of all 20 chapters."
                  },
                  {
                      "term": "Academic Transcript",
                      "detail": "Consolidated record of every chapter's score, date of completion, and attempt count."
                  },
                  {
                      "term": "Review Mode",
                      "detail": "Free navigation to jump into any chapter or quiz at any time for ongoing reference."
                  },
                  {
                      "term": "Next Steps",
                      "detail": "Guidance on transitioning to quantum hardware access (IBM Quantum, AWS Braket) and open-source contributions."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "20.5",
              "title": "Instructor and Platform Review",
              "explanation": "QuantNexus is designed for institutional deployment in universities, hackathons, and research labs. The platform architecture includes role-based authentication, student progress tracking, cohort analytics, responsive design across mobile/desktop, and cloud-ready REST API hooks for integration into Canvas, Moodle, or Blackboard LMS.",
              "analogy": "The university control center: giving professors and administrators a bird's-eye view of how entire cohorts of students are advancing through the quantum curriculum.",
              "example": "Instructor Dashboard Features:\n- Cohort Overview: 250 students enrolled, 82% average completion rate.\n- Drop-off Detection: Flags Chapter 11 as having lower initial pass rates, suggesting an instructor lecture review.\n- Export: One-click CSV export of all student grades and quiz scores.",
              "points": [
                  {
                      "term": "Instructor Dashboard",
                      "detail": "Monitor student enrollment, individual progress timelines, and aggregate cohort statistics."
                  },
                  {
                      "term": "Role-Based Access",
                      "detail": "Distinct permissions for students, teaching assistants, and lead instructors."
                  },
                  {
                      "term": "LMS Compatibility",
                      "detail": "Designed to integrate with institutional learning management systems via LTI and REST APIs."
                  },
                  {
                      "term": "Cross-Device Responsive UI",
                      "detail": "Seamless performance on mobile phones, tablets, laptops, and large laboratory displays."
                  }
              ],
              "interactive": "flip"
          },
          {
              "id": "20.6",
              "title": "AI Learning Support Integration",
              "explanation": "Looking toward the future of the platform (as envisioned in the SIH problem statement), an AI Learning Assistant can serve as a 24/7 personal quantum tutor. AI capabilities include explaining confusing circuit behaviors in plain language, generating custom practice circuits, diagnosing compilation errors, and suggesting personalized revision topics.",
              "analogy": "Having a friendly quantum physics professor sitting right beside you while you study, ready to answer questions, explain errors, and give encouraging hints whenever you get stuck.",
              "example": "Future AI Interactions:\n- Student: 'Why did my circuit produce 0 counts for |11>?'\n- AI Tutor: 'Let\\'s look at step 2: You applied an X gate to qubit 0, but your CNOT control was qubit 1, which was still in state |0>. Try flipping the control and target wires!'",
              "points": [
                  {
                      "term": "Contextual Explanations",
                      "detail": "AI translates complex matrix transformations into intuitive student-tailored explanations."
                  },
                  {
                      "term": "Code Debugging Assistant",
                      "detail": "Pinpoints Qiskit syntax and quantum semantic bugs with line-by-line remediation."
                  },
                  {
                      "term": "Adaptive Problem Generation",
                      "detail": "Creates custom challenge exercises focused specifically on a student's demonstrated weak areas."
                  },
                  {
                      "term": "Ethical Socratic Guidance",
                      "detail": "Provides hints and guiding questions rather than simply revealing answers, fostering true learning."
                  }
              ],
              "interactive": "comparison"
          }
      ],
      "takeaways": [
          "The 20-chapter QuantNexus curriculum takes students from fundamental qubits to advanced algorithm labs.",
          "The Final Quantum Lab and Final Assessment rigorously evaluate complete quantum computational literacy.",
          "Reaching 100% completion unlocks graduation honors and full transcript review.",
          "Institutional instructor tooling and future AI tutor integration ensure scalable, state-of-the-art quantum education."
      ]
  }
];

/* ── Verified Educational YouTube Videos for Chapters 1-20 ── */
const CHAPTER_VIDEOS = {
  1: {
    id: "JhHMJCUmq28",
    title: "Quantum Computers Explained – Limits of Human Technology",
    channel: "Kurzgesagt – In a Nutshell",
    duration: "7:17",
    description: "A visually stunning overview of quantum computing, qubits, and why superposition makes quantum computers fundamentally different from classical supercomputers.",
    url: "https://www.youtube.com/watch?v=JhHMJCUmq28"
  },
  2: {
    id: "zNzzGgr2mhk",
    title: "How To Make a Quantum Bit",
    channel: "Veritasium",
    duration: "10:14",
    description: "Explore the physical nature of qubits, computational basis states |0⟩ and |1⟩, spin, and how quantum two-level systems store quantum information.",
    url: "https://www.youtube.com/watch?v=zNzzGgr2mhk"
  },
  3: {
    id: "IOYyCHGWJq4",
    title: "Schrödinger's Cat and Superposition",
    channel: "minutephysics",
    duration: "1:48",
    description: "A clear, intuitive visualization of quantum superposition, the famous Schrödinger's cat thought experiment, and the act of measurement.",
    url: "https://www.youtube.com/watch?v=IOYyCHGWJq4"
  },
  4: {
    id: "HHV-P4_Xp1E",
    title: "How Quantum Computers Compute - Quantum Gates",
    channel: "Physics but Awesome",
    duration: "8:30",
    description: "Understand unitary quantum logic gates (Pauli X, Y, Z, Hadamard, and CNOT), reversibility, and how circuits manipulate quantum states.",
    url: "https://www.youtube.com/watch?v=HHV-P4_Xp1E"
  },
  5: {
    id: "ZuvK-od647c",
    title: "Quantum Entanglement & Spooky Action at a Distance",
    channel: "Veritasium",
    duration: "9:12",
    description: "Deep dive into Bell states, quantum correlation between entangled qubits, and Einstein's spooky action at a distance made mathematically clear.",
    url: "https://www.youtube.com/watch?v=ZuvK-od647c"
  },
  6: {
    id: "oaAjxcIFLtM",
    title: "Coding with Qiskit 1.x Series Announcement & Circuit Basics",
    channel: "Qiskit",
    duration: "4:32",
    description: "Learn how to build quantum circuits, apply gates sequentially to wires, and translate graphical diagrams into executable Python code.",
    url: "https://www.youtube.com/watch?v=oaAjxcIFLtM"
  },
  7: {
    id: "FrXQkJIbO3w",
    title: "Quantum Computing in Practice with Dr. Olivia Lanes",
    channel: "Qiskit",
    duration: "12:45",
    description: "Practical guide to running quantum circuits across simulators (AerSimulator), configuring shot counts, and analyzing probabilistic measurement output.",
    url: "https://www.youtube.com/watch?v=FrXQkJIbO3w"
  },
  8: {
    id: "lvTqbM5Dq4Q",
    title: "How Quantum Computers Break Encryption | Shor's Algorithm Explained",
    channel: "minutephysics",
    duration: "6:35",
    description: "Discover quantum speedup through the lens of Shor's factoring and Grover's search algorithms, quantum parallelism, and phase interference.",
    url: "https://www.youtube.com/watch?v=lvTqbM5Dq4Q"
  },
  9: {
    id: "AYGHS9hXgyw",
    title: "Bloch Sphere | Visualizing Qubits and Spin | Quantum Information",
    channel: "Pretty Much Physics",
    duration: "8:50",
    description: "Visualize single-qubit states on the unit sphere, polar and azimuthal angles (θ, φ), and how unitary gates represent geometric 3D rotations.",
    url: "https://www.youtube.com/watch?v=AYGHS9hXgyw"
  },
  10: {
    id: "OWJCfOvochA",
    title: "Quantum Computing Expert Explains One Concept in 5 Levels of Difficulty",
    channel: "WIRED",
    duration: "19:46",
    description: "Dr. Talia Gershon explains quantum computing across 5 progressive levels — connecting foundational intuition with advanced assessment principles.",
    url: "https://www.youtube.com/watch?v=OWJCfOvochA"
  },
  11: {
    id: "jEcDqdOOtE4",
    title: "Qubits & Tensor Products: The Quantum World in Half a Minute",
    channel: "Inside Systems",
    duration: "3:40",
    description: "Master multi-qubit Hilbert spaces, tensor products (⊗), statevector scaling with 2ⁿ dimensions, and distinguishing separable from entangled states.",
    url: "https://www.youtube.com/watch?v=jEcDqdOOtE4"
  },
  12: {
    id: "0Rr9-r6YfQ8",
    title: "What Is Wavefunction Collapse? (Quantum Measurement in Depth)",
    channel: "XenoSphere Originals",
    duration: "5:20",
    description: "A comprehensive examination of quantum measurement: Born's rule, projection operators, wavefunction collapse, and non-demolition measurements.",
    url: "https://www.youtube.com/watch?v=0Rr9-r6YfQ8"
  },
  13: {
    id: "Jx7IuJMYtJM",
    title: "How to Program a Quantum Computer Using Qiskit",
    channel: "IBM Technology",
    duration: "11:05",
    description: "Hands-on walk-through creating QuantumCircuit objects, adding gates, binding classical registers, transpilation, and executing on real hardware and Aer.",
    url: "https://www.youtube.com/watch?v=Jx7IuJMYtJM"
  },
  14: {
    id: "kKItaYSA3u4",
    title: "Use a REAL Quantum Computer (ft. Amazon Braket & PennyLane)",
    channel: "PennyLane",
    duration: "10:15",
    description: "Survey the multi-framework quantum ecosystem — compare PennyLane for quantum machine learning with Cirq and cloud execution on qBraid / AWS Braket.",
    url: "https://www.youtube.com/watch?v=kKItaYSA3u4"
  },
  15: {
    id: "IdZkxX-Qank",
    title: "Quantum Error Correction: Surface Codes",
    channel: "Decodoku",
    duration: "9:50",
    description: "Advanced circuit design for fault tolerance: syndrome extraction, physical vs. logical qubits, parity check circuits, and 2D planar surface codes.",
    url: "https://www.youtube.com/watch?v=IdZkxX-Qank"
  },
  16: {
    id: "0RPFWZj7Jm0",
    title: "Grover's Algorithm – Programming on Quantum Computers – Coding with Qiskit",
    channel: "Qiskit",
    duration: "14:10",
    description: "Step-by-step laboratory implementation: construct the quantum phase oracle, reflection about the mean (diffuser circuit), and observe O(√N) amplitude amplification.",
    url: "https://www.youtube.com/watch?v=0RPFWZj7Jm0"
  },
  17: {
    id: "WjjUfEpej-0",
    title: "Visualizing Qubits on the Bloch Sphere",
    channel: "Qiskit",
    duration: "6:24",
    description: "Master visualization tools in modern quantum toolkits: plot_bloch_multivector, state city plots, phase disks, and interactive quantum laboratory displays.",
    url: "https://www.youtube.com/watch?v=WjjUfEpej-0"
  },
  18: {
    id: "DUq-0r-Prw0",
    title: "What Is the Variational Quantum Eigensolver? | VQE Explained",
    channel: "Qiskit",
    duration: "12:18",
    description: "Solve complex optimization and quantum chemistry problems using hybrid quantum-classical algorithms (VQE, QAOA) with parameterized ansatz circuits.",
    url: "https://www.youtube.com/watch?v=DUq-0r-Prw0"
  },
  19: {
    id: "ya1znubyfdk",
    title: "Huge Breakthrough in Quantum Computing & Benchmarking",
    channel: "Cleo Abram",
    duration: "14:40",
    description: "Understand quantum benchmark metrics, circuit grading, algorithmic fidelity, quantum volume, and proving quantum utility across real applications.",
    url: "https://www.youtube.com/watch?v=ya1znubyfdk"
  },
  20: {
    id: "hQIRAPS1cTw",
    title: "Who's Building the Quantum Internet? The Global Race for Quantum Networking",
    channel: "Quantum SystemHub",
    duration: "11:30",
    description: "Explore the complete quantum landscape: distributed quantum computing, quantum key distribution (QKD), career paths, and the future of quantum technology.",
    url: "https://www.youtube.com/watch?v=hQIRAPS1cTw"
  }
};

// Bind videos to chapters
CHAPTERS_DATA.forEach(ch => {
  if (CHAPTER_VIDEOS[ch.id]) {
    ch.video = CHAPTER_VIDEOS[ch.id];
  }
});

// Helper functions
function getChapterById(id) {
  return CHAPTERS_DATA.find(c => c.id === id);
}
function getChapterVideo(id) {
  return CHAPTER_VIDEOS[id] || null;
}
function getDifficultyClass(diff) {
  return diff === 'Beginner' ? 'diff-beginner' : 'diff-intermediate';
}

