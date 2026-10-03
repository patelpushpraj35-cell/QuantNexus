/**
 * QuantNexus – Dashboard JS
 */

document.addEventListener('DOMContentLoaded', () => {
  const user = requireAuth();
  if (!user) return;

  const prog = getProgress(user.email);
  renderDashboard(user, prog);
});

function renderDashboard(user, prog) {
  // Welcome heading
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  document.getElementById('welcomeHeading').textContent = `${greeting}, ${user.name.split(' ')[0]}!`;

  const totalChapters = CHAPTERS_DATA.length;
  const completed = Object.values(prog).filter(p => p.status === 'completed').length;
  const unlocked = Object.values(prog).filter(p => p.status === 'unlocked' || p.status === 'completed').length;
  const scores = Object.values(prog).filter(p => p.quizScore !== null).map(p => p.quizScore);
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

  // Progress ring
  const pct = Math.round((completed / totalChapters) * 100);
  const circumference = 2 * Math.PI * 40;
  document.getElementById('ringFill').style.strokeDasharray = `${(pct / 100) * circumference} ${circumference}`;
  document.getElementById('ringPercent').textContent = `${pct}%`;

  // Progress ring gradient (inject into SVG)
  const svgs = document.querySelectorAll('.ring-svg');
  svgs.forEach(svg => {
    if (!svg.querySelector('defs')) {
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      defs.innerHTML = `<linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#7c3aed"/>
        <stop offset="100%" style="stop-color:#06b6d4"/>
      </linearGradient>`;
      svg.insertBefore(defs, svg.firstChild);
    }
  });

  // Subtext
  if (completed === totalChapters) {
    document.getElementById('welcomeSubtext').textContent = 'You completed all 20 chapters! Outstanding work!';
  } else if (completed === 0) {
    document.getElementById('welcomeSubtext').textContent = 'Start your quantum journey — Chapter 1 is ready for you!';
  } else {
    const next = completed + 1;
    const ch = getChapterById(next);
    document.getElementById('welcomeSubtext').textContent = `Continue with Chapter ${next}: ${ch ? ch.title : ''}`;
  }

  // Stats
  document.getElementById('statsCompleted').textContent = `${completed} / ${totalChapters}`;
  document.getElementById('statsUnlocked').textContent = unlocked;
  document.getElementById('statsAvgScore').textContent = avgScore !== null ? `${avgScore}%` : '—';

  // Streak (simple day streak from localStorage)
  const streak = getStreak(user.email);
  document.getElementById('statsStreak').textContent = streak;

  // Continue button
  const continueSection = document.getElementById('continueSection');
  const nextChapter = CHAPTERS_DATA.find(c => {
    const s = prog[c.id];
    return s && (s.status === 'unlocked');
  });
  if (nextChapter) {
    continueSection.innerHTML = `
      <a href="learn.html?chapter=${nextChapter.id}" class="continue-btn">
        Continue: Chapter ${nextChapter.id} — ${nextChapter.title}
        <span style="margin-left:4px">→</span>
      </a>`;
  } else if (completed === totalChapters) {
    continueSection.innerHTML = `<div class="continue-btn" style="background:linear-gradient(135deg,#10b981,#06b6d4)">All 20 Chapters Complete! Congratulations!</div>`;
  }

  // Chapters grid
  const grid = document.getElementById('dashChaptersGrid');
  grid.innerHTML = '';
  CHAPTERS_DATA.forEach(ch => {
    const s = prog[ch.id] || { status: 'locked', quizScore: null };
    const isCompleted = s.status === 'completed';
    const isLocked = s.status === 'locked';
    const isUnlocked = s.status === 'unlocked';

    const statusIcon = isCompleted
      ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'
      : isLocked
      ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
      : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
    const diffClass = getDifficultyClass(ch.difficulty);
    const scoreText = s.quizScore !== null ? `Quiz: ${s.quizScore}%` : '';

    const card = document.createElement('div');
    card.className = `ch-card ${isLocked ? 'locked' : isCompleted ? 'completed' : 'unlocked'}`;
    card.innerHTML = `
      <div class="ch-card-header">
        <div class="ch-num">${ch.id}</div>
        <div class="ch-status-icon">${statusIcon}</div>
      </div>
      <div class="ch-title">${ch.title}</div>
      <div class="ch-overview">${ch.overview.substring(0, 90)}...</div>
      <div class="ch-footer">
        <span class="ch-difficulty ${diffClass}">${ch.difficulty}</span>
        ${ch.video ? `<span class="ch-video-pill" title="Video Masterclass (${ch.video.duration})"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:3px"><polygon points="5 3 19 12 5 21 5 3"/></svg>${ch.video.duration}</span>` : ''}
        <span class="ch-score">${scoreText}</span>
      </div>
    `;
    if (!isLocked) {
      card.addEventListener('click', () => {
        window.location.href = `learn.html?chapter=${ch.id}`;
      });
      card.style.cursor = 'pointer';
    }
    grid.appendChild(card);
  });

  // Update streak
  updateStreak(user.email);

  // Coding Challenges progress widget
  const challengesSolvedKey = 'qn_challenges_' + user.email;
  const challengesRaw = localStorage.getItem(challengesSolvedKey);
  let challengesSolved = 0;
  if (challengesRaw) {
    const challengesProg = JSON.parse(challengesRaw);
    challengesSolved = Object.values(challengesProg).filter(p => p.status === 'passed').length;
  }
  const totalChallenges = 10;
  const challengesPct = Math.round((challengesSolved / totalChallenges) * 100);
  const dashBar = document.getElementById('dashChallengesBar');
  const dashLabel = document.getElementById('dashChallengesLabel');
  if (dashBar) dashBar.style.width = `${challengesPct}%`;
  if (dashLabel) dashLabel.textContent = `${challengesSolved} / ${totalChallenges} solved`;
}

function getStreak(email) {
  const key = 'qn_streak_' + email;
  const raw = localStorage.getItem(key);
  if (!raw) return 0;
  const data = JSON.parse(raw);
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (data.lastDate === today) return data.count;
  if (data.lastDate === yesterday) return data.count;
  return 0;
}
function updateStreak(email) {
  const key = 'qn_streak_' + email;
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const raw = localStorage.getItem(key);
  let data = raw ? JSON.parse(raw) : { count: 0, lastDate: null };
  if (data.lastDate === today) return;
  if (data.lastDate === yesterday) {
    data.count++;
  } else {
    data.count = 1;
  }
  data.lastDate = today;
  localStorage.setItem(key, JSON.stringify(data));
}
