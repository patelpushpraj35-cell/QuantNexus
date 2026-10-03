# SIH 26140 Detailed Online Learning Curriculum

This dataset is structured like an online learning course: every chapter has an overview, sections, explanations, point-wise learning elements, and takeaways.

## Chapter 1: Introduction to Quantum Computing
**Difficulty:** Beginner
**Overview:** Learn what quantum computing is, how it differs from classical computing, and why concepts such as qubits, superposition and entanglement need interactive learning.

**Learning objectives:**
- Understand the purpose of quantum computing.
- Know the difference between a classical bit and a qubit.
- Recognize the core terms used throughout the platform.

### Sections

#### 1.1 What is Quantum Computing?
Quantum computing is a way of processing information using quantum systems. This course introduces the ideas needed to understand quantum circuits and algorithms through simple explanations and interactive examples.

**Key points:**
- Meaning of quantum computing
- Quantum information
- Why quantum computing is different
- Where quantum computing is useful

#### 1.2 Classical vs Quantum Computing
Classical computers use bits with values 0 or 1. Quantum computing uses qubits and quantum operations, allowing different ways of representing and manipulating information.

**Key points:**
- Classical bit
- Quantum bit
- Classical logic gates
- Quantum gates
- Conceptual comparison

#### 1.3 Why Learn Quantum Computing Interactively?
Quantum concepts can be abstract when learned only from text. An interactive platform lets learners build circuits, execute simulations and immediately inspect visual results.

**Key points:**
- Theory
- Interactive circuit
- Simulation
- Visualization
- Practice

#### 1.4 Quantum Computing Vocabulary
Build a basic vocabulary before working in the lab.

**Key points:**
- Qubit
- Gate
- Circuit
- Measurement
- State
- Superposition
- Entanglement
- Algorithm

**Chapter takeaways:**
- Understand the purpose of quantum computing.
- Know the difference between a classical bit and a qubit.
- Recognize the core terms used throughout the platform.

## Chapter 2: Qubits and Quantum States
**Difficulty:** Beginner
**Overview:** Understand the qubit, computational basis states, state representation and the basic idea of a statevector.

**Learning objectives:**
- Identify |0> and |1>.
- Understand the purpose of a statevector display.
- Connect circuit operations with changes in quantum state.

### Sections

#### 2.1 What is a Qubit?
A qubit is the basic unit used to represent quantum information. It can be prepared, transformed with quantum gates and measured.

**Key points:**
- Qubit definition
- Single-qubit circuit
- Qubit as quantum information

#### 2.2 Computational Basis States
The two standard computational basis states for one qubit are written as |0> and |1>.

**Key points:**
- |0>
- |1>
- Basis-state notation
- Reading basis states

#### 2.3 Quantum State Representation
A quantum state can be represented mathematically and displayed by a simulator. For the learning platform, learners should be able to inspect the state produced by a circuit.

**Key points:**
- State representation
- Amplitudes
- Statevector concept
- Reading state information

#### 2.4 State Changes
Gates change the state of a qubit. Learners can compare the state before and after applying a gate.

**Key points:**
- Initial state
- Gate operation
- Resulting state
- State comparison

#### 2.5 Interactive State Explorer
Use the circuit lab to prepare a state, apply a gate and inspect the resulting state information.

**Key points:**
- Prepare |0>
- Apply H/X/Z
- Run
- Inspect result

**Chapter takeaways:**
- Identify |0> and |1>.
- Understand the purpose of a statevector display.
- Connect circuit operations with changes in quantum state.

## Chapter 3: Superposition and Measurement
**Difficulty:** Beginner
**Overview:** Learn superposition using simple circuits and understand how measurement and repeated shots produce observable outcome distributions.

**Learning objectives:**
- Explain the introductory idea of superposition.
- Understand why repeated shots are useful.
- Read a measurement histogram.

### Sections

#### 3.1 Concept of Superposition
Superposition is a fundamental quantum concept. The platform introduces it through a visual circuit and simulation rather than only mathematical notation.

**Key points:**
- Meaning of superposition
- Single-qubit example
- State before measurement

#### 3.2 Hadamard Gate
The Hadamard gate is a standard example for demonstrating an equal superposition from a computational basis input such as |0>.

**Key points:**
- H gate
- Apply H to |0>
- Expected probability idea
- Interactive example

#### 3.3 Measurement
Measurement produces a classical outcome from a quantum state.

**Key points:**
- Measurement operation
- Classical outcome
- Measurement in a circuit

#### 3.4 Shots and Probability
Running a circuit repeatedly produces counts that can be converted into empirical probabilities.

**Key points:**
- Shots
- Counts
- Probability
- Repeated execution

#### 3.5 Measurement Histogram
A histogram provides a visual view of measurement outcomes and their frequencies/probabilities.

**Key points:**
- Bars
- Outcome labels
- Counts
- Probability interpretation

#### 3.6 Understanding Results
Compare the expected behavior of a simple circuit with the simulated measurement distribution.

**Key points:**
- Expected vs observed
- Sampling variation
- Result interpretation

**Chapter takeaways:**
- Explain the introductory idea of superposition.
- Understand why repeated shots are useful.
- Read a measurement histogram.

## Chapter 4: Quantum Gates and Circuits
**Difficulty:** Beginner
**Overview:** Learn common quantum gates and how gates are arranged into single- and multi-qubit circuits.

**Learning objectives:**
- Recognize common gates.
- Read a circuit diagram.
- Build a basic multi-qubit circuit.

### Sections

#### 4.1 Quantum Gates
Quantum gates are operations applied to qubits. They form the basic building blocks of a quantum circuit.

**Key points:**
- Gate concept
- Gate sequence
- Gate placement

#### 4.2 H Gate
Use H to explore superposition behavior in the lab.

**Key points:**
- H operation
- Single-qubit circuit
- Simulation

#### 4.3 X, Y and Z Gates
Explore common single-qubit gates and compare their effects.

**Key points:**
- X gate
- Y gate
- Z gate
- State changes

#### 4.4 S and T Gates
Introduce S and T as additional single-qubit gates and show their role in circuit construction.

**Key points:**
- S gate
- T gate
- Phase concept at introductory level

#### 4.5 CNOT Gate
CNOT is a controlled two-qubit operation. One qubit acts as control and another as target.

**Key points:**
- Control qubit
- Target qubit
- CNOT placement
- Two-qubit circuit

#### 4.6 SWAP Gate
SWAP exchanges the states of two qubits.

**Key points:**
- Two-qubit operation
- SWAP placement
- Circuit example

#### 4.7 Circuit Diagram
Read qubit wires, gate positions and operation order from a circuit diagram.

**Key points:**
- Qubit wires
- Gate symbols
- Operation order
- Measurement

#### 4.8 Multi-Qubit Circuits
Combine multiple gates and qubits into a complete circuit.

**Key points:**
- Two-qubit circuit
- Gate sequence
- Measurement

**Chapter takeaways:**
- Recognize common gates.
- Read a circuit diagram.
- Build a basic multi-qubit circuit.

## Chapter 5: Entanglement
**Difficulty:** Intermediate
**Overview:** Learn the introductory concept of entanglement and construct a simple Bell-state circuit.

**Learning objectives:**
- Explain entanglement at an introductory level.
- Build a Bell-state circuit.
- Interpret its measurement pattern.

### Sections

#### 5.1 What is Entanglement?
Entanglement describes quantum correlations between quantum systems. It is introduced through small circuits and measurable outcomes.

**Key points:**
- Entanglement concept
- Two-qubit systems
- Correlation

#### 5.2 Bell State
A Bell-state circuit is a standard learning example that can be built with a Hadamard gate followed by a CNOT.

**Key points:**
- Bell state
- Two qubits
- H + CNOT

#### 5.3 Building the Circuit
Construct the circuit step by step in the visual editor.

**Key points:**
- Place H
- Place CNOT
- Add measurement
- Run

#### 5.4 Correlated Results
Inspect the measurement results and understand the correlation shown by the simple Bell-state example.

**Key points:**
- Measurement outcomes
- Correlation
- Histogram

#### 5.5 Entanglement Lab Exercise
Learners build the circuit themselves, run it and explain the result.

**Key points:**
- Build
- Run
- Observe
- Explain

**Chapter takeaways:**
- Explain entanglement at an introductory level.
- Build a Bell-state circuit.
- Interpret its measurement pattern.

## Chapter 6: Quantum Circuit Design and Programming
**Difficulty:** Intermediate
**Overview:** Learn how to construct circuits visually and with code, validate them and execute them in the quantum lab.

**Learning objectives:**
- Build circuits visually.
- Write basic quantum circuit code.
- Validate a circuit before running it.

### Sections

#### 6.1 Drag-and-Drop Circuit Builder
Use a gate palette and place operations on qubit wires.

**Key points:**
- Gate palette
- Qubit grid
- Drag and drop
- Delete

#### 6.2 Circuit Editing
Modify circuits before execution.

**Key points:**
- Undo
- Redo
- Clear
- Reset
- Move/delete gate

#### 6.3 Multi-Qubit Gate Placement
Learn how controlled and two-qubit gates occupy multiple qubit wires.

**Key points:**
- CNOT
- SWAP
- Control/target
- Validation

#### 6.4 Code-Based Circuit Creation
Create a quantum circuit using supported quantum Python code.

**Key points:**
- QuantumCircuit
- Gate calls
- Measurement
- Execution

#### 6.5 Code Editor
Use a code editor with readable formatting and syntax highlighting.

**Key points:**
- Editor
- Syntax highlighting
- Run
- Reset

#### 6.6 Circuit Validation
Check for invalid operations before simulation.

**Key points:**
- Invalid gate placement
- Missing measurement
- Qubit index validation

#### 6.7 Visual and Code Views
Understand that the same circuit can be represented graphically and programmatically.

**Key points:**
- Visual representation
- Code representation
- Comparison

**Chapter takeaways:**
- Build circuits visually.
- Write basic quantum circuit code.
- Validate a circuit before running it.

## Chapter 7: Quantum Simulation and Frameworks
**Difficulty:** Intermediate
**Overview:** Understand how software simulators execute quantum circuits and how the platform can expose multiple frameworks/backends.

**Learning objectives:**
- Understand why simulation is useful.
- Recognize the named quantum frameworks/backends.
- Read basic simulation output.

### Sections

#### 7.1 What is Quantum Simulation?
A simulator runs a software model of a quantum circuit so learners can experiment without requiring direct access to physical quantum hardware.

**Key points:**
- Simulation
- Circuit execution
- Results

#### 7.2 Qiskit Aer
Introduce Qiskit Aer as a simulation backend named in the SIH problem statement.

**Key points:**
- Backend selection
- Shots
- Counts
- Simulation result

#### 7.3 PennyLane
Introduce PennyLane as another framework named in the SIH problem statement and explain its role as an execution/simulation framework.

**Key points:**
- Framework concept
- Circuit execution
- Result handling

#### 7.4 Cirq
Introduce Cirq as another named quantum framework.

**Key points:**
- Framework concept
- Circuit representation
- Simulation

#### 7.5 Qbraid
Introduce Qbraid as a named platform/integration in the problem statement.

**Key points:**
- Platform/integration concept
- Backend access
- Result workflow

#### 7.6 Backend Selection
Allow learners to select an available backend and execute the same learning circuit where supported.

**Key points:**
- Backend dropdown
- Execution
- Result comparison

#### 7.7 Shots and Results
Understand shots, counts, probabilities and basic execution metadata.

**Key points:**
- Shots
- Counts
- Probabilities
- Execution time

**Chapter takeaways:**
- Understand why simulation is useful.
- Recognize the named quantum frameworks/backends.
- Read basic simulation output.

## Chapter 8: Quantum Algorithms
**Difficulty:** Intermediate
**Overview:** Explore the standard algorithms explicitly named in the problem statement through structured explanations, circuit examples and simulation.

**Learning objectives:**
- Recognize the four named algorithms.
- Understand their high-level purpose.
- Run and inspect small educational examples.

### Sections

#### 8.1 What is a Quantum Algorithm?
A quantum algorithm is a sequence of quantum operations designed to solve or study a computational problem using a quantum system.

**Key points:**
- Algorithm concept
- Circuit representation
- Execution

#### 8.2 Deutsch-Jozsa Algorithm
Study the purpose and circuit structure of Deutsch-Jozsa through a small educational example.

**Key points:**
- Problem idea
- Oracle concept
- Circuit
- Simulation
- Result

#### 8.3 Grover's Algorithm
Study Grover as a quantum search example using a small circuit suitable for interactive simulation.

**Key points:**
- Search problem
- Oracle concept
- Amplification concept
- Circuit
- Histogram

#### 8.4 QAOA
Study QAOA as a parameterized algorithm named in the problem statement.

**Key points:**
- Optimization concept
- Parameterized circuit
- Parameters
- Simulation

#### 8.5 VQE
Study VQE as a parameterized algorithm named in the problem statement.

**Key points:**
- Variational concept
- Parameterized circuit
- Evaluation
- Result

#### 8.6 Algorithm Comparison
Compare the purpose and interaction pattern of the listed algorithms.

**Key points:**
- Deutsch-Jozsa
- Grover
- QAOA
- VQE
- Result interpretation

**Chapter takeaways:**
- Recognize the four named algorithms.
- Understand their high-level purpose.
- Run and inspect small educational examples.

## Chapter 9: Quantum State and Result Visualization
**Difficulty:** Intermediate
**Overview:** Learn to interpret the visual outputs required by the platform: circuit rendering, measurement histograms, statevectors and Bloch sphere views.

**Learning objectives:**
- Read a circuit rendering.
- Interpret histograms and statevector information.
- Use the Bloch sphere as an interactive learning visualization.

### Sections

#### 9.1 Circuit Rendering
See the circuit as a readable visual sequence of gates and measurements.

**Key points:**
- Qubit wires
- Gate symbols
- Operation order

#### 9.2 Measurement Histogram
Use a histogram to inspect measurement counts or probabilities.

**Key points:**
- Outcome labels
- Counts
- Probabilities
- Comparison

#### 9.3 Probability Distribution
Convert measurement counts into an intuitive probability view.

**Key points:**
- Frequency
- Probability
- Distribution

#### 9.4 Statevector Display
Inspect amplitudes/state information returned by a simulator where supported.

**Key points:**
- Statevector
- Amplitudes
- Basis states

#### 9.5 Bloch Sphere
Use a Bloch sphere visualization to explore a single-qubit state.

**Key points:**
- Axes
- State direction
- Before/after gate comparison

#### 9.6 Reading Visual Results
Connect visual outputs with the circuit that produced them.

**Key points:**
- Circuit
- State
- Measurement
- Interpretation

#### 9.7 Interactive Visualization Exercise
Change a gate, rerun the circuit and compare the visualization.

**Key points:**
- Modify
- Run
- Compare
- Explain

**Chapter takeaways:**
- Read a circuit rendering.
- Interpret histograms and statevector information.
- Use the Bloch sphere as an interactive learning visualization.

## Chapter 10: Assessment, Challenges and Learning Progress
**Difficulty:** Intermediate
**Overview:** Check learning through quizzes and practical challenges, calculate performance and track learner progress.

**Learning objectives:**
- Complete assessments.
- Understand how automatic grading works.
- Track and interpret learning progress.

### Sections

#### 10.1 Learning Assessment
Use assessments to verify understanding after lessons.

**Key points:**
- Quiz
- MCQ
- Score
- Feedback

#### 10.2 MCQ Quizzes
Answer structured multiple-choice questions covering course topics.

**Key points:**
- Question
- Options
- Correct answer
- Explanation

#### 10.3 Coding Challenges
Write quantum code for a specified circuit or task.

**Key points:**
- Problem statement
- Code editor
- Run
- Submit

#### 10.4 Circuit Challenges
Construct a target circuit using the visual circuit designer.

**Key points:**
- Instructions
- Build
- Validate
- Submit

#### 10.5 Automated Grading
Evaluate submissions using defined deterministic rules.

**Key points:**
- Expected structure
- Validation
- Score
- Feedback

#### 10.6 Progress Tracking
Store completed lessons, quiz scores and challenge results.

**Key points:**
- Completion
- Scores
- Attempts
- Overall progress

#### 10.7 Performance Analytics
Summarize learning performance for the student.

**Key points:**
- Topic performance
- Quiz average
- Challenge performance
- Weak areas

#### 10.8 Instructor Dashboard
Provide an instructor view of learner progress and performance as required by the problem statement.

**Key points:**
- Student list
- Progress
- Performance
- Weak topics

#### 10.9 Authentication and Web Application
Provide user authentication and a responsive web application around the learning experience.

**Key points:**
- Register
- Login
- Protected pages
- Responsive UI

**Chapter takeaways:**
- Complete assessments.
- Understand how automatic grading works.
- Track and interpret learning progress.
