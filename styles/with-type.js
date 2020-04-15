import css from 'styled-jsx/css'

export default css.global`
:root {
  /* Themed Color Defaults */
  --themed-bg: var(--geist-background);
  --themed-fg: var(--geist-foreground);
}

/* type="success" */
.geist-themed.geist-success {
  --themed-fg: var(--geist-success);
  --themed-bg: var(--geist-background);
  --themed-border: var(--themed-fg);
}
.geist-themed.geist-success-fill {
  --themed-fg: #fff;
  --themed-bg: var(--geist-success);
  --themed-border: var(--geist-success);
}

/* type="error"  */
.geist-themed.geist-error {
  --themed-fg: var(--geist-error);
  --themed-bg: var(--geist-background);
  --themed-border: var(--themed-fg);
}
.geist-themed.geist-error-fill {
  --themed-fg: #fff;
  --themed-bg: var(--geist-error);
  --themed-border: var(--geist-error);
}

/* type="warning"  */
.geist-themed.geist-warning {
  --themed-fg: var(--geist-warning);
  --themed-bg: var(--geist-background);
  --themed-border: var(--themed-fg);
}
.geist-themed.geist-warning-fill {
  --themed-fg: #fff;
  --themed-bg: var(--geist-warning);
  --themed-border: var(--geist-warning);
}

/* type="secondary"  */
.geist-themed.geist-secondary {
  --themed-fg: var(--geist-secondary);
  --themed-bg: var(--geist-background);
  --themed-border: var(--themed-fg);
}
.geist-themed.geist-secondary-fill {
  --themed-fg: #fff;
  --themed-bg: var(--geist-secondary);
  --themed-border: var(--geist-secondary);
}

/* type="alert"  */
.geist-themed.geist-alert {
  --themed-fg: var(--geist-alert);
  --themed-bg: var(--geist-background);
  --themed-border: var(--themed-fg);
}
.geist-themed.geist-alert-fill {
  --themed-fg: #fff;
  --themed-bg: var(--geist-alert);
  --themed-border: var(--geist-alert);
}

/* type="violet"  */
.geist-themed.geist-violet {
  --themed-fg: var(--geist-violet);
  --themed-bg: var(--geist-background);
  --themed-border: var(--themed-fg);
}
.geist-themed.geist-violet-fill {
  --themed-fg: #fff;
  --themed-bg: var(--geist-violet);
  --themed-border: var(--geist-violet);
}

/* type="lite" (no fill variant) */
.geist-themed.geist-lite {
  --themed-fg: var(--geist-foreground);
  --themed-bg: var(--accents-1);
  --themed-border: var(--accents-2);
}

/* type="ghost" (no fill variant) */
.geist-themed.geist-ghost {
  --themed-fg: var(--accents-5);
  --themed-bg: transparent;
  --themed-border: transparent;
}
`
