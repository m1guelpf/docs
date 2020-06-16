import withIcon from '~/lib/with-icon'

const CheckInCircle = `<path d="M8 11.857l2.5 2.5L15.857 9M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"/>`

const CheckInCircleFill = `<path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="var(--geist-fill)" stroke="var(--geist-fill)"/><path d="M8 11.8571L10.5 14.3572L15.8572 9" fill="none" stroke="var(--geist-stroke)"/>`

export default withIcon(CheckInCircle, CheckInCircleFill)
