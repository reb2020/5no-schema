import { formatNumber, isEqual, getTypeOfValue } from '../helper'

export default function({name, value, options, defaultValue}) {
  if (typeof value !== 'undefined' &&
    getTypeOfValue(value) === 'number' &&
    !isEqual(value, defaultValue) &&
    (typeof options.format !== 'undefined' &&
    value !== formatNumber(value, options.format))
  ) {
    return `${name} has incorrect number format`
  }

  return true
}
