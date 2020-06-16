import css from 'styled-jsx/css'

export default css.global`
html {
  touch-action: manipulation;
  font-feature-settings: 'case' 1, 'rlig' 1, 'calt' 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root {
  /* Spacing variables */
  --geist-gap: 16pt;
  --geist-gap-negative: -16pt;
  --geist-gap-half: 8pt;
  --geist-gap-half-negative: -8pt;
  --geist-gap-quarter: 4pt;
  --geist-gap-quarter-negative: -4pt;
  --geist-gap-double: 32pt;
  --geist-gap-double-negative: -32pt;

  --geist-page-margin: 16pt;
  --geist-page-width: 750pt;
  --geist-page-width-with-margin: 782pt;

  /* Breakpoints */
  --geist-breakpoint-mobile: 600px;
  --geist-breakpoint-tablet: 960px;

  /* Appearance */
  --geist-radius: 5px;
  --geist-marketing-radius: 8px;

  /* Colors */
  --geist-cyan: #79ffe1;
  --geist-purple: #f81ce5;
  --geist-violet: #7928ca;
  --geist-alert: #ff0080;
  --geist-marketing-gray: #fafbfc;

  /* Fonts */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  --font-mono: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace;
  --font-size-primary: 1rem;
  --font-size-small: 0.875rem;
  --line-height-primary: 1.5em;
  --line-height-small: 1.571em;
}

/* Helper classes */
a.geist-reset {
  text-decoration: none;
  color: inherit;
}

button.geist-reset {
  border: unset;
  background: unset;
  padding: unset;
  font: unset;
  text-align: unset;
}

hr.geist-hr-reset {
  margin: 0;
  border: none;
  border-bottom: 1px solid var(--accents-2);
  margin-top: -1px;
}

.geist-flex {
  display: flex;
}

.offset:before {
  display: block;
  content: ' ';
  height: 75px;
  margin-top: -75px;
  visibility: hidden;
}

.geist-visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  top: -1000px;
  left: -1000px;
  opacity: 0;
  overflow: hidden;
  white-space: nowrap;
  visibility: hidden;
}

.geist-ellipsis {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  max-width: 100%;
}

.geist-text-no-margin > *:first-child {
  margin-top: 0;
}

.geist-text-no-margin > *:last-child {
  margin-bottom: 0;
}

.geist-overflow-scroll {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.geist-overflow-scroll-x {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.geist-overflow-scroll-y {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.geist-inline-center {
  display: inline-flex;
  align-items: center;
}

.geist-hover-dim {
  transition: opacity 0.15s ease;
}

.geist-hover-dim:hover {
  opacity: 0.7;
}

/* Shadow that has hover effect on dark theme too */
.geist-shadow {
  box-shadow: var(--shadow-small);
}

.geist-shadow:hover, .geist-shadow:focus-within {
  box-shadow: var(--shadow-hover);
}

a.geist-secondary-link {
  line-height: normal;
  text-decoration-line: underline;
  text-decoration-style: dashed;
  text-decoration-color: var(--accents-3);
  text-decoration-skip-ink: none;
  transition: color 0.15s ease;
}

a.geist-secondary-link:hover {
  color: var(--accents-4);
}

/* Media Queries */
@media screen and (min-width: 601px) {
  .geist-show-on-mobile {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .geist-center-on-mobile {
    text-align: center;
  }
  .geist-hide-on-mobile {
    display: none;
  }
  .geist-overflow-reset-mobile {
    overflow: initial;
    -webkit-overflow-scrolling: initial;
  }
}

@media screen and (min-width: 961px) {
  .geist-show-on-tablet {
    display: none;
  }
}

@media screen and (max-width: 960px) {
  .geist-hide-on-tablet {
    display: none;
  }
}

/* Light Mode */
:root,
.dark-theme .invert-theme {
  --geist-foreground: #000;
  --geist-background: #fff;
  --geist-selection: var(--geist-cyan);
  --accents-1: #fafafa;
  --accents-2: #eaeaea;
  --accents-3: #999999;
  --accents-4: #888888;
  --accents-5: #666666;
  --accents-6: #444444;
  --accents-7: #333333;
  --accents-8: #111111;

  --geist-link-color: var(--geist-success);

  /* Success (Blue) */
  --geist-success-light: #3291ff;
  --geist-success: #0070f3;
  --geist-success-dark: #0366d6;

  /* Error (Red) */
  --geist-error-light: #ff1a1a;
  --geist-error: #ee0000;
  --geist-error-dark: #cc0000;

  /* Warning (Orange) */
  --geist-warning-light: #f7b955;
  --geist-warning: #f5a623;
  --geist-warning-dark: #f49b0b;

  /* Secondary (Gray) */
  --geist-secondary-light: var(--accents-3);
  --geist-secondary: var(--accents-5);
  --geist-secondary-dark: var(--accents-7);

  --geist-code: var(--geist-purple);

  --dropdown-box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.02);
  --dropdown-triangle-stroke: #fff;

  --scroller-start: rgba(255, 255, 255, 1);
  --scroller-end: rgba(255, 255, 255, 0);

  --shadow-small: 0 5px 10px rgba(0, 0, 0, 0.12);
  --shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.12);
  --shadow-large: 0 30px 60px rgba(0, 0, 0, 0.12);
  --shadow-hover: 0 30px 60px rgba(0, 0, 0, 0.12);

  --shadow-sticky: 0 12px 10px -10px rgba(0, 0, 0, 0.12);

  --portal-opacity: 0.25;
}

.geist-card-shadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

/* debugging */
.debug .geist-container {
  outline: 1px solid rgba(255, 0, 0, 0.3);
}

/* Transitions */
.placeholder-fade-in-enter {
  opacity: 0.01;
}
.placeholder-fade-in-enter.placeholder-fade-in-enter-active {
  opacity: 1;
  transition: opacity .2s ease;
}
.placeholder-fade-in-leave {
  opacity: 1;
}
.placeholder-fade-in-leave.placeholder-fade-in-leave-active {
  opacity: 0.01;
  transition: opacity .2s ease;
}
`
