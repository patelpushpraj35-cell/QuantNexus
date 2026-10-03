# ⚛️ QuantNexus – Interactive Quantum Computing Learning Platform

[![Smart India Hackathon](https://img.shields.io/badge/SIH-26140-7c3aed?style=for-the-badge)](https://sih.gov.in/)
[![License: MIT](https://img.shields.io/badge/License-MIT-06b6d4?style=for-the-badge)](LICENSE)
[![Theme: Light & Dark](https://img.shields.io/badge/Theme-Light%20%26%20Dark-10b981?style=for-the-badge)](#themes)

**QuantNexus** is an interactive, browser-based quantum computing educational platform built for India's **Smart India Hackathon 2026 (SIH 26140)**. It takes learners on a structured journey from basic quantum bits to complex quantum algorithms with hands-on simulation, coding challenges, video lectures, and AI-assisted tutoring.

---

## 🚀 Key Features

### 1. 📚 20-Chapter Structured Curriculum
- **Sequential Learning Path**: Covers fundamentals to advanced quantum topics (Qubits, Superposition, Entanglement, Quantum Gates, Bloch Sphere, Grover's Search, Shor's Algorithm, Surface Codes, VQE, and Quantum Internet).
- **Playable Video Masterclasses**: Every single chapter includes an in-page, playable YouTube video lecture from world-class educators (Kurzgesagt, Veritasium, IBM Qiskit, 3Blue1Brown, minutephysics, PennyLane).
- **Interactive Concept Cards**: Flip cards and comparative tables to build mathematical and physical intuition.
- **End-of-Chapter Quizzes**: Automatic scoring and chapter unlocking progression.

### 2. ⚡ Objective 2: Quantum Circuit Lab
- **Graphical & Code Builder**: Drag-and-drop quantum gates onto qubit wires or write Qiskit code.
- **Real-Time State Visualization**: View statevectors, probabilities, measurement histograms, and Bloch sphere angles.

### 3. 🧪 Objective 3: Multi-Backend Simulation Lab
- **Cross-Framework Support**: Test circuits across simulated backends:
  - **Qiskit Aer**
  - **PennyLane**
  - **Cirq**
  - **qBraid**
- **Live Output Comparison**: Compare shot distributions and circuit metrics across execution backends.

### 4. 🏆 Objective 4: Hands-on Coding Challenges
- **10 Progressive Challenges**: Practice writing Qiskit code from "Hello Qubit" to "Phase Kickback".
- **Instant Auto-Grading**: Real-time evaluation against target probability distributions with pass/fail feedback.
- **Dashboard Progress Tracking**: Day streak counter and challenge progress tracking.

### 5. 🤖 Quanta AI Assistant
- Built-in floating tutor powered by Gemini API to answer quantum doubts and explain quantum mechanics.

### 6. ☀️/🌙 Dynamic Light & Dark Theme
- Persistent, zero-FOUC theme engine supporting dark quantum cyberpunk and high-contrast "Quantum Daylight" palettes.

### 7. 👥 Role-Based Access Control
- **Student**: Guided learning, challenges, and quizzes.
- **Instructor**: Cohort analytics, student progress logs, grade exports.
- **Admin**: System health monitoring, data backup/restore, user role management.

---

## 🛠️ Quick Start

QuantNexus is zero-dependency vanilla web application that runs directly in any modern browser.

### Clone the Repository
```bash
git clone https://github.com/patelpushpraj35-cell/QuantNexus.git
cd QuantNexus
```

### Run Locally
You can run it with any static server:

```bash
# Using npm
npm start

# Or using npx serve
npx -y serve -l 3000 .

# Or using Python
python -m http.server 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
QuantNexus/
├── index.html               # 1-Click login & authentication page
├── dashboard.html           # Student progress dashboard
├── chapters.html            # Curriculum directory with video previews
├── learn.html               # Interactive lesson viewer with video masterclass
├── circuit-lab.html         # Drag-and-drop quantum circuit builder
├── simulation-lab.html      # Multi-backend simulator (Qiskit, Cirq, PennyLane)
├── coding-challenges.html   # 10 Qiskit coding challenges with auto-grader
├── instructor.html          # Instructor command center & cohort analytics
├── admin.html               # System administration & backup portal
├── css/
│   ├── style.css            # Core design system (Light & Dark tokens)
│   ├── challenges.css       # Coding challenges layout
│   └── ai-assistant.css     # Quanta AI floating chatbot styles
└── js/
    ├── theme.js             # Global theme engine (Light/Dark persistence)
    ├── data.js              # Curriculum chapters & verified video mappings
    ├── quizData.js          # Chapter quiz question bank
    ├── auth.js              # Authentication & localStorage session manager
    ├── dashboard.js         # Dashboard widgets & streak engine
    ├── chapters.js          # Chapters catalog & in-page video modal
    ├── learn.js             # Interactive section renderer & video controls
    ├── circuitLab.js        # Quantum circuit simulation engine
    ├── simulationLab.js     # Multi-backend runner
    ├── challenges.js        # Challenge verification & code runner
    └── ai-assistant.js      # Gemini AI assistant client
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
