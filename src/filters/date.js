import { formatDate } from '../helper'

export default function({value, options, defaultValue}) {
  if (value === null) {
    return null
  }

  if (value === defaultValue) {
    return defaultValue
  }

  if (typeof options.format !== 'undefined') {
    return formatDate(value, options.format)
  }

  return new Date(value)
}
