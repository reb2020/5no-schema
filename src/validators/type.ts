import { FiveNoSchema } from '../../typings/app'
import { getTypeOfValue, isEqual } from '../helper'

export default function({ name, type, value, defaultValue }: FiveNoSchema.InitializeFnParams): boolean | string {
  const typeOfValue = getTypeOfValue(value)

  if (type === 'date' && typeOfValue === 'string') {
    return true
  } else if (type === 'number' && typeOfValue === 'number') {
    return true
  }

  if (typeof value !== 'undefined' && !isEqual(value, defaultValue) && typeOfValue !== type) {
    return `${name} has incorrect type`
  }

  return true
}
