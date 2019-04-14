import { getTypeOfValue } from '../helper'

export default function({name, value}) {
  if (typeof value !== 'undefined' &&
        getTypeOfValue(value) === 'string' &&
        value &&
        value.length < 254 &&
        /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(value)
  ) {
    const parts = value.split('@')
    const domainParts = parts[1].split('.')

    if (parts[0].length < 64 && !domainParts.some(part => part.length > 63)) {
      return true
    }
  } else if (typeof value === 'undefined') {
    return true
  }

  return `${name} has incorrect email format`
}
