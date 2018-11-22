export default function({name, value, defaultValue}) {
  if (typeof value === 'undefined' || (!value && value !== defaultValue)) {
    return `${name} is required`
  }

  return true
}
