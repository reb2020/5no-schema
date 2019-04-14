export default function({value, defaultValue}) {
  if (value === null) {
    return null
  }

  if (value === defaultValue) {
    return defaultValue
  }

  return Boolean(!(value === 'false' || value === '0' || !value))
}
