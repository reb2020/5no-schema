import { getTypeName, getTypeOfValue, isEqual } from '../helper'

export default function({name, type, value, defaultValue}) {
  const typeName = getTypeName(type)
  const typeOfValue = getTypeOfValue(value)

  if (typeName === 'date' && typeOfValue === 'string') {
    return true
  } else if (typeName === 'number' && typeOfValue === 'number') {
    return true
  }

  if (typeof value !== 'undefined' && !isEqual(value, defaultValue) && typeOfValue !== typeName) {
    return `${name} has incorrect type`
  }

  return true
}
