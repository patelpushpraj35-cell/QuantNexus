# SIH 26140 — Chapters 11 to 20

These 10 chapters continue the original Chapters 1–10. Together they make a 20-chapter learning path.

## Chapter 11: Advanced Qubit Concepts

### 11.1 Qubit State and Amplitudes
Understand how amplitudes describe a quantum state and how they relate to measurement probabilities.

**Key points:**
- State amplitudes
- Probability from amplitudes
- Normalization

**Example:** Example: Compare the state before and after H.

**Activity:** Activity: inspect a state display.

### 11.2 Phase and Relative Phase
Learn why phase matters even when it is not directly visible in a simple measurement.

**Key points:**
- Global vs relative phase concept
- Phase-changing gates
- Interference connection

**Example:** Example: compare circuits with Z/S operations.

**Activity:** Activity: modify phase gates and compare results.

### 11.3 Single-Qubit State Exploration
Explore single-qubit states using circuit operations and visual tools.

**Key points:**
- Gate sequences
- State display
- Bloch sphere connection

**Example:** Example: H followed by Z.

**Activity:** Activity: build and inspect a sequence.

### 11.4 State Preparation
Learn how simple circuits prepare useful quantum states.

**Key points:**
- Basis states
- Superposition
- State transformation

**Example:** Example: prepare |1> and a balanced state.

**Activity:** Activity: create two target states.

## Chapter 12: Quantum Measurement in Depth

### 12.1 Measurement in Different Bases
Understand that measurement depends on the basis in which information is observed.

**Key points:**
- Computational basis
- Basis change idea
- Measurement interpretation

**Example:** Example: use H before measurement to change the effective measurement basis.

**Activity:** Activity: compare two measurement circuits.

### 12.2 Measurement Statistics
Learn how repeated executions produce statistical results.

**Key points:**
- Shots
- Counts
- Sampling variation

**Example:** Example: compare 100 and 1000 shots.

**Activity:** Activity: repeat a circuit and compare counts.

### 12.3 Noise and Imperfect Results
Introduce the idea that real or noisy simulation results can differ from ideal results.

**Key points:**
- Ideal vs noisy result
- Error effects
- Result interpretation

**Example:** Example: compare ideal and noisy output when available.

**Activity:** Activity: identify differences in histograms.

### 12.4 Reading Experimental Results
Develop a systematic method for interpreting quantum results.

**Key points:**
- Circuit first
- Backend/shots
- Histogram
- Conclusion

**Example:** Example: explain a result using four steps.

**Activity:** Activity: write a short experiment report.

## Chapter 13: Quantum Circuit Programming with Qiskit

### 13.1 Qiskit Circuit Basics
Learn the basic structure of a quantum circuit in Qiskit.

**Key points:**
- Circuit creation
- Qubits
- Gates
- Measurement

**Example:** Example: create a one-qubit H circuit.

**Activity:** Activity: write and run a basic circuit.

### 13.2 Building Multi-Qubit Circuits
Create circuits with several qubits and controlled operations.

**Key points:**
- Multiple qubits
- CNOT
- Measurement

**Example:** Example: create a two-qubit Bell circuit.

**Activity:** Activity: build a two-qubit circuit.

### 13.3 Simulation with Qiskit Aer
Run circuits on a simulator and retrieve results.

**Key points:**
- Backend selection
- Shots
- Counts

**Example:** Example: simulate H and measurement.

**Activity:** Activity: change shots and compare results.

### 13.4 Circuit Debugging
Find common circuit and code mistakes.

**Key points:**
- Invalid gate use
- Wrong qubit index
- Missing measurement
- Result checking

**Example:** Example: fix a circuit with an incorrect qubit index.

**Activity:** Activity: debug a provided code sample.

## Chapter 14: Quantum Programming with Other Frameworks

### 14.1 PennyLane Circuit Workflow
Understand the basic workflow of defining and executing circuits in PennyLane.

**Key points:**
- Device
- Circuit function
- Operations
- Measurement

**Example:** Example: represent H and measurement.

**Activity:** Activity: recreate a simple circuit.

### 14.2 Cirq Circuit Workflow
Understand how circuits are represented and simulated in Cirq.

**Key points:**
- Qubits
- Moments/operations
- Simulation

**Example:** Example: create a small circuit.

**Activity:** Activity: reproduce an H-X circuit.

### 14.3 Qbraid Workflow
Understand the role of Qbraid in a multi-framework quantum development environment.

**Key points:**
- Framework access
- Backend idea
- Experiment workflow

**Example:** Example: compare a circuit workflow across tools.

**Activity:** Activity: identify the selected framework/backend.

### 14.4 Framework Comparison
Compare how the same conceptual circuit is represented across supported frameworks.

**Key points:**
- Circuit representation
- Execution
- Results
- Learning value

**Example:** Example: map H and CNOT across frameworks.

**Activity:** Activity: make a framework comparison table.

## Chapter 15: Advanced Quantum Circuit Design

### 15.1 Circuit Depth and Width
Understand basic measures used to describe circuit size.

**Key points:**
- Number of qubits
- Number of operations
- Circuit depth

**Example:** Example: compare two circuits using depth.

**Activity:** Activity: identify which circuit is deeper.

### 15.2 Controlled Operations
Explore controlled gates beyond basic CNOT usage.

**Key points:**
- Control qubit
- Target operation
- Multi-qubit behavior

**Example:** Example: controlled-X concept.

**Activity:** Activity: construct a controlled operation.

### 15.3 Parameterized Circuits
Learn the idea of gates whose behavior depends on parameters.

**Key points:**
- Parameters
- Rotation concept
- Parameter changes

**Example:** Example: change an angle and observe results.

**Activity:** Activity: test several parameter values.

### 15.4 Circuit Optimization Basics
Understand why equivalent circuits may differ in operation count or depth.

**Key points:**
- Remove unnecessary operations
- Combine simple sequences
- Compare outputs

**Example:** Example: two X gates can return a basis state to its starting value.

**Activity:** Activity: simplify a circuit without changing its ideal result.

## Chapter 16: Quantum Algorithm Circuit Labs

### 16.1 Deutsch-Jozsa Circuit Lab
Build and execute a small Deutsch-Jozsa example.

**Key points:**
- Initialization
- Oracle
- Interference
- Measurement

**Example:** Example: trace each circuit stage.

**Activity:** Activity: complete the algorithm circuit.

### 16.2 Grover Circuit Lab
Explore a small Grover search circuit.

**Key points:**
- Superposition
- Oracle
- Amplification
- Measurement

**Example:** Example: mark one target state.

**Activity:** Activity: run and inspect the target probability.

### 16.3 QAOA Circuit Lab
Explore a small parameterized optimization circuit conceptually.

**Key points:**
- Problem encoding
- Parameters
- Circuit layers
- Objective

**Example:** Example: change a parameter and observe output.

**Activity:** Activity: compare two parameter settings.

### 16.4 VQE Circuit Lab
Explore the basic variational workflow.

**Key points:**
- Ansatz
- Parameters
- Measurement
- Classical update concept

**Example:** Example: compare objective values for different parameters.

**Activity:** Activity: inspect a small VQE workflow.

## Chapter 17: Visualization and Interactive Quantum Lab

### 17.1 Interactive Circuit Playground
Combine circuit construction, execution and visualization in one workspace.

**Key points:**
- Build
- Run
- Visualize
- Reset

**Example:** Example: create H-CNOT and inspect all outputs.

**Activity:** Activity: complete a guided experiment.

### 17.2 Bloch Sphere Exploration
Use the Bloch sphere to explore single-qubit changes.

**Key points:**
- Axes
- State movement
- Gate effects

**Example:** Example: compare |0>, |1> and a superposition.

**Activity:** Activity: apply several gates and observe.

### 17.3 Statevector and Probability Explorer
Compare state information with measurement probability.

**Key points:**
- Amplitudes
- Probabilities
- Counts

**Example:** Example: inspect a superposition before measurement.

**Activity:** Activity: connect displayed values to a histogram.

### 17.4 Experiment Comparison
Compare two circuits or two runs side by side.

**Key points:**
- Circuit difference
- Backend/shots
- Visual results

**Example:** Example: H vs H-X circuit.

**Activity:** Activity: explain the observed difference.

## Chapter 18: Quantum Problem Solving and Practice

### 18.1 From Problem to Circuit
Learn how to translate a simple quantum problem into a circuit workflow.

**Key points:**
- Identify input
- Choose gates
- Measure
- Interpret

**Example:** Example: create a circuit for a simple state-preparation task.

**Activity:** Activity: design a circuit from a description.

### 18.2 Circuit Prediction Exercises
Practice predicting results before simulation.

**Key points:**
- Gate reasoning
- Measurement prediction
- Verification

**Example:** Example: predict X|0>.

**Activity:** Activity: predict first, then run.

### 18.3 Algorithm Selection Practice
Choose an appropriate standard algorithm for a described learning problem.

**Key points:**
- Search
- Optimization
- Function property
- Variational estimation

**Example:** Example: match Grover to a search task.

**Activity:** Activity: solve algorithm-selection questions.

### 18.4 Mini Quantum Project
Combine learning, circuit design, simulation and explanation into one small project.

**Key points:**
- Choose task
- Build circuit
- Run simulation
- Visualize
- Report

**Example:** Example: create and explain a Bell-state experiment.

**Activity:** Activity: submit a mini project.

## Chapter 19: Assessment, Coding Challenges and Learning Analytics

### 19.1 Progressive Quizzes
Use quizzes after lessons to confirm understanding.

**Key points:**
- MCQs
- Immediate feedback
- Retry
- Score

**Example:** Example: chapter-end knowledge check.

**Activity:** Activity: complete a quiz.

### 19.2 Quantum Coding Challenges
Practice quantum programming through structured tasks.

**Key points:**
- Write code
- Run
- Debug
- Submit

**Example:** Example: create a circuit with H and CNOT.

**Activity:** Activity: solve a coding challenge.

### 19.3 Circuit Challenges
Test visual circuit construction against a target circuit.

**Key points:**
- Required gates
- Correct placement
- Expected result

**Example:** Example: construct a Bell-state circuit.

**Activity:** Activity: complete target-circuit task.

### 19.4 Performance Analytics
Understand how learner activity can be summarized for progress review.

**Key points:**
- Completion
- Scores
- Attempts
- Weak topics

**Example:** Example: dashboard identifies a low-scoring chapter.

**Activity:** Activity: inspect a sample analytics dashboard.

## Chapter 20: Complete Quantum Learning Journey and Platform Use

### 20.1 Learning Path
Follow a structured path from fundamentals to algorithms, simulation and practical work.

**Key points:**
- Chapter sequence
- Prerequisites
- Completion
- Next chapter

**Example:** Example: finish a chapter before unlocking the next.

**Activity:** Activity: follow the full learning path.

### 20.2 Final Quantum Lab
Combine circuit design, simulation and visualization in one final experiment.

**Key points:**
- Design
- Code
- Simulate
- Visualize
- Explain

**Example:** Example: build a two-qubit algorithm-related experiment.

**Activity:** Activity: complete the final lab.

### 20.3 Final Assessment
Evaluate knowledge through theory, coding and circuit tasks.

**Key points:**
- MCQs
- Coding
- Circuit task
- Result review

**Example:** Example: complete a mixed final assessment.

**Activity:** Activity: submit final assessment.

### 20.4 Learner Dashboard and Completion
Review overall progress and completed skills.

**Key points:**
- Chapter progress
- Scores
- Challenges
- Completion status

**Example:** Example: dashboard summarizes the student's journey.

**Activity:** Activity: review and document progress.

### 20.5 Instructor and Platform Review
Understand how instructors can monitor learners and how the platform supports the complete learning workflow.

**Key points:**
- Instructor dashboard
- Authentication
- API integration
- Responsive UI
- Cloud readiness

**Example:** Example: instructor reviews learner completion and performance.

**Activity:** Activity: inspect the complete platform workflow.

### 20.6 AI Learning Support Integration
Understand where the AI features required by the problem statement can assist learning.

**Key points:**
- Concept explanation
- Code generation
- Debugging
- Optimization suggestions
- Personalized recommendations

**Example:** Example: an AI assistant explains a circuit error or recommends revision.

**Activity:** Activity: design one AI-assisted learning interaction.

