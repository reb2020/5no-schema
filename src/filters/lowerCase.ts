import { getTypeOfValue } from '../helper'

export default function({ value }: FiveNoSchema.InitializeFnParams): string | null {
  if (value === null) {
    return null
  }

  const typeOfValue = getTypeOfValue(value)

  if (typeOfValue === 'string') {
    return value.toLowerCase()
  }

  return value
}
