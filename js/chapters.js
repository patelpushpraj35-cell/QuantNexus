/**
 * QuantNexus – Chapters Page JS
 */

document.addEventListener('DOMContentLoaded', () => {
  const user = requireAuth();
  if (!user) return;

  const prog = getProgress(user.email);
  renderChaptersList(prog);
});

function renderChaptersList(prog) {
  const totalChapters = CHAPTERS_DATA.length;
  const completed = Object.values(prog).filter(p => p.status === 'completed').length;

  // Progress bar
  const pct = Math.round((completed / totalChapters) * 100);
  document.getElementById('chaptersProgressBar').style.width = `${pct}%`;
  document.getElementById('chaptersProgressLabel').textContent = `${completed} / ${totalChapters} chapters completed`;

  // Chapters list
  const container = document.getElementById('chaptersListContainer');
  container.innerHTML = '';

  CHAPTERS_DATA.forEach((ch, index) => {
    const s = prog[ch.id] || { status: 'locked', quizScore: null, attempts: 0 };
    const isCompleted = s.status === 'completed';
    const isLocked = s.status === 'locked';

    let badgeClass, badgeText, statusIcon;
    if (isCompleted) {
      badgeClass = 'badge-done'; badgeText = '✅ Completed'; statusIcon = '✅';
    } else if (isLocked) {
      badgeClass = 'badge-locked'; badgeText = '🔒 Locked'; statusIcon = '🔒';
    } else {
      badgeClass = 'badge-unlocked'; badgeText = '▶️ Available'; statusIcon = '▶️';
    }

    const diffClass = ch.difficulty === 'Beginner' ? 'diff-beginner' : 'diff-intermediate';
    const scoreText = s.quizScore !== null ? `Quiz Score: ${s.quizScore}%` : '';
    const attemptsText = s.attempts > 0 ? ` (${s.attempts} attempt${s.attempts > 1 ? 's' : ''})` : '';

    const item = document.createElement('div');
    item.className = `cl-item ${isLocked ? 'locked' : isCompleted ? 'completed' : 'unlocked'}`;
    item.innerHTML = `
      <div class="cl-num">${isCompleted ? '✓' : ch.id}</div>
      <div class="cl-body">
        <div class="cl-title">${ch.icon} Chapter ${ch.id}: ${ch.title}</div>
        <div class="cl-overview">${ch.overview}</div>
        <div style="margin-top:8px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
          <span class="ch-difficulty ${diffClass}">${ch.difficulty}</span>
          <span style="font-size:0.75rem;color:var(--text-3);">${ch.sections.length} sections</span>
          ${ch.video ? `<span class="ch-video-tag" title="Includes Video Masterclass (${ch.video.duration})">🎬 ${ch.video.duration}</span>` : ''}
          ${scoreText ? `<span class="cl-score">${scoreText}${attemptsText}</span>` : ''}
        </div>
      </div>
      <div class="cl-right">
        <span class="cl-badge ${badgeClass}">${badgeText}</span>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end;">
          ${!isLocked && ch.video ? `<button class="btn-video-preview" onclick="event.stopPropagation(); openVideoModal(${ch.id})" title="Watch Video Masterclass">🎬 Video</button>` : ''}
          ${!isLocked ? `<button class="btn-primary" style="padding:8px 18px;font-size:0.8rem;" onclick="openChapter(${ch.id})">${isCompleted ? 'Review' : 'Start'} →</button>` : ''}
        </div>
      </div>
    `;

    if (!isLocked) {
      item.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') openChapter(ch.id);
      });
    }

    container.appendChild(item);

    // Separator arrow between locked and unlocked
    if (index < CHAPTERS_DATA.length - 1) {
      const nextS = prog[ch.id + 1] || {};
      if (!isLocked && nextS.status === 'locked') {
        const sep = document.createElement('div');
        sep.style.cssText = 'text-align:center;color:var(--text-3);font-size:0.8rem;padding:4px;';
        sep.textContent = '— Complete quiz to unlock next chapter —';
        container.appendChild(sep);
      }
    }
  });
}

function openChapter(id) {
  window.location.href = `learn.html?chapter=${id}`;
}

/* ── Video Modal Management ── */
let activeModalChapterId = null;

function openVideoModal(chId) {
  const ch = getChapterById(chId);
  if (!ch || !ch.video) return;

  activeModalChapterId = chId;

  const overlay = document.getElementById('videoModalOverlay');
  const iframe = document.getElementById('vmIframe');
  const title = document.getElementById('vmChapterTitle');
  const videoName = document.getElementById('vmVideoName');
  const meta = document.getElementById('vmVideoMeta');
  const ytLink = document.getElementById('vmYtLink');

  if (title) title.textContent = `Ch.${ch.id}: ${ch.title}`;
  if (videoName) videoName.textContent = ch.video.title;
  if (meta) meta.textContent = `By ${ch.video.channel} • ⏱️ ${ch.video.duration}`;
  if (ytLink) ytLink.href = ch.video.url;

  if (iframe) {
    iframe.src = `https://www.youtube-nocookie.com/embed/${ch.video.id}?autoplay=1&rel=0&modestbranding=1`;
  }

  if (overlay) {
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeVideoModal() {
  const overlay = document.getElementById('videoModalOverlay');
  const iframe = document.getElementById('vmIframe');

  if (iframe) {
    // Clear src to stop video audio
    iframe.src = '';
  }

  if (overlay) {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  activeModalChapterId = null;
}

function handleVideoModalBackdrop(event) {
  if (event.target.id === 'videoModalOverlay') {
    closeVideoModal();
  }
}

function openChapterFromModal() {
  if (activeModalChapterId) {
    const id = activeModalChapterId;
    closeVideoModal();
    openChapter(id);
  }
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('videoModalOverlay');
    if (overlay && !overlay.classList.contains('hidden')) {
      closeVideoModal();
    }
  }
});

