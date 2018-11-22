export default function({value}) {
  if (value === null) {
    return null
  }

  return Boolean(!(value === 'false' || value === '0' || !value))
}
