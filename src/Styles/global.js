import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.title};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    padding: 0;
    transition: background 0.35s ease, color 0.35s ease;
    overflow-y: scroll;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
}

body::-webkit-scrollbar {
    width: 4px;
}
body::-webkit-scrollbar-track {
    background: transparent;
}
body::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.typeBoxText}40;
    border-radius: 2px;
}

a {
    text-decoration: none;
    color: inherit;
}

/* ─────────────────────── Layout canvas ─────────────────────── */

.canvas {
    display: grid;
    min-height: 100vh;
    grid-template-rows: auto 1fr auto;
    gap: 1.25rem;
    padding: 2rem;
    width: 100vw;
    text-align: center;
    align-items: center;
}

/* ─────────────────────── Header ─────────────────────── */

.header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    width: min(1000px, 100%);
    align-self: stretch;
    margin-left: auto;
    margin-right: auto;
    height: 72px;
    align-items: center;
    gap: 1.25rem;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 0.65rem;
}

.header-center {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
}



.logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

.logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 1.65rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: ${({ theme }) => theme.title};
    user-select: none;
}

.logo-svg-icon {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.title};
    flex-shrink: 0;
}

.logo-icon {
    font-size: 1.4rem;
    line-height: 1;
}

.logo-image {
    display: none;
}


/* ─────────────────────── Header mode selectors ─────────────────────── */

.lb-icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background: ${({ theme }) => theme.title}18;
    color: ${({ theme }) => theme.title};
    border: 1.5px solid ${({ theme }) => theme.title}55;
    cursor: pointer;
    transition: all 0.18s ease;
    flex-shrink: 0;
}

.lb-icon-btn:hover {
    color: ${({ theme }) => theme.title};
    border-color: ${({ theme }) => theme.title};
    background: ${({ theme }) => theme.title}28;
    transform: scale(1.08);
}

.hmode-group {
    display: flex;
    align-items: center;
    gap: 0;
    background: ${({ theme }) => theme.typeBoxText}12;
    padding: 0.18rem;
    border-radius: 8px;
}

.hmode {
    background: transparent;
    border: none;
    padding: 0.2rem 0.7rem;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 500;
    color: ${({ theme }) => theme.typeBoxText};
    cursor: pointer;
    transition: all 0.18s ease;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.01em;
    line-height: 1.4;
}

.hmode:hover {
    color: ${({ theme }) => theme.title};
}

.hmode-active {
    background: ${({ theme }) => theme.title}25;
    color: ${({ theme }) => theme.title} !important;
}

.header-divider {
    width: 1px;
    height: 16px;
    background: ${({ theme }) => theme.typeBoxText}30;
    margin: 0 0.65rem;
    flex-shrink: 0;
}

.hval-group {
    display: flex;
    align-items: center;
    gap: 0;
}

.hval {
    background: transparent;
    border: none;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    color: ${({ theme }) => theme.typeBoxText};
    cursor: pointer;
    transition: all 0.18s ease;
    font-family: 'JetBrains Mono', monospace;
    line-height: 1.4;
}

.hval:hover {
    color: ${({ theme }) => theme.title};
}

.hval-active {
    background: ${({ theme }) => theme.title}20;
    color: ${({ theme }) => theme.title} !important;
    border: 1px solid ${({ theme }) => theme.title}45 !important;
}

/* ─────────────────────── Counter bar (above typing box) ─────────────────────── */

.counter-bar {
    width: min(1000px, 100%);
    margin-left: auto;
    margin-right: auto;
    padding: 0 0 0.5rem 0;
}

.counter {
    font-size: 1.6rem;
    font-weight: 600;
    color: ${({ theme }) => theme.title};
    font-family: 'JetBrains Mono', monospace;
    font-variant-numeric: tabular-nums;
    opacity: 0.8;
}

/* ─────────────────────── Typing box ─────────────────────── */

.type-box {
    display: block;
    max-width: 1000px;
    height: 160px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    position: relative;
    cursor: text;
    mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 72%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 72%, transparent 100%);
}

.words {
    font-size: 1.7rem;
    line-height: 2.55rem;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    color: ${({ theme }) => theme.typeBoxText};
    font-family: 'JetBrains Mono', monospace;
    font-weight: 400;
    letter-spacing: 0.01em;
}

.word {
    margin: 3px 5px;
    padding: 0 2px;
}

.hidden-input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
    pointer-events: none;
}

.correct {
    color: #e4e4e4;
}

.incorrect {
    color: #f55353;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: #f5535380;
}

.current {
    border-left: 2px solid ${({ theme }) => theme.title};
    animation: blinkLeft 1s step-end infinite;

    @keyframes blinkLeft {
        0%, 100% { border-left-color: ${({ theme }) => theme.title}; }
        50%       { border-left-color: transparent; }
    }
}

.right-current {
    border-right: 2px solid ${({ theme }) => theme.title};
    animation: blinkRight 1s step-end infinite;

    @keyframes blinkRight {
        0%, 100% { border-right-color: ${({ theme }) => theme.title}; }
        50%       { border-right-color: transparent; }
    }
}

.skipped {
    color: ${({ theme }) => theme.typeBoxText}70;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-style: wavy;
    text-decoration-color: ${({ theme }) => theme.typeBoxText}44;
}

/* ─────────────────────── Stats ─────────────────────── */

.stats-box {
    display: flex;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    background: ${({ theme }) => theme.typeBoxText}0a;
    border: 1px solid ${({ theme }) => theme.typeBoxText}22;
    border-radius: 16px;
    overflow: hidden;
}

.left-stats {
    width: 28%;
    padding: 2.5rem 2rem;
    border-right: 1px solid ${({ theme }) => theme.typeBoxText}22;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    text-align: left;
    justify-content: center;
}

.right-stats {
    width: 72%;
    padding: 1.5rem 1.75rem;
    display: flex;
    align-items: center;
}

.title {
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.13em;
    color: ${({ theme }) => theme.typeBoxText};
    margin-bottom: 0.1rem;
}

.subtitle {
    font-size: 2.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.title};
    line-height: 1;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
}

.subtitle-sm {
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.title};
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: -0.01em;
}

.restart-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.45rem 1.1rem;
    border-radius: 8px;
    background: ${({ theme }) => theme.title}1a;
    color: ${({ theme }) => theme.title};
    border: 1px solid ${({ theme }) => theme.title}44;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s ease;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    width: fit-content;
    font-family: 'Inter', sans-serif;
}

.restart-btn:hover {
    background: ${({ theme }) => theme.title}2e;
    border-color: ${({ theme }) => theme.title}88;
}

/* ─────────────────────── Footer ─────────────────────── */

.footer {
    display: flex;
    flex-direction: column;
    align-self: end;
    width: min(1000px, 100%);
    margin-left: auto;
    margin-right: auto;
    gap: 0.5rem;
}

.intructions {
    display: flex;
    justify-content: center;
}

.hint {
    font-size: 0.78rem;
    color: ${({ theme }) => theme.typeBoxText};

    kbd {
        background: ${({ theme }) => theme.typeBoxText}22;
        color: ${({ theme }) => theme.typeBoxText};
        padding: 2px 6px;
        border-radius: 4px;
        border: 1px solid ${({ theme }) => theme.typeBoxText}40;
        font-size: 0.72rem;
        font-family: 'JetBrains Mono', monospace;
    }
}

.actual-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0 0.2rem;
    border-top: 1px solid ${({ theme }) => theme.typeBoxText}18;
}

.links {
    display: flex;
    gap: 0.5rem;
    color: ${({ theme }) => theme.typeBoxText};

    a {
        color: inherit;
        transition: color 0.2s ease;
        display: flex;
        align-items: center;
    }

    a:hover {
        color: ${({ theme }) => theme.title};
    }
}

/* ─────────────────────── Dialog ─────────────────────── */

.instruction {
    color: ${({ theme }) => theme.title};
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    line-height: 2;
}

/* ─────────────────────── User / compare pages ─────────────────────── */

.user-profile {
    width: min(1000px, 100%);
    margin: auto;
    display: flex;
    min-height: 15rem;
    background: ${({ theme }) => theme.typeBoxText}10;
    border: 1px solid ${({ theme }) => theme.typeBoxText}22;
    border-radius: 16px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.user {
    width: 50%;
    display: flex;
    margin: 2rem 0;
    font-size: 1.4rem;
    padding: 1.5rem;
    border-right: 1px solid ${({ theme }) => theme.typeBoxText}30;
}

.info {
    width: 60%;
    padding: 1rem;
}

.picture {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.total-tests {
    width: 50%;
    font-size: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    color: ${({ theme }) => theme.title};
}

.graph, .table {
    width: min(1000px, 100%);
    margin: auto;
}

.center-of-screen {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 3rem;
    color: ${({ theme }) => theme.typeBoxText};
}

.compare-btn {
    cursor: pointer;
    color: ${({ theme }) => theme.background};
    background: ${({ theme }) => theme.title};
    padding: 0.28rem 0.65rem;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 600;
    transition: opacity 0.18s ease;
    letter-spacing: 0.03em;
}

.compare-btn:hover {
    opacity: 0.82;
}

.active {
    border: 1px solid ${({ theme }) => theme.title}55;
    padding: 0.3rem 0.85rem;
    border-radius: 6px;
    color: ${({ theme }) => theme.title};
    background: ${({ theme }) => theme.title}18;
}

.github-button {
    width: 400px;
    text-align: center;
    background: ${({ theme }) => theme.title};
    color: ${({ theme }) => theme.background};
    height: 3rem;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
}

/* ─────────────────────── Header extras ─────────────────────── */

.header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
}

/* shared pill base for all header action buttons */
.account-signin-btn,
.account-profile-btn,
.account-logout-btn {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    border-radius: 8px;
    padding: 0.38rem 0.75rem;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s ease;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.02em;
    white-space: nowrap;
}

/* Sign In button (logged-out state) */
.account-signin-btn {
    background: ${({ theme }) => theme.title}1a;
    color: ${({ theme }) => theme.title};
    border: 1px solid ${({ theme }) => theme.title}40;
}
.account-signin-btn:hover {
    background: ${({ theme }) => theme.title}30;
    border-color: ${({ theme }) => theme.title}75;
}

/* Profile pill (logged-in state) */
.account-controls {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.account-profile-btn {
    background: ${({ theme }) => theme.typeBoxText}14;
    color: ${({ theme }) => theme.title};
    border: 1px solid ${({ theme }) => theme.typeBoxText}30;
    gap: 0.5rem;
}
.account-profile-btn:hover {
    background: ${({ theme }) => theme.typeBoxText}22;
    border-color: ${({ theme }) => theme.title}45;
}

.account-avatar {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${({ theme }) => theme.title};
    color: ${({ theme }) => theme.background};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.68rem;
    font-weight: 800;
    flex-shrink: 0;
    line-height: 1;
}

.account-name {
    max-width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.8rem;
    font-weight: 500;
    color: ${({ theme }) => theme.title};
    opacity: 0.85;
}

/* Sign Out button */
.account-logout-btn {
    background: transparent;
    color: #f87171;
    border: 1px solid #f8717130;
}
.account-logout-btn:hover {
    background: #f8717114;
    border-color: #f8717155;
    color: #fc8f8f;
}

/* ─────────────────────── Leaderboard page ─────────────────────── */

.lb-page {
    min-height: 100vh;
    background: ${({ theme }) => theme.background};
    display: flex;
    justify-content: center;
    padding: 2rem;
}

.lb-container {
    width: min(900px, 100%);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.lb-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem 0 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.typeBoxText}20;
}

.lb-back-btn {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    background: transparent;
    color: ${({ theme }) => theme.typeBoxText};
    border: 1px solid ${({ theme }) => theme.typeBoxText}30;
    border-radius: 8px;
    padding: 0.35rem 0.8rem;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s ease;
    font-family: 'Inter', sans-serif;
}

.lb-back-btn:hover {
    color: ${({ theme }) => theme.title};
    border-color: ${({ theme }) => theme.title}50;
}

.lb-title-area {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.title};
}

.lb-heading {
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: -0.02em;
}

.lb-live-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    margin-right: 0.6rem;
    box-shadow: 0 0 0 0 #22c55e88;
    animation: lbPulse 2s ease infinite;

    @keyframes lbPulse {
        0%   { box-shadow: 0 0 0 0 #22c55e88; }
        70%  { box-shadow: 0 0 0 8px transparent; }
        100% { box-shadow: 0 0 0 0 transparent; }
    }
}

.lb-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.2rem;
}

.lb-your-rank {
    font-size: 0.82rem;
    color: ${({ theme }) => theme.title};
    font-weight: 500;
}

.lb-updated {
    font-size: 0.72rem;
    color: ${({ theme }) => theme.typeBoxText};
}

/* ── Table ── */

.lb-table {
    background: ${({ theme }) => theme.typeBoxText}08;
    border: 1px solid ${({ theme }) => theme.typeBoxText}20;
    border-radius: 14px;
    overflow: hidden;
}

.lb-formula-note {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.typeBoxText};
    background: ${({ theme }) => theme.typeBoxText}0d;
    border: 1px solid ${({ theme }) => theme.typeBoxText}20;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    text-align: center;
    letter-spacing: 0.01em;
}

.lb-row {
    display: grid;
    grid-template-columns: 60px 1fr 90px 90px 90px 60px 90px;
    align-items: center;
    padding: 0.75rem 1.25rem;
    gap: 0.5rem;
    transition: background 0.15s ease;
}

.lb-head-row {
    background: ${({ theme }) => theme.typeBoxText}12;
    border-bottom: 1px solid ${({ theme }) => theme.typeBoxText}20;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.typeBoxText};
}

.lb-data-row {
    border-bottom: 1px solid ${({ theme }) => theme.typeBoxText}12;
    color: #d4d4d4;
    font-size: 0.88rem;
}

.lb-data-row:last-child {
    border-bottom: none;
}

.lb-data-row:hover {
    background: ${({ theme }) => theme.typeBoxText}0e;
}

/* Top 3 highlights */
.lb-row-gold {
    background: #FFD70010;
    border-left: 3px solid #FFD700;
}
.lb-row-gold:hover {
    background: #FFD70018;
}

.lb-row-silver {
    background: #C0C0C008;
    border-left: 3px solid #C0C0C0;
}

.lb-row-bronze {
    background: #CD7F3208;
    border-left: 3px solid #CD7F32;
}

/* Current user highlight */
.lb-row-you {
    background: ${({ theme }) => theme.title}12;
    border-left: 3px solid ${({ theme }) => theme.title};
}
.lb-row-you:hover {
    background: ${({ theme }) => theme.title}1e;
}

/* Columns */
.lb-col {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.lb-col-rank {
    font-size: 1.1rem;
    text-align: center;
}

.lb-rank-num {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.typeBoxText};
    font-family: 'JetBrains Mono', monospace;
}

.lb-score-val {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.title};
    font-family: 'JetBrains Mono', monospace;
    font-variant-numeric: tabular-nums;
}

.lb-col-wpm {
    font-family: 'JetBrains Mono', monospace;
    font-variant-numeric: tabular-nums;
    font-weight: 500;
    color: #d4d4d4;
}

.lb-col-acc {
    font-family: 'JetBrains Mono', monospace;
    font-variant-numeric: tabular-nums;
}

.lb-col-chars {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.typeBoxText};
    font-family: 'JetBrains Mono', monospace;
}

.lb-col-date {
    font-size: 0.78rem;
    color: ${({ theme }) => theme.typeBoxText};
}

.lb-player-name {
    font-weight: 500;
    color: #e4e4e4;
}

.lb-you-tag {
    display: inline-block;
    margin-left: 0.5rem;
    padding: 0.05rem 0.4rem;
    background: ${({ theme }) => theme.title}25;
    color: ${({ theme }) => theme.title};
    border: 1px solid ${({ theme }) => theme.title}50;
    border-radius: 4px;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    vertical-align: middle;
}

/* Empty / loading states */
.lb-empty {
    padding: 3rem;
    text-align: center;
    color: ${({ theme }) => theme.typeBoxText};
    font-size: 1rem;
}

.lb-loading-dots::after {
    content: '';
    animation: ldots 1.4s steps(4, end) infinite;
    @keyframes ldots {
        0%   { content: ''; }
        25%  { content: '.'; }
        50%  { content: '..'; }
        75%  { content: '...'; }
        100% { content: ''; }
    }
}

.lb-login-hint {
    text-align: center;
    font-size: 0.82rem;
    color: ${({ theme }) => theme.typeBoxText};
    padding: 0.5rem;
    border: 1px dashed ${({ theme }) => theme.typeBoxText}30;
    border-radius: 8px;
}

/* ─────────────────────── Encouragement toasts ─────────────────────── */

@keyframes toastPop {
    0%   { opacity: 0; transform: translateX(-50%) scale(0.4);                          }
    20%  { opacity: 1; transform: translateX(-50%) scale(1.12);                         }
    32%  { transform: translateX(-50%) scale(0.94);                                     }
    44%  { transform: translateX(-50%) scale(1);                                        }
    75%  { opacity: 1; transform: translateX(-50%) translateY(-20px) scale(1);          }
    100% { opacity: 0; transform: translateX(-50%) translateY(-38px) scale(0.88);       }
}

/* Fixed-height container — toasts are absolutely placed inside it */
.encourage-space {
    position: relative;
    height: 160px;
    width: min(1000px, 100%);
    margin-left: auto;
    margin-right: auto;
    pointer-events: none;
    overflow: hidden;
}

.encourage-toast {
    position: absolute;
    transform: translateX(-50%);
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.52rem 1.2rem 0.52rem 0.85rem;
    border-radius: 999px;
    background: ${({ theme }) => theme.background}ee;
    border: 1px solid ${({ theme }) => theme.title}65;
    backdrop-filter: blur(14px);
    box-shadow: 0 4px 28px rgba(0,0,0,0.45), 0 0 0 1px ${({ theme }) => theme.title}1a;
    animation: toastPop 2.7s ease-out forwards;
    white-space: nowrap;
}

.encourage-emoji {
    font-size: 1.4rem;
    line-height: 1;
}

.encourage-text {
    font-size: 0.86rem;
    font-weight: 700;
    color: ${({ theme }) => theme.title};
    letter-spacing: 0.04em;
}

/* ─────────────────────── User Profile Page ─────────────────────── */

.up-page {
    min-height: 100vh;
    background: ${({ theme }) => theme.background};
    padding: 0 2rem 4rem;
    max-width: 1140px;
    margin: 0 auto;
}

.up-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 0 1.25rem;
    border-bottom: 1px solid ${({ theme }) => theme.typeBoxText}20;
    margin-bottom: 2rem;
}

.up-page-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.title};
    font-family: 'Syne', sans-serif;
    letter-spacing: -0.02em;
}

.up-body {
    display: flex;
    gap: 1.75rem;
    align-items: flex-start;
    margin-bottom: 2rem;
}

.up-sidebar {
    flex: 0 0 280px;
}

.up-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.up-charts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.up-chart-box {
    background: ${({ theme }) => theme.typeBoxText}08;
    border: 1px solid ${({ theme }) => theme.typeBoxText}20;
    border-radius: 12px;
    padding: 1rem 1.1rem;
}

.up-chart-label {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.13em;
    color: ${({ theme }) => theme.typeBoxText};
    margin-bottom: 0.65rem;
}

.up-history {
    margin-top: 0.25rem;
}

.up-section-title {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.13em;
    color: ${({ theme }) => theme.typeBoxText};
    margin-bottom: 0.65rem;
}

.up-no-tests {
    text-align: center;
    padding: 4rem 2rem;
    color: ${({ theme }) => theme.typeBoxText};
    font-size: 1rem;
}

/* ─── Profile Card (UserInfo) ─── */

.up-profile-card {
    background: ${({ theme }) => theme.typeBoxText}08;
    border: 1px solid ${({ theme }) => theme.typeBoxText}20;
    border-radius: 16px;
    padding: 1.75rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
}

.up-avatar-wrap {
    position: relative;
    width: 88px;
    height: 88px;
    border-radius: 50%;
    cursor: pointer;
    flex-shrink: 0;
    margin-bottom: 0.25rem;
}

.up-avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.up-avatar-fallback {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${({ theme }) => theme.title};
    color: ${({ theme }) => theme.background};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 800;
    font-family: 'Syne', sans-serif;
}

.up-avatar-overlay {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.18s ease;
    color: #fff;
}

.up-avatar-wrap:hover .up-avatar-overlay {
    opacity: 1;
}

.up-uploading-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
    animation: upPulse 0.8s ease infinite alternate;
    @keyframes upPulse { from { opacity: 0.3; } to { opacity: 1; } }
}

.up-avatar-hint {
    font-size: 0.68rem;
    color: ${({ theme }) => theme.typeBoxText};
    opacity: 0.6;
}

/* Name row */
.up-name-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.25rem;
}

.up-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.title};
    font-family: 'Syne', sans-serif;
    letter-spacing: -0.02em;
}

.up-edit-icon-btn {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.typeBoxText};
    cursor: pointer;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    border-radius: 4px;
    opacity: 0.5;
    transition: opacity 0.15s ease, color 0.15s ease;
}

.up-edit-icon-btn:hover {
    opacity: 1;
    color: ${({ theme }) => theme.title};
}

.up-name-edit-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-top: 0.25rem;
}

.up-name-input {
    width: 100%;
    background: ${({ theme }) => theme.typeBoxText}14;
    border: 1px solid ${({ theme }) => theme.typeBoxText}40;
    border-radius: 8px;
    color: ${({ theme }) => theme.title};
    font-size: 1.1rem;
    font-weight: 700;
    padding: 0.4rem 0.75rem;
    font-family: 'Syne', sans-serif;
    outline: none;
    text-align: center;
}

.up-name-input:focus {
    border-color: ${({ theme }) => theme.title}60;
}

.up-name-actions {
    display: flex;
    gap: 0.4rem;
    justify-content: center;
}

.up-action-save {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    background: ${({ theme }) => theme.title};
    color: ${({ theme }) => theme.background};
    border: none;
    border-radius: 6px;
    padding: 0.3rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.15s ease;
}

.up-action-save:hover { opacity: 0.85; }

.up-action-cancel {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    background: transparent;
    color: ${({ theme }) => theme.typeBoxText};
    border: 1px solid ${({ theme }) => theme.typeBoxText}30;
    border-radius: 6px;
    padding: 0.3rem 0.75rem;
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.15s ease;
}

.up-action-cancel:hover {
    border-color: ${({ theme }) => theme.typeBoxText}60;
    color: ${({ theme }) => theme.title};
}

.up-email {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.typeBoxText};
    opacity: 0.75;
}

.up-divider {
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.typeBoxText}20;
    margin: 0.25rem 0;
}

.up-meta-row {
    display: flex;
    gap: 1.5rem;
    width: 100%;
    justify-content: center;
}

.up-meta-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
}

.up-meta-label {
    font-size: 0.62rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.typeBoxText};
}

.up-meta-value {
    font-size: 0.88rem;
    font-weight: 600;
    color: ${({ theme }) => theme.title};
}

/* Bio */
.up-bio-section {
    width: 100%;
}

.up-bio-heading {
    font-size: 0.62rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.typeBoxText};
    margin-bottom: 0.4rem;
}

.up-bio-display {
    display: flex;
    align-items: flex-start;
    gap: 0.4rem;
    cursor: pointer;
    font-size: 0.83rem;
    color: ${({ theme }) => theme.typeBoxText};
    line-height: 1.5;
    padding: 0.5rem 0.6rem;
    border-radius: 8px;
    border: 1px solid transparent;
    transition: border-color 0.15s ease, background 0.15s ease;
}

.up-bio-display:hover {
    border-color: ${({ theme }) => theme.typeBoxText}30;
    background: ${({ theme }) => theme.typeBoxText}08;
}

.up-bio-empty {
    opacity: 0.4;
    font-style: italic;
}

.up-bio-edit-icon {
    flex-shrink: 0;
    margin-top: 0.1rem;
    opacity: 0.4;
}

.up-bio-textarea {
    width: 100%;
    background: ${({ theme }) => theme.typeBoxText}12;
    border: 1px solid ${({ theme }) => theme.typeBoxText}40;
    border-radius: 8px;
    color: ${({ theme }) => theme.title};
    font-size: 0.83rem;
    padding: 0.5rem 0.7rem;
    font-family: 'Inter', sans-serif;
    resize: vertical;
    min-height: 70px;
    outline: none;
    line-height: 1.5;
}

.up-bio-textarea:focus {
    border-color: ${({ theme }) => theme.title}50;
}

.up-bio-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.4rem;
    justify-content: flex-end;
}

.up-bio-count {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.typeBoxText};
    margin-right: auto;
}

/* ─────────────────────── Stats Cards ─────────────────────── */

.sc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
}

.sc-card {
    background: ${({ theme }) => theme.typeBoxText}08;
    border: 1px solid ${({ theme }) => theme.typeBoxText}20;
    border-radius: 12px;
    padding: 1rem 1.1rem;
    transition: border-color 0.18s ease;
}

.sc-card:hover {
    border-color: ${({ theme }) => theme.typeBoxText}38;
}

.sc-card-dim {
    opacity: 0.7;
}

.sc-label {
    font-size: 0.62rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.13em;
    color: ${({ theme }) => theme.typeBoxText};
    margin-bottom: 0.4rem;
}

.sc-value {
    font-size: 2rem;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
    line-height: 1;
}

.sc-unit {
    font-size: 1rem;
    margin-left: 0.1rem;
    opacity: 0.7;
}

/* Leaderboard avatar */
.lb-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
}

.lb-avatar-initial {
    background: ${({ theme }) => theme.title}30;
    color: ${({ theme }) => theme.title};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.72rem;
    font-weight: 700;
}

.lb-col-name {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.lb-row-clickable {
    cursor: pointer;
}
`;
