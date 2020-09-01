import { FiveNoSchema } from '../../typings/app'
import { getTypeOfValue, isEqual } from '../helper'

export default function({ value, defaultValue, t }: FiveNoSchema.InitializeFnParams): boolean | string {
  const typeOfValue = getTypeOfValue(value)

  if (typeof value === 'undefined' || (!value && typeOfValue !== 'boolean' && !isEqual(value, defaultValue))) {
    return t('%name% is required')
  }

  return true
}
