import Filters from './filters'
import Validators from './validators'
import { clone, getTypeName, initializeFunctions, filterDataByFields } from './helper'

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

    Object.keys(schema).forEach((field) => {
      const { type, defaultValue, required, validators, filters } = schema[field]
      const typeName = getTypeName(type)

      if (!allowTypes.includes(typeName)) {
        throw new Error(`Don't allow type of field '${field}'`)
      }

      this.fields[field] = defaultValue
      this.types[field] = type

      this.validators[field] = ['type']

      if (required) {
        this.validators[field].push('required')
      }

      if (validators) {
        for (let validator of validators) {
          this.validators[field].push(validator)
        }
      }

      this.filters[field] = [typeName]

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

      for (let validator of validatorsByField) {
        const isValid = validator.fn(validator.data)
        if (isValid !== true) {
          if (typeof isValid === 'string') {
            errors.push(new Error(isValid))
          } else {
            errors.push(isValid)
          }
        }
      }
    })

    return new Promise((resolve, reject) => {
      if (errors.length > 0) {
        reject(errors)
      } else {
        resolve(dataValidate)
      }
    })
  }
}

module.exports = Schema
