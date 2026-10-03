/**
 * QuantNexus – Theme Manager
 * SIH 26140 Quantum Computing Learning Platform
 *
 * Handles persistent Light and Dark theme switching across all platform pages.
 * Supports zero-FOUC (Flash of Unstyled Content) initialization and
 * dynamic theme toggle injection into navigation headers.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'qn_theme';
  const DEFAULT_THEME = 'dark';

  /**
   * Retrieves the currently active theme ('dark' | 'light').
   */
  function getTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Check OS preference as fallback
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return DEFAULT_THEME;
  }

  /**
   * Sets the theme on the <html> element and stores the choice.
   * @param {'dark'|'light'} theme
   */
  function setTheme(theme) {
    const validTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', validTheme);
    localStorage.setItem(STORAGE_KEY, validTheme);

    // Update all theme toggle buttons present in the DOM
    updateToggleButtons(validTheme);

    // Dispatch custom event for pages or canvas that might need to react
    window.dispatchEvent(new CustomEvent('qn_themechange', { detail: { theme: validTheme } }));
  }

  /**
   * Toggles between dark and light themes.
   */
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || getTheme();
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }

  /**
   * Updates visual state of all theme toggle buttons.
   * @param {'dark'|'light'} currentTheme
   */
  function updateToggleButtons(currentTheme) {
    const isDark = currentTheme === 'dark';
    const buttons = document.querySelectorAll('.theme-toggle-btn, #themeToggleBtn');

    buttons.forEach((btn) => {
      btn.setAttribute('aria-pressed', isDark ? 'false' : 'true');
      btn.setAttribute('title', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');

      const icon = btn.querySelector('.theme-icon');
      const text = btn.querySelector('.theme-label');

      if (icon) {
        icon.innerHTML = isDark
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      }
      if (text) {
        text.textContent = isDark ? 'Dark' : 'Light';
      }
    });
  }

  /**
   * Creates a theme toggle button element.
   * @param {'dark'|'light'} currentTheme
   * @returns {HTMLButtonElement}
   */
  function createThemeButton(currentTheme) {
    const isDark = currentTheme === 'dark';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle-btn';
    btn.id = 'themeToggleBtn';
    btn.setAttribute('aria-label', 'Toggle light/dark theme');
    btn.setAttribute('title', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
    btn.onclick = toggleTheme;

    const iconSvg = isDark
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

    btn.innerHTML = `
      <span class="theme-icon" aria-hidden="true">${iconSvg}</span>
      <span class="theme-label">${isDark ? 'Dark' : 'Light'}</span>
    `;

    return btn;
  }

  /**
   * Automatically initializes theme toggles in topbar or auth pages.
   */
  function initThemeUI() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || getTheme();

    // 1. If an explicit #themeToggleBtn already exists, just update it
    const existing = document.getElementById('themeToggleBtn');
    if (existing) {
      existing.onclick = toggleTheme;
      updateToggleButtons(currentTheme);
      return;
    }

    // 2. Check for .topbar-right in app pages
    const topbarRight = document.querySelector('.topbar-right');
    if (topbarRight) {
      const btn = createThemeButton(currentTheme);
      // Prepend before badges or append
      topbarRight.insertBefore(btn, topbarRight.firstChild);
      return;
    }

    // 3. For auth page (index.html), add floating top-right toggle
    if (document.body && document.body.classList.contains('auth-page')) {
      let authToggleWrap = document.querySelector('.auth-theme-wrapper');
      if (!authToggleWrap) {
        authToggleWrap = document.createElement('div');
        authToggleWrap.className = 'auth-theme-wrapper';
        document.body.appendChild(authToggleWrap);
      }
      authToggleWrap.innerHTML = '';
      const btn = createThemeButton(currentTheme);
      authToggleWrap.appendChild(btn);
    }
  }

  // ── Immediate Execution: Apply theme immediately before render to prevent flash ──
  const initialTheme = getTheme();
  document.documentElement.setAttribute('data-theme', initialTheme);

  // Hook into DOMContentLoaded for UI elements
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeUI);
  } else {
    initThemeUI();
  }

  // Listen to OS system color-scheme changes if no explicit manual preference was stored
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Expose to window for global access
  window.QN_THEME = {
    getTheme,
    setTheme,
    toggleTheme,
    initThemeUI
  };
  window.toggleTheme = toggleTheme;
})();
