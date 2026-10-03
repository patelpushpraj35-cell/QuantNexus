/**
 * QuantNexus – Auth & Role Management Module
 * Handles login, registration, role-based sessions (Student, Instructor, Admin),
 * cohort management, and seamless role switching.
 */

const DEMO_ACCOUNTS = {
  student: {
    name: 'Demo Student',
    email: 'demo@quantnexus.in',
    password: 'demo1234',
    role: 'student'
  },
  instructor: {
    name: 'Prof. Alok Sharma',
    email: 'instructor@quantnexus.in',
    password: 'inst1234',
    role: 'instructor'
  },
  admin: {
    name: 'Chief Admin',
    email: 'admin@quantnexus.in',
    password: 'admin1234',
    role: 'admin'
  }
};

const DEMO_USER = DEMO_ACCOUNTS.student;

/* ── Storage helpers ── */
function getUsers() {
  return JSON.parse(localStorage.getItem('qn_users') || '[]');
}
function saveUsers(users) {
  localStorage.setItem('qn_users', JSON.stringify(users));
}
function getCurrentUser() {
  const raw = localStorage.getItem('qn_current_user');
  if (!raw) return null;
  const u = JSON.parse(raw);
  if (!u.role) u.role = 'student';
  return u;
}
function setCurrentUser(user) {
  if (!user.role) user.role = 'student';
  localStorage.setItem('qn_current_user', JSON.stringify(user));
}
function clearCurrentUser() {
  localStorage.removeItem('qn_current_user');
}

/* ── Student Cohort Seed Data (for Instructor & Admin Panels) ── */
function getSeedStudents() {
  const raw = localStorage.getItem('qn_cohort_students');
  if (raw) return JSON.parse(raw);

  const initial = [
    {
      id: 'STU-101',
      name: 'Demo Student',
      email: 'demo@quantnexus.in',
      role: 'student',
      enrolledDate: '2026-09-15',
      chaptersCompleted: 4,
      currentChapter: 5,
      avgScore: 82,
      lastActive: 'Just now',
      status: 'Active',
      assignedChallenges: ['Bell State Generation', 'Phase Kickback Verification']
    },
    {
      id: 'STU-102',
      name: 'Priya Sharma',
      email: 'priya.sharma@iit.ac.in',
      role: 'student',
      enrolledDate: '2026-09-10',
      chaptersCompleted: 18,
      currentChapter: 19,
      avgScore: 94,
      lastActive: '2 hours ago',
      status: 'Active',
      assignedChallenges: ['3-Qubit GHZ Simulation', 'Deutsch-Jozsa Algorithm']
    },
    {
      id: 'STU-103',
      name: 'Rahul Verma',
      email: 'rahul.verma@quantum.edu',
      role: 'student',
      enrolledDate: '2026-09-12',
      chaptersCompleted: 12,
      currentChapter: 13,
      avgScore: 78,
      lastActive: 'Yesterday',
      status: 'Active',
      assignedChallenges: ['SWAP Gate Synthesizer']
    },
    {
      id: 'STU-104',
      name: 'Ananya Patel',
      email: 'ananya.patel@quantnexus.in',
      role: 'student',
      enrolledDate: '2026-09-08',
      chaptersCompleted: 20,
      currentChapter: 20,
      avgScore: 98,
      lastActive: 'Today',
      status: 'Completed',
      assignedChallenges: ['Full Teleportation Protocol', 'Grover Search 2-Qubit']
    },
    {
      id: 'STU-105',
      name: 'Vikram Malhotra',
      email: 'vikram.m@tech.in',
      role: 'student',
      enrolledDate: '2026-09-18',
      chaptersCompleted: 7,
      currentChapter: 8,
      avgScore: 72,
      lastActive: '3 days ago',
      status: 'Needs Help',
      assignedChallenges: ['Hadamard Superposition']
    },
    {
      id: 'STU-106',
      name: 'Sneha Roy',
      email: 'sneha.roy@physics.org',
      role: 'student',
      enrolledDate: '2026-09-14',
      chaptersCompleted: 15,
      currentChapter: 16,
      avgScore: 90,
      lastActive: 'Today',
      status: 'Active',
      assignedChallenges: ['Quantum Key Distribution BB84']
    }
  ];
  localStorage.setItem('qn_cohort_students', JSON.stringify(initial));
  return initial;
}

function saveCohortStudents(students) {
  localStorage.setItem('qn_cohort_students', JSON.stringify(students));
}

/* ── Progress helpers ── */
function getProgress(email) {
  const key = 'qn_progress_' + email;
  const raw = localStorage.getItem(key);
  const totalChapters = (typeof CHAPTERS_DATA !== 'undefined' && CHAPTERS_DATA.length) ? CHAPTERS_DATA.length : 20;
  let prog = raw ? JSON.parse(raw) : {};

  let modified = false;
  for (let i = 1; i <= totalChapters; i++) {
    if (!prog[i]) {
      const prevDone = i > 1 && prog[i - 1] && prog[i - 1].status === 'completed';
      prog[i] = {
        status: i === 1 ? 'unlocked' : (prevDone ? 'unlocked' : 'locked'),
        quizScore: null,
        attempts: 0,
        sectionsVisited: []
      };
      modified = true;
    }
  }
  if (!raw || modified) {
    saveProgress(email, prog);
  }
  return prog;
}
function saveProgress(email, prog) {
  localStorage.setItem('qn_progress_' + email, JSON.stringify(prog));
}

/* ── Role-Based UI & Navigation Enforcement ── */
function applyRoleBasedUI(user) {
  if (!user) return;
  const role = user.role || 'student';

  // Set body attribute for CSS-level role enforcement
  if (document.body) {
    document.body.dataset.userRole = role;
  }

  // 1. User Profile & Role Badge in Sidebar
  const nameEl = document.getElementById('sidebarName');
  const avatarEl = document.getElementById('sidebarAvatar');
  const roleEl = document.querySelector('.user-role');

  if (nameEl) nameEl.textContent = user.name;
  if (avatarEl) avatarEl.textContent = user.name.charAt(0).toUpperCase();
  if (roleEl) {
    const roleCapitalized = role === 'admin' ? 'Administrator' : (role === 'instructor' ? 'Instructor' : 'Student');
    roleEl.innerHTML = `<span class="role-badge role-${role}">${roleCapitalized}</span>`;
  }

  // 2. Return Portal Button (Visible in Topbar when Instructor/Admin previews Learner Portal)
  const topbarRight = document.querySelector('.topbar-right');
  const path = window.location.pathname.toLowerCase();
  const isProtectedAdminOrInst = path.includes('instructor') || path.includes('admin');

  const existingReturnBtn = document.getElementById('topbarPortalReturnBtn');
  if (existingReturnBtn) existingReturnBtn.remove();

  if (!isProtectedAdminOrInst && topbarRight) {
    if (role === 'instructor') {
      const btn = document.createElement('a');
      btn.id = 'topbarPortalReturnBtn';
      btn.href = 'instructor.html';
      btn.className = 'btn-secondary';
      btn.style.cssText = 'border-color:rgba(124,58,237,0.5);color:#c4b5fd;background:rgba(124,58,237,0.15);padding:6px 12px;font-size:0.8rem;text-decoration:none;display:inline-flex;align-items:center;gap:6px;border-radius:8px;';
      btn.innerHTML = '<span>Back to Instructor Panel →</span>';
      topbarRight.prepend(btn);
    } else if (role === 'admin') {
      const btn = document.createElement('a');
      btn.id = 'topbarPortalReturnBtn';
      btn.href = 'admin.html';
      btn.className = 'btn-secondary';
      btn.style.cssText = 'border-color:rgba(245,158,11,0.5);color:#fbbf24;background:rgba(245,158,11,0.15);padding:6px 12px;font-size:0.8rem;text-decoration:none;display:inline-flex;align-items:center;gap:6px;border-radius:8px;';
      btn.innerHTML = '<span>Back to Admin Panel →</span>';
      topbarRight.prepend(btn);
    }
  }
}

/* ── Session Guard & Role-Based Access Control (RBAC) ── */
function requireAuth(allowedRoles = null) {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'index.html';
    return null;
  }

  // Apply role visibility constraints
  applyRoleBasedUI(user);

  // Enforce role permission boundaries
  if (allowedRoles && Array.isArray(allowedRoles) && !allowedRoles.includes(user.role)) {
    const userRoleStr = (user.role || 'student').toUpperCase();
    const allowedStr = allowedRoles.map(r => r.toUpperCase()).join(' or ');
    alert(`Access Restricted!\n\nThis section requires ${allowedStr} permissions.\nYou are currently authenticated as "${userRoleStr}".\n\nRedirecting to your authorized home page...`);

    if (user.role === 'admin') {
      window.location.href = 'admin.html';
    } else if (user.role === 'instructor') {
      window.location.href = 'instructor.html';
    } else {
      window.location.href = 'dashboard.html';
    }
    return null;
  }

  return user;
}

/* ── 1-Click Role Login for index.html ── */
function quickRoleLogin(role) {
  const acct = DEMO_ACCOUNTS[role] || DEMO_ACCOUNTS.student;
  setCurrentUser({ name: acct.name, email: acct.email, role: acct.role });
  if (role === 'instructor') window.location.href = 'instructor.html';
  else if (role === 'admin') window.location.href = 'admin.html';
  else window.location.href = 'dashboard.html';
}

/* ── Logout ── */
function handleLogout() {
  clearCurrentUser();
  window.location.href = 'index.html';
}

/* ── Sidebar toggle ── */
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  if (sb) sb.classList.toggle('open');
}
document.addEventListener('click', (e) => {
  const sb = document.getElementById('sidebar');
  const toggle = document.querySelector('.sidebar-toggle');
  if (sb && sb.classList.contains('open') && !sb.contains(e.target) && e.target !== toggle) {
    sb.classList.remove('open');
  }
});

/* ── Auth page logic (index.html) ── */
function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  if (!loginForm) return;

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
  } else {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    loginTab.classList.remove('active');
    registerTab.classList.add('active');
  }
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;
  const errEl = document.getElementById('loginError');
  const btn = document.getElementById('loginBtn');

  errEl.textContent = '';
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Signing in...';

  setTimeout(() => {
    // 1. Check Demo Accounts (Student, Instructor, Admin)
    for (const roleKey in DEMO_ACCOUNTS) {
      const acct = DEMO_ACCOUNTS[roleKey];
      if (email === acct.email && password === acct.password) {
        // Respect any role modification performed by administrator in Admin Panel
        const adminUsers = JSON.parse(localStorage.getItem('qn_admin_users') || '[]');
        const override = adminUsers.find(u => u.email === email);
        const effectiveRole = (override && override.role) ? override.role : acct.role;

        setCurrentUser({ name: acct.name, email: acct.email, role: effectiveRole });
        if (effectiveRole === 'instructor') window.location.href = 'instructor.html';
        else if (effectiveRole === 'admin') window.location.href = 'admin.html';
        else window.location.href = 'dashboard.html';
        return;
      }
    }

    // 2. Check registered users
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const adminUsers = JSON.parse(localStorage.getItem('qn_admin_users') || '[]');
      const override = adminUsers.find(u => u.email === email);
      const effectiveRole = (override && override.role) ? override.role : (user.role || 'student');

      setCurrentUser({ name: user.name, email: user.email, role: effectiveRole });
      if (effectiveRole === 'instructor') window.location.href = 'instructor.html';
      else if (effectiveRole === 'admin') window.location.href = 'admin.html';
      else window.location.href = 'dashboard.html';
    } else {
      errEl.textContent = 'Invalid email or password. Please try again.';
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Sign In';
    }
  }, 500);
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const password = document.getElementById('regPassword').value;
  const roleSelect = document.getElementById('regRole');
  const role = roleSelect ? roleSelect.value : 'student';
  const errEl = document.getElementById('registerError');
  const btn = document.getElementById('registerBtn');

  errEl.textContent = '';
  if (name.length < 2) { errEl.textContent = 'Name must be at least 2 characters.'; return; }
  if (password.length < 6) { errEl.textContent = 'Password must be at least 6 characters.'; return; }

  btn.disabled = true;
  btn.querySelector('span').textContent = 'Creating account...';

  setTimeout(() => {
    for (const key in DEMO_ACCOUNTS) {
      if (email === DEMO_ACCOUNTS[key].email) {
        errEl.textContent = 'This email is reserved for demo accounts.';
        btn.disabled = false;
        btn.querySelector('span').textContent = 'Create Account';
        return;
      }
    }

    const users = getUsers();
    if (users.find(u => u.email === email)) {
      errEl.textContent = 'An account with this email already exists.';
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Create Account';
      return;
    }

    users.push({ name, email, password, role });
    saveUsers(users);
    setCurrentUser({ name, email, role });

    if (role === 'instructor') window.location.href = 'instructor.html';
    else if (role === 'admin') window.location.href = 'admin.html';
    else window.location.href = 'dashboard.html';
  }, 600);
}

// Expose helpers globally
window.DEMO_ACCOUNTS = DEMO_ACCOUNTS;
window.getSeedStudents = getSeedStudents;
window.saveCohortStudents = saveCohortStudents;
window.quickRoleLogin = quickRoleLogin;
window.requireAuth = requireAuth;
window.getCurrentUser = getCurrentUser;
window.applyRoleBasedUI = applyRoleBasedUI;
window.handleLogout = handleLogout;
