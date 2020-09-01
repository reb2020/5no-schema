import { FiveNoSchema } from '../../typings/app'
import { formatNumber, isEqual, getTypeOfValue } from '../helper'

export default function({ value, options, defaultValue, t }: FiveNoSchema.InitializeFnParams): boolean | string {
  if (typeof value !== 'undefined' &&
    getTypeOfValue(value) === 'number' &&
    !isEqual(value, defaultValue) &&
    (typeof options.format !== 'undefined' &&
    value !== formatNumber(value, options.format))
  ) {
    return t('%name% has incorrect number format')
  }

  return true
}
