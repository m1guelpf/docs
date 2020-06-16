// Work around this issue for MDX: https://github.com/prettier/prettier/issues/6213
// If you use a dollar sign in MDX, then pre-commit hook escapes it, and then
// escapes it again, resulting in an infinite loop.
const DollarSign = () => '$'

export default DollarSign
