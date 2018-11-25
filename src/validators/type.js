import { getTypeName, getTypeOfValue } from '../helper'

export default function({name, type, value, defaultValue}) {
  const typeName = getTypeName(type)
  const typeOfValue = getTypeOfValue(value)

  if (typeName === 'date' && typeOfValue === 'string') {
    return true
  }

  if (typeof value !== 'undefined' && value !== defaultValue && typeOfValue !== typeName) {
    return `${name} has incorrect type`
  }

  return true
}
