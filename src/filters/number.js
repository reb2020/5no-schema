export default function({value}) {
  if (value === null) {
    return null
  }

  return Number(value)
}
