/**
 * QuantNexus – Quiz Questions for All 10 Chapters
 * 5 questions per chapter, MCQ format
 */

const QUIZ_DATA = {
  1: {
    chapterTitle: "Introduction to Quantum Computing",
    questions: [
      {
        q: "What is the fundamental difference between a classical bit and a qubit?",
        options: [
          "A classical bit is made of silicon; a qubit is made of atoms",
          "A classical bit is either 0 or 1; a qubit can exist in a superposition of both simultaneously",
          "A classical bit processes information faster than a qubit",
          "There is no difference — a qubit is just a faster bit"
        ],
        answer: 1,
        explanation: "A classical bit is strictly 0 OR 1. A qubit can be in a superposition α|0⟩ + β|1⟩, meaning it genuinely occupies both states simultaneously until measured."
      },
      {
        q: "Which of the following is NOT a core quantum computing vocabulary term introduced in Chapter 1?",
        options: ["Qubit", "Entanglement", "Transistor", "Superposition"],
        answer: 2,
        explanation: "Transistors are classical electronic components used in classical computing. The quantum vocabulary includes: qubit, gate, circuit, measurement, state, superposition, entanglement, and algorithm."
      },
      {
        q: "Why is an interactive learning platform particularly useful for quantum computing?",
        options: [
          "Because quantum computers are free to access online",
          "Because quantum concepts are abstract and visualization/simulation builds intuition",
          "Because text books are too expensive",
          "Because quantum computing has no mathematical foundation"
        ],
        answer: 1,
        explanation: "Quantum concepts (superposition, entanglement, interference) are counterintuitive and highly abstract. Interactive simulation lets learners see these phenomena visually, building genuine intuition beyond what text alone can provide."
      },
      {
        q: "Where is quantum computing expected to provide the most significant advantages?",
        options: [
          "Running word processors and spreadsheets faster",
          "Streaming video with less buffering",
          "Drug discovery, cryptography, materials science, and optimization problems",
          "Playing video games at higher frame rates"
        ],
        answer: 2,
        explanation: "Quantum computing's advantages shine in problems with exponential complexity: simulating molecular interactions (drug discovery), breaking and building cryptographic protocols, optimizing complex logistics, and materials simulation."
      },
      {
        q: "What is a quantum algorithm?",
        options: [
          "A faster version of a classical algorithm running on the same hardware",
          "A step-by-step procedure using quantum operations to solve computational problems",
          "A type of machine learning model used in AI",
          "A cryptographic key for securing quantum networks"
        ],
        answer: 1,
        explanation: "A quantum algorithm is a defined sequence of quantum operations (gates, measurements) designed to exploit quantum properties like superposition and entanglement to solve specific computational problems."
      }
    ]
  },
  2: {
    chapterTitle: "Qubits and Quantum States",
    questions: [
      {
        q: "What does the notation |0⟩ represent in quantum computing?",
        options: [
          "A qubit with value zero (ground state) in Dirac ket notation",
          "The number zero written in a special font",
          "An empty quantum register",
          "The probability of measuring zero"
        ],
        answer: 0,
        explanation: "|0⟩ is the ket notation for the ground/zero basis state. It's a column vector [1, 0]. The '|' and '⟩' are just the bracket notation introduced by Paul Dirac."
      },
      {
        q: "A qubit is in state α|0⟩ + β|1⟩. What is the probability of measuring |1⟩?",
        options: ["α", "β", "|β|²", "|α|² + |β|²"],
        answer: 2,
        explanation: "By the Born rule, the probability of measuring a particular basis state is the square of the magnitude of its amplitude. P(measuring |1⟩) = |β|². Note that |α|²+|β|²=1 always."
      },
      {
        q: "What does a statevector represent?",
        options: [
          "The speed at which quantum gates execute",
          "A list of complex amplitudes that completely describes the quantum state",
          "The direction of the qubit's magnetic field",
          "The number of gates in a quantum circuit"
        ],
        answer: 1,
        explanation: "A statevector is a complex vector (one entry per basis state) that gives the complete quantum description of a system. For n qubits, it has 2^n entries. It's the mathematical 'fingerprint' of the quantum state."
      },
      {
        q: "What happens to a qubit's state when a quantum gate is applied?",
        options: [
          "The qubit is destroyed and recreated",
          "The statevector is multiplied by the gate's unitary matrix, transforming the state",
          "The qubit's probability is increased",
          "The qubit is measured and reset to |0⟩"
        ],
        answer: 1,
        explanation: "Quantum gates are unitary matrices. Applying a gate transforms (rotates) the statevector through matrix multiplication: new_state = Gate × old_state. Information is preserved because unitary matrices are reversible."
      },
      {
        q: "What is the initial state of all qubits in a quantum circuit by default?",
        options: ["|+⟩ (superposition)", "|1⟩", "|0⟩ (ground state)", "Random"],
        answer: 2,
        explanation: "All qubits start in |0⟩ by default — this is the quantum analog of initializing all bits to 0 in classical computing. You can explicitly set qubits to |1⟩ by applying an X gate at the start of the circuit."
      }
    ]
  },
  3: {
    chapterTitle: "Superposition and Measurement",
    questions: [
      {
        q: "What is quantum superposition?",
        options: [
          "A qubit being in an unknown but definite state",
          "A qubit genuinely existing in multiple states simultaneously until measured",
          "Running two quantum circuits at the same time",
          "A qubit that is half classical and half quantum"
        ],
        answer: 1,
        explanation: "Superposition is not just 'we don't know the state'. The qubit genuinely has no definite value — it's truly in both |0⟩ and |1⟩ simultaneously. Only measurement collapses this to a definite outcome."
      },
      {
        q: "What does the Hadamard (H) gate do when applied to |0⟩?",
        options: [
          "Flips it to |1⟩",
          "Creates an equal superposition: (|0⟩ + |1⟩)/√2",
          "Multiplies the amplitude by 2",
          "Measures the qubit and returns 0"
        ],
        answer: 1,
        explanation: "H|0⟩ = |+⟩ = (|0⟩+|1⟩)/√2. Both amplitudes become 1/√2 ≈ 0.707. Squaring these gives P(0)=0.5 and P(1)=0.5 — a perfect 50/50 superposition."
      },
      {
        q: "Why do we run a quantum circuit multiple times (shots) rather than just once?",
        options: [
          "Quantum computers crash frequently and need retries",
          "Each measurement is probabilistic — multiple runs are needed to estimate the probability distribution",
          "One shot is not enough time for the circuit to complete",
          "The first shot is always wrong due to quantum error"
        ],
        answer: 1,
        explanation: "Quantum measurement is fundamentally probabilistic (Born rule). A single shot gives one classical bit per qubit, which could be any valid outcome. Running many shots builds a statistical histogram that approximates the true probability distribution."
      },
      {
        q: "What does a measurement histogram show for a qubit in superposition |+⟩ after 1000 shots?",
        options: [
          "One tall bar at '0' and nothing at '1'",
          "One tall bar at '1' and nothing at '0'",
          "Two bars of approximately equal height at '0' and '1'",
          "A smooth curve spanning all values between 0 and 1"
        ],
        answer: 2,
        explanation: "|+⟩ has P(0)=P(1)=0.5. With 1000 shots, you'll see approximately 500 counts for '0' and 500 for '1' — two approximately equal bars. Exact 50/50 is only achieved in the limit of infinite shots."
      },
      {
        q: "What happens when you measure a qubit in superposition?",
        options: [
          "It stays in superposition but reveals its hidden value",
          "It collapses to a definite classical value (0 or 1) based on its amplitudes",
          "It becomes entangled with the measurement device permanently",
          "Nothing changes — measurement is just observation"
        ],
        answer: 1,
        explanation: "Measurement collapses the quantum superposition to a definite classical outcome — either 0 or 1. The probability of each outcome is |amplitude|². After measurement, the qubit is in the measured basis state and superposition is gone."
      }
    ]
  },
  4: {
    chapterTitle: "Quantum Gates and Circuits",
    questions: [
      {
        q: "The X gate applied to |0⟩ produces which state?",
        options: ["|0⟩ (unchanged)", "|1⟩ (bit flip)", "|+⟩ (superposition)", "Random outcome"],
        answer: 1,
        explanation: "The X (NOT) gate is the quantum bit-flip: X|0⟩=|1⟩ and X|1⟩=|0⟩. It's like a classical NOT gate but for qubits. Its matrix is [[0,1],[1,0]]."
      },
      {
        q: "In a CNOT gate, what happens when the control qubit is |0⟩?",
        options: [
          "The target qubit is flipped",
          "The target qubit is unchanged",
          "Both qubits are flipped",
          "Both qubits collapse to |0⟩"
        ],
        answer: 1,
        explanation: "CNOT is a conditional operation: the target is flipped (X applied) ONLY when the control is |1⟩. When control is |0⟩, nothing happens to the target. CNOT acts as: |00⟩→|00⟩, |01⟩→|01⟩, |10⟩→|11⟩, |11⟩→|10⟩."
      },
      {
        q: "In a quantum circuit diagram, in what direction does time flow?",
        options: ["Right to left", "Bottom to top", "Left to right", "Top to bottom"],
        answer: 2,
        explanation: "Time flows left to right in quantum circuit diagrams. The first gate to be applied is on the leftmost column, and the last operation (usually measurement) is on the rightmost side."
      },
      {
        q: "What does the SWAP gate do?",
        options: [
          "Applies X to both qubits simultaneously",
          "Exchanges the complete quantum states of two qubits",
          "Creates entanglement between two qubits",
          "Measures two qubits and swaps their classical results"
        ],
        answer: 1,
        explanation: "SWAP exchanges the complete quantum states of two qubits: if q0=|a⟩ and q1=|b⟩, after SWAP: q0=|b⟩ and q1=|a⟩. This works even for superposition states. SWAP is equivalent to three CNOT gates."
      },
      {
        q: "Why are quantum gates required to be unitary (reversible)?",
        options: [
          "So they can be implemented using standard logic chips",
          "To ensure no quantum information is lost — unitarity preserves the normalization of the statevector",
          "So they execute faster than non-unitary operations",
          "To make circuit diagrams easier to draw"
        ],
        answer: 1,
        explanation: "Quantum information must be conserved (no-cloning theorem, unitary evolution). Unitary matrices preserve the norm |α|²+|β|²=1 and are reversible (U⁻¹=U†). Non-unitary gates would destroy quantum information and violate quantum mechanics."
      }
    ]
  },
  5: {
    chapterTitle: "Entanglement",
    questions: [
      {
        q: "What does it mean for two qubits to be entangled?",
        options: [
          "They are physically touching each other",
          "They share a joint quantum state that cannot be described independently for each qubit",
          "They have the same measurement outcome always",
          "They are both in superposition at the same time"
        ],
        answer: 1,
        explanation: "Entanglement means the joint state of two (or more) qubits cannot be factored into independent single-qubit states. Formally: |ψ⟩ ≠ |a⟩⊗|b⟩. The qubits are correlated in a non-classical way."
      },
      {
        q: "Which gates are used to create the Bell state |Φ+⟩ = (|00⟩ + |11⟩)/√2?",
        options: [
          "X gate then Z gate",
          "Two CNOT gates in sequence",
          "Hadamard (H) on q0 followed by CNOT (control q0, target q1)",
          "SWAP gate followed by H gate"
        ],
        answer: 2,
        explanation: "The Bell state circuit: start with |00⟩, apply H to q0 → (|00⟩+|10⟩)/√2, then CNOT(q0→q1) → (|00⟩+|11⟩)/√2 = |Φ+⟩. H creates superposition; CNOT spreads it to both qubits creating entanglement."
      },
      {
        q: "What measurement outcomes are possible for the Bell state |Φ+⟩?",
        options: [
          "Only '00'",
          "Only '11'",
          "'00' with 50% probability and '11' with 50% probability — never '01' or '10'",
          "All four outcomes equally: '00', '01', '10', '11' each 25%"
        ],
        answer: 2,
        explanation: "|Φ+⟩ = (|00⟩+|11⟩)/√2. Amplitudes: P(00)=|1/√2|²=0.5, P(11)=0.5, P(01)=0, P(10)=0. The absence of '01' and '10' is the defining signature of entanglement between the qubits."
      },
      {
        q: "Einstein called entanglement 'spooky action at a distance'. What did he find troubling about it?",
        options: [
          "Entanglement requires special hardware costing millions of dollars",
          "Measuring one entangled qubit instantly determines the other's state, regardless of separation distance",
          "Entangled qubits must be kept at the same temperature",
          "Entanglement violates the conservation of energy"
        ],
        answer: 1,
        explanation: "Einstein was troubled by the non-locality: when you measure one qubit of an entangled pair and get, say, '0', the partner qubit instantly 'knows' to be '0' — even if separated by light-years. However, this cannot transmit information faster than light."
      },
      {
        q: "In the Bell state histogram, why are the '01' and '10' bars completely absent?",
        options: [
          "The simulator has a bug that suppresses those outcomes",
          "Because the Bell state has zero amplitude for |01⟩ and |10⟩ — those states cannot occur",
          "They appear only when more shots are used",
          "They are hidden in the statevector but don't appear in histograms"
        ],
        answer: 1,
        explanation: "|Φ+⟩ = (|00⟩+|11⟩)/√2 has exactly zero amplitude for |01⟩ and |10⟩. P(01)=|0|²=0. Zero probability means these outcomes CANNOT occur, no matter how many shots. This is quantum interference, not sampling."
      }
    ]
  },
  6: {
    chapterTitle: "Quantum Circuit Design and Programming",
    questions: [
      {
        q: "In Qiskit, which method creates a Hadamard gate on qubit index 0?",
        options: ["qc.hadamard(0)", "qc.h(0)", "qc.H(0)", "qc.gate('H', 0)"],
        answer: 1,
        explanation: "In Qiskit, single-qubit gates are added using lowercase method names: qc.h(0) for Hadamard on qubit 0, qc.x(0) for X gate, qc.z(0) for Z gate. The qubit index starts at 0."
      },
      {
        q: "What does QuantumCircuit(2, 2) create in Qiskit?",
        options: [
          "A circuit with 2 gates and 2 qubits",
          "A circuit with 2 quantum qubits and 2 classical bits for measurement output",
          "A 2x2 matrix for gate operations",
          "Two separate single-qubit circuits"
        ],
        answer: 1,
        explanation: "QuantumCircuit(n_qubits, n_classical_bits) creates a circuit with n_qubits quantum wires and n_classical_bits classical wires. qc=QuantumCircuit(2,2) is ready for a 2-qubit circuit with measurement into 2 classical bits."
      },
      {
        q: "Which of these is a common validation error in quantum circuits?",
        options: [
          "Using too many H gates in one circuit",
          "Having qubits that are never measured",
          "Applying gates in alphabetical order",
          "Using the same gate twice on one qubit"
        ],
        answer: 1,
        explanation: "A qubit with no measurement at the end of a circuit is a common error — its quantum state won't appear in the results. Other common errors: gate applied to non-existent qubit index, CNOT with control=target."
      },
      {
        q: "What is the key advantage of code-based circuit creation over the visual editor?",
        options: [
          "Code circuits are always faster to execute",
          "Code allows parameterized, conditional, and algorithmically generated circuits that are impractical visually",
          "Visual circuits can have bugs; code circuits cannot",
          "Code circuits bypass the need for simulators"
        ],
        answer: 1,
        explanation: "Code can create circuits with loops, parameters (θ), conditional logic, and dynamic generation — things that would be impossible or impractical in a drag-and-drop interface. This is essential for algorithms like VQE and QAOA."
      },
      {
        q: "In a visual circuit editor, how is a CNOT gate typically placed?",
        options: [
          "By placing a single box labeled 'CNOT' on one qubit wire",
          "By designating a control qubit (filled dot) and a target qubit (⊕ circle) on different wires",
          "By connecting two X gates with a wire",
          "By applying H gate to both qubits simultaneously"
        ],
        answer: 1,
        explanation: "In visual circuit editors, CNOT is placed across two qubit wires: the control qubit is marked with a filled dot (•), the target qubit is marked with the ⊕ symbol, and a vertical line connects them. This represents the conditional operation."
      }
    ]
  },
  7: {
    chapterTitle: "Quantum Simulation and Frameworks",
    questions: [
      {
        q: "Why is quantum simulation on a classical computer useful for learning?",
        options: [
          "Simulated results are always more accurate than real hardware results",
          "Classical simulation is free, instant, and available without access to scarce quantum hardware",
          "Quantum simulators are the only way to run quantum algorithms",
          "Simulators are required because real qubits don't exist yet"
        ],
        answer: 1,
        explanation: "Real quantum hardware is expensive, noisy, and access-limited. Classical simulators provide immediate, free, and noise-free (ideal) execution for learning. Simulators are exact for small circuits — a perfect learning environment."
      },
      {
        q: "What is Qiskit Aer?",
        options: [
          "IBM's cloud quantum hardware platform",
          "IBM's high-performance quantum circuit simulator",
          "A Python visualization library for histograms",
          "Google's quantum programming framework"
        ],
        answer: 1,
        explanation: "Qiskit Aer is IBM's open-source quantum circuit simulator. It supports multiple simulation methods (statevector, QASM, density matrix) and can simulate both ideal and noisy (hardware-like) quantum circuits."
      },
      {
        q: "PennyLane is especially designed for which use case?",
        options: [
          "Low-level hardware control of superconducting qubits",
          "Differentiable quantum computing and quantum machine learning",
          "Visualizing the Bloch sphere",
          "Only works with Google's quantum hardware"
        ],
        answer: 1,
        explanation: "PennyLane specializes in differentiable quantum computing — computing gradients of quantum circuits for optimization. This makes it ideal for variational quantum algorithms (VQE, QAOA) and quantum machine learning (QML)."
      },
      {
        q: "What does 'shots' refer to in quantum simulation?",
        options: [
          "The speed at which the quantum circuit runs",
          "The number of times the quantum circuit is executed to collect statistics",
          "The number of qubits in the circuit",
          "The number of gates in the circuit"
        ],
        answer: 1,
        explanation: "Shots = repetitions of circuit execution. Since quantum measurement is probabilistic, running the circuit once gives only one data point. Running 1024 shots gives 1024 data points, allowing reliable probability estimation."
      },
      {
        q: "What does Qbraid provide that individual quantum frameworks (Qiskit, Cirq) alone do not?",
        options: [
          "Better gate accuracy than any other platform",
          "A unified cloud environment with access to multiple quantum hardware backends and frameworks",
          "Free unlimited real quantum hardware time",
          "A visual circuit editor for beginners"
        ],
        answer: 1,
        explanation: "Qbraid is a multi-cloud quantum platform — it provides a single environment with pre-installed SDKs (Qiskit, Cirq, PennyLane, Braket) and access to multiple hardware providers (IBM, Amazon Braket, IonQ). It unifies the fragmented quantum ecosystem."
      }
    ]
  },
  8: {
    chapterTitle: "Quantum Algorithms",
    questions: [
      {
        q: "What is the main advantage of Grover's algorithm over classical search?",
        options: [
          "Exponential speedup — it finds items in O(log N) time",
          "Quadratic speedup — it searches N items in O(√N) operations instead of O(N)",
          "It can search encrypted databases without a key",
          "It's faster only for databases with more than 1 million items"
        ],
        answer: 1,
        explanation: "Grover's algorithm achieves a quadratic speedup: O(N) classical → O(√N) quantum. For N=1,000,000 items: 1,000,000 classical queries vs ~1,000 quantum queries. This is a proven speedup, though not exponential."
      },
      {
        q: "The Deutsch-Jozsa algorithm determines whether a function is constant or balanced. What is its quantum advantage?",
        options: [
          "It runs 2x faster than the best classical algorithm",
          "It determines the answer with certainty using only ONE oracle query, while classically you need up to 2^(n-1)+1 queries",
          "It only works for functions with binary inputs",
          "It needs no oracle and can determine function type from the circuit structure alone"
        ],
        answer: 1,
        explanation: "Classical algorithm (worst case): 2^(n-1)+1 queries to guarantee an answer. Deutsch-Jozsa: exactly 1 oracle query with certain (not probabilistic) answer. This is an exponential query complexity advantage."
      },
      {
        q: "QAOA and VQE are both examples of which type of quantum algorithm?",
        options: [
          "Error-corrected gate-based algorithms",
          "Variational hybrid quantum-classical algorithms",
          "Quantum annealing algorithms",
          "Exact quantum algorithms with proven speedup"
        ],
        answer: 1,
        explanation: "Both QAOA and VQE are variational hybrid algorithms: they use a parameterized quantum circuit (executed on quantum hardware) with parameters optimized by a classical optimizer. They're designed for near-term NISQ hardware."
      },
      {
        q: "What type of problem is VQE (Variational Quantum Eigensolver) designed to solve?",
        options: [
          "Finding the optimal route in a logistics network",
          "Unstructured database search",
          "Finding the ground state energy of a quantum system (e.g., a molecule)",
          "Factoring large integers for cryptography"
        ],
        answer: 2,
        explanation: "VQE is designed for quantum chemistry: finding the lowest energy (ground state) of a molecular Hamiltonian. This problem is classically intractable for large molecules but is naturally suited to quantum processors that can simulate quantum systems."
      },
      {
        q: "In quantum algorithms, what is an 'oracle'?",
        options: [
          "A random number generator for quantum circuits",
          "A black-box quantum gate that encodes the problem function without revealing its internal structure",
          "A classical computer that provides answers to the quantum computer",
          "A measurement that predicts future circuit outcomes"
        ],
        answer: 1,
        explanation: "An oracle is a 'black box' unitary operation that encodes the problem being solved. In Grover's, the oracle marks the target state by flipping its phase. In Deutsch-Jozsa, it encodes the function f. The key property: it can be queried (applied) without knowing its internal structure."
      }
    ]
  },
  9: {
    chapterTitle: "Quantum State and Result Visualization",
    questions: [
      {
        q: "In a quantum circuit diagram, what does a horizontal wire represent?",
        options: [
          "A gate operation being applied",
          "A single qubit and its evolution through time (left to right)",
          "A classical data bus carrying bits",
          "An entanglement connection between two qubits"
        ],
        answer: 1,
        explanation: "Each horizontal wire in a circuit diagram represents one qubit and its timeline. Time flows left to right — gates encountered as you move right are applied later. The wire shows the qubit's state evolution through the circuit."
      },
      {
        q: "What does the statevector display reveal that the measurement histogram does NOT?",
        options: [
          "The count of each measurement outcome",
          "The number of shots used",
          "The complex amplitudes including phase information — invisible to measurement",
          "The execution time of the circuit"
        ],
        answer: 2,
        explanation: "The statevector shows complex amplitudes (real+imaginary) for each basis state. Measurement only reveals |amplitude|² (probabilities), losing the phase information. Two states with same probabilities but different phases look identical in histograms but are physically different."
      },
      {
        q: "On the Bloch sphere, where does the state |0⟩ (ground state) sit?",
        options: ["At the equator", "At the south pole", "At the north pole", "At a random point"],
        answer: 2,
        explanation: "By convention, |0⟩ is at the north pole of the Bloch sphere (positive Z-axis). |1⟩ is at the south pole (negative Z-axis). Equal superpositions |+⟩ and |−⟩ are on the equator along the X-axis."
      },
      {
        q: "You run the same circuit 100 times and get 48 zeros and 52 ones. You expected exactly 50/50. What is the most likely explanation?",
        options: [
          "Your circuit has a bug that biases towards '1' outcomes",
          "Normal sampling variation — 48/52 is within expected statistical fluctuation for 100 shots",
          "The simulator has a systematic error",
          "The H gate is broken in the current framework version"
        ],
        answer: 1,
        explanation: "With 100 shots and true P=0.5, outcomes follow a binomial distribution. Standard deviation = √(100×0.5×0.5) ≈ 5. Getting 48 is only 0.4 standard deviations from 50 — completely normal sampling variation. Use more shots to confirm."
      },
      {
        q: "What does the Bloch sphere visualization show that is not visible in the measurement histogram?",
        options: [
          "The number of gates applied to the qubit",
          "The exact quantum state direction, including relative phase — before measurement collapse",
          "The qubit index in the circuit",
          "The connection between entangled qubits"
        ],
        answer: 1,
        explanation: "The Bloch sphere shows the exact 3D direction of the qubit state vector, including the phase angle. States |+⟩ and |−⟩ look identical in measurement histograms (both 50/50) but are opposite points on the Bloch sphere's equator."
      }
    ]
  },
  10: {
    chapterTitle: "Assessment, Challenges and Learning Progress",
    questions: [
      {
        q: "What is the minimum score required to pass a chapter quiz and unlock the next chapter?",
        options: ["50% (3/5 questions)", "60% (3/5 questions correct)", "70% (4/5 questions correct)", "100% (all questions correct)"],
        answer: 1,
        explanation: "The platform requires ≥60% (at least 3 out of 5 questions correct) to pass a chapter quiz and unlock the next chapter. This threshold ensures adequate understanding while allowing some room for human error."
      },
      {
        q: "What type of questions are used in QuantNexus chapter quizzes?",
        options: [
          "True/False questions only",
          "Free-form text responses graded by an AI",
          "Multiple-choice questions (MCQ) with 4 options each",
          "Circuit building challenges only"
        ],
        answer: 2,
        explanation: "Chapter quizzes use multiple-choice questions (MCQ) with 4 options per question. This format enables automated grading with immediate feedback — no manual review required. Each question tests conceptual understanding of chapter material."
      },
      {
        q: "Where is your learning progress stored in the QuantNexus platform?",
        options: [
          "On a central QuantNexus server database",
          "In browser localStorage, specific to your device and browser",
          "In a CSV file on your computer's desktop",
          "In the cloud, requiring internet access to retrieve"
        ],
        answer: 1,
        explanation: "Progress is stored in browser localStorage — a client-side storage mechanism that persists across browser sessions on the same device. This means progress is device-specific and would not transfer to another browser or computer."
      },
      {
        q: "What does the dashboard's progress ring show?",
        options: [
          "The accuracy of your last quiz",
          "The overall percentage of chapters completed out of 10",
          "The time spent on the platform today",
          "The number of gates you've used in circuits"
        ],
        answer: 1,
        explanation: "The progress ring on the dashboard displays overall course completion: (chapters_completed/10) × 100%. It fills as you complete more chapters, giving a visual representation of your journey through the full 10-chapter curriculum."
      },
      {
        q: "If you fail a chapter quiz, what should you do?",
        options: [
          "You cannot retake it — you must contact the instructor",
          "Proceed to the next chapter anyway",
          "Review the chapter content and retake the quiz — the best score is kept",
          "The quiz automatically resets and you start the chapter over"
        ],
        answer: 2,
        explanation: "You can retake quizzes after reviewing the chapter content. This encourages iterative learning — review what you didn't understand, then try again. The platform keeps your best score and shows how many attempts you've made."
      }
    ]
  }
,
  11: {
      "chapterTitle": "Advanced Qubit Concepts",
      "questions": [
          {
              "q": "If a qubit is in the state |\u03c8\u27e9 = (1/2)|0\u27e9 + (\u221a3/2)|1\u27e9, what is the probability of measuring 1 in the computational basis?",
              "options": [
                  "1/2 (50%)",
                  "1/4 (25%)",
                  "3/4 (75%)",
                  "\u221a3/2 (~86.6%)"
              ],
              "answer": 2,
              "explanation": "By the Born rule, P(1) = |\u03b2|\u00b2 = |\u221a3/2|\u00b2 = 3/4 = 75%."
          },
          {
              "q": "What is the key physical difference between global phase and relative phase?",
              "options": [
                  "Global phase affects measurement probabilities; relative phase does not",
                  "Relative phase causes observable interference effects; global phase has no physical effect on measurements",
                  "Relative phase can only be created with classical bits",
                  "Global phase can be observed using a standard Z-basis measurement"
              ],
              "answer": 1,
              "explanation": "Global phase e^(i\u03b8) multiplies all state amplitudes equally and has no observable physical effect. Relative phase differences between basis states dictate constructive or destructive interference."
          },
          {
              "q": "On the Bloch sphere, which state lies on the positive X-axis (+X)?",
              "options": [
                  "|0\u27e9",
                  "|1\u27e9",
                  "|+\u27e9 = (|0\u27e9 + |1\u27e9)/\u221a2",
                  "|-i\u27e9 = (|0\u27e9 - i|1\u27e9)/\u221a2"
              ],
              "answer": 2,
              "explanation": "The North Pole is |0\u27e9 (+Z), the South Pole is |1\u27e9 (-Z), and the state |+\u27e9 lies on the positive X-axis (+X)."
          },
          {
              "q": "What gate is applied to turn |+\u27e9 into |-\u27e9 by adding a \u03c0 relative phase to |1\u27e9?",
              "options": [
                  "X gate",
                  "H gate",
                  "Z gate",
                  "Y gate"
              ],
              "answer": 2,
              "explanation": "The Pauli-Z gate maps |0\u27e9 \u2192 |0\u27e9 and |1\u27e9 \u2192 -|1\u27e9, transforming |+\u27e9 = (|0\u27e9+|1\u27e9)/\u221a2 into |-\u27e9 = (|0\u27e9-|1\u27e9)/\u221a2."
          },
          {
              "q": "To prepare an arbitrary single-qubit state with specific amplitude balance and relative phase from |0\u27e9, which gate sequence is commonly used?",
              "options": [
                  "X followed by X",
                  "Ry(\u03b8) followed by Rz(\u03c6)",
                  "H followed by H",
                  "CNOT followed by Measure"
              ],
              "answer": 1,
              "explanation": "Ry(\u03b8) adjusts the polar angle (amplitude balance between |0\u27e9 and |1\u27e9) and Rz(\u03c6) sets the azimuthal angle (relative phase)."
          }
      ]
  },
  12: {
      "chapterTitle": "Quantum Measurement in Depth",
      "questions": [
          {
              "q": "How can you perform a measurement in the X-basis {|+\u27e9, |-\u27e9} using a standard Z-basis quantum detector?",
              "options": [
                  "Apply an X gate before measurement",
                  "Apply a Hadamard (H) gate before measurement",
                  "Apply a Z gate after measurement",
                  "Measure twice consecutively"
              ],
              "answer": 1,
              "explanation": "Applying H transforms |+\u27e9 into |0\u27e9 and |-\u27e9 into |1\u27e9, allowing the standard Z-measurement to distinguish the X-basis states."
          },
          {
              "q": "If you increase the number of shots from 100 to 10,000, by what factor does the statistical sampling uncertainty (shot noise) decrease?",
              "options": [
                  "Factor of 2",
                  "Factor of 10",
                  "Factor of 100",
                  "Factor of 10,000"
              ],
              "answer": 1,
              "explanation": "Shot noise scales as 1/\u221a(shots). Increasing shots from 100 to 10,000 is a 100x increase in shots; \u221a(100) = 10, so uncertainty decreases by a factor of 10."
          },
          {
              "q": "In a noisy quantum device, what does the T1 relaxation time describe?",
              "options": [
                  "The time taken to compile a circuit",
                  "The time an excited qubit |1\u27e9 takes to decay to ground state |0\u27e9",
                  "The time taken to measure all qubits",
                  "The clock speed of the classical control computer"
              ],
              "answer": 1,
              "explanation": "T1 is the longitudinal relaxation time (energy decay) describing how quickly state |1\u27e9 decays toward ground state |0\u27e9 due to environmental coupling."
          },
          {
              "q": "You run a circuit designed to produce only |00\u27e9 and |11\u27e9 on physical hardware. The counts show a few instances of '01' and '10'. What is the most likely cause?",
              "options": [
                  "A bug in the classical print statement",
                  "Quantum hardware noise, decoherence, and readout errors",
                  "The simulator ran out of memory",
                  "The Hadamard gate was defective"
              ],
              "answer": 1,
              "explanation": "Real NISQ devices suffer from readout fidelity limits and decoherence, causing small non-zero counts on theoretically forbidden basis states."
          },
          {
              "q": "What is the recommended 4-step framework for analyzing quantum experiments?",
              "options": [
                  "Guess, Run, Retake, Finish",
                  "Circuit Context, Backend/Shots Metadata, Histogram Inspection, Formal Quantum Inference",
                  "Compile, Optimize, Transpile, Delete",
                  "Theory only, ignoring experimental counts"
              ],
              "answer": 1,
              "explanation": "The 4-step framework systematically examines the Circuit design, Backend & Shots parameters, Histogram distribution, and draws sound Quantum Inferences."
          }
      ]
  },
  13: {
      "chapterTitle": "Quantum Circuit Programming with Qiskit",
      "questions": [
          {
              "q": "In Qiskit, how is a circuit with 2 qubits and 2 classical bits initialized?",
              "options": [
                  "qc = Circuit(2)",
                  "qc = QuantumCircuit(2, 2)",
                  "qc = QiskitCircuit(qubits=2)",
                  "qc = QuantumRegister(2)"
              ],
              "answer": 1,
              "explanation": "QuantumCircuit(2, 2) creates a circuit with 2 quantum bits and 2 classical bits for measurement storage."
          },
          {
              "q": "Which Qiskit method applies a Controlled-NOT gate with control qubit 0 and target qubit 1?",
              "options": [
                  "qc.cnot(1, 0)",
                  "qc.cx(0, 1)",
                  "qc.controlled_x(0, 1)",
                  "qc.gate_cx(1, 0)"
              ],
              "answer": 1,
              "explanation": "qc.cx(control, target) applies the CNOT gate in Qiskit; qc.cx(0, 1) sets qubit 0 as control and qubit 1 as target."
          },
          {
              "q": "In Qiskit's result bitstrings (e.g. '10'), how are qubits ordered by default?",
              "options": [
                  "Left-to-right (qubit 0 is leftmost: 'q0 q1')",
                  "Right-to-left little-endian (qubit 0 is rightmost: 'q1 q0')",
                  "Random order depending on shot count",
                  "Alphabetical by register name"
              ],
              "answer": 1,
              "explanation": "Qiskit uses little-endian ordering: qubit 0 is the rightmost bit, so bitstring '10' means qubit 1 is '1' and qubit 0 is '0'."
          },
          {
              "q": "Which backend in Qiskit Aer is primarily used for running noisy or ideal shot-based simulation?",
              "options": [
                  "BasicAer",
                  "AerSimulator()",
                  "PulseSimulator()",
                  "DeviceOptimizer()"
              ],
              "answer": 1,
              "explanation": "AerSimulator() is the primary high-performance Qiskit Aer backend for shot-based and noisy quantum circuit simulation."
          },
          {
              "q": "A student builds a Qiskit circuit, executes it with AerSimulator, but `result.get_counts()` returns an empty dictionary. What is the most common reason?",
              "options": [
                  "The student used too many shots",
                  "The student forgot to add measurement operations (e.g. `qc.measure_all()`)",
                  "The computer lacks a quantum processor",
                  "Hadamard gates erase classical registers"
              ],
              "answer": 1,
              "explanation": "If no measurement gates (such as `qc.measure()` or `qc.measure_all()`) are included in the circuit, no classical bits are populated to generate counts."
          }
      ]
  },
  14: {
      "chapterTitle": "Quantum Programming with Other Frameworks",
      "questions": [
          {
              "q": "What is the primary design focus of Xanadu's PennyLane framework?",
              "options": [
                  "Assembly language for trapped ions only",
                  "Differentiable quantum programming and Quantum Machine Learning (QML)",
                  "Replacing Python with C++ for all quantum physics",
                  "Circuit board CAD design"
              ],
              "answer": 1,
              "explanation": "PennyLane specializes in differentiable quantum computing, allowing quantum circuits to evaluate analytic gradients for quantum machine learning."
          },
          {
              "q": "In Google Cirq, how are concurrent quantum operations scheduled within a circuit?",
              "options": [
                  "As asynchronous threads",
                  "Inside discrete time slices called 'Moments'",
                  "As recursive functions",
                  "Using classical while loops"
              ],
              "answer": 1,
              "explanation": "Cirq structures circuits into a sequence of 'Moments', where each Moment contains non-overlapping gates acting simultaneously."
          },
          {
              "q": "What role does Qbraid play in quantum software development?",
              "options": [
                  "A hardware cooling system for dilution refrigerators",
                  "A cloud platform providing cross-framework transpilation and unified access to multiple backends",
                  "A proprietary programming language that replaces Python",
                  "A classical relational database"
              ],
              "answer": 1,
              "explanation": "Qbraid provides an integrated cloud environment that allows developers to write circuits in any framework and transpile between Qiskit, Cirq, PennyLane, etc."
          },
          {
              "q": "What open standard format is commonly used as a universal intermediate representation across different quantum frameworks?",
              "options": [
                  "OpenQASM",
                  "HTML5",
                  "JSON-LD",
                  "SQL"
              ],
              "answer": 0,
              "explanation": "OpenQASM (Open Quantum Assembly Language) is the universal intermediate representation supported by Qiskit, Cirq, and many other quantum platforms."
          },
          {
              "q": "In PennyLane, what decorator converts a Python function into an executable quantum node?",
              "options": [
                  "@circuit",
                  "@qml.qnode(dev)",
                  "@quantum.run",
                  "@jit"
              ],
              "answer": 1,
              "explanation": "The `@qml.qnode(dev)` decorator binds a quantum function to a specified device, creating a callable QNode."
          }
      ]
  },
  15: {
      "chapterTitle": "Advanced Quantum Circuit Design",
      "questions": [
          {
              "q": "What does 'circuit depth' represent in quantum computing?",
              "options": [
                  "The number of physical wires (qubits)",
                  "The number of time steps required when independent gates execute in parallel",
                  "The memory size of the simulation file",
                  "The temperature of the dilution refrigerator"
              ],
              "answer": 1,
              "explanation": "Circuit depth is the length of the longest path of dependent gates from input to output, assuming concurrent gates execute simultaneously."
          },
          {
              "q": "Why is minimizing circuit depth especially crucial for current NISQ devices?",
              "options": [
                  "Because deeper circuits exceed classical monitor screen widths",
                  "Because total execution time must not exceed qubit decoherence times (T1, T2)",
                  "Because shallow circuits run slower than deep circuits",
                  "Because quantum gates consume classical internet bandwidth"
              ],
              "answer": 1,
              "explanation": "If a circuit's depth makes total execution duration exceed the qubits' coherence times, the quantum state decoheres into random noise."
          },
          {
              "q": "What logical operation does the 3-qubit Toffoli (CCX) gate perform on the target qubit?",
              "options": [
                  "Flips the target always",
                  "Flips the target if and only if both control qubits are in state 1",
                  "Measures all three qubits in the Z-basis",
                  "Applies a Hadamard to all three qubits"
              ],
              "answer": 1,
              "explanation": "The Toffoli (Controlled-Controlled-X) gate flips the target qubit if and only if both control qubits are 1, implementing reversible Boolean AND logic."
          },
          {
              "q": "What characterizes a parameterized quantum circuit (ansatz)?",
              "options": [
                  "It uses only fixed gates like H and X",
                  "It contains gates with variable rotation angles (e.g. Ry(\u03b8)) that can be adjusted dynamically",
                  "It cannot be simulated on a classical computer",
                  "It only works with 1 qubit"
              ],
              "answer": 1,
              "explanation": "Parameterized circuits feature adjustable continuous rotation angles (like \u03b8), allowing classical optimizers to train them in variational algorithms."
          },
          {
              "q": "If an unoptimized circuit has two consecutive Hadamard gates acting on the same qubit (H followed immediately by H), what optimization can the transpiler perform?",
              "options": [
                  "Replace both with an X gate",
                  "Cancel both gates because H \u00b7 H = I (Identity)",
                  "Multiply both gates into a Toffoli gate",
                  "Add two more Hadamard gates"
              ],
              "answer": 1,
              "explanation": "The Hadamard gate is self-inverse (H = H\u207b\u00b9, H\u00b2 = I). Two consecutive Hadamards cancel out completely to the identity operator."
          }
      ]
  },
  16: {
      "chapterTitle": "Quantum Algorithm Circuit Labs",
      "questions": [
          {
              "q": "How many oracle evaluations does the Deutsch-Jozsa algorithm require to determine if a function is constant or balanced?",
              "options": [
                  "1 evaluation",
                  "2\u207f evaluations",
                  "2\u207f\u207b\u00b9 + 1 evaluations",
                  "\u221aN evaluations"
              ],
              "answer": 0,
              "explanation": "The Deutsch-Jozsa algorithm solves the problem with exactly 1 quantum query, compared to up to 2\u207f\u207b\u00b9 + 1 classical queries in the worst case."
          },
          {
              "q": "What is the primary purpose of the Diffusion Operator in Grover's algorithm?",
              "options": [
                  "To reset all qubits to |0\u27e9",
                  "To perform inversion about the average, amplifying the marked state's amplitude",
                  "To measure the qubits in the Y-basis",
                  "To cool the quantum processor"
              ],
              "answer": 1,
              "explanation": "The diffusion operator performs an inversion about the average amplitude, boosting the amplitude of the phase-flipped target state while suppressing non-target states."
          },
          {
              "q": "What speedup does Grover's search algorithm offer over classical search in an unstructured database of size N?",
              "options": [
                  "No speedup",
                  "Quadratic speedup (O(\u221aN) vs O(N))",
                  "Exponential speedup (O(log N) vs O(N))",
                  "Infinite speedup"
              ],
              "answer": 1,
              "explanation": "Grover's algorithm achieves a quadratic speedup, reducing query complexity from classical O(N) to quantum O(\u221aN)."
          },
          {
              "q": "In the QAOA algorithm, what are the two alternating Hamiltonians applied in each layer?",
              "options": [
                  "Kinetic and Potential Hamiltonians",
                  "Cost Hamiltonian (problem constraints) and Mixer Hamiltonian (state exploration)",
                  "Laser Hamiltonian and Microwave Hamiltonian",
                  "Classical Hamiltonian and Noise Hamiltonian"
              ],
              "answer": 1,
              "explanation": "QAOA alternates the Cost Hamiltonian H_C (encoding problem objectives) and the Mixer Hamiltonian H_M (providing quantum transitions) across p layers."
          },
          {
              "q": "What mathematical theorem guarantees that VQE's trial energy is always greater than or equal to the true ground-state energy (\u27e8\u03c8(\u03b8)|H|\u03c8(\u03b8)\u27e9 \u2265 E\u2080)?",
              "options": [
                  "Fermat's Last Theorem",
                  "The Rayleigh-Ritz Variational Principle",
                  "The Central Limit Theorem",
                  "Pythagorean Theorem"
              ],
              "answer": 1,
              "explanation": "The Rayleigh-Ritz variational principle guarantees that any trial quantum state has an expectation value \u2265 the true ground state eigenvalue E\u2080."
          }
      ]
  },
  17: {
      "chapterTitle": "Visualization and Interactive Quantum Lab",
      "questions": [
          {
              "q": "What happens geometrically to the state vector on the Bloch sphere when an X gate is applied to state |0\u27e9 (North Pole)?",
              "options": [
                  "It stays at the North Pole",
                  "It rotates 180\u00b0 around the X-axis to the South Pole (|1\u27e9)",
                  "It moves to the center of the sphere",
                  "It disappears"
              ],
              "answer": 1,
              "explanation": "The Pauli-X gate rotates the state vector 180\u00b0 around the X-axis, moving from (0, 0, 1) [North Pole |0\u27e9] to (0, 0, -1) [South Pole |1\u27e9]."
          },
          {
              "q": "Why can an entangled two-qubit state (like a Bell state) NOT be represented on a single standard 3D Bloch sphere?",
              "options": [
                  "Because the Bloch sphere only works in black and white",
                  "Because the Bloch sphere only represents the 2D Hilbert space of a single qubit, while 2 entangled qubits require a 4D state space",
                  "Because Bell states have zero probability",
                  "Because classical computers cannot draw spheres"
              ],
              "answer": 1,
              "explanation": "A single Bloch sphere maps single-qubit pure states. Entangled states possess joint correlations that cannot be factored into two independent single-qubit Bloch vectors."
          },
          {
              "q": "In a statevector visualization, what does the color or direction of a phasor arrow typically indicate?",
              "options": [
                  "The physical temperature of the qubit",
                  "The complex phase angle (arg(\u03b1)) of the amplitude",
                  "The number of classical bits",
                  "The gate depth"
              ],
              "answer": 1,
              "explanation": "In statevector phasors or Q-spheres, arrow angles or color hues represent the complex phase argument arg(\u03b1) ranging from 0 to 2\u03c0."
          },
          {
              "q": "In an experiment comparison between Circuit 1 (H -> H) and Circuit 2 (H -> Z -> H), why are the measurement outcomes completely opposite (100% '0' vs 100% '1')?",
              "options": [
                  "Because Circuit 2 has more qubits",
                  "Because the intermediate Z gate introduced a \u03c0 relative phase that inverted constructive interference into destructive interference",
                  "Because Z gates delete quantum memory",
                  "Because the shot count was too low"
              ],
              "answer": 1,
              "explanation": "H|0\u27e9 = |+\u27e9. Applying Z turns |+\u27e9 into |-\u27e9. Applying H to |-\u27e9 yields |1\u27e9. The relative phase flip completely reverses the interference."
          },
          {
              "q": "What does a statevector simulator provide that a shot-based simulator cannot directly show in a single run?",
              "options": [
                  "Hardware temperature readings",
                  "Exact complex amplitudes and phases before measurement collapse",
                  "Real cosmic ray interference",
                  "Classical CPU clock speed"
              ],
              "answer": 1,
              "explanation": "Statevector simulation mathematically tracks the exact complex amplitudes (magnitude and phase) of all 2\u207f basis states without statistical sampling noise."
          }
      ]
  },
  18: {
      "chapterTitle": "Quantum Problem Solving and Practice",
      "questions": [
          {
              "q": "When translating a problem into a quantum circuit, what is the first step in the 4-phase pipeline?",
              "options": [
                  "Measure all qubits immediately",
                  "Problem Encoding (mapping inputs to quantum states)",
                  "Turn off error correction",
                  "Transpile to assembly code"
              ],
              "answer": 1,
              "explanation": "The first step is Problem Encoding: deciding how problem variables and inputs are represented as qubit states (basis, amplitude, or angle encoding)."
          },
          {
              "q": "If qubit 0 is in state |0\u27e9 and you apply X followed by H, what is the resulting statevector?",
              "options": [
                  "|0\u27e9",
                  "|1\u27e9",
                  "|+\u27e9 = (|0\u27e9 + |1\u27e9)/\u221a2",
                  "|-\u27e9 = (|0\u27e9 - |1\u27e9)/\u221a2"
              ],
              "answer": 3,
              "explanation": "Applying X to |0\u27e9 produces |1\u27e9. Applying H to |1\u27e9 produces |-\u27e9 = (|0\u27e9 - |1\u27e9)/\u221a2."
          },
          {
              "q": "You are asked to solve an optimization problem where you must find the maximum cut of a graph with 50 nodes. Which algorithm is best suited for NISQ quantum computers?",
              "options": [
                  "Shor's Factoring Algorithm",
                  "QAOA (Quantum Approximate Optimization Algorithm)",
                  "Deutsch-Jozsa Algorithm",
                  "Classical Bubblesort"
              ],
              "answer": 1,
              "explanation": "QAOA is specifically designed for combinatorial graph optimization (like Max-Cut) on near-term NISQ quantum devices."
          },
          {
              "q": "In the Quantum Teleportation protocol, how many classical bits must Alice send to Bob to reconstruct the unknown state |\u03c8\u27e9?",
              "options": [
                  "0 bits",
                  "1 bit",
                  "2 classical bits",
                  "An infinite number of bits"
              ],
              "answer": 2,
              "explanation": "Alice performs a Bell-state measurement on 2 qubits, producing 2 classical bits of information that Bob uses to apply conditional X and/or Z corrections."
          },
          {
              "q": "Why is manual step-by-step state tracing a vital quantum problem-solving skill?",
              "options": [
                  "Because computers cannot calculate matrices",
                  "It builds rigorous intuition for how quantum gates manipulate relative phase and generate interference",
                  "It is required by law for all programmers",
                  "It eliminates the need for quantum hardware"
              ],
              "answer": 1,
              "explanation": "Tracing states by hand teaches developers how gates manipulate probability amplitudes and phases, enabling them to predict and debug complex quantum workflows."
          }
      ]
  },
  19: {
      "chapterTitle": "Assessment, Coding Challenges and Learning Analytics",
      "questions": [
          {
              "q": "What is the primary pedagogical benefit of immediate diagnostic feedback after quiz questions?",
              "options": [
                  "It slows down the learner",
                  "It corrects misconceptions immediately and reinforces the scientific rationale behind correct answers",
                  "It hides the correct answer from the student",
                  "It reduces server bandwidth"
              ],
              "answer": 1,
              "explanation": "Immediate feedback explains why answers are correct or incorrect, converting assessments into active learning opportunities."
          },
          {
              "q": "In automated quantum coding challenges, how do grading test suites verify whether a student's circuit is correct?",
              "options": [
                  "By counting the number of lines of code",
                  "By verifying that the generated circuit produces the target statevector or unitary matrix within a numerical tolerance",
                  "By checking if the code contains the word 'quantum'",
                  "By asking another student to vote"
              ],
              "answer": 1,
              "explanation": "Grading oracles compare the student's resulting statevector or unitary transformation against the mathematical specification within numerical tolerance (e.g. 1e-6)."
          },
          {
              "q": "What metric does a learning analytics dashboard use to identify that a student has a 'weak topic'?",
              "options": [
                  "The color of the student's avatar",
                  "Low initial quiz scores, repeated failed attempts, or high time spent relative to course averages",
                  "The font size chosen by the user",
                  "The student's email domain"
              ],
              "answer": 1,
              "explanation": "Analytics engines flag chapters with low first-attempt quiz scores or multiple retries as areas needing remediation before capstone assessments."
          },
          {
              "q": "In circuit challenges with gate budget constraints, why are learners restricted to a maximum circuit depth?",
              "options": [
                  "To test memory bandwidth",
                  "To cultivate the essential habit of designing minimal-depth, noise-resilient circuits for real NISQ processors",
                  "Because quantum gates are physically expensive to buy online",
                  "To prevent the browser from crashing"
              ],
              "answer": 1,
              "explanation": "Constraining circuit depth instills best practices for NISQ hardware, where every additional gate layer increases susceptibility to decoherence."
          },
          {
              "q": "What score percentage is required on QuantNexus chapter quizzes to unlock the next sequential chapter?",
              "options": [
                  "20%",
                  "40%",
                  "60%",
                  "100% only"
              ],
              "answer": 2,
              "explanation": "QuantNexus uses a 60% passing benchmark (e.g. at least 3 out of 5 correct) to verify understanding before unlocking subsequent chapters."
          }
      ]
  },
  20: {
      "chapterTitle": "Complete Quantum Learning Journey and Platform Use",
      "questions": [
          {
              "q": "How does the sequential unlock rule across all 20 chapters benefit learners?",
              "options": [
                  "It forces students to complete the course in one day",
                  "It guarantees prerequisite concepts are mastered before advancing to complex multi-qubit algorithms",
                  "It prevents students from logging in from multiple devices",
                  "It randomly shuffles chapter topics"
              ],
              "answer": 1,
              "explanation": "Sequential unlocking ensures learners establish strong foundational mental models (superposition, entanglement, gates) before tackling complex algorithmic protocols."
          },
          {
              "q": "What does a student receive upon completing all 20 chapters and passing the assessments?",
              "options": [
                  "100% Course Completion status and the official QuantNexus Certificate of Completion",
                  "Their account is permanently deleted",
                  "A physical quantum computer shipped in the mail",
                  "A reset back to Chapter 1 with no record saved"
              ],
              "answer": 0,
              "explanation": "Finishing all 20 chapters marks 100% completion on the dashboard, awarding academic recognition and a verifiable certificate of quantum literacy."
          },
          {
              "q": "What key capability does the Instructor Dashboard provide for university courses or hackathons?",
              "options": [
                  "Editing student passwords without permission",
                  "Cohort-wide analytics, individual student progress tracking, and identifying class-wide weak topics",
                  "Selling quantum hardware online",
                  "Replacing teachers with video games"
              ],
              "answer": 1,
              "explanation": "The Instructor Dashboard allows educators to monitor cohort progress, identify struggling students, and analyze topic-level failure rates to plan targeted lectures."
          },
          {
              "q": "How is AI envisioned to support quantum learners in future platform updates (as highlighted in SIH 26140)?",
              "options": [
                  "By taking quizzes on behalf of students",
                  "By providing contextual explanations, code debugging hints, and personalized revision recommendations",
                  "By shutting down student computers after 1 hour",
                  "By replacing all quantum gates with classical bits"
              ],
              "answer": 1,
              "explanation": "AI tutors can act as intelligent assistants that interpret circuit errors, provide Socratic hints, explain confusing physics, and adaptively generate practice exercises."
          },
          {
              "q": "Which overall sequence best describes the 20-chapter progression of QuantNexus?",
              "options": [
                  "Gaming -> Social Media -> Hardware Sales -> Crypto",
                  "Foundations (1-5) -> Protocols (6-10) -> SDK & Circuit Design (11-15) -> Algorithm Labs & Capstone (16-20)",
                  "Random topics with no pedagogical ordering",
                  "Only theoretical mathematics with zero coding or visualization"
              ],
              "answer": 1,
              "explanation": "QuantNexus follows a rigorous 4-phase pedagogical hierarchy: Foundations (1-5), Protocols (6-10), SDK Programming & Circuit Design (11-15), and Algorithm Labs & Capstone (16-20)."
          }
      ]
  }
};
