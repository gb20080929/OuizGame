/* ==========================================================================
   GPTK QUIZ PORTAL - PROCTORED ASSESSMENT SYSTEM ENGINE
   High-Performance Client-Side Application Core (Optimized & Ultra-Fast)
   ========================================================================== */

/* --------------------------------------------------------------------------
   ANIMATED MOTION BACKGROUND — Optimized Canvas Particle Network Engine
   High-performance floating particles using squared-distance checks
   and zero-GC rendering for smooth 60fps performance across all devices.
   -------------------------------------------------------------------------- */
(function initParticleBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  const PARTICLE_COUNT = 54;
  const CONNECTION_DIST = 160;
  const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
  const PARTICLE_RADIUS_MIN = 1.2;
  const PARTICLE_RADIUS_MAX = 3.0;
  const SPEED_MIN = 0.18;
  const SPEED_MAX = 0.50;

  const PALETTE = [
    { r: 99,  g: 102, b: 241 },  // indigo
    { r: 14,  g: 165, b: 233 },  // sky-blue
    { r: 16,  g: 185, b: 129 },  // emerald
    { r: 168, g: 85,  b: 247 },  // violet
    { r: 244, g: 114, b: 182 },  // pink
  ];

  let particles = [];
  let animId = null;
  let isPageVisible = true;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function randomColor() {
    return PALETTE[(Math.random() * PALETTE.length) | 0];
  }

  function createParticle() {
    const c = randomColor();
    return {
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2 * (SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN)),
      vy: (Math.random() - 0.5) * 2 * (SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN)),
      r:  PARTICLE_RADIUS_MIN + Math.random() * (PARTICLE_RADIUS_MAX - PARTICLE_RADIUS_MIN),
      color: c,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.012 + Math.random() * 0.018,
    };
  }

  function initParticles() {
    particles = new Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles[i] = createParticle();
    }
  }

  function isLightMode() {
    return document.documentElement.getAttribute('data-theme') === 'light-glass';
  }

  function draw() {
    if (!isPageVisible) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const light = isLightMode();
    const len = particles.length;

    // 1. Update and draw particle dots (Zero-GC fill render)
    for (let i = 0; i < len; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      else if (p.x > width) { p.x = width; p.vx *= -1; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      else if (p.y > height) { p.y = height; p.vy *= -1; }

      p.pulsePhase += p.pulseSpeed;
      const glow = 0.55 + 0.45 * Math.sin(p.pulsePhase);
      const alpha = light ? 0.35 * glow : 0.7 * glow;

      // Outer glow halo
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 3.0, 0, 6.283);
      ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${alpha * 0.3})`;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${alpha * 1.3})`;
      ctx.fill();
    }

    // 2. Draw connection lines using fast squared distance checks
    for (let i = 0; i < len; i++) {
      const a = particles[i];
      for (let j = i + 1; j < len; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < CONNECTION_DIST_SQ) {
          const dist = Math.sqrt(distSq);
          const opacity = 1 - dist / CONNECTION_DIST;
          const lineAlpha = light ? opacity * 0.18 : opacity * 0.32;

          const r = (a.color.r + b.color.r) >> 1;
          const g = (a.color.g + b.color.g) >> 1;
          const bl = (a.color.b + b.color.b) >> 1;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${r},${g},${bl},${lineAlpha})`;
          ctx.lineWidth = 0.8 + opacity * 0.5;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(draw);
  }

  function start() {
    resize();
    initParticles();
    if (animId) cancelAnimationFrame(animId);
    draw();
  }

  // Pause rendering when tab is hidden to save CPU & battery
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
    if (isPageVisible) {
      if (animId) cancelAnimationFrame(animId);
      draw();
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (animId) cancelAnimationFrame(animId);
      start();
    }, 150);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. INITIAL DATABASE SETUP & IN-MEMORY CACHING
     -------------------------------------------------------------------------- */
  const DEFAULT_QUESTIONS = [
    {
      id: 'q1',
      text: 'What is the full form of FSD?',
      options: [
        'Full Stack Development',
        'Fast Software Design',
        'File System Directory',
        'Full Service Deployment'
      ],
      correct: 0
    }
  ];

  const DEFAULT_USERS = [
    {
      fullname: 'Vasu',
      username: 'Vasu',
      password: 'Vasu@2909'
    }
  ];

  const DEFAULT_SETTINGS = {
    theme: 'dark-glass',
    timerDuration: 5,
    strictness: 'strict'
  };

  let dbQuestions = DEFAULT_QUESTIONS;
  let dbResults = [];
  let dbUsers = DEFAULT_USERS;
  let dbSettings = DEFAULT_SETTINGS;

  function loadDatabase() {
    try {
      const savedQ = localStorage.getItem('sq_questions');
      if (savedQ) {
        const parsed = JSON.parse(savedQ);
        if (Array.isArray(parsed) && parsed.length > 0) {
          dbQuestions = parsed;
        } else {
          dbQuestions = [...DEFAULT_QUESTIONS];
          saveQuestions();
        }
      } else {
        dbQuestions = [...DEFAULT_QUESTIONS];
        saveQuestions();
      }

      const savedR = localStorage.getItem('sq_results');
      if (savedR) {
        const parsed = JSON.parse(savedR);
        if (Array.isArray(parsed)) dbResults = parsed;
      }

      const savedU = localStorage.getItem('sq_users');
      if (savedU) {
        const parsed = JSON.parse(savedU);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasVasu = parsed.some(u => u.username.toLowerCase() === 'vasu');
          if (!hasVasu) parsed.push(DEFAULT_USERS[0]);
          dbUsers = parsed;
        } else {
          dbUsers = [...DEFAULT_USERS];
        }
      } else {
        dbUsers = [...DEFAULT_USERS];
        saveUsers();
      }

      const savedS = localStorage.getItem('sq_settings');
      if (savedS) dbSettings = JSON.parse(savedS);
    } catch (err) {
      console.warn('LocalStorage access warning:', err);
    }
  }

  let syncDebounceTimer = null;
  function triggerCloudSyncDebounced() {
    if (syncDebounceTimer) clearTimeout(syncDebounceTimer);
    syncDebounceTimer = setTimeout(() => {
      syncQuestionsWithCloud();
    }, 300);
  }

  function saveQuestions() { 
    try { 
      localStorage.setItem('sq_questions', JSON.stringify(dbQuestions)); 
      triggerCloudSyncDebounced();
    } catch (e){} 
  }

  function saveResults() { 
    try { 
      localStorage.setItem('sq_results', JSON.stringify(dbResults)); 
      triggerCloudSyncDebounced();
    } catch (e){} 
  }

  function saveUsers() { 
    try { 
      localStorage.setItem('sq_users', JSON.stringify(dbUsers)); 
      triggerCloudSyncDebounced();
    } catch (e){} 
  }

  function saveSettings() { 
    try { 
      localStorage.setItem('sq_settings', JSON.stringify(dbSettings)); 
    } catch (e){} 
  }

  /* --------------------------------------------------------------------------
     1.1 REAL-TIME MULTI-DEVICE CLOUD SYNC ENGINE (OPTIMIZED)
     -------------------------------------------------------------------------- */
  async function syncQuestionsWithCloud() {
    try {
      localStorage.setItem('sq_questions', JSON.stringify(dbQuestions));
      localStorage.setItem('sq_results', JSON.stringify(dbResults));
      localStorage.setItem('sq_users', JSON.stringify(dbUsers));
      
      if (window.BroadcastChannel) {
        const channel = new BroadcastChannel('gptk_quiz_channel');
        channel.postMessage({ type: 'UPDATE_DATABASE', questions: dbQuestions, results: dbResults, users: dbUsers });
      }

      if (navigator.onLine && window.fetch) {
        fetch('https://api.jsonbin.io/v3/b/66cc802ae41b4d34e4256600', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$w8T0M4jD81u8L32n.Yy.y.A6V8z.G9w8V3y9.z.y'
          },
          body: JSON.stringify({ questions: dbQuestions, results: dbResults, users: dbUsers })
        }).catch(() => {});
      }
    } catch (e) {
      console.warn('Cloud sync push warning:', e);
    }
  }

  async function fetchQuestionsFromCloud() {
    try {
      if (navigator.onLine && window.fetch && !document.hidden) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);
        const res = await fetch('https://api.jsonbin.io/v3/b/66cc802ae41b4d34e4256600/latest', {
          headers: {
            'X-Master-Key': '$2a$10$w8T0M4jD81u8L32n.Yy.y.A6V8z.G9w8V3y9.z.y'
          },
          signal: controller.signal
        }).catch(() => null);
        clearTimeout(timeoutId);

        if (res && res.ok) {
          const data = await res.json();
          const record = data.record || data;
          let updated = false;

          if (record.questions && Array.isArray(record.questions) && record.questions.length > 0) {
            dbQuestions = record.questions;
            localStorage.setItem('sq_questions', JSON.stringify(dbQuestions));
            updated = true;
          }
          if (record.results && Array.isArray(record.results)) {
            dbResults = record.results;
            localStorage.setItem('sq_results', JSON.stringify(dbResults));
            updated = true;
          }
          if (record.users && Array.isArray(record.users)) {
            dbUsers = record.users;
            localStorage.setItem('sq_users', JSON.stringify(dbUsers));
            updated = true;
          }

          if (updated && views.teacher && !views.teacher.classList.contains('hidden')) {
            renderTeacherDashboard();
          }
        }
      }
    } catch (e) {
      console.warn('Cloud sync fetch warning:', e);
    }
  }

  if (window.BroadcastChannel) {
    const channel = new BroadcastChannel('gptk_quiz_channel');
    channel.onmessage = (event) => {
      if (event.data && event.data.type === 'UPDATE_DATABASE') {
        if (event.data.questions) {
          dbQuestions = event.data.questions;
          localStorage.setItem('sq_questions', JSON.stringify(dbQuestions));
        }
        if (event.data.results) {
          dbResults = event.data.results;
          localStorage.setItem('sq_results', JSON.stringify(dbResults));
        }
        if (event.data.users) {
          dbUsers = event.data.users;
          localStorage.setItem('sq_users', JSON.stringify(dbUsers));
        }
        if (views.teacher && !views.teacher.classList.contains('hidden')) {
          renderTeacherDashboard();
        }
      }
    };
  }

  // Initial cloud fetch & 15-second automatic polling
  loadDatabase();
  fetchQuestionsFromCloud();
  setInterval(() => {
    if (!document.hidden) fetchQuestionsFromCloud();
  }, 15000);

  /* --------------------------------------------------------------------------
     2. APP STATE MANAGEMENT & DOM CACHING
     -------------------------------------------------------------------------- */
  const state = {
    currentUser: null,
    currentQuestionIndex: 0,
    userAnswers: {},
    tabViolations: 0,
    quizActive: false,
    questionTimerInterval: null,
    questionTimeRemaining: 45,
    activeQuestions: [],
    questionBankUnlocked: false
  };

  const views = {
    login: document.getElementById('view-login'),
    teacher: document.getElementById('view-teacher'),
    instruction: document.getElementById('view-instruction'),
    quiz: document.getElementById('view-quiz'),
    results: document.getElementById('view-results')
  };

  const cachedElements = {
    userBadge: document.getElementById('user-badge'),
    btnLogout: document.getElementById('btn-logout'),
    themeToggle: document.getElementById('theme-toggle'),
    container: document.getElementById('container'),
    formLogin: document.getElementById('form-login'),
    formTeacherLogin: document.getElementById('form-teacher-login'),
    formRegister: document.getElementById('form-register'),
    qCounter: document.getElementById('quiz-question-counter'),
    qTag: document.getElementById('question-tag'),
    qText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    pillsContainer: document.getElementById('quiz-nav-pills'),
    progressFill: document.getElementById('quiz-progress-fill'),
    btnPrevQ: document.getElementById('btn-prev-q'),
    btnNextQ: document.getElementById('btn-next-q'),
    btnSubmitQuiz: document.getElementById('btn-submit-quiz'),
    qTimerSeconds: document.getElementById('q-timer-seconds'),
    studentResultsTbody: document.getElementById('student-results-tbody'),
    questionsListGrid: document.getElementById('questions-list'),
    statTotalQuestions: document.getElementById('stat-total-questions'),
    statTotalStudents: document.getElementById('stat-total-students'),
    statAvgScore: document.getElementById('stat-avg-score')
  };

  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  /* --------------------------------------------------------------------------
     3. UI VIEW NAVIGATION & THEME ENGINE
     -------------------------------------------------------------------------- */
  function resetAuthForms() {
    const uInput = document.getElementById('login-username');
    const pInput = document.getElementById('login-password');
    const tUser = document.getElementById('teacher-username');
    const tPass = document.getElementById('teacher-password');
    const rFull = document.getElementById('reg-fullname');
    const rUser = document.getElementById('reg-username');
    const rPass = document.getElementById('reg-password');

    if (cachedElements.formLogin) cachedElements.formLogin.reset();
    if (cachedElements.formTeacherLogin) cachedElements.formTeacherLogin.reset();
    if (cachedElements.formRegister) cachedElements.formRegister.reset();
    if (uInput) uInput.value = '';
    if (pInput) pInput.value = '';
    if (tUser) tUser.value = '';
    if (tPass) tPass.value = '';
    if (rFull) rFull.value = '';
    if (rUser) rUser.value = '';
    if (rPass) rPass.value = '';

    if (cachedElements.container) cachedElements.container.classList.remove('right-panel-active');
  }

  function switchView(targetView) {
    try {
      if (state.currentUser && targetView !== 'login') {
        sessionStorage.setItem('gptk_session_user', JSON.stringify(state.currentUser));
        sessionStorage.setItem('gptk_active_view', targetView);
      } else if (targetView === 'login') {
        sessionStorage.removeItem('gptk_session_user');
        sessionStorage.removeItem('gptk_active_view');
      }
    } catch (e) {}

    if (targetView === 'login') {
      resetAuthForms();
      state.questionBankUnlocked = false;
    }

    if (targetView === 'teacher') {
      state.questionBankUnlocked = false;
      const dashTabs = document.querySelectorAll('.dash-tab');
      dashTabs.forEach(t => {
        if (t.dataset.target === 'tab-results') t.classList.add('active');
        else t.classList.remove('active');
      });
      document.querySelectorAll('.dash-tab-content').forEach(c => {
        if (c.id === 'tab-results') c.classList.remove('hidden');
        else c.classList.add('hidden');
      });
      renderTeacherDashboard();
    }

    Object.keys(views).forEach(v => {
      if (views[v]) {
        if (v === targetView) {
          views[v].classList.remove('hidden');
          views[v].classList.add('active');
        } else {
          views[v].classList.add('hidden');
          views[v].classList.remove('active');
        }
      }
    });

    const { userBadge, btnLogout } = cachedElements;
    if (state.currentUser && targetView !== 'login') {
      if (userBadge) {
        userBadge.innerHTML = `<img src="icons/user-custom.svg" class="badge-icon-svg" alt="User"> <span>${state.currentUser.role === 'teacher' ? 'Account' : 'Student'}: ${state.currentUser.name}</span>`;
        userBadge.classList.remove('hidden');
      }
      if (btnLogout) btnLogout.classList.remove('hidden');
    } else {
      if (userBadge) userBadge.classList.add('hidden');
      if (btnLogout) btnLogout.classList.add('hidden');
    }
  }

  function applySettings() {
    const currentTheme = dbSettings.theme || 'dark-glass';
    document.documentElement.setAttribute('data-theme', currentTheme);

    const toggleCheckbox = document.getElementById('theme-toggle');
    if (toggleCheckbox) {
      toggleCheckbox.checked = currentTheme === 'dark-glass';
    }
  }

  const toggleCheckbox = document.getElementById('theme-toggle');
  if (toggleCheckbox) {
    toggleCheckbox.addEventListener('change', () => {
      dbSettings.theme = toggleCheckbox.checked ? 'dark-glass' : 'light-glass';
      saveSettings();
      applySettings();
    });
  }

  /* --------------------------------------------------------------------------
     4. ANTI-CHEAT SECURITY MODULE
     -------------------------------------------------------------------------- */
  document.addEventListener('contextmenu', (e) => {
    if (state.quizActive) {
      e.preventDefault();
      alert('🔒 Right-clicking is strictly disabled during proctored exams!');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!state.quizActive) return;
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;
    const key = e.key.toLowerCase();

    if (
      e.key === 'F12' ||
      (isCtrlOrCmd && ['c', 'v', 'u', 'a', 's', 'p'].includes(key)) ||
      (isCtrlOrCmd && e.shiftKey && ['i', 'j', 'c'].includes(key))
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  function requestFullScreen() {
    const elem = document.documentElement;
    try {
      if (elem.requestFullscreen) elem.requestFullscreen().catch(() => {});
      else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen().catch(() => {});
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen().catch(() => {});
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen().catch(() => {});
    } catch (e) {}
  }

  function exitFullScreen() {
    try {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    } catch (e) {}
  }

  function handleSecurityViolation(reason) {
    if (!state.quizActive) return;

    state.tabViolations++;

    const badge = document.getElementById('quiz-violations-badge');
    if (badge) {
      badge.textContent = `${state.tabViolations} Warning${state.tabViolations > 1 ? 's' : ''}`;
      badge.className = 'badge badge-danger';
    }

    const warnNum = document.getElementById('violation-counter-num');
    if (warnNum) warnNum.textContent = state.tabViolations;

    const warnDesc = document.getElementById('violation-message-text');
    if (warnDesc) warnDesc.textContent = `Security Alert: ${reason}. Activity logged!`;

    if (dbSettings.strictness === 'strict' && state.tabViolations >= 2) {
      const vModal = document.getElementById('modal-violation');
      if (vModal) vModal.classList.add('hidden');
      alert('⚠️ Security Violation Threshold Exceeded! Your quiz is being automatically submitted immediately.');
      submitQuiz();
    } else {
      const vModal = document.getElementById('modal-violation');
      if (vModal) vModal.classList.remove('hidden');
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.quizActive) {
      handleSecurityViolation('Tab switch detected');
    }
  });

  window.addEventListener('blur', () => {
    if (state.quizActive) {
      handleSecurityViolation('Browser window focus lost');
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && state.quizActive) {
      handleSecurityViolation('Exited Full-Screen mode');
    }
  });

  /* --------------------------------------------------------------------------
     5. AUTHENTICATION & FORM TOGGLING
     -------------------------------------------------------------------------- */
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const returnBtns = document.querySelectorAll('.signInReturnBtn');

  if (signUpButton && cachedElements.container) {
    signUpButton.addEventListener('click', (e) => {
      e.preventDefault();
      cachedElements.container.classList.add("right-panel-active");
    });
  }

  if (signInButton && cachedElements.container) {
    signInButton.addEventListener('click', (e) => {
      e.preventDefault();
      cachedElements.container.classList.remove("right-panel-active");
    });
  }

  if (returnBtns && cachedElements.container) {
    returnBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        cachedElements.container.classList.remove("right-panel-active");
      });
    });
  }

  if (cachedElements.formLogin) {
    cachedElements.formLogin.addEventListener('submit', (e) => {
      e.preventDefault();

      const usernameInput = document.getElementById('login-username');
      const passwordInput = document.getElementById('login-password');

      const username = usernameInput ? usernameInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      if (!username || !password) {
        alert('Please enter both your Student Username and Password.');
        return;
      }

      if (username.toLowerCase() === 'vasu') {
        if (password === 'Vasu@2909' || password.toLowerCase() === 'vasu@2909') {
          state.currentUser = { name: 'Vasu', username: 'Vasu', role: 'student' };
          startInstructionCountdown();
          switchView('instruction');
          return;
        } else {
          alert('❌ Incorrect Password for student account Vasu!');
          return;
        }
      }

      const foundStudent = dbUsers.find(u => u.username.toLowerCase() === username.toLowerCase());

      if (foundStudent) {
        if (foundStudent.password === password) {
          state.currentUser = { name: foundStudent.fullname, username: foundStudent.username, role: 'student' };
          startInstructionCountdown();
          switchView('instruction');
        } else {
          alert('❌ Incorrect Password for student account.');
        }
      } else {
        state.currentUser = { name: username, username: username, role: 'student' };
        startInstructionCountdown();
        switchView('instruction');
      }
    });
  }

  if (cachedElements.formTeacherLogin) {
    cachedElements.formTeacherLogin.addEventListener('submit', (e) => {
      e.preventDefault();

      const usernameInput = document.getElementById('teacher-username');
      const passwordInput = document.getElementById('teacher-password');

      const username = usernameInput ? usernameInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      if (!username || !password) {
        alert('Please enter your Teacher Username and Password.');
        return;
      }

      if (username.toLowerCase() === 'admin') {
        if (password === 'CSE@2026' || password.toLowerCase() === 'cse@2026') {
          state.currentUser = { name: 'Admin', username: 'Admin', role: 'teacher' };
          switchView('teacher');
          return;
        } else {
          alert('❌ Incorrect Password for Admin account!');
          return;
        }
      } else {
        alert('❌ Invalid Teacher Username. Admin account required.');
      }
    });
  }

  if (cachedElements.formRegister) {
    cachedElements.formRegister.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullname = document.getElementById('reg-fullname').value.trim();
      const username = document.getElementById('reg-username').value.trim();
      const password = document.getElementById('reg-password').value.trim();

      if (!fullname || !username || !password) {
        alert('Please fill out all fields to register.');
        return;
      }

      if (username.toLowerCase() === 'admin') {
        alert('The username "Admin" is reserved for Teacher access only!');
        return;
      }

      const exists = dbUsers.some(u => u.username.toLowerCase() === username.toLowerCase());
      if (exists) {
        alert('This username is already registered! Please choose a different username or log in.');
        return;
      }

      const newUser = { fullname, username, password };
      dbUsers.push(newUser);
      saveUsers();

      alert(`🎉 Account created successfully for ${fullname}! Welcome to GPTK Quiz.`);
      resetAuthForms();

      state.currentUser = { name: fullname, username: username, role: 'student' };
      startInstructionCountdown();
      switchView('instruction');
    });
  }

  if (cachedElements.btnLogout) {
    cachedElements.btnLogout.addEventListener('click', () => {
      if (state.quizActive) {
        if (!confirm('Are you sure you want to exit the quiz? Progress will be lost.')) return;
      }
      state.quizActive = false;
      state.currentUser = null;
      exitFullScreen();
      switchView('login');
    });
  }

  /* --------------------------------------------------------------------------
     6. INSTRUCTION LOCKOUT COUNTDOWN ENGINE
     -------------------------------------------------------------------------- */
  function startInstructionCountdown() {
    state.instructionTimeRemaining = parseInt(dbSettings.timerDuration, 10) || 5;

    const btnStart = document.getElementById('btn-start-quiz');
    const timerDisplay = document.getElementById('instruction-timer-display');
    const secondsText = document.getElementById('lockout-seconds');
    const statusText = document.getElementById('lockout-status-text');
    const timerProgressCircle = document.getElementById('timer-progress');
    const chkAgree = document.getElementById('chk-agree');

    const totalTime = state.instructionTimeRemaining;
    const circumference = 283;

    if (btnStart) {
      btnStart.disabled = true;
      btnStart.innerHTML = `<img src="icons/system-lock-screen-symbolic.svg" class="btn-icon" alt="Lock"> <span>Start Proctored Exam (Locked)</span>`;
    }

    if (state.instructionTimerInterval) clearInterval(state.instructionTimerInterval);

    state.instructionTimerInterval = setInterval(() => {
      state.instructionTimeRemaining--;

      if (timerDisplay) timerDisplay.textContent = state.instructionTimeRemaining;
      if (secondsText) secondsText.textContent = state.instructionTimeRemaining;

      if (timerProgressCircle) {
        const offset = circumference - (state.instructionTimeRemaining / totalTime) * circumference;
        timerProgressCircle.style.strokeDashoffset = offset;
      }

      if (state.instructionTimeRemaining <= 0) {
        clearInterval(state.instructionTimerInterval);
        const canUnlock = chkAgree ? chkAgree.checked : true;
        if (btnStart) {
          btnStart.disabled = !canUnlock;
          btnStart.innerHTML = `<img src="icons/user-custom.svg" class="btn-icon" alt="Start"> <span>Start Exam Now (${dbQuestions.length} Questions)</span>`;
        }
        if (statusText) {
          statusText.innerHTML = `✅ Ready &nbsp;|&nbsp; <strong>${dbQuestions.length} Questions</strong>`;
        }
      }
    }, 1000);
  }

  const chkAgree = document.getElementById('chk-agree');
  if (chkAgree) {
    chkAgree.addEventListener('change', () => {
      const btnStart = document.getElementById('btn-start-quiz');
      if (btnStart && state.instructionTimeRemaining <= 0) {
        btnStart.disabled = !chkAgree.checked;
      }
    });
  }

  const btnStartQuiz = document.getElementById('btn-start-quiz');
  if (btnStartQuiz) {
    btnStartQuiz.addEventListener('click', () => {
      state.quizActive = true;
      state.currentQuestionIndex = 0;
      state.userAnswers = {};
      state.tabViolations = 0;

      const rawQuestions = shuffleArray(dbQuestions);
      state.activeQuestions = rawQuestions.map(q => {
        const optionObjects = (q.options || []).map((optText, origIndex) => ({
          text: optText,
          origIndex: origIndex
        }));
        const shuffledOptions = shuffleArray(optionObjects);
        return {
          id: q.id,
          text: q.text,
          options: shuffledOptions.map(o => o.text),
          correct: shuffledOptions.findIndex(o => o.origIndex === q.correct),
          originalQuestion: q
        };
      });

      requestFullScreen();
      renderQuizQuestion();
      switchView('quiz');
    });
  }

  /* --------------------------------------------------------------------------
     7. STUDENT PROCTORED QUIZ ENGINE & QUESTION TIMER
     -------------------------------------------------------------------------- */
  function startQuestionTimer() {
    if (state.questionTimerInterval) clearInterval(state.questionTimerInterval);
    state.questionTimeRemaining = 45;
    const display = cachedElements.qTimerSeconds;
    if (display) display.textContent = state.questionTimeRemaining;

    state.questionTimerInterval = setInterval(() => {
      state.questionTimeRemaining--;
      if (display) display.textContent = state.questionTimeRemaining;

      if (state.questionTimeRemaining <= 0) {
        clearInterval(state.questionTimerInterval);
        const questionsList = state.activeQuestions.length > 0 ? state.activeQuestions : dbQuestions;
        if (state.currentQuestionIndex < questionsList.length - 1) {
          state.currentQuestionIndex++;
          renderQuizQuestion();
        } else {
          submitQuiz();
        }
      }
    }, 1000);
  }

  function renderQuizQuestion() {
    const questionsList = state.activeQuestions.length > 0 ? state.activeQuestions : dbQuestions;
    if (!questionsList || questionsList.length === 0) return;

    if (state.currentQuestionIndex >= questionsList.length) {
      state.currentQuestionIndex = questionsList.length - 1;
    }

    const q = questionsList[state.currentQuestionIndex];
    const totalQ = questionsList.length;

    const { qCounter, qTag, qText, optionsContainer, pillsContainer, progressFill, btnPrevQ, btnNextQ, btnSubmitQuiz } = cachedElements;

    if (qCounter) qCounter.textContent = `${state.currentQuestionIndex + 1} / ${totalQ}`;
    if (qTag) qTag.textContent = `Question ${state.currentQuestionIndex + 1} of ${totalQ}`;
    if (qText) qText.textContent = q.text;

    startQuestionTimer();

    // Render Quick Jump Navigation Pills
    if (pillsContainer) {
      pillsContainer.innerHTML = '';
      const fragment = document.createDocumentFragment();

      questionsList.forEach((item, index) => {
        const pill = document.createElement('button');
        pill.type = 'button';
        const isCurrent = index === state.currentQuestionIndex;
        const isAnswered = state.userAnswers[item.id] !== undefined;

        pill.className = `q-jump-pill ${isCurrent ? 'active' : ''} ${isAnswered ? 'answered' : ''}`;
        pill.textContent = `Q${index + 1}${isAnswered ? ' ✓' : ''}`;

        pill.addEventListener('click', () => {
          state.currentQuestionIndex = index;
          renderQuizQuestion();
        });

        fragment.appendChild(pill);
      });
      pillsContainer.appendChild(fragment);
    }

    // Render 4 Option Buttons (A, B, C, D)
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      const prefixes = ['A', 'B', 'C', 'D'];
      const fragment = document.createDocumentFragment();

      (q.options || []).forEach((optText, index) => {
        const isSelected = state.userAnswers[q.id] === index;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `option-btn ${isSelected ? 'selected' : ''}`;
        btn.innerHTML = `
          <span class="opt-prefix">${prefixes[index]}</span>
          <span class="opt-text">${optText}</span>
        `;

        btn.addEventListener('click', () => {
          state.userAnswers[q.id] = index;
          renderQuizQuestion();
        });

        fragment.appendChild(btn);
      });
      optionsContainer.appendChild(fragment);
    }

    if (progressFill) {
      const progressPercent = ((state.currentQuestionIndex + 1) / totalQ) * 100;
      progressFill.style.width = `${progressPercent}%`;
    }

    if (btnPrevQ) btnPrevQ.disabled = state.currentQuestionIndex === 0;

    if (state.currentQuestionIndex === totalQ - 1) {
      if (btnNextQ) btnNextQ.classList.add('hidden');
      if (btnSubmitQuiz) btnSubmitQuiz.classList.remove('hidden');
    } else {
      if (btnNextQ) btnNextQ.classList.remove('hidden');
      if (btnSubmitQuiz) btnSubmitQuiz.classList.add('hidden');
    }
  }

  if (cachedElements.btnPrevQ) {
    cachedElements.btnPrevQ.addEventListener('click', () => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex--;
        renderQuizQuestion();
      }
    });
  }

  if (cachedElements.btnNextQ) {
    cachedElements.btnNextQ.addEventListener('click', () => {
      const questionsList = state.activeQuestions.length > 0 ? state.activeQuestions : dbQuestions;
      if (state.currentQuestionIndex < questionsList.length - 1) {
        state.currentQuestionIndex++;
        renderQuizQuestion();
      }
    });
  }

  if (cachedElements.btnSubmitQuiz) {
    cachedElements.btnSubmitQuiz.addEventListener('click', () => {
      const questionsList = state.activeQuestions.length > 0 ? state.activeQuestions : dbQuestions;
      const answeredCount = Object.keys(state.userAnswers).length;
      if (answeredCount < questionsList.length) {
        if (!confirm(`You have answered ${answeredCount} of ${questionsList.length} questions. Are you sure you want to submit your exam now?`)) {
          return;
        }
      }
      submitQuiz();
    });
  }

  const btnResumeFS = document.getElementById('btn-resume-fullscreen');
  if (btnResumeFS) {
    btnResumeFS.addEventListener('click', () => {
      const vModal = document.getElementById('modal-violation');
      if (vModal) vModal.classList.add('hidden');
      requestFullScreen();
    });
  }

  /* --------------------------------------------------------------------------
     8. QUIZ SUBMISSION & RESULTS REVIEW
     -------------------------------------------------------------------------- */
  function submitQuiz() {
    state.quizActive = false;
    if (state.questionTimerInterval) clearInterval(state.questionTimerInterval);
    exitFullScreen();

    const questionsList = state.activeQuestions.length > 0 ? state.activeQuestions : dbQuestions;
    let correctCount = 0;
    questionsList.forEach(q => {
      if (state.userAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const totalQuestions = dbQuestions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    const resultRecord = {
      studentName: state.currentUser ? state.currentUser.name : 'Student Candidate',
      timestamp: new Date().toLocaleString(),
      score: correctCount,
      total: totalQuestions,
      percentage: percentage,
      violations: state.tabViolations,
      status: state.tabViolations > 0 ? 'Warning Logged' : 'Clean Record'
    };

    dbResults.unshift(resultRecord);
    saveResults();

    const studentNameElem = document.getElementById('result-student-name');
    if (studentNameElem) {
      studentNameElem.textContent = state.currentUser ? state.currentUser.name : 'Student Candidate';
    }

    const scorePercent = document.getElementById('result-score-percent');
    if (scorePercent) scorePercent.textContent = `${percentage}%`;

    const scoreFraction = document.getElementById('result-score-fraction');
    if (scoreFraction) scoreFraction.textContent = `${correctCount} / ${totalQuestions} Marks`;

    const integrityElem = document.getElementById('result-integrity-status');
    if (integrityElem) {
      if (state.tabViolations === 0) {
        integrityElem.textContent = 'Clean Honor Record 🛡️';
        integrityElem.className = 'detail-value text-success';
      } else {
        integrityElem.textContent = `${state.tabViolations} Violation Warning(s)`;
        integrityElem.className = 'detail-value text-warning';
      }
    }

    const violCount = document.getElementById('result-violations-count');
    if (violCount) violCount.textContent = state.tabViolations;

    const reviewContainer = document.getElementById('answers-review-container');
    if (reviewContainer) reviewContainer.classList.add('hidden');

    const btnToggleAnswers = document.getElementById('btn-toggle-answers');
    if (btnToggleAnswers) {
      btnToggleAnswers.innerHTML = `<img src="icons/question-custom.svg" class="btn-icon" alt="Analysis"> <span>Show Detailed Question Breakdown</span>`;
    }

    renderAnswerReviewList();
    switchView('results');
  }

  function renderAnswerReviewList() {
    const listContainer = document.getElementById('answers-review-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';
    const questionsList = state.activeQuestions.length > 0 ? state.activeQuestions : dbQuestions;
    const prefixes = ['A', 'B', 'C', 'D'];
    const fragment = document.createDocumentFragment();

    questionsList.forEach((q, idx) => {
      const userSelected = state.userAnswers[q.id];
      const isCorrect = userSelected === q.correct;

      const card = document.createElement('div');
      card.className = `review-card ${isCorrect ? 'correct' : 'wrong'}`;

      const qTitle = document.createElement('div');
      qTitle.style.cssText = 'font-weight: 700; margin-bottom: 10px; font-size: 14px; line-height: 1.5;';
      qTitle.textContent = `Q${idx + 1}. ${q.text}`;
      const statusIcon = document.createElement('span');
      statusIcon.style.marginLeft = '6px';
      statusIcon.textContent = isCorrect ? '✅' : '❌';
      qTitle.appendChild(statusIcon);
      card.appendChild(qTitle);

      const selRow = document.createElement('div');
      selRow.style.cssText = 'font-size: 13px; color: var(--text-muted); margin-bottom: 4px; display: flex; align-items: baseline; gap: 6px;';
      const selLabel = document.createElement('span');
      selLabel.textContent = 'Your Selection:';
      const selValue = document.createElement('strong');
      if (userSelected !== undefined && q.options[userSelected] !== undefined) {
        selValue.textContent = `${prefixes[userSelected]}. ${q.options[userSelected]}`;
      } else {
        selValue.textContent = 'Not Answered';
        selValue.style.color = '#f59e0b';
      }
      selRow.appendChild(selLabel);
      selRow.appendChild(selValue);
      card.appendChild(selRow);

      if (!isCorrect) {
        const corrRow = document.createElement('div');
        corrRow.style.cssText = 'font-size: 13px; color: #10b981; display: flex; align-items: baseline; gap: 6px; margin-top: 2px;';
        const corrLabel = document.createElement('span');
        corrLabel.textContent = 'Correct Answer:';
        const corrValue = document.createElement('strong');
        corrValue.textContent = `${prefixes[q.correct]}. ${q.options[q.correct]}`;
        corrRow.appendChild(corrLabel);
        corrRow.appendChild(corrValue);
        card.appendChild(corrRow);
      }

      fragment.appendChild(card);
    });

    listContainer.appendChild(fragment);
  }

  const btnToggleAnswers = document.getElementById('btn-toggle-answers');
  if (btnToggleAnswers) {
    btnToggleAnswers.addEventListener('click', () => {
      const container = document.getElementById('answers-review-container');
      if (container) {
        const isHidden = container.classList.contains('hidden');
        if (isHidden) {
          container.classList.remove('hidden');
          btnToggleAnswers.innerHTML = `<img src="icons/question-custom.svg" class="btn-icon" alt="Analysis"> <span>Hide Question Breakdown</span>`;
        } else {
          container.classList.add('hidden');
          btnToggleAnswers.innerHTML = `<img src="icons/question-custom.svg" class="btn-icon" alt="Analysis"> <span>Show Detailed Question Breakdown</span>`;
        }
      }
    });
  }

  const btnFinishLogout = document.getElementById('btn-finish-logout');
  if (btnFinishLogout) {
    btnFinishLogout.addEventListener('click', () => {
      state.currentUser = null;
      resetAuthForms();
      switchView('login');
    });
  }

  /* --------------------------------------------------------------------------
     9. TEACHER COMMAND CENTER MODULE & EDIT QUESTION FEATURE
     -------------------------------------------------------------------------- */
  function openEditQuestionModal(q) {
    const editIdInput = document.getElementById('edit-q-id');
    const editTextInput = document.getElementById('edit-q-text');
    const optA = document.getElementById('edit-opt-a');
    const optB = document.getElementById('edit-opt-b');
    const optC = document.getElementById('edit-opt-c');
    const optD = document.getElementById('edit-opt-d');

    if (editIdInput) editIdInput.value = q.id;
    if (editTextInput) editTextInput.value = q.text || '';

    const opts = q.options || ['', '', '', ''];
    if (optA) optA.value = opts[0] || '';
    if (optB) optB.value = opts[1] || '';
    if (optC) optC.value = opts[2] || '';
    if (optD) optD.value = opts[3] || '';

    const radios = document.querySelectorAll('input[name="edit-correct-opt"]');
    radios.forEach(r => {
      r.checked = parseInt(r.value, 10) === (q.correct || 0);
    });

    const modal = document.getElementById('modal-edit-question');
    if (modal) modal.classList.remove('hidden');
  }

  function renderTeacherDashboard() {
    const { statTotalQuestions, statTotalStudents, statAvgScore, questionsListGrid, studentResultsTbody } = cachedElements;

    if (statTotalQuestions) statTotalQuestions.textContent = dbQuestions.length;
    if (statTotalStudents) statTotalStudents.textContent = dbResults.length;

    let avg = 0;
    if (dbResults.length > 0) {
      const sum = dbResults.reduce((acc, r) => acc + r.percentage, 0);
      avg = Math.round(sum / dbResults.length);
    }
    if (statAvgScore) statAvgScore.textContent = `${avg}%`;

    if (questionsListGrid) {
      questionsListGrid.innerHTML = '';
      const prefixes = ['A', 'B', 'C', 'D'];
      const fragment = document.createDocumentFragment();

      dbQuestions.forEach((q, idx) => {
        if (!q) return;
        const qText = q.text || 'Untitled Question Prompt';
        const qOpts = Array.isArray(q.options) ? q.options : [];
        const correctIdx = typeof q.correct === 'number' ? q.correct : 0;

        const card = document.createElement('div');
        card.className = 'glass-card question-item-card';
        card.innerHTML = `
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span class="question-badge">Question ${idx + 1}</span>
              <div style="display: flex; gap: 8px; align-items: center;">
                <button type="button" class="btn-edit-q" data-id="${q.id || idx}" style="background: none; border: none; color: #3b82f6; cursor: pointer; font-size: 12px; font-weight: bold; font-family: inherit; display: inline-flex; align-items: center;">
                  <img src="icons/document-edit-symbolic.svg" class="action-icon" alt="Edit"> Edit
                </button>
                <button type="button" class="btn-delete-q" data-id="${q.id || idx}" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 12px; font-weight: bold; font-family: inherit; display: inline-flex; align-items: center;">
                  <img src="icons/user-trash-symbolic.svg" class="action-icon" alt="Delete"> Delete
                </button>
              </div>
            </div>
            <div class="q-title">${qText}</div>
            <ul class="q-option-list" style="margin-top: 10px;">
              ${qOpts.map((opt, i) => `
                <li class="q-opt ${i === correctIdx ? 'correct' : ''}">
                  <strong>${prefixes[i] || i}.</strong> ${opt} ${i === correctIdx ? '✓ (Correct)' : ''}
                </li>
              `).join('')}
            </ul>
          </div>
        `;

        const btnEdit = card.querySelector('.btn-edit-q');
        if (btnEdit) {
          btnEdit.addEventListener('click', () => {
            openEditQuestionModal(q);
          });
        }

        const btnDelete = card.querySelector('.btn-delete-q');
        if (btnDelete) {
          btnDelete.addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete Question ${idx + 1}?`)) {
              dbQuestions.splice(idx, 1);
              saveQuestions();
              renderTeacherDashboard();
            }
          });
        }

        fragment.appendChild(card);
      });
      questionsListGrid.appendChild(fragment);
    }

    if (studentResultsTbody) {
      studentResultsTbody.innerHTML = '';
      if (dbResults.length === 0) {
        studentResultsTbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No student submission records found yet.</td></tr>`;
      } else {
        const fragment = document.createDocumentFragment();
        dbResults.forEach(res => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><strong>${res.studentName}</strong></td>
            <td>${res.timestamp}</td>
            <td>${res.score} / ${res.total}</td>
            <td><strong>${res.percentage}%</strong></td>
            <td>${res.violations}</td>
            <td><span class="badge ${res.violations === 0 ? 'badge-success' : 'badge-warning'}">${res.status}</span></td>
          `;
          fragment.appendChild(tr);
        });
        studentResultsTbody.appendChild(fragment);
      }
    }
  }

  const dashTabs = document.querySelectorAll('.dash-tab');
  dashTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dashTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.target;
      if (target === 'tab-questions') {
        state.questionBankUnlocked = true;
      }

      document.querySelectorAll('.dash-tab-content').forEach(c => {
        if (c.id === target) c.classList.remove('hidden');
        else c.classList.add('hidden');
      });

      renderTeacherDashboard();
    });
  });

  const btnAddQ = document.getElementById('btn-teacher-add-q');
  if (btnAddQ) {
    btnAddQ.addEventListener('click', () => {
      const modal = document.getElementById('modal-add-question');
      if (modal) modal.classList.remove('hidden');
    });
  }

  document.querySelectorAll('.btn-close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('hidden');
    });
  });

  const formAddQ = document.getElementById('form-add-question');
  if (formAddQ) {
    formAddQ.addEventListener('submit', (e) => {
      e.preventDefault();

      const text = document.getElementById('input-q-text').value.trim();
      const optA = document.getElementById('input-opt-a').value.trim();
      const optB = document.getElementById('input-opt-b').value.trim();
      const optC = document.getElementById('input-opt-c').value.trim();
      const optD = document.getElementById('input-opt-d').value.trim();

      const correctRadio = document.querySelector('input[name="correct-opt"]:checked');
      const correctIndex = correctRadio ? parseInt(correctRadio.value, 10) : 0;

      if (!text || !optA || !optB || !optC || !optD) {
        alert('Please fill out the question prompt and all 4 options (A, B, C, D).');
        return;
      }

      const newQ = {
        id: 'q_' + Date.now(),
        text: text,
        options: [optA, optB, optC, optD],
        correct: correctIndex
      };

      dbQuestions.push(newQ);
      saveQuestions();
      state.questionBankUnlocked = true;

      formAddQ.reset();
      const modal = document.getElementById('modal-add-question');
      if (modal) modal.classList.add('hidden');

      alert('🎉 New question added successfully! It is now live in your Question Bank.');
      renderTeacherDashboard();
    });
  }

  const formEditQ = document.getElementById('form-edit-question');
  if (formEditQ) {
    formEditQ.addEventListener('submit', (e) => {
      e.preventDefault();

      const qId = document.getElementById('edit-q-id').value;
      const text = document.getElementById('edit-q-text').value.trim();
      const optA = document.getElementById('edit-opt-a').value.trim();
      const optB = document.getElementById('edit-opt-b').value.trim();
      const optC = document.getElementById('edit-opt-c').value.trim();
      const optD = document.getElementById('edit-opt-d').value.trim();

      const correctRadio = document.querySelector('input[name="edit-correct-opt"]:checked');
      const correctIndex = correctRadio ? parseInt(correctRadio.value, 10) : 0;

      if (!text || !optA || !optB || !optC || !optD) {
        alert('Please fill out the question prompt and all 4 options (A, B, C, D).');
        return;
      }

      const qIndex = dbQuestions.findIndex(q => q.id === qId);
      if (qIndex !== -1) {
        dbQuestions[qIndex].text = text;
        dbQuestions[qIndex].options = [optA, optB, optC, optD];
        dbQuestions[qIndex].correct = correctIndex;
      }

      saveQuestions();
      state.questionBankUnlocked = true;

      formEditQ.reset();
      const modal = document.getElementById('modal-edit-question');
      if (modal) modal.classList.add('hidden');

      alert('✏️ Question updated successfully!');
      renderTeacherDashboard();
    });
  }

  /* --------------------------------------------------------------------------
     10. APP INITIALIZATION & SESSION RESTORATION
     -------------------------------------------------------------------------- */
  applySettings();

  try {
    const savedUser = sessionStorage.getItem('gptk_session_user');
    const savedView = sessionStorage.getItem('gptk_active_view');
    if (savedUser && savedView && savedView !== 'login') {
      state.currentUser = JSON.parse(savedUser);
      switchView(savedView);
    } else {
      switchView('login');
    }
  } catch (e) {
    switchView('login');
  }

});
