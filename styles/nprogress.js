import css from 'styled-jsx/css'

export default css.global`
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
}

#nprogress .bar {
  background: var(--geist-foreground);
}

#nprogress .peg {
  box-shadow: 0 0 10px var(--geist-foreground), 0 0 5px var(--geist-foreground);
}
`
