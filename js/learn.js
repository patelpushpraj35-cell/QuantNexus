/**
 * QuantNexus – Learn Page JS
 * Handles chapter content rendering, section navigation,
 * quiz modal, and progress saving.
 */

let currentUser = null;
let currentProgress = null;
let currentChapter = null;
let currentSectionIndex = 0;
let visitedSections = new Set();

// Quiz state
let quizQuestions = [];
let currentQuestionIndex = 0;
let quizAnswers = [];
let quizStarted = false;

document.addEventListener('DOMContentLoaded', () => {
  currentUser = requireAuth();
  if (!currentUser) return;

  currentProgress = getProgress(currentUser.email);

  const params = new URLSearchParams(window.location.search);
  const chId = parseInt(params.get('chapter') || '1');

  const chStatus = currentProgress[chId];
  if (!chStatus || chStatus.status === 'locked') {
    window.location.href = 'chapters.html';
    return;
  }

  currentChapter = getChapterById(chId);
  if (!currentChapter) {
    window.location.href = 'chapters.html';
    return;
  }

  // Restore visited sections
  if (chStatus.sectionsVisited) {
    visitedSections = new Set(chStatus.sectionsVisited);
  }

  renderChapterPage();
});

/* ── Chapter Page Rendering ── */
function renderChapterPage() {
  const ch = currentChapter;

  document.title = `Ch.${ch.id}: ${ch.title} – QuantNexus`;
  document.getElementById('learnTopbarTitle').textContent = `Chapter ${ch.id}: ${ch.title}`;
  document.getElementById('chapterNumBadge').textContent = `Chapter ${ch.id}`;
  document.getElementById('chapterTitle').textContent = `${ch.icon} ${ch.title}`;
  document.getElementById('chapterOverview').textContent = ch.overview;

  const diffBadge = document.getElementById('difficultyBadge');
  diffBadge.textContent = ch.difficulty;
  diffBadge.className = 'difficulty-badge ' + (ch.difficulty === 'Beginner' ? 'diff-beg' : 'diff-int');

  const labBtn = document.getElementById('chapterLabBtn');
  if (labBtn) {
    labBtn.href = `circuit-lab.html?chapter=${ch.id}`;
    labBtn.title = `Experiment with Chapter ${ch.id} circuits in Quantum Circuit Lab`;
  }

  // Objectives
  const objList = document.getElementById('objectivesList');
  objList.innerHTML = ch.objectives.map(o => `<li>${o}</li>`).join('');

  // Chapter Video Masterclass
  renderChapterVideo(ch);

  // Section tabs
  renderSectionTabs();
  renderSection(0);
  renderSectionDots();
}

/* ── Chapter Video Masterclass ── */
function renderChapterVideo(ch) {
  const video = ch.video || (typeof getChapterVideo === 'function' ? getChapterVideo(ch.id) : null);
  const card = document.getElementById('chapterVideoCard');
  const watchBtn = document.getElementById('chapterWatchBtn');
  if (!card) return;

  if (!video || !video.id) {
    card.style.display = 'none';
    if (watchBtn) watchBtn.style.display = 'none';
    return;
  }

  card.style.display = 'block';
  if (watchBtn) {
    watchBtn.style.display = 'inline-flex';
    watchBtn.innerHTML = `🎬 Watch Video (${video.duration || 'Video'})`;
  }

  const iframe = document.getElementById('chapterVideoIframe');
  if (iframe) {
    iframe.src = `https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`;
    iframe.title = `${ch.title} - Video Lecture by ${video.channel}`;
  }

  const authorEl = document.getElementById('videoAuthor');
  if (authorEl) authorEl.textContent = video.channel || 'Featured Educator';

  const durationEl = document.getElementById('videoDuration');
  if (durationEl) durationEl.textContent = `⏱️ ${video.duration || 'Watch'}`;

  const titleEl = document.getElementById('videoTitle');
  if (titleEl) titleEl.textContent = video.title || `${ch.title} Video Masterclass`;

  const descEl = document.getElementById('videoDesc');
  if (descEl) descEl.textContent = video.description || ch.overview;

  const extLink = document.getElementById('videoExternalLink');
  if (extLink) extLink.href = video.url || `https://www.youtube.com/watch?v=${video.id}`;

  // If ?watch=1 in URL, scroll smoothly to video
  const params = new URLSearchParams(window.location.search);
  if (params.get('watch') === '1') {
    setTimeout(() => {
      scrollToVideo();
    }, 350);
  }
}

let isVideoCollapsed = false;
function toggleVideoCollapse() {
  const wrapper = document.getElementById('videoPlayerWrapper');
  const icon = document.getElementById('videoToggleIcon');
  const text = document.getElementById('videoToggleText');
  if (!wrapper) return;

  isVideoCollapsed = !isVideoCollapsed;
  if (isVideoCollapsed) {
    wrapper.style.display = 'none';
    if (icon) icon.textContent = '▼';
    if (text) text.textContent = 'Show Video';
  } else {
    wrapper.style.display = 'block';
    if (icon) icon.textContent = '▲';
    if (text) text.textContent = 'Hide Video';
  }
}

function scrollToVideo() {
  const card = document.getElementById('chapterVideoCard');
  const wrapper = document.getElementById('videoPlayerWrapper');
  if (isVideoCollapsed && wrapper) {
    toggleVideoCollapse();
  }
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('highlight-glow');
    setTimeout(() => card.classList.remove('highlight-glow'), 2200);
  }
}

function scrollToSectionContent() {
  const secNav = document.getElementById('sectionNav');
  if (secNav) {
    secNav.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function renderSectionTabs() {
  const nav = document.getElementById('sectionNav');
  nav.innerHTML = '';
  currentChapter.sections.forEach((sec, i) => {
    const btn = document.createElement('button');
    btn.className = 'sec-tab' +
      (i === currentSectionIndex ? ' active' : '') +
      (visitedSections.has(i) ? ' visited' : '');
    btn.textContent = `${sec.id} ${sec.title}`;
    btn.onclick = () => goToSection(i);
    nav.appendChild(btn);
  });
}

function renderSectionDots() {
  const dotsEl = document.getElementById('sectionDots');
  dotsEl.innerHTML = '';
  currentChapter.sections.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 's-dot' +
      (i === currentSectionIndex ? ' active' : '') +
      (visitedSections.has(i) && i !== currentSectionIndex ? ' visited' : '');
    dot.onclick = () => goToSection(i);
    dotsEl.appendChild(dot);
  });
}

function goToSection(index) {
  currentSectionIndex = index;
  visitedSections.add(index);
  saveVisitedSections();
  renderSectionTabs();
  renderSection(index);
  renderSectionDots();
  updateProgressStrip();
  checkShowTakeaways();

  // Update nav buttons
  document.getElementById('prevSectionBtn').disabled = index === 0;
  document.getElementById('nextSectionBtn').textContent =
    index === currentChapter.sections.length - 1 ? 'Finish Chapter →' : 'Next →';

  // Scroll section into view
  document.getElementById('sectionContent').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function navigateSection(dir) {
  const total = currentChapter.sections.length;
  const next = currentSectionIndex + dir;
  if (next < 0 || next > total) return;
  if (next === total) {
    // Finished all sections
    visitedSections.add(currentSectionIndex);
    saveVisitedSections();
    checkShowTakeaways();
    showTakeaways();
    return;
  }
  goToSection(next);
}

function renderSection(index) {
  const sec = currentChapter.sections[index];
  const content = document.getElementById('sectionContent');

  let interactiveHTML = '';
  if (sec.interactive === 'flip') {
    interactiveHTML = buildFlipCards(sec.points);
  } else if (sec.interactive === 'comparison') {
    interactiveHTML = buildComparisonTable(sec.points);
  }

  content.innerHTML = `
    <div class="sec-content-inner">
      <div class="sec-num">SECTION ${sec.id}</div>
      <h2 class="sec-title">${sec.title}</h2>
      <p class="sec-explanation">${sec.explanation}</p>

      ${sec.analogy ? `
      <div class="example-box">
        <div class="example-label">💡 Analogy</div>
        <div class="example-text">${sec.analogy}</div>
      </div>` : ''}

      ${sec.example ? `
      <div class="example-box" style="border-color:rgba(124,58,237,0.25);background:rgba(124,58,237,0.06);">
        <div class="example-label" style="color:var(--primary-light);">🔬 Example</div>
        <div class="example-text" style="font-family:inherit;">${formatExample(sec.example)}</div>
      </div>` : ''}

      <div class="concept-box">
        <div class="concept-box-title">📌 Key Concepts</div>
        ${interactiveHTML}
      </div>
    </div>
  `;

  // Add flip card listeners
  content.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
}

function formatExample(text) {
  // Format code blocks in examples
  return text.replace(/```([\s\S]*?)```/g, (_, code) =>
    `<pre style="background:var(--bg);border:1px solid var(--border-light);border-radius:8px;padding:12px;margin-top:8px;font-family:var(--mono);font-size:0.78rem;overflow-x:auto;white-space:pre-wrap;">${escHtml(code.trim())}</pre>`
  );
}
function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function buildFlipCards(points) {
  if (!points || !points.length) return '';
  const hint = `<p class="flip-hint">🖱️ Click a card to reveal its explanation</p>`;
  const cards = points.map(p => {
    const term = typeof p === 'string' ? p : p.term;
    const detail = typeof p === 'string' ? 'A key concept in this section.' : p.detail;
    return `
      <div class="flip-card" role="button" tabindex="0" aria-label="Flip card for ${escHtml(term)}">
        <div class="flip-card-inner">
          <div class="flip-front">${escHtml(term)}</div>
          <div class="flip-back">${escHtml(detail)}</div>
        </div>
      </div>`;
  }).join('');
  return hint + `<div class="flip-cards">${cards}</div>`;
}

function buildComparisonTable(points) {
  if (!points || !points.length) return buildFlipCards(points);
  const rows = points.map(p => {
    const term = typeof p === 'string' ? p : p.term;
    const detail = typeof p === 'string' ? '' : p.detail;
    return `<div class="kp-item"><div class="kp-text"><strong>${escHtml(term)}</strong>${detail ? ` — ${escHtml(detail)}` : ''}</div></div>`;
  }).join('');
  return `<div class="key-points-list">${rows}</div>`;
}

function updateProgressStrip() {
  const total = currentChapter.sections.length;
  const pct = Math.round(((visitedSections.size) / total) * 100);
  document.getElementById('chapterProgressFill').style.width = `${Math.min(pct, 100)}%`;
}

function saveVisitedSections() {
  currentProgress[currentChapter.id].sectionsVisited = Array.from(visitedSections);
  saveProgress(currentUser.email, currentProgress);
}

function checkShowTakeaways() {
  const allVisited = visitedSections.size >= currentChapter.sections.length;
  if (allVisited) {
    const card = document.getElementById('takeawaysCard');
    if (card.classList.contains('hidden')) {
      showTakeaways();
    }
  }
}

function showTakeaways() {
  const card = document.getElementById('takeawaysCard');
  card.classList.remove('hidden');
  const list = document.getElementById('takeawaysList');
  list.innerHTML = currentChapter.takeaways.map(t => `<li>${t}</li>`).join('');
  card.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Update progress strip to 100%
  document.getElementById('chapterProgressFill').style.width = '100%';

  // Update next button
  document.getElementById('nextSectionBtn').textContent = 'Take the Quiz ⚡';
  document.getElementById('nextSectionBtn').onclick = goToQuiz;
}

/* ── Quiz ── */
function goToQuiz() {
  const chId = currentChapter.id;
  const qData = QUIZ_DATA[chId];
  if (!qData) {
    alert('Quiz data not available for this chapter.');
    return;
  }
  quizQuestions = qData.questions;
  currentQuestionIndex = 0;
  quizAnswers = new Array(quizQuestions.length).fill(null);
  quizStarted = true;
  renderQuizModal(0);
  document.getElementById('quizOverlay').classList.remove('hidden');
}

function renderQuizModal(qIndex) {
  const q = quizQuestions[qIndex];
  const total = quizQuestions.length;
  const pct = Math.round((qIndex / total) * 100);

  const modal = document.getElementById('quizModal');
  const opts = ['A', 'B', 'C', 'D'];

  modal.innerHTML = `
    <div class="quiz-header">
      <div class="quiz-icon">⚡</div>
      <div class="quiz-title">Chapter ${currentChapter.id} Quiz</div>
      <div class="quiz-subtitle">${currentChapter.title}</div>
    </div>

    <div class="quiz-progress-row">
      <span class="quiz-q-counter">Question ${qIndex + 1} of ${total}</span>
      <span class="quiz-q-counter">${pct}% complete</span>
    </div>
    <div class="quiz-progress-bar-wrap">
      <div class="quiz-progress-bar" style="width:${pct}%"></div>
    </div>

    <div class="quiz-question">${qIndex + 1}. ${escHtml(q.q)}</div>

    <div class="quiz-options" id="quizOptions">
      ${q.options.map((opt, i) => `
        <button class="quiz-option" id="opt${i}" onclick="selectOption(${i})">
          <span class="opt-letter">${opts[i]}</span>
          <span>${escHtml(opt)}</span>
        </button>
      `).join('')}
    </div>

    <div class="quiz-feedback hidden" id="quizFeedback"></div>

    <div class="quiz-footer">
      <button class="btn-secondary" onclick="closeQuiz()">✕ Exit</button>
      <button class="btn-primary" id="quizNextBtn" onclick="nextQuestion()" disabled>
        ${qIndex < total - 1 ? 'Next Question →' : 'See Results 🏆'}
      </button>
    </div>
  `;
}

let selectedOption = null;
let answerSubmitted = false;

function selectOption(index) {
  if (answerSubmitted) return;
  selectedOption = index;
  answerSubmitted = true;

  const q = quizQuestions[currentQuestionIndex];
  quizAnswers[currentQuestionIndex] = index;

  // Disable all options
  const options = document.querySelectorAll('.quiz-option');
  options.forEach(o => o.disabled = true);

  // Show correct/wrong
  options[q.answer].classList.add('correct');
  if (index !== q.answer) {
    options[index].classList.add('wrong');
  }

  // Show feedback
  const fb = document.getElementById('quizFeedback');
  fb.classList.remove('hidden');
  if (index === q.answer) {
    fb.className = 'quiz-feedback correct';
    fb.textContent = `✅ Correct! ${q.explanation}`;
  } else {
    fb.className = 'quiz-feedback wrong';
    fb.textContent = `❌ Not quite. ${q.explanation}`;
  }

  // Enable next
  document.getElementById('quizNextBtn').disabled = false;
}

function nextQuestion() {
  selectedOption = null;
  answerSubmitted = false;
  currentQuestionIndex++;
  if (currentQuestionIndex >= quizQuestions.length) {
    showResults();
  } else {
    renderQuizModal(currentQuestionIndex);
  }
}

function showResults() {
  document.getElementById('quizOverlay').classList.add('hidden');

  const correct = quizAnswers.filter((a, i) => a === quizQuestions[i].answer).length;
  const total = quizQuestions.length;
  const score = Math.round((correct / total) * 100);
  const passed = score >= 60;

  // Save progress
  const prevScore = currentProgress[currentChapter.id].quizScore;
  currentProgress[currentChapter.id].quizScore = prevScore !== null ? Math.max(prevScore, score) : score;
  currentProgress[currentChapter.id].attempts = (currentProgress[currentChapter.id].attempts || 0) + 1;

  // Unlock next chapter ONLY if passed
  const nextId = currentChapter.id + 1;
  const totalChapters = CHAPTERS_DATA.length;
  if (passed) {
    currentProgress[currentChapter.id].status = 'completed';
    if (nextId <= totalChapters && currentProgress[nextId] && currentProgress[nextId].status === 'locked') {
      currentProgress[nextId].status = 'unlocked';
    }
  }
  saveProgress(currentUser.email, currentProgress);

  // Render result modal
  const circumference = 2 * Math.PI * 45;
  const strokeColor = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
  const resultIcon = score === 100 ? '🌟' : passed ? '🎉' : '😅';
  const resultTitle = score === 100 ? 'Perfect Score!' : passed ? 'Chapter Complete!' : 'Keep Going!';

  const modal = document.getElementById('resultModal');
  modal.innerHTML = `
    <div class="result-icon">${resultIcon}</div>
    <div class="result-title">${resultTitle}</div>
    <div class="result-subtitle">Chapter ${currentChapter.id}: ${currentChapter.title}</div>

    <div class="result-score-ring">
      <svg viewBox="0 0 100 100">
        <defs>
          <linearGradient id="rGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:${strokeColor}"/>
            <stop offset="100%" style="stop-color:${strokeColor}88"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" class="r-ring-bg" />
        <circle cx="50" cy="50" r="45" class="r-ring-fill"
          style="stroke:url(#rGrad);stroke-dasharray:0 ${circumference};transform:rotate(-90deg);transform-origin:50% 50%;"
          id="rFillCircle"/>
      </svg>
      <div class="result-score-num">
        <span style="color:${strokeColor}">${score}%</span>
        <small>Score</small>
      </div>
    </div>

    <div class="result-stats">
      <div class="r-stat">
        <div class="r-stat-val" style="color:var(--success)">${correct}</div>
        <div class="r-stat-label">Correct</div>
      </div>
      <div class="r-stat">
        <div class="r-stat-val" style="color:var(--danger)">${total - correct}</div>
        <div class="r-stat-label">Wrong</div>
      </div>
      <div class="r-stat">
        <div class="r-stat-val">${total}</div>
        <div class="r-stat-label">Total</div>
      </div>
    </div>

    ${passed
      ? `<p class="result-pass-msg">✅ Passed with ${score}%! Chapter ${currentChapter.id} completed. ${nextId <= totalChapters ? `Chapter ${nextId} is now unlocked!` : 'You have completed the entire 20-chapter course! 🎓'}</p>`
      : `<p class="result-fail-msg">⚠️ You scored ${score}%. A minimum of 60% is required to pass and unlock Chapter ${nextId <= totalChapters ? nextId : totalChapters}. Review the key concepts and try again!</p>`
    }

    <div class="result-btns">
      ${passed && nextId <= totalChapters
        ? `<button class="btn-primary" onclick="goToNextChapter(${nextId})">Next Chapter →</button>`
        : ''
      }
      ${!passed
        ? `<button class="btn-primary" onclick="closeResult(); goToQuiz();">Retake Quiz ↺</button>`
        : ''
      }
      <button class="btn-secondary" onclick="closeResult()">Review Chapter</button>
      <button class="btn-secondary" onclick="window.location.href='dashboard.html'">Dashboard</button>
    </div>
  `;

  document.getElementById('resultOverlay').classList.remove('hidden');

  // Animate ring
  setTimeout(() => {
    const circle = document.getElementById('rFillCircle');
    if (circle) {
      const dash = (score / 100) * circumference;
      circle.style.transition = 'stroke-dasharray 1s ease';
      circle.style.strokeDasharray = `${dash} ${circumference}`;
    }
  }, 100);
}

function closeQuiz() {
  document.getElementById('quizOverlay').classList.add('hidden');
  quizStarted = false;
  answerSubmitted = false;
  selectedOption = null;
}

function closeResult() {
  document.getElementById('resultOverlay').classList.add('hidden');
}

function goToNextChapter(nextId) {
  window.location.href = `learn.html?chapter=${nextId}`;
}
