import { formatNumber } from '../helper'

export default function({value, options, defaultValue}) {
  if (value === null) {
    return null
  }

  if (value === defaultValue) {
    return defaultValue
  }

  if (typeof options.format !== 'undefined') {
    return formatNumber(value, options.format)
  }

  return Number(value)
}
