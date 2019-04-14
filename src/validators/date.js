import { isDateValid, getTypeOfValue } from '../helper'

export default function({name, value, options, defaultValue, previousStatus}) {
  if (typeof value !== 'undefined' &&
    getTypeOfValue(value) === 'string' &&
    value !== defaultValue &&
    previousStatus === true &&
    (typeof options.format === 'undefined' ||
    !isDateValid(value, options.format))
  ) {
    return `${name} has incorrect date format`
  }

  return true
}
