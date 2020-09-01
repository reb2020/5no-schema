import { FiveNoSchema } from '../../typings/app'
import { isDateValid, getTypeOfValue, isEqual } from '../helper'

export default function({ value, options, defaultValue, t }: FiveNoSchema.InitializeFnParams): boolean | string {
  if (typeof value !== 'undefined' &&
    getTypeOfValue(value) === 'string' &&
    !isEqual(value, defaultValue) &&
    (typeof options.format === 'undefined' ||
    !isDateValid(value, options.format))
  ) {
    return t('%name% has incorrect date format')
  }

  return true
}
