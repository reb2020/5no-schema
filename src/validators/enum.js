import { isEqual } from '../helper'

export default function({name, value, options, defaultValue}) {
  if (typeof value !== 'undefined' &&
    !isEqual(value, defaultValue) &&
    !options.allowedValues.includes(value)
  ) {
    return `${name} should be equal to one of the allowed values`
  }

  return true
}
