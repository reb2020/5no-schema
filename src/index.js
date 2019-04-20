import Filters from './filters'
import Validators from './validators'
import { clone, groupErrors, initializePromise, getTypeName, initializeFunctions, initializeChildPromise, filterDataByFields, getChildData } from './helper'

class Schema {
  constructor(fieldsSchema) {
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
    this.schemas = {}

    Object.keys(fieldsSchema).forEach((field) => {
      const { type, defaultValue, required, validators, filters, format, schema } = fieldsSchema[field]
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

      if (schema) {
        this.schemas[field] = new Schema(schema)
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
    let promises = []

    Object.keys(this.fields).forEach((field) => {
      const validatorsByField = initializeFunctions(this.validators[field], Validators, {
        name: field,
        type: this.types[field],
        value: dataValidate[field],
        defaultValue: this.fields[field],
      })

      for (let validator of validatorsByField) {
        promises.push(initializePromise(field, validator))
      }

      if (this.schemas[field]) {
        promises.push(initializeChildPromise(field, this.schemas[field], dataValidate[field]))
      }
    })

    return new Promise((resolve, reject) => {
      Promise.all(promises).then((validatorsData) => {
        const errors = groupErrors(validatorsData)

        if (Object.keys(errors).length > 0) {
          reject(errors)
        } else {
          resolve(getChildData(dataValidate, validatorsData))
        }
      }).catch((error) => {
        reject(error)
      })
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

      if (typeof this.schemas[field] !== 'undefined') {
        data[field]['schema'] = this.schemas[field].json()
        delete data[field]['required']
        delete data[field]['defaultValue']
      }
    })

    return data
  }
}

module.exports = Schema
