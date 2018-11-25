import { isDateValid, getTypeOfValue } from '../helper'

export default function({name, value, options}) {
  if (typeof value !== 'undefined' &&
  getTypeOfValue(value) === 'string' &&
  (typeof options.format === 'undefined' ||
  !isDateValid(value, options.format))
  ) {
    return `${name} has incorrect date format`
  }
  return true
}
