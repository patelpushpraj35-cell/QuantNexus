/**
 * QuantNexus – Instructor Panel Controller
 * Handles cohort tracking, student progression inspection, chapter unlocks,
 * circuit challenge assignments, and quiz diagnostics.
 */

let activeInstTab = 'roster';
let cohortStudents = [];
let activeInspectStudent = null;

const DEFAULT_CHALLENGES = [
  {
    id: 'CH-1',
    title: 'Bell State |Ψ⁻⟩ Generation',
    target: '(|01⟩ - |10⟩) / √2',
    qubits: 2,
    backend: 'Any Backend',
    desc: 'Generate the singlet Bell State |Ψ⁻⟩ using single qubit X and H gates followed by a CNOT.',
    assignedDate: '2026-09-20',
    submissionsCount: 5,
    avgFidelity: '99.4%'
  },
  {
    id: 'CH-2',
    title: 'Phase Kickback Verification',
    target: 'State |1-⟩ kickback to control',
    qubits: 2,
    backend: 'Qiskit Aer',
    desc: 'Verify quantum phase kickback by applying an X gate and H gate to the target qubit, then testing a CNOT.',
    assignedDate: '2026-09-22',
    submissionsCount: 4,
    avgFidelity: '98.8%'
  },
  {
    id: 'CH-3',
    title: '3-Qubit GHZ State Entanglement',
    target: '(|000⟩ + |111⟩) / √2',
    qubits: 3,
    backend: 'Cirq or PennyLane',
    desc: 'Synthesize the tripartite maximally entangled GHZ state and measure all 3 qubits.',
    assignedDate: '2026-09-25',
    submissionsCount: 6,
    avgFidelity: '100%'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Session check - allow instructor and admin only (learners cannot access)
  const user = requireAuth(['instructor', 'admin']);
  if (!user) return;

  // Load cohort students
  cohortStudents = getSeedStudents();

  // Initialize UI components
  updateCohortKPIs();
  renderStudentsTable();
  renderCurriculumGrid();
  renderChallengesList();
  renderQuizAnalytics();
});

// ── Tab Management ──
function switchInstTab(tabKey) {
  activeInstTab = tabKey;
  document.querySelectorAll('.inst-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.inst-tab-panel').forEach(p => p.classList.add('hidden'));

  const activeBtn = document.getElementById(`tab${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`);
  const activePanel = document.getElementById(`panel${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`);

  if (activeBtn) activeBtn.classList.add('active');
  if (activePanel) activePanel.classList.remove('hidden');

  // Sync sidebar active state
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.getElementById(`navInst${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`);
  if (activeNav) activeNav.classList.add('active');
}

// ── Cohort KPIs ──
function updateCohortKPIs() {
  const total = cohortStudents.length;
  const avgChapters = cohortStudents.reduce((sum, s) => sum + s.chaptersCompleted, 0) / (total || 1);
  const avgScore = cohortStudents.reduce((sum, s) => sum + s.avgScore, 0) / (total || 1);

  const kpiEnrolled = document.getElementById('kpiEnrolled');
  const kpiAvgProgress = document.getElementById('kpiAvgProgress');
  const kpiAvgQuiz = document.getElementById('kpiAvgQuiz');

  if (kpiEnrolled) kpiEnrolled.textContent = total;
  if (kpiAvgProgress) kpiAvgProgress.textContent = `${Math.round((avgChapters / 20) * 100)}% (${avgChapters.toFixed(1)}/20)`;
  if (kpiAvgQuiz) kpiAvgQuiz.textContent = `${avgScore.toFixed(1)}%`;
}

// ── Tab 1: Student Roster Table ──
function renderStudentsTable(filterList = null) {
  const tbody = document.getElementById('studentsTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const list = filterList || cohortStudents;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:24px;color:var(--text-3);">No matching students found.</td></tr>`;
    return;
  }

  list.forEach(stu => {
    const tr = document.createElement('tr');
    const pct = Math.round((stu.chaptersCompleted / 20) * 100);

    let statusClass = 'status-success';
    if (stu.status === 'Needs Help') statusClass = 'status-warn';
    else if (stu.status === 'Completed') statusClass = 'status-info';

    tr.innerHTML = `
      <td><span class="basis-chip">${stu.id}</span></td>
      <td><strong>${stu.name}</strong></td>
      <td><span class="user-email-text">${stu.email}</span></td>
      <td>
        <div class="stu-prog-wrap">
          <div class="stu-prog-bar"><div class="stu-prog-fill" style="width:${pct}%;"></div></div>
          <small>${stu.chaptersCompleted} / 20 (${pct}%)</small>
        </div>
      </td>
      <td><span class="meta-pill">Ch. ${stu.currentChapter}</span></td>
      <td>
        <strong style="color:${stu.avgScore >= 80 ? 'var(--success)' : (stu.avgScore >= 70 ? 'var(--accent)' : 'var(--warning)')}">
          ${stu.avgScore}%
        </strong>
      </td>
      <td><span class="status-pill ${statusClass}">● ${stu.status}</span></td>
      <td><small style="color:var(--text-3);">${stu.lastActive}</small></td>
      <td>
        <div class="action-btn-group">
          <button class="btn-table-action" onclick="inspectStudent('${stu.id}')" title="Inspect full chapter breakdown">Inspect</button>
          <button class="btn-table-action unlock-btn" onclick="grantChapterUnlock('${stu.id}')" title="Grant next chapter unlock">Unlock Next</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filterStudentsTable() {
  const searchInput = document.getElementById('studentSearchInput');
  const statusFilter = document.getElementById('studentStatusFilter');

  const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
  const status = statusFilter ? statusFilter.value : 'all';

  const filtered = cohortStudents.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(query) || s.email.toLowerCase().includes(query) || s.id.toLowerCase().includes(query);
    const matchesStatus = (status === 'all') || (s.status === status);
    return matchesSearch && matchesStatus;
  });

  renderStudentsTable(filtered);
}

// ── Inspect Student Modal ──
function inspectStudent(studentId) {
  const stu = cohortStudents.find(s => s.id === studentId);
  if (!stu) return;
  activeInspectStudent = stu;

  const modal = document.getElementById('studentDetailModal');
  const nameEl = document.getElementById('modalStudentName');
  const profileEl = document.getElementById('modalStudentProfile');
  const tbody = document.getElementById('modalChapterMatrixBody');

  if (nameEl) nameEl.textContent = `Student Progress: ${stu.name} (${stu.id})`;

  if (profileEl) {
    profileEl.innerHTML = `
      <div class="profile-card-metric"><span>Email:</span> <strong>${stu.email}</strong></div>
      <div class="profile-card-metric"><span>Enrolled:</span> <strong>${stu.enrolledDate}</strong></div>
      <div class="profile-card-metric"><span>Chapters Completed:</span> <strong>${stu.chaptersCompleted} / 20</strong></div>
      <div class="profile-card-metric"><span>Average Quiz Score:</span> <strong>${stu.avgScore}%</strong></div>
    `;
  }

  // Generate 20 chapter rows for this student
  if (tbody) {
    tbody.innerHTML = '';
    const prog = getProgress(stu.email);

    for (let c = 1; c <= 20; c++) {
      const chData = (typeof CHAPTERS_DATA !== 'undefined' && CHAPTERS_DATA[c - 1]) ? CHAPTERS_DATA[c - 1] : { title: `Chapter ${c}` };
      const status = c <= stu.chaptersCompleted ? 'Completed' : (c === stu.currentChapter ? 'In Progress' : 'Locked');
      const score = c <= stu.chaptersCompleted ? (Math.floor(Math.random() * 20) + 80) : (c === stu.currentChapter ? '—' : '—');
      const attempts = c <= stu.chaptersCompleted ? (Math.random() > 0.7 ? 2 : 1) : (c === stu.currentChapter ? 1 : 0);

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>Ch. ${c}:</strong> ${chData.title}</td>
        <td>
          <span class="status-pill ${status === 'Completed' ? 'status-success' : (status === 'In Progress' ? 'status-warn' : 'status-locked')}">
            ${status === 'Completed' ? 'Completed' : (status === 'In Progress' ? 'Unlocked' : 'Locked')}
          </span>
        </td>
        <td><strong>${typeof score === 'number' ? score + '%' : score}</strong></td>
        <td>${attempts}</td>
        <td>
          ${status === 'Locked' ? `<button class="btn-table-action" onclick="grantSingleChapter('${stu.id}', ${c})">Force Unlock</button>` : `<span style="color:var(--text-3);font-size:0.75rem;">Unlocked</span>`}
        </td>
      `;
      tbody.appendChild(tr);
    }
  }

  if (modal) modal.classList.remove('hidden');
}

function closeStudentModal() {
  const modal = document.getElementById('studentDetailModal');
  if (modal) modal.classList.add('hidden');
}

function grantChapterUnlock(studentId) {
  const stu = cohortStudents.find(s => s.id === studentId);
  if (!stu) return;

  if (stu.chaptersCompleted >= 20) {
    alert(`${stu.name} has already completed all 20 chapters!`);
    return;
  }

  stu.chaptersCompleted = Math.min(20, stu.chaptersCompleted + 1);
  stu.currentChapter = Math.min(20, stu.chaptersCompleted + 1);
  stu.lastActive = 'Just now (Unlocked by Instructor)';
  saveCohortStudents(cohortStudents);

  // Also update real progress record
  const prog = getProgress(stu.email);
  if (prog[stu.chaptersCompleted]) {
    prog[stu.chaptersCompleted].status = 'completed';
    prog[stu.chaptersCompleted].quizScore = 100;
  }
  if (prog[stu.currentChapter]) {
    prog[stu.currentChapter].status = 'unlocked';
  }
  saveProgress(stu.email, prog);

  renderStudentsTable();
  updateCohortKPIs();
  alert(`Granted Chapter ${stu.currentChapter} unlock for ${stu.name}!`);
}

function grantSingleChapter(studentId, chapterNum) {
  const stu = cohortStudents.find(s => s.id === studentId);
  if (!stu) return;

  if (chapterNum > stu.chaptersCompleted) {
    stu.chaptersCompleted = chapterNum;
    stu.currentChapter = Math.min(20, chapterNum + 1);
    saveCohortStudents(cohortStudents);
  }

  const prog = getProgress(stu.email);
  if (prog[chapterNum]) {
    prog[chapterNum].status = 'unlocked';
    saveProgress(stu.email, prog);
  }

  inspectStudent(studentId);
  renderStudentsTable();
  alert(`Unlocked Chapter ${chapterNum} for ${stu.name}.`);
}

// ── Tab 2: Curriculum & Chapters ──
function renderCurriculumGrid() {
  const container = document.getElementById('curriculumChaptersGrid');
  if (!container) return;
  container.innerHTML = '';

  const chapters = typeof CHAPTERS_DATA !== 'undefined' ? CHAPTERS_DATA : [];

  chapters.forEach(ch => {
    const card = document.createElement('div');
    card.className = 'curriculum-card';

    card.innerHTML = `
      <div class="curr-card-top">
        <span class="chapter-num">Ch. ${ch.id}</span>
        <span class="difficulty-badge">${ch.difficulty || 'Core'}</span>
      </div>
      <h4 class="curr-title">${ch.title}</h4>
      <p class="curr-desc">${(ch.overview || '').slice(0, 100)}...</p>
      <div class="curr-stats">
        <div class="curr-stat-item">
          <span>Objectives:</span> <strong>${(ch.objectives || []).length}</strong>
        </div>
        <div class="curr-stat-item">
          <span>Pass Rate:</span> <strong>${Math.floor(Math.random() * 15) + 82}%</strong>
        </div>
      </div>
      <div class="curr-card-actions">
        <a href="learn.html?chapter=${ch.id}" class="btn-table-action" target="_blank">View Content</a>
        <a href="circuit-lab.html" class="btn-table-action" target="_blank">Lab Circuit</a>
      </div>
    `;
    container.appendChild(card);
  });
}

function updatePassingThreshold(val) {
  localStorage.setItem('qn_pass_threshold', val);
  alert(`Minimum quiz passing threshold updated to ${val}%.`);
}

// ── Tab 3: Circuit Challenges ──
function getChallenges() {
  const raw = localStorage.getItem('qn_instructor_challenges');
  if (raw) return JSON.parse(raw);
  localStorage.setItem('qn_instructor_challenges', JSON.stringify(DEFAULT_CHALLENGES));
  return DEFAULT_CHALLENGES;
}

function renderChallengesList() {
  const container = document.getElementById('challengesListGrid');
  if (!container) return;
  container.innerHTML = '';

  const challenges = getChallenges();

  challenges.forEach(ch => {
    const div = document.createElement('div');
    div.className = 'challenge-inst-card';

    div.innerHTML = `
      <div class="ch-inst-header">
        <span class="meta-pill">${ch.id}</span>
        <span class="meta-pill" style="color:var(--accent);">${ch.backend}</span>
      </div>
      <h4>${ch.title}</h4>
      <p class="ch-target-line"><strong>Target:</strong> <code>${ch.target}</code></p>
      <p class="ch-desc-text">${ch.desc}</p>
      <div class="ch-metrics-row">
        <div><span>Submissions:</span> <strong>${ch.submissionsCount} / 6</strong></div>
        <div><span>Avg. Fidelity:</span> <strong style="color:var(--success);">${ch.avgFidelity}</strong></div>
      </div>
      <div class="ch-actions-row">
        <button class="btn-secondary" onclick="alert('Viewing submissions for challenge: ${ch.title}')">Inspect Submissions</button>
        <button class="btn-primary" onclick="openInCircuitLabForChallenge('${ch.target}')">Open Template in Lab</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function openAssignChallengeModal() {
  const modal = document.getElementById('deployChallengeModal');
  if (modal) modal.classList.remove('hidden');
}

function closeDeployModal() {
  const modal = document.getElementById('deployChallengeModal');
  if (modal) modal.classList.add('hidden');
}

function handleCreateChallenge(e) {
  e.preventDefault();
  const title = document.getElementById('chTitle').value.trim();
  const target = document.getElementById('chTarget').value.trim();
  const qubits = parseInt(document.getElementById('chQubits').value) || 2;
  const backend = document.getElementById('chBackend').value;
  const desc = document.getElementById('chDesc').value.trim();

  const challenges = getChallenges();
  const newCh = {
    id: `CH-${challenges.length + 1}`,
    title,
    target,
    qubits,
    backend,
    desc,
    assignedDate: new Date().toISOString().split('T')[0],
    submissionsCount: 0,
    avgFidelity: '—'
  };

  challenges.unshift(newCh);
  localStorage.setItem('qn_instructor_challenges', JSON.stringify(challenges));

  closeDeployModal();
  renderChallengesList();
  alert(`Deployed "${title}" to the student cohort!`);
}

function openInCircuitLabForChallenge(target) {
  window.location.href = 'circuit-lab.html';
}

// ── Tab 4: Quiz Analytics ──
function renderQuizAnalytics() {
  const chart = document.getElementById('quizDiagnosticsChart');
  const topicsList = document.getElementById('difficultTopicsList');

  if (chart) {
    chart.innerHTML = `
      <div class="diag-bar-row">
        <span class="diag-label">Ch. 1 - 5 (Foundations):</span>
        <div class="diag-track"><div class="diag-fill" style="width: 92%;">92% Pass</div></div>
      </div>
      <div class="diag-bar-row">
        <span class="diag-label">Ch. 6 - 10 (Gates & Entanglement):</span>
        <div class="diag-track"><div class="diag-fill" style="width: 86%;">86% Pass</div></div>
      </div>
      <div class="diag-bar-row">
        <span class="diag-label">Ch. 11 - 15 (Algorithms & QFT):</span>
        <div class="diag-track"><div class="diag-fill" style="width: 79%;">79% Pass</div></div>
      </div>
      <div class="diag-bar-row">
        <span class="diag-label">Ch. 16 - 20 (Hardware & Quantum Cloud):</span>
        <div class="diag-track"><div class="diag-fill" style="width: 84%;">84% Pass</div></div>
      </div>
    `;
  }

  if (topicsList) {
    const topics = [
      { topic: 'Quantum Phase Kickback Mechanism', misses: 9, chapter: 9 },
      { topic: 'Grover Diffusion Operator Phase Inversion', misses: 7, chapter: 14 },
      { topic: 'Qiskit Little-Endian vs Cirq Big-Endian Ordering', misses: 6, chapter: 17 },
      { topic: 'Density Matrix Partial Tracing', misses: 5, chapter: 8 }
    ];

    topicsList.innerHTML = '';
    topics.forEach(t => {
      const div = document.createElement('div');
      div.className = 'difficult-topic-item';
      div.innerHTML = `
        <div class="dt-info">
          <strong>${t.topic}</strong>
          <small>Chapter ${t.chapter} • ${t.misses} retries recorded</small>
        </div>
        <a href="learn.html?chapter=${t.chapter}" class="btn-table-action" target="_blank">Review Material →</a>
      `;
      topicsList.appendChild(div);
    });
  }
}

// ── Export Cohort Grades ──
function exportCohortGrades() {
  const data = {
    cohort: 'SIH-Quantum-2026',
    exportDate: new Date().toISOString(),
    totalStudents: cohortStudents.length,
    students: cohortStudents
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `QuantNexus_Cohort_Grades_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Expose handlers globally
window.switchInstTab = switchInstTab;
window.filterStudentsTable = filterStudentsTable;
window.inspectStudent = inspectStudent;
window.closeStudentModal = closeStudentModal;
window.grantChapterUnlock = grantChapterUnlock;
window.grantSingleChapter = grantSingleChapter;
window.updatePassingThreshold = updatePassingThreshold;
window.openAssignChallengeModal = openAssignChallengeModal;
window.closeDeployModal = closeDeployModal;
window.handleCreateChallenge = handleCreateChallenge;
window.openInCircuitLabForChallenge = openInCircuitLabForChallenge;
window.exportCohortGrades = exportCohortGrades;
