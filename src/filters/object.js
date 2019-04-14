import { getTypeOfValue } from '../helper'

export default function({value, defaultValue}) {
  if (value === null) {
    return null
  }

  if (value === defaultValue) {
    return defaultValue
  }

  const typeOfValue = getTypeOfValue(value)

  if (typeOfValue !== 'object') {
    return {}
  }

  return value
}
