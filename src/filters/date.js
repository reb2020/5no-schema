export default function({value}) {
  if (value === null) {
    return null
  }

  return new Date(value)
}
