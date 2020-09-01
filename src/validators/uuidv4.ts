import { FiveNoSchema } from '../../typings/app'
import { getTypeOfValue, isEqual } from '../helper'

export default function({ value, defaultValue, t }: FiveNoSchema.InitializeFnParams): boolean | string {
  const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)

  if (typeof value !== 'undefined' &&
    getTypeOfValue(value) === 'string' &&
    !isEqual(value, defaultValue) &&
    !value.match(v4)
  ) {
    return t('%name% has incorrect uuid format')
  }

  return true
}
