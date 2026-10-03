/**
 * QuantNexus – Quanta AI Doubt Assistant & Help Desk
 * SIH 26140 Online Learning Platform
 *
 * Floating AI chatbot and Help Desk powered by Gemini API.
 * Provides instant quantum doubt resolution and platform help
 * completely without emojis.
 */

/* ── Config ── */
const QUANTA_CONFIG = {
  get apiKey() {
    return (typeof localStorage !== 'undefined' && localStorage.getItem('qn_gemini_api_key')) ||
           (typeof window !== 'undefined' && window.GEMINI_API_KEY) ||
           '';
  },
  model:  'gemini-2.0-flash',
  apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/',
  botName: 'Quanta',
  botImage: 'quanta-bot.png',
  maxHistory: 20   // keep last N turns for context
};

/* ── System Prompt (Strictly NO Emojis) ── */
const QUANTA_SYSTEM_PROMPT = `You are Quanta, a precise, expert academic teaching assistant for QuantNexus — an interactive quantum computing learning platform built for India's Smart India Hackathon 2026 (SIH 26140).

CRITICAL FORMATTING INSTRUCTION:
- DO NOT USE ANY EMOJIS UNDER ANY CIRCUMSTANCES. No smiley faces, no symbols like rockets, fire, brain, lightbulbs, or checkmarks.
- Keep tone professional, academic, encouraging, and clear.
- Use clean Markdown formatting: bold for terms, backticks for code and mathematical notations, bulleted lists for steps.

PLATFORM CURRICULUM — QuantNexus covers:
- 20 structured curriculum chapters from fundamentals to advanced quantum computing
- Core subjects: Qubits, Superposition, Entanglement, Quantum Gates (Pauli X, Y, Z, Hadamard, Phase, T, CNOT, SWAP, Toffoli), Bloch Sphere, Measurement, Bell States, Quantum Algorithms (Deutsch-Jozsa, Grover's, Shor's, QFT, VQE, QAOA), Quantum Error Correction (Stabilizer, Surface codes), Quantum Cryptography (BB84, QKD), Quantum Hardware.
- Circuit Lab: Graphical drag-and-drop circuit designer and Qiskit code editor with statevector simulation.
- Simulation Lab: Industrial simulation across Qiskit Aer, PennyLane, Cirq, and qBraid Quantum Cloud.
- Coding Challenges: 10 auto-graded Qiskit challenges with live test validation.

DOUBT RESOLUTION GUIDELINES:
- Directly answer the student's question or doubt with accurate physics and mathematical rigor.
- Provide clear Qiskit Python snippets whenever relevant.
- Explain concepts using concise, intuitive physical analogies.
- Keep responses focused (typically 150 to 300 words).`;

/* ── Suggested Quick Doubt Questions (No Emojis) ── */
const QUANTA_SUGGESTIONS = [
  'What is superposition?',
  'Explain Bell states',
  'Help with Grover search',
  'What is a Hadamard gate?',
  'Qiskit code for CNOT',
  'How does measurement collapse states?'
];

/* ── Common Quantum FAQs for Help Desk ── */
const QUANTA_FAQS = [
  {
    q: 'How does quantum measurement collapse superposition?',
    a: 'According to the Born rule, a qubit in state |ψ⟩ = α|0⟩ + β|1⟩ collapses upon projective measurement onto basis state |0⟩ with probability |α|² or |1⟩ with probability |β|². The phase information is lost.'
  },
  {
    q: 'Why does CNOT create entanglement?',
    a: 'When the control qubit is put in superposition (e.g. via an H gate) before applying CNOT to target qubit |0⟩, the joint state evolves into (|00⟩ + |11⟩)/√2. This state cannot be factored into independent qubit states.'
  },
  {
    q: 'Why do simulation shot results vary slightly across runs?',
    a: 'Quantum simulators sample measurements probabilistically over a finite number of shots (e.g. 1,024 shots). Due to binomial sampling variance, proportions will fluctuate around the theoretical probabilities.'
  },
  {
    q: 'How do I unlock subsequent chapters?',
    a: 'Complete all sections of the current chapter and take the chapter quiz. A score of 60% or higher automatically unlocks the next chapter.'
  },
  {
    q: 'How do I synchronize code with the Circuit Lab builder?',
    a: 'Editing gates on the graphical grid updates the Qiskit code automatically. If you write code directly in the code editor, click "Sync to Circuit" to update the diagram.'
  }
];

/* ── State ── */
let quantaChatOpen = false;
let quantaActiveTab = 'chat'; // 'chat' or 'help'
let quantaHistory = []; // [{role:'user'|'model', parts:[{text:''}]}]
let quantaTyping  = false;
let quantaBadgeCount = 1;

/* ── Build Widget HTML ── */
function buildQuantaWidget() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('instructor') || path.includes('admin')) return;

  // --- FAB Button with Photo & "Doubt ?" text (No emojis) ---
  const fab = document.createElement('button');
  fab.className = 'ai-fab';
  fab.id = 'quantaFab';
  fab.title = 'Have a Doubt? Ask Quanta AI Assistant';
  fab.setAttribute('aria-label', 'Open Quanta Doubt Assistant and Help Desk');
  fab.onclick = toggleQuantaChat;
  fab.innerHTML = `
    <span class="ai-fab-avatar-wrap">
      <img src="${QUANTA_CONFIG.botImage}" alt="Quanta AI" onerror="this.src='quanta-mascot.jpg'">
      <span class="ai-fab-status-dot"></span>
    </span>
    <span class="ai-fab-label">Doubt ?</span>
    <div class="ai-fab-badge" id="quantaBadge" style="display:${quantaBadgeCount > 0 ? 'flex' : 'none'}">${quantaBadgeCount}</div>
  `;

  // --- Chat & Help Desk Panel ---
  const panel = document.createElement('div');
  panel.className = 'ai-chat-panel';
  panel.id = 'quantaPanel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Quanta AI Doubt Assistant');
  panel.innerHTML = `
    <!-- Header -->
    <div class="ai-chat-header">
      <img class="ai-header-avatar" src="${QUANTA_CONFIG.botImage}" alt="Quanta" onerror="this.src='quanta-mascot.jpg'">
      <div class="ai-header-info">
        <div class="ai-header-name">Quanta Assistant</div>
        <div class="ai-header-status">
          <span class="ai-status-dot"></span>
          <span>Quantum Doubt AI &middot; Help Desk</span>
        </div>
      </div>
      <div class="ai-header-actions">
        <button class="ai-header-btn" onclick="clearQuantaChat()" title="Clear chat" aria-label="Clear chat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
        <button class="ai-header-btn" onclick="toggleQuantaChat()" title="Close" aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mode Tabs: Ask Doubt vs Help Desk -->
    <div class="ai-mode-tabs" role="tablist">
      <button class="ai-tab-btn active" id="tabQuantaChat" onclick="switchQuantaTab('chat')" role="tab">
        Ask Doubt
      </button>
      <button class="ai-tab-btn" id="tabQuantaHelp" onclick="switchQuantaTab('help')" role="tab">
        Help Desk
      </button>
    </div>

    <!-- VIEW 1: Chat Interface -->
    <div class="ai-view-container" id="quantaChatView">
      <div class="ai-suggestions" id="quantaSuggestions">
        ${QUANTA_SUGGESTIONS.map(s => `<button class="ai-suggestion-chip" onclick="sendQuantaSuggestion(this)">${s}</button>`).join('')}
      </div>

      <div class="ai-messages" id="quantaMessages"></div>

      <div class="ai-input-area">
        <textarea
          class="ai-input"
          id="quantaInput"
          placeholder="Type your quantum computing doubt..."
          rows="1"
          onkeydown="handleQuantaKeydown(event)"
          oninput="autoResizeQuantaInput(this)"
        ></textarea>
        <button class="ai-send-btn" id="quantaSendBtn" onclick="sendQuantaMessage()" title="Send Doubt" aria-label="Send">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>

      <div class="ai-chat-footer">
        <button class="ai-clear-btn" onclick="clearQuantaChat()">Clear conversation</button>
      </div>
    </div>

    <!-- VIEW 2: Help Desk & Doubt Ticket -->
    <div class="ai-view-container hidden" id="quantaHelpView">
      <div class="ai-help-pane">
        <div class="ai-help-header">
          <h4>Help Desk & Knowledge Base</h4>
          <p>Instant answers to frequent questions or submit a doubt ticket to an instructor.</p>
        </div>

        <div class="ai-help-search-wrap">
          <input
            type="text"
            class="ai-help-search"
            id="helpSearchInput"
            placeholder="Search FAQs and doubts..."
            oninput="filterQuantaFaqs(this.value)"
          >
        </div>

        <div class="ai-faq-list" id="quantaFaqList">
          ${QUANTA_FAQS.map((faq, i) => `
            <details class="ai-faq-item">
              <summary class="ai-faq-question">${faq.q}</summary>
              <div class="ai-faq-answer">${faq.a}</div>
            </details>
          `).join('')}
        </div>

        <div class="ai-contact-box">
          <h5>Direct Contact & Helpline</h5>
          <p>Reach human mentors directly for urgent doubts or lab issues:</p>
          <div class="ai-contact-links">
            <a href="mailto:support@quantnexus.edu" class="ai-contact-row" title="Email Support">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>support@quantnexus.edu</span>
            </a>
            <a href="tel:+919876543210" class="ai-contact-row" title="Call Helpline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+91 98765 43210 (Mobile / WhatsApp)</span>
            </a>
          </div>
          <div class="ai-contact-hours">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Mon - Sat: 9:00 AM - 7:00 PM IST</span>
          </div>
        </div>

        <div class="ai-ticket-box">
          <h5>Submit Doubt to Instructor</h5>
          <form id="aiDoubtForm" onsubmit="handleQuantaTicketSubmit(event)">
            <select class="ai-ticket-select" id="doubtChapterSelect" required>
              <option value="">Select Chapter / Topic</option>
              <option value="Ch 1: Introduction to Quantum Computing">Chapter 1: Intro to Quantum Computing</option>
              <option value="Ch 2: Qubits & Quantum States">Chapter 2: Qubits & States</option>
              <option value="Ch 3: Superposition & Measurement">Chapter 3: Superposition</option>
              <option value="Ch 4: Quantum Logic Gates">Chapter 4: Single-Qubit Gates</option>
              <option value="Ch 5: Multi-Qubit Gates & Entanglement">Chapter 5: Entanglement & CNOT</option>
              <option value="Ch 6: Quantum Circuit Design">Chapter 6: Circuit Design</option>
              <option value="Circuit Lab Simulation">Circuit Lab Simulator</option>
              <option value="Simulation Lab Backends">Simulation Lab (Qiskit/PennyLane)</option>
              <option value="Coding Challenges">Qiskit Coding Challenge</option>
              <option value="General Platform Query">General Platform Query</option>
            </select>
            <textarea
              class="ai-ticket-textarea"
              id="doubtDescInput"
              placeholder="Describe your doubt or issue in detail..."
              rows="3"
              required
            ></textarea>
            <button type="submit" class="ai-ticket-submit-btn">Submit Doubt Ticket</button>
          </form>
          <div class="ai-ticket-msg hidden" id="ticketSuccessMsg"></div>
        </div>

        <div class="ai-help-full-link">
          <a href="help-desk.html" class="btn-help-full">Open Full Help Desk Portal &rarr;</a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  setTimeout(showQuantaGreeting, 600);
}

/* ── Tab Switching ── */
function switchQuantaTab(tab) {
  quantaActiveTab = tab;
  const tabChat = document.getElementById('tabQuantaChat');
  const tabHelp = document.getElementById('tabQuantaHelp');
  const viewChat = document.getElementById('quantaChatView');
  const viewHelp = document.getElementById('quantaHelpView');

  if (tab === 'chat') {
    tabChat.classList.add('active');
    tabHelp.classList.remove('active');
    viewChat.classList.remove('hidden');
    viewHelp.classList.add('hidden');
  } else {
    tabChat.classList.remove('active');
    tabHelp.classList.add('active');
    viewChat.classList.add('hidden');
    viewHelp.classList.remove('hidden');
  }
}

/* ── Filter FAQs in Help Desk ── */
function filterQuantaFaqs(query) {
  const q = (query || '').toLowerCase().trim();
  const items = document.querySelectorAll('.ai-faq-item');
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(q) ? 'block' : 'none';
  });
}

/* ── Handle Doubt Ticket Submit ── */
function handleQuantaTicketSubmit(e) {
  e.preventDefault();
  const chapter = document.getElementById('doubtChapterSelect').value;
  const desc = document.getElementById('doubtDescInput').value.trim();
  const msgEl = document.getElementById('ticketSuccessMsg');

  if (!chapter || !desc) return;

  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const studentName = user ? user.name : 'Demo Student';
  const studentEmail = user ? user.email : 'demo@quantnexus.in';

  const ticketId = 'QN-' + Math.floor(1000 + Math.random() * 9000);
  const newTicket = {
    id: ticketId,
    studentName,
    studentEmail,
    chapter,
    description: desc,
    status: 'Open',
    createdAt: new Date().toISOString(),
    response: null
  };

  const stored = JSON.parse(localStorage.getItem('qn_doubt_tickets') || '[]');
  stored.unshift(newTicket);
  localStorage.setItem('qn_doubt_tickets', JSON.stringify(stored));

  // Reset form
  document.getElementById('aiDoubtForm').reset();

  if (msgEl) {
    msgEl.innerHTML = `Ticket #${ticketId} submitted to instructor. You will see answers in the Help Desk portal.`;
    msgEl.classList.remove('hidden');
    setTimeout(() => {
      msgEl.classList.add('hidden');
    }, 5000);
  }
}

/* ── Greeting (Strictly NO Emojis) ── */
function showQuantaGreeting() {
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const firstName = user ? user.name.split(' ')[0] : 'Student';

  const greetings = [
    `Hello ${firstName}. I am Quanta, your Quantum Computing Doubt Assistant. Ask me any question regarding qubits, quantum gates, superposition, algorithms, circuits, or your coursework.`,
    `Welcome ${firstName}. I am ready to resolve your quantum computing doubts. Ask about circuit design, Qiskit code, or concept explanations.`
  ];

  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  appendQuantaMessage('bot', greeting, false);
}

/* ── Toggle Panel ── */
function toggleQuantaChat() {
  quantaChatOpen = !quantaChatOpen;
  const panel = document.getElementById('quantaPanel');
  const badge = document.getElementById('quantaBadge');

  if (!panel) return;
  panel.classList.toggle('open', quantaChatOpen);

  if (quantaChatOpen) {
    quantaBadgeCount = 0;
    if (badge) badge.style.display = 'none';
    if (quantaActiveTab === 'chat') {
      setTimeout(() => {
        const input = document.getElementById('quantaInput');
        if (input) input.focus();
      }, 250);
    }
  }
}

/* ── Send Suggestion ── */
function sendQuantaSuggestion(chipEl) {
  const text = chipEl.textContent;
  const input = document.getElementById('quantaInput');
  if (input) input.value = text;
  sendQuantaMessage();
  const suggestions = document.getElementById('quantaSuggestions');
  if (suggestions) {
    suggestions.style.display = 'none';
  }
}

/* ── Handle Keydown ── */
function handleQuantaKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendQuantaMessage();
  }
}

/* ── Auto-resize textarea ── */
function autoResizeQuantaInput(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 100) + 'px';
}

/* ── Send Message ── */
async function sendQuantaMessage() {
  if (quantaTyping) return;

  const input = document.getElementById('quantaInput');
  const text = input ? input.value.trim() : '';
  if (!text) return;

  input.value = '';
  input.style.height = 'auto';

  appendQuantaMessage('user', text, true);

  const sendBtn = document.getElementById('quantaSendBtn');
  if (sendBtn) sendBtn.disabled = true;
  quantaTyping = true;

  showQuantaTyping();

  try {
    const reply = await callGeminiAPI(text);
    hideQuantaTyping();
    // Strip any accidental emojis from model reply to guarantee 100% compliance
    const sanitizedReply = stripEmojis(reply);
    appendQuantaMessage('bot', sanitizedReply, true);
  } catch (err) {
    hideQuantaTyping();
    const errMsg = err.message.includes('quota') || err.message.includes('429')
      ? `Rate limit reached. Please wait a moment and try again.`
      : `Unable to connect to assistant service. Check your connection or API key settings. (Error: ${err.message})`;
    appendQuantaMessage('bot', errMsg, false);
  }

  if (sendBtn) sendBtn.disabled = false;
  quantaTyping = false;
}

/* ── Strip Emojis Helper ── */
function stripEmojis(text) {
  if (!text) return '';
  return text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA70}-\u{1FAFF}]/gu, '').trim();
}

/* ── Gemini API Call ── */
async function callGeminiAPI(userText) {
  const contents = [];

  for (const turn of quantaHistory.slice(-QUANTA_CONFIG.maxHistory)) {
    contents.push(turn);
  }

  contents.push({ role: 'user', parts: [{ text: userText }] });

  const endpoint = `${QUANTA_CONFIG.apiUrl}${QUANTA_CONFIG.model}:generateContent`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': QUANTA_CONFIG.apiKey
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: QUANTA_SYSTEM_PROMPT }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.5,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 1024
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
      ]
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!reply) throw new Error('Empty response from model');

  quantaHistory.push({ role: 'user',  parts: [{ text: userText }] });
  quantaHistory.push({ role: 'model', parts: [{ text: reply }] });

  if (quantaHistory.length > QUANTA_CONFIG.maxHistory * 2) {
    quantaHistory = quantaHistory.slice(-QUANTA_CONFIG.maxHistory * 2);
  }

  return reply;
}

/* ── Append Message to UI ── */
function appendQuantaMessage(role, text, addToHistory) {
  const messagesEl = document.getElementById('quantaMessages');
  if (!messagesEl) return;

  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userInitial = user ? user.name.charAt(0).toUpperCase() : 'S';

  const isBot = role === 'bot';
  const msg = document.createElement('div');
  msg.className = `ai-msg ${isBot ? 'bot' : 'user'}`;

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const html = renderQuantaMarkdown(text);

  msg.innerHTML = `
    ${isBot
      ? `<img class="ai-msg-avatar" src="${QUANTA_CONFIG.botImage}" alt="Quanta" onerror="this.src='quanta-mascot.jpg'">`
      : `<div class="ai-msg-avatar user-av">${userInitial}</div>`
    }
    <div>
      <div class="ai-bubble">${html}</div>
      <div class="ai-msg-time">${timeStr}</div>
    </div>
  `;

  messagesEl.appendChild(msg);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

/* ── Basic Markdown Renderer ── */
function renderQuantaMarkdown(text) {
  let s = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  s = s.replace(/```[\w]*\n([\s\S]*?)```/g, (_, code) =>
    `<pre><code>${code.trim()}</code></pre>`
  );

  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/__(.*?)__/g, '<strong>$1</strong>');
  s = s.replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, '<em>$1</em>');
  s = s.replace(/^[-•]\s(.+)$/gm, '<li>$1</li>');
  s = s.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  s = s.replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>');
  s = s.replace(/\n\n/g, '<br><br>');
  s = s.replace(/\n(?!<)/g, '<br>');

  return s;
}

/* ── Typing Indicator ── */
function showQuantaTyping() {
  const messagesEl = document.getElementById('quantaMessages');
  if (!messagesEl) return;

  const typing = document.createElement('div');
  typing.className = 'ai-typing';
  typing.id = 'quantaTypingIndicator';
  typing.innerHTML = `
    <img class="ai-msg-avatar" src="${QUANTA_CONFIG.botImage}" alt="Quanta" onerror="this.src='quanta-mascot.jpg'">
    <div class="ai-typing-dots">
      <span class="ai-typing-dot"></span>
      <span class="ai-typing-dot"></span>
      <span class="ai-typing-dot"></span>
    </div>
  `;
  messagesEl.appendChild(typing);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function hideQuantaTyping() {
  const el = document.getElementById('quantaTypingIndicator');
  if (el) el.remove();
}

/* ── Clear Chat ── */
function clearQuantaChat() {
  quantaHistory = [];
  const messagesEl = document.getElementById('quantaMessages');
  if (messagesEl) messagesEl.innerHTML = '';

  const suggestions = document.getElementById('quantaSuggestions');
  if (suggestions) suggestions.style.display = 'flex';

  showQuantaGreeting();
}

/* ── Close on outside click ── */
document.addEventListener('click', (e) => {
  if (!quantaChatOpen) return;
  const panel = document.getElementById('quantaPanel');
  const fab   = document.getElementById('quantaFab');
  if (panel && fab && !panel.contains(e.target) && !fab.contains(e.target)) {
    quantaChatOpen = false;
    panel.classList.remove('open');
  }
});

/* ── Keyboard shortcut: Ctrl+Shift+A ── */
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'A') {
    toggleQuantaChat();
  }
});

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  buildQuantaWidget();
});
