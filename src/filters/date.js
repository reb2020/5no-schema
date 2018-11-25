import { formatDate } from '../helper'

export default function({value, options}) {
  if (value === null) {
    return null
  }

  if (typeof options.format !== 'undefined') {
    return formatDate(value, options.format)
  }

  return new Date(value)
}
