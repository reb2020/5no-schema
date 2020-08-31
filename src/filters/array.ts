import { getTypeOfValue } from '../helper'

export default function({ value }: FiveNoSchema.InitializeFnParams): null | Array<any> {
  if (value === null) {
    return null
  }

  const typeOfValue = getTypeOfValue(value)

  if (typeOfValue !== 'array') {
    return []
  }

  return value
}
