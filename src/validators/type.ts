import { FiveNoSchema } from '../../typings/app'
import { getTypeOfValue, isEqual } from '../helper'

export default function({ type, value, defaultValue, t }: FiveNoSchema.InitializeFnParams): boolean | string {
  const typeOfValue = getTypeOfValue(value)

  if (type === 'date' && typeOfValue === 'string') {
    return true
  } else if (type === 'number' && typeOfValue === 'number') {
    return true
  }

  if (typeof value !== 'undefined' && !isEqual(value, defaultValue) && typeOfValue !== type) {
    return t('%name% has incorrect type')
  }

  return true
}
