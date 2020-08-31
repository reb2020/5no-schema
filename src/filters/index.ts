import FilterNumber from './number'
import FilterString from './string'
import FilterBoolean from './boolean'
import FilterObject from './object'
import FilterDate from './date'
import FilterArray from './array'
import FilterTrim from './trim'
import FilterLowerCase from './lowerCase'
import FilterUpperCase from './upperCase'

export default {
  number: FilterNumber,
  string: FilterString,
  boolean: FilterBoolean,
  object: FilterObject,
  date: FilterDate,
  array: FilterArray,
  trim: FilterTrim,
  lowerCase: FilterLowerCase,
  upperCase: FilterUpperCase,
}
