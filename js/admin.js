/**
 * QuantNexus – Admin Panel Controller
 * Handles user and role administration, quantum backend telemetry,
 * platform configuration, and real-time audit event logging.
 */

let activeAdminTab = 'users';
let allAdminUsers = [];

const DEFAULT_AUDIT_LOGS = [
  { id: 'LOG-108', time: 'Just now', type: 'SIMULATION', message: 'Comparative simulation executed across Qiskit Aer, PennyLane, and Cirq (1024 shots).' },
  { id: 'LOG-107', time: '4 mins ago', type: 'AUTH', message: 'User login session verified: demo@quantnexus.in (Role: Student).' },
  { id: 'LOG-106', time: '12 mins ago', type: 'CURRICULUM', message: 'Chapter 4 Quiz completed with score 90% by student: demo@quantnexus.in.' },
  { id: 'LOG-105', time: '28 mins ago', type: 'ROLE_UPDATE', message: 'User role updated: prof.alok@quantnexus.in granted INSTRUCTOR permissions.' },
  { id: 'LOG-104', time: '1 hour ago', type: 'SIMULATION', message: 'Quantum circuit executed on PennyLane default.qubit (1024 shots, 8ms).' },
  { id: 'LOG-103', time: '2 hours ago', type: 'SYSTEM', message: 'Platform health diagnostics passed: 100% operational across all simulation modules.' },
  { id: 'LOG-102', time: 'Yesterday', type: 'CIRCUIT_LAB', message: 'Circuit design "Bell State Entangler" saved to storage.' },
  { id: 'LOG-101', time: '2 days ago', type: 'ADMIN', message: 'System initialization: 20 learning chapters and 4 simulation backends loaded.' }
];

document.addEventListener('DOMContentLoaded', () => {
  // Session check - strictly allow admin only
  const user = requireAuth(['admin']);
  if (!user) return;

  loadAdminUsers();
  renderAdminUsersTable();
  renderBackendsTelemetry();
  renderAuditLogs();
});

// ── Tab Navigation ──
function switchAdminTab(tabKey) {
  activeAdminTab = tabKey;
  document.querySelectorAll('.inst-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.admin-tab-panel').forEach(p => p.classList.add('hidden'));

  const activeBtn = document.getElementById(`tabAdmin${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`);
  const activePanel = document.getElementById(`panelAdmin${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`);

  if (activeBtn) activeBtn.classList.add('active');
  if (activePanel) activePanel.classList.remove('hidden');

  // Sync sidebar active state
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.getElementById(`navAdmin${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`);
  if (activeNav) activeNav.classList.add('active');
}

// ── User Management ──
function loadAdminUsers() {
  const seed = [
    { id: 'USR-01', name: 'Chief Admin', email: 'admin@quantnexus.in', role: 'admin', status: 'Active', created: '2026-08-01' },
    { id: 'USR-02', name: 'Prof. Alok Sharma', email: 'instructor@quantnexus.in', role: 'instructor', status: 'Active', created: '2026-08-10' },
    { id: 'USR-03', name: 'Demo Student', email: 'demo@quantnexus.in', role: 'student', status: 'Active', created: '2026-09-01' },
    { id: 'USR-04', name: 'Priya Sharma', email: 'priya.sharma@iit.ac.in', role: 'student', status: 'Active', created: '2026-09-10' },
    { id: 'USR-05', name: 'Rahul Verma', email: 'rahul.verma@quantum.edu', role: 'student', status: 'Active', created: '2026-09-12' },
    { id: 'USR-06', name: 'Ananya Patel', email: 'ananya.patel@quantnexus.in', role: 'student', status: 'Active', created: '2026-09-08' },
    { id: 'USR-07', name: 'Vikram Malhotra', email: 'vikram.m@tech.in', role: 'student', status: 'Active', created: '2026-09-18' },
    { id: 'USR-08', name: 'Sneha Roy', email: 'sneha.roy@physics.org', role: 'instructor', status: 'Active', created: '2026-09-14' }
  ];

  const raw = localStorage.getItem('qn_admin_users');
  if (raw) {
    allAdminUsers = JSON.parse(raw);
  } else {
    allAdminUsers = seed;
    localStorage.setItem('qn_admin_users', JSON.stringify(seed));
  }

  const kpiEl = document.getElementById('adminKpiUsers');
  if (kpiEl) kpiEl.textContent = allAdminUsers.length;
}

function saveAdminUsers() {
  localStorage.setItem('qn_admin_users', JSON.stringify(allAdminUsers));
  const kpiEl = document.getElementById('adminKpiUsers');
  if (kpiEl) kpiEl.textContent = allAdminUsers.length;
}

function renderAdminUsersTable(filterList = null) {
  const tbody = document.getElementById('adminUsersTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const list = filterList || allAdminUsers;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--text-3);">No matching users found.</td></tr>`;
    return;
  }

  list.forEach(u => {
    const tr = document.createElement('tr');

    let badgeClass = 'role-student';
    if (u.role === 'instructor') badgeClass = 'role-instructor';
    else if (u.role === 'admin') badgeClass = 'role-admin';

    tr.innerHTML = `
      <td><span class="basis-chip">${u.id}</span></td>
      <td><strong>${u.name}</strong></td>
      <td><span class="user-email-text">${u.email}</span></td>
      <td>
        <span class="role-badge ${badgeClass}">${u.role.toUpperCase()}</span>
      </td>
      <td>
        <span class="status-pill ${u.status === 'Active' ? 'status-success' : 'status-warn'}">
          ● ${u.status}
        </span>
      </td>
      <td>
        <select class="control-select role-change-select" onchange="changeUserRole('${u.id}', this.value)" aria-label="Change role for ${u.name}">
          <option value="student" ${u.role === 'student' ? 'selected' : ''}>Student</option>
          <option value="instructor" ${u.role === 'instructor' ? 'selected' : ''}>Instructor</option>
          <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
        </select>
      </td>
      <td>
        <div class="action-btn-group">
          <button class="btn-table-action" onclick="toggleUserStatus('${u.id}')" title="Toggle active/suspended">
            ${u.status === 'Active' ? '⏸️ Suspend' : '▶️ Activate'}
          </button>
          <button class="btn-table-action" style="color:var(--danger);" onclick="deleteUser('${u.id}')" title="Delete user">
            🗑️ Delete
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filterAdminUsers() {
  const searchInput = document.getElementById('adminUserSearch');
  const roleFilter = document.getElementById('adminRoleFilter');

  const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
  const role = roleFilter ? roleFilter.value : 'all';

  const filtered = allAdminUsers.filter(u => {
    const matchesQ = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
    const matchesRole = (role === 'all') || (u.role === role);
    return matchesQ && matchesRole;
  });

  renderAdminUsersTable(filtered);
}

function changeUserRole(userId, newRole) {
  const user = allAdminUsers.find(u => u.id === userId);
  if (!user) return;

  const oldRole = user.role;
  user.role = newRole;
  saveAdminUsers();

  // If active logged-in user is modified, update session
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.email === user.email) {
    currentUser.role = newRole;
    setCurrentUser(currentUser);
  }

  addAuditLog('ROLE_CHANGE', `Admin changed role of ${user.name} (${user.email}) from ${oldRole.toUpperCase()} to ${newRole.toUpperCase()}.`);
  renderAdminUsersTable();
  alert(`✅ Updated ${user.name}'s role to ${newRole.toUpperCase()}!`);
}

function toggleUserStatus(userId) {
  const user = allAdminUsers.find(u => u.id === userId);
  if (!user) return;

  user.status = user.status === 'Active' ? 'Suspended' : 'Active';
  saveAdminUsers();
  addAuditLog('USER_STATUS', `User status changed for ${user.email}: ${user.status}`);
  renderAdminUsersTable();
}

function deleteUser(userId) {
  const user = allAdminUsers.find(u => u.id === userId);
  if (!user) return;

  if (user.email === 'admin@quantnexus.in') {
    alert('Cannot delete the root administrator account.');
    return;
  }

  if (confirm(`Are you sure you want to permanently delete user "${user.name}" (${user.email})?`)) {
    allAdminUsers = allAdminUsers.filter(u => u.id !== userId);
    saveAdminUsers();
    addAuditLog('USER_DELETE', `User account deleted: ${user.email}`);
    renderAdminUsersTable();
  }
}

function openAddUserModal() {
  const modal = document.getElementById('addUserModal');
  if (modal) modal.classList.remove('hidden');
}

function closeAddUserModal() {
  const modal = document.getElementById('addUserModal');
  if (modal) modal.classList.add('hidden');
}

function handleAdminCreateUser(e) {
  e.preventDefault();
  const name = document.getElementById('newUserName').value.trim();
  const email = document.getElementById('newUserEmail').value.trim().toLowerCase();
  const role = document.getElementById('newUserRole').value;

  if (allAdminUsers.find(u => u.email === email)) {
    alert('A user with this email already exists.');
    return;
  }

  const newUser = {
    id: `USR-${allAdminUsers.length + 1 < 10 ? '0' : ''}${allAdminUsers.length + 1}`,
    name,
    email,
    role,
    status: 'Active',
    created: new Date().toISOString().split('T')[0]
  };

  allAdminUsers.unshift(newUser);
  saveAdminUsers();
  addAuditLog('USER_CREATE', `Created new ${role.toUpperCase()} account: ${email} (${name}).`);

  closeAddUserModal();
  renderAdminUsersTable();
  alert(`✅ Created user account for ${name} (${role.toUpperCase()})!`);
}

// ── Quantum Backends Telemetry ──
function renderBackendsTelemetry() {
  const grid = document.getElementById('backendsTelemetryGrid');
  if (!grid) return;

  const isQbraidReady = localStorage.getItem('quantnexus_qbraid_api_key') && localStorage.getItem('quantnexus_qbraid_api_key').length >= 10;

  const backends = [
    {
      name: 'IBM Qiskit Aer',
      id: 'qiskit_aer',
      type: 'Local C++ / Statevector WASM',
      version: '1.1.0 / 0.14.2',
      status: 'ONLINE',
      simCount: 682,
      avgLatency: '11.8 ms',
      endianness: 'Little-Endian (|qN-1...q0⟩)',
      color: '#8b5cf6'
    },
    {
      name: 'Xanadu PennyLane',
      id: 'pennylane',
      type: 'Local Python Analytic / default.qubit',
      version: '0.36.0',
      status: 'ONLINE',
      simCount: 419,
      avgLatency: '7.4 ms',
      endianness: 'Big-Endian (|q0...qN-1⟩)',
      color: '#06b6d4'
    },
    {
      name: 'Google Cirq',
      id: 'cirq',
      type: 'Local Wavefunction Monte-Carlo',
      version: '1.4.0',
      status: 'ONLINE',
      simCount: 327,
      avgLatency: '11.2 ms',
      endianness: 'Big-Endian (LineQubit)',
      color: '#f59e0b'
    },
    {
      name: 'qBraid Quantum Cloud',
      id: 'qbraid',
      type: 'Remote Managed Cloud Gateway (AWS/Rigetti/IBM)',
      version: 'qBraid-SDK 0.8.2',
      status: isQbraidReady ? 'ONLINE (Gateway Connected)' : 'CONFIGURABLE (Unconfigured)',
      simCount: isQbraidReady ? 14 : 0,
      avgLatency: isQbraidReady ? '142 ms' : 'N/A',
      endianness: 'Unified OpenQASM / QIR Schema',
      color: '#10b981'
    }
  ];

  grid.innerHTML = '';
  backends.forEach(b => {
    const card = document.createElement('div');
    card.className = 'backend-telemetry-card';

    const isOnline = b.status.includes('ONLINE');

    card.innerHTML = `
      <div class="backend-tel-top">
        <div class="backend-tel-title-wrap">
          <span class="backend-dot" style="background:${b.color};"></span>
          <h4>${b.name}</h4>
        </div>
        <span class="status-pill ${isOnline ? 'status-success' : 'status-warn'}">
          ● ${b.status}
        </span>
      </div>
      <div class="backend-tel-sub">${b.type}</div>
      <div class="backend-tel-metrics">
        <div class="tel-metric-box">
          <span class="t-lbl">Total Runs</span>
          <span class="t-val">${b.simCount.toLocaleString()}</span>
        </div>
        <div class="tel-metric-box">
          <span class="t-lbl">Avg. Latency</span>
          <span class="t-val">${b.avgLatency}</span>
        </div>
        <div class="tel-metric-box">
          <span class="t-lbl">Framework</span>
          <span class="t-val" style="font-size:0.75rem;">${b.version}</span>
        </div>
      </div>
      <div class="backend-tel-footer">
        <small><strong>Convention:</strong> ${b.endianness}</small>
      </div>
    `;
    grid.appendChild(card);
  });
}

function pingAllBackends() {
  renderBackendsTelemetry();
  alert('🔄 All local and cloud backend telemetry refreshed.');
}

function saveBackendPolicy() {
  const maxShots = document.getElementById('adminMaxShots').value;
  const defBackend = document.getElementById('adminDefaultBackend').value;
  localStorage.setItem('qn_max_shots', maxShots);
  localStorage.setItem('qn_default_backend', defBackend);
  addAuditLog('POLICY_UPDATE', `Simulation policy updated: Max shots=${maxShots}, Default backend=${defBackend}`);
  alert('✅ Global simulation engine policy saved.');
}

// ── Platform Settings & Maintenance ──
function savePlatformSettings() {
  const title = document.getElementById('platformTitle').value;
  const reg = document.getElementById('regToggle').value;
  localStorage.setItem('qn_platform_title', title);
  localStorage.setItem('qn_allow_registration', reg);
  addAuditLog('CONFIG_UPDATE', `Platform settings updated: Title="${title}", Registration=${reg}`);
  alert('✅ Platform settings saved successfully.');
}

function exportFullSystemBackup() {
  const backup = {
    platform: 'QuantNexus – SIH 26140',
    exportTimestamp: new Date().toISOString(),
    users: allAdminUsers,
    cohortStudents: getSeedStudents(),
    auditLogs: getAuditLogs(),
    storageDump: { ...localStorage }
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `QuantNexus_Full_System_Backup_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function resetToFactoryDataset() {
  if (confirm('Restore initial demo dataset? This will reseed demo accounts, progress, and audit logs.')) {
    localStorage.removeItem('qn_cohort_students');
    localStorage.removeItem('qn_admin_users');
    localStorage.removeItem('qn_instructor_challenges');
    localStorage.removeItem('qn_audit_logs');

    loadAdminUsers();
    renderAdminUsersTable();
    renderBackendsTelemetry();
    renderAuditLogs();
    alert('✅ Factory demo state restored successfully.');
  }
}

function clearPlatformLocalStorage() {
  if (confirm('⚠️ WARNING: This will clear all QuantNexus local storage data and log you out. Continue?')) {
    localStorage.clear();
    window.location.href = 'index.html';
  }
}

// ── Audit Logs ──
function getAuditLogs() {
  const raw = localStorage.getItem('qn_audit_logs');
  if (raw) return JSON.parse(raw);
  localStorage.setItem('qn_audit_logs', JSON.stringify(DEFAULT_AUDIT_LOGS));
  return DEFAULT_AUDIT_LOGS;
}

function addAuditLog(type, message) {
  const logs = getAuditLogs();
  const newLog = {
    id: `LOG-${Date.now().toString().slice(-4)}`,
    time: 'Just now',
    type,
    message
  };
  logs.unshift(newLog);
  if (logs.length > 50) logs.pop();
  localStorage.setItem('qn_audit_logs', JSON.stringify(logs));
  renderAuditLogs();
}

function renderAuditLogs() {
  const container = document.getElementById('auditLogContainer');
  if (!container) return;

  const logs = getAuditLogs();
  container.innerHTML = '';

  logs.forEach(log => {
    const item = document.createElement('div');
    item.className = 'audit-log-item';

    let tagColor = 'var(--primary-light)';
    if (log.type === 'AUTH') tagColor = '#38bdf8';
    else if (log.type === 'SIMULATION') tagColor = '#a78bfa';
    else if (log.type === 'ROLE_CHANGE') tagColor = '#f59e0b';
    else if (log.type === 'USER_DELETE') tagColor = '#ef4444';

    item.innerHTML = `
      <div class="log-left">
        <span class="basis-chip" style="font-size:0.7rem;">${log.id}</span>
        <span class="meta-pill" style="color:${tagColor};font-size:0.7rem;font-weight:700;">${log.type}</span>
        <span class="log-msg">${log.message}</span>
      </div>
      <div class="log-time">${log.time}</div>
    `;
    container.appendChild(item);
  });
}

function clearAuditLogs() {
  localStorage.setItem('qn_audit_logs', JSON.stringify([]));
  renderAuditLogs();
}

// Expose handlers globally
window.switchAdminTab = switchAdminTab;
window.filterAdminUsers = filterAdminUsers;
window.changeUserRole = changeUserRole;
window.toggleUserStatus = toggleUserStatus;
window.deleteUser = deleteUser;
window.openAddUserModal = openAddUserModal;
window.closeAddUserModal = closeAddUserModal;
window.handleAdminCreateUser = handleAdminCreateUser;
window.pingAllBackends = pingAllBackends;
window.saveBackendPolicy = saveBackendPolicy;
window.savePlatformSettings = savePlatformSettings;
window.exportFullSystemBackup = exportFullSystemBackup;
window.resetToFactoryDataset = resetToFactoryDataset;
window.clearPlatformLocalStorage = clearPlatformLocalStorage;
window.clearAuditLogs = clearAuditLogs;
