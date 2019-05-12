export default function({name, value, options, defaultValue}) {
  if (typeof value !== 'undefined' &&
    value !== defaultValue &&
    !options.allowedValues.includes(value)
  ) {
    return `${name} should be equal to one of the allowed values`
  }

  return true
}
