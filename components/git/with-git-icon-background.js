import styles from './with-git-icon-background.module.css'

function BackgroundWrapper({ gitType, children, width = 14, height = 14 }) {
  const style = {
    width,
    height
  }

  return (
    <span className={styles.background} data-git-type={gitType} style={style}>
      {children}
    </span>
  )
}

export function withGitIconBackground(Icon, gitType) {
  return function GitIconWithBackground({ ...props }) {
    if (props.background) {
      let fill = null

      if (gitType === 'github') {
        fill = '#000'
      }

      return (
        <BackgroundWrapper
          gitType={gitType}
          width={props.width}
          height={props.height}
        >
          <Icon
            {...props}
            monochrome
            color="currentColor"
            fill={fill}
            border={false}
          />
        </BackgroundWrapper>
      )
    }

    return <Icon {...props} />
  }
}
