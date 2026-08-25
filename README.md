# 🎓 GPTK Quiz Portal - Institutional Proctored Examination Engine

> A modern, proctored, anti-cheat institutional assessment web application built for educators and students. Features San Francisco & Helvetica Neue typography, MacTahoe SVG icons, ambient motion background, glassmorphism surfaces, proctored tab-switch violation tracking, full-screen lockdown, quick-jump question navigation, and real-time scoreboards.

Designed for **100% Client-Side Deployment on GitHub Pages**.

---

## 🌟 Key Features & Specifications

### 👩‍🏫 1. Teacher Command Center & Question Bank
- **Supervisor Access**: Course supervisor management dashboard for course faculty.
- **Question Bank Creator**: Add custom quiz questions with 4 options (A, B, C, D) and assign the correct option.
- **Edit & Delete Controls**: `✏️ Edit` modal allows modifying question text and options on the fly; `🗑️ Delete` removes questions.
- **Dynamic Question Sync**: Added and edited questions immediately reflect in student exams and question management cards.
- **Student Scoreboard**: Real-time table displaying candidate name, submission timestamp, score percentage, and security violation status.

### 👨‍🎓 2. Student Anti-Cheat Proctored Quiz Portal
- **Student Examination Portal**: Portal login for registered students and new student account creation.
- **Centered Login Card**: Centered "Welcome Back" login card with username placeholder `e.g. King-Jeevan`.
- **Auto-Reset & Logout**: Logging out clears form fields and routes directly to the main login card.
- **5-Second Verification Countdown**: Instruction timer with circular SVG progress ring and Academic Honor Code agreement.
- **Quick-Jump Navigation Pills**: `Q1`, `Q2`, `Q3`... pills at the top allow jumping between questions and show checkmarks (`✓`) for answered questions.
- **Auto Full-Screen Lockdown**: Locks browser in full-screen upon starting exam.
- **Strict Anti-Copy Security**:
  - CSS `user-select: none` disables text highlighting.
  - Right-click context menu is completely disabled.
  - Copy/Paste and Inspect shortcuts (`Ctrl+C`, `Ctrl+V`, `Ctrl+U`, `F12`, `Ctrl+Shift+I`) are strictly blocked.
- **Tab-Switch Violation Monitoring**: Detects tab switching or window blur, records warnings, and auto-submits exam if strict threshold (2 warnings) is exceeded.

### 📊 3. Results & Transcript Review
- **Official Transcript Banner**: Score percentage, marks fraction, and security integrity honor status.
- **Detailed Question Breakdown**: Itemized analysis showing question statements, student choices, and correct options.

### 🎨 4. Design System, Icons & Widescreen Layout
- **MacTahoe SVG Icons**: Native vector SVG icon set imported from MacTahoe theme (`icons/`).
- **San Francisco & System Typography**: Modern UI font stack featuring San Francisco, Helvetica Neue, Canela Deck, Arima Koshi, and Adelle Sans Devanagari.
- **Widescreen Expansion**: Full 1600px widescreen layout container with expanded card widths.
- **Subtle Motion Background**: Floating ambient glowing background orbs (`.orb-1`, `.orb-2`, `.orb-3`).
- **Dark & Light Modes**: Seamless header toggle between Deep Indigo Dark Glass and Parchment Light Glass with click-flip animations.

---

## 🚀 Deployment

Designed to run natively on any static web host or **GitHub Pages**.
