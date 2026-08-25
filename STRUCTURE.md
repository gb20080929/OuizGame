# 🌐 GPTK Quiz Portal - Web Page Structure & Architectural Reference

This document provides a comprehensive structural, architectural, and component breakdown of the **GPTK Quiz Portal** web application (`D:\GPTK-QUIZ`).

---

## 📁 Directory & File Organization

```
D:\GPTK-QUIZ\
├── 📄 index.html                # Main single-page application (SPA) HTML layout
├── 🎨 style.css                 # System UI glassmorphism design system & CSS tokens
├── ⚡ app.js                    # Core JS engine: database, anti-cheat, canvas & UI state
├── 📖 README.md                 # Project documentation & GitHub Pages deployment guide
├── 📋 STRUCTURE.md              # Complete web page structure & component reference
├── 🛠️ implementation_plan.md    # Development implementation plan & technical specs
├── 📝 walkthrough.md           # Features walkthrough & verification summary
└── 📁 icons/                    # Vector SVG icon library (MacTahoe theme icons)
    ├── quiz-logo.svg
    ├── dark-mode-toggle.svg
    ├── light-mode-toggle.svg
    ├── user-custom.svg
    ├── question-custom.svg
    ├── score-average.svg
    ├── system-lock-screen-symbolic.svg
    ├── system-log-out-symbolic.svg
    ├── am-dialog-warning-symbolic.svg
    ├── auth-sim-locked-symbolic.svg
    ├── document-edit-symbolic.svg
    └── user-trash-symbolic.svg
```

---

## 🧱 Single-Page Application (SPA) View Architecture

The application is structured as a Single-Page Application (`index.html`) driven by active state switching (`.view-section` classes in `app.js`).

```
                              ┌─────────────────────────────┐
                              │  Header Navbar (#navbar)    │
                              └──────────────┬──────────────┘
                                             │
      ┌──────────────────┬───────────────────┼───────────────────┬──────────────────┐
      ▼                  ▼                   ▼                   ▼                  ▼
┌──────────────┐  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│    VIEW 1    │  │    VIEW 2    │   │    VIEW 3    │   │    VIEW 4    │   │    VIEW 5    │
│  Auth Portal │  │ Teacher Cmd  │   │ Instructions │   │ Quiz Portal  │   │   Results    │
│ (#view-login)│  │(#view-teacher│   │(#view-inst..│   │ (#view-quiz) │   │(#view-result)│
└──────────────┘  └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
```

---

## 🔍 DOM Component Hierarchy (`index.html`)

### 1. Global Shell & Persistent Layers
* **Background Particles**: `<canvas id="bg-canvas">` (Neural-net particle animation)
* **Ambient Glow Orbs**: `<div class="ambient-orb orb-1..4">` (Floating background blur shapes)
* **Top Header Navbar** (`header.navbar.glass-panel`):
  * **Brand Crest**: Logo SVG + Title (`GPTK Quiz`)
  * **Nav Actions**: Logged-in user badge, Dark/Light mode toggle pill, Logout button.

---

### 2. View 1: Auth Entrance Portal (`#view-login`)
* **Sliding Double-Panel Container** (`#container`):
  * **Student Sign-In Form** (`.sign-in-container`): Username/Roll ID, Password, Login CTA, link to register.
  * **Student Registration Form** (`.sign-up-container`): Full Name, Roll ID, Password, Account Creation CTA.
  * **Overlay Slider Container** (`.overlay-container`):
    * **Overlay Panel Left**: Return to Student Sign-In.
    * **Overlay Panel Right**: **Teacher Portal Login Form** (Username `Admin`, Password `CSE@2026`).

---

### 3. View 2: Teacher Command Center (`#view-teacher`)
* **Dashboard Header**: Title + `➕ Add New Question` Modal Trigger Button.
* **Executive Overview Stat Cards**:
  1. Active Question Bank Count (`#stat-total-questions`)
  2. Student Exams Completed (`#stat-total-students`)
  3. Class Average Score Percentage (`#stat-avg-score`)
* **Dashboard Tab Bar** (`.tab-nav.glass-pill`):
  * Tab 1: `Student Scoreboard` (`#tab-results`)
  * Tab 2: `Question Bank` (`#tab-questions`)
* **Tab Content 1 (Scoreboard)**: Responsive data table displaying student candidates, timestamps, scores, percentage, and proctor security violation status.
* **Tab Content 2 (Question Bank)**: Grid of question cards displaying question statements, 4 options (A, B, C, D), correct option indicators, and `✏️ Edit` / `🗑️ Delete` actions.

---

### 4. View 3: Mandatory Instruction & Lockout Screen (`#view-instruction`)
* **Circular Progress Countdown Timer**: SVG ring animation + numerical countdown (`5s`).
* **Examination Regulations List**:
  * Mandatory Full-Screen Lockdown rule.
  * Anti-Cheating shortcut blocking rule.
  * Tab Switch & focus loss violation warning rule.
* **Academic Honor Code Agreement**: Checkbox requirement (`#chk-agree`).
* **Start Exam CTA Button**: Disabled until timer reaches 0 and agreement is checked.

---

### 5. View 4: Student Proctored Quiz Room (`#view-quiz`)
* **Top Control Bar** (`.quiz-top-panel`):
  * Question progress indicator (`Q1 / Q5`).
  * Proctor Shield Status Badge (`Active & Monitored`).
  * Security Alert Counter Badge (`0 Warnings`).
  * 45-second Per-Question Timer (`⏱️ 45s`).
* **Question Quick-Jump Pills Bar** (`#quiz-nav-pills`): Interactive pills (`Q1`, `Q2`...) showing checkmarks (`✓`) for answered questions.
* **Question Paper Card**:
  * Question tag & single choice mark indicator.
  * Active question statement prompt.
  * 4 Option Buttons (`Option A`, `Option B`, `Option C`, `Option D`).
* **Footer Controls**: Previous Question button, Progress fill bar (`%`), Next Question button, Submit Exam button.

---

### 6. View 5: Results & Transcript Review (`#view-results`)
* **Official Transcript Header**: Brand crest, title, and candidate identity pill (`Student: Vasu`).
* **3-Column Score & Security Grid**:
  1. Score Percentage & Marks Fraction (`0 / 0 Marks`).
  2. Security Honor Status (`Clean Record` or `Violations Logged`).
  3. Proctored Session Protocol status.
* **Actions Bar**: `Show Detailed Question Breakdown` toggle button and Exit button.
* **Collapsible Itemized Answer Breakdown** (`#answers-review-container`): Detailed list showing questions, student choices, correct answers, and status icons (`✅` / `❌`).

---

### 7. Modal Windows
1. **Modal 1: Add New Question** (`#modal-add-question`): Form to enter question statement, 4 options, and radio button selector for correct answer.
2. **Modal 2: Edit Question** (`#modal-edit-question`): Pre-filled form to update question text, options, and correct answer.
3. **Modal 3: Security Violation Alert** (`#modal-violation`): Warning popup when student exits full-screen or switches tabs, showing warning counter (`1 / 2`).

---

## 🎨 Design System & CSS Architecture (`style.css`)

### Color Palette & Tokens (`:root`)
* **Dark Glass Theme** (`dark-glass`): High-contrast midnight slate (`#0b132b`), royal indigo accent (`#6366f1`), frosted translucent surfaces (`rgba(28, 37, 65, 0.55)`).
* **Light Parchment Theme** (`light-glass`): Academic parchment background (`#f1f5f9`), deep indigo accent (`#4338ca`), crisp white frosted glass surfaces.

### Typography Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue",
             "Adelle Sans Devanagari", "Arima", "Canela Deck", "Inter", Arial, sans-serif;
```

---

## ⚡ JavaScript Engine & Performance (`app.js`)

1. **Canvas Particle Network Engine**:
   * Squared-distance checks (`distSq < 25600`) for 60fps physics performance.
   * Zero-GC canvas rendering (no object allocation inside animation frame loops).
   * Visibility-aware frame rendering (pauses automatically when tab is inactive).
2. **Data Persistence Schema** (`localStorage`):
   * `sq_questions`: Array of question objects (`id`, `text`, `options`, `correct`).
   * `sq_results`: Array of student submission records.
   * `sq_users`: Array of registered student profiles.
   * `sq_settings`: App settings (theme, timer duration, strictness).
3. **Real-Time Cross-Device & Multi-Tab Sync**:
   * `BroadcastChannel('gptk_quiz_channel')` for instant local tab sync.
   * Non-blocking REST Cloud Sync via JSONBin API (`PUT` / `GET` with 2.5s AbortController timeout).
4. **Anti-Cheat Proctoring Security**:
   * Blocks context menu (`contextmenu` event).
   * Blocks developer tools & shortcut keys (`F12`, `Ctrl+C`, `Ctrl+V`, `Ctrl+U`, `Ctrl+Shift+I`).
   * Enforces full-screen mode on exam start.
   * Monitors `visibilitychange`, `blur`, and `fullscreenchange` events to track violations.

---

## 🚀 Deployment

The web structure is 100% static, client-side HTML5/CSS3/JS, ready for instant zero-dependency hosting on **GitHub Pages**, Vercel, Netlify, or local web servers.
