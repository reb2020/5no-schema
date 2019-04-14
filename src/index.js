import Filters from './filters'
import Validators from './validators'
import { clone, groupErrors, getTypeName, initializeFunctions, filterDataByFields } from './helper'

class Schema {
  constructor(schema) {
    let allowTypes = [
      'string',
      'number',
      'boolean',
      'object',
      'array',
      'date',
    ]

    this.fields = {}
    this.validators = {}
    this.filters = {}
    this.types = {}
    this.required = {}
    this.formats = {}

    Object.keys(schema).forEach((field) => {
      const { type, defaultValue, required, validators, filters, format } = schema[field]
      const typeName = getTypeName(type)

      if (!allowTypes.includes(typeName)) {
        throw new Error(`Don't allow type of field '${field}'`)
      }

      this.fields[field] = defaultValue
      this.types[field] = type

      this.validators[field] = ['type']
      this.required[field] = false
      this.formats[field] = format

      if (required) {
        this.required[field] = true
        this.validators[field].push('required')
      }

      let dateFN = {
        fn: 'date',
        options: {
          format: format,
        },
      }

      if (typeName === 'date') {
        this.validators[field].push(dateFN)
      }

      if (validators) {
        for (let validator of validators) {
          this.validators[field].push(validator)
        }
      }

      if (typeName === 'date') {
        this.filters[field] = [dateFN]
      } else {
        this.filters[field] = [typeName]
      }

      if (filters) {
        for (let filter of filters) {
          this.filters[field].push(filter)
        }
      }
    })

    this.fields = this.filter(this.fields)
  }

  filter = (data) => {
    let dataFilter = filterDataByFields(clone(data), this.fields)

    Object.keys(dataFilter).forEach((field) => {
      const filtersByField = initializeFunctions(this.filters[field], Filters, {
        name: field,
        type: this.types[field],
        defaultValue: this.fields[field],
      })

      for (let filter of filtersByField) {
        if (typeof dataFilter[field] !== 'undefined') {
          dataFilter[field] = filter.fn({...filter.data, value: dataFilter[field]})
        }
      }
    })

    return dataFilter
  }

  validate = (data) => {
    let dataValidate = filterDataByFields(clone(data), this.fields)
    let errors = []

    Object.keys(this.fields).forEach((field) => {
      const validatorsByField = initializeFunctions(this.validators[field], Validators, {
        name: field,
        type: this.types[field],
        value: dataValidate[field],
        defaultValue: this.fields[field],
      })

      let previousStatus = true
      for (let validator of validatorsByField) {
        const isValid = validator.fn({...validator.data, previousStatus: previousStatus})
        previousStatus = isValid
        if (isValid !== true) {
          if (typeof isValid === 'string') {
            errors.push({ field: field, error: new Error(isValid) })
          } else {
            errors.push({ field: field, error: isValid })
          }
        }
      }
    })

    return new Promise((resolve, reject) => {
      if (errors.length > 0) {
        reject(groupErrors(errors))
      } else {
        resolve(dataValidate)
      }
    })
  }

  json = () => {
    let data = {}

    Object.keys(this.fields).forEach((field) => {
      data[field] = {
        type: getTypeName(this.types[field]),
        required: this.required[field],
      }

      if (typeof this.fields[field] !== 'undefined') {
        data[field]['defaultValue'] = this.fields[field]
      }

      if (typeof this.formats[field] !== 'undefined') {
        data[field]['format'] = this.formats[field]
      }
    })

    return data
  }
}

module.exports = Schema
