import { isDateValid, getTypeOfValue } from '../helper'

export default function({name, value, options, defaultValue}) {
  if (typeof value !== 'undefined' &&
    getTypeOfValue(value) === 'string' &&
    value !== defaultValue &&
    (typeof options.format === 'undefined' ||
    !isDateValid(value, options.format))
  ) {
    return `${name} has incorrect date format`
  }

  return true
}
