import { FiveNoSchema } from '../../typings/app'
import { isEqual } from '../helper'

export default function({ value, options, defaultValue, t }: FiveNoSchema.InitializeFnParams): boolean | string {
  if (typeof value !== 'undefined' &&
    !isEqual(value, defaultValue) &&
    !options.allowedValues.includes(value)
  ) {
    return t('%name% should be equal to one of the allowed values')
  }

  return true
}
