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
    this.allowedValues = {}
    this.isChild = false

    Object.keys(fieldsSchema).forEach((field) => {
      const { type, defaultValue, allowedValues, required, validators, filters, format, schema } = fieldsSchema[field]
      const typeName = getTypeName(type)

      if (!allowTypes.includes(typeName)) {
        throw new Error(`Don't allow type of field '${field}'`)
      }

      this.fields[field] = defaultValue
      this.types[field] = type

      this.validators[field] = ['type']
      this.required[field] = false
      this.formats[field] = format

      if (allowedValues) {
        this.allowedValues[field] = allowedValues
        this.validators[field].push({
          fn: 'enum',
          options: {
            allowedValues: allowedValues,
          },
        })
      }

      if (required) {
        this.required[field] = true
        this.validators[field].push('required')
      }

      if (schema) {
        this.schemas[field] = new Schema(schema)
        this.schemas[field].isChild = true
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
  }

  filter = async(data) => {
    let dataFilter = filterDataByFields(clone(data), this.fields)
    let mainErrors = null

    try {
      for (let field of Object.keys(this.fields)) {
        const filtersByField = initializeFunctions(this.filters[field], Filters, {
          name: field,
          type: this.types[field],
          allValues: dataFilter,
          defaultValue: this.fields[field],
          value: dataFilter[field],
          previousResult: dataFilter[field],
        })

        if (typeof dataFilter[field] !== 'undefined' && dataFilter[field] !== this.fields[field]) {
          let previousResult = dataFilter[field]
          for (let filter of filtersByField) {
            filter.data.previousResult = previousResult
            filter.data.value = previousResult
            const promiseResult = await initializePromise(field, filter)
            previousResult = promiseResult.result
          }

          dataFilter[field] = previousResult

          if (this.schemas[field]) {
            const promiseResult = await initializeChildPromise(field, this.schemas[field].filter, dataFilter[field])
            dataFilter[field] = promiseResult.result
          }
        }
      }
    } catch (e) {
      mainErrors = e
    }

    return new Promise((resolve, reject) => {
      if (mainErrors) {
        reject(mainErrors)
      } else {
        resolve(dataFilter)
      }
    })
  }

  validate = async(data) => {
    let dataValidate = filterDataByFields(clone(data), this.fields)
    let promises = {}
    let mainErrors = null

    try {
      for (let field of Object.keys(this.fields)) {
        const validatorsByField = initializeFunctions(this.validators[field], Validators, {
          name: field,
          type: this.types[field],
          allValues: dataValidate,
          previousResult: true,
          value: dataValidate[field],
          defaultValue: this.fields[field],
        })

        let previousResult = true
        for (let validator of validatorsByField) {
          if (typeof promises[field] === 'undefined') {
            promises[field] = []
          }
          validator.data.previousResult = previousResult
          const promiseResult = await initializePromise(field, validator)
          previousResult = promiseResult.result
          promises[field].push(promiseResult)
        }

        if (this.schemas[field]) {
          if (typeof promises[field] === 'undefined') {
            promises[field] = []
          }
          promises[field].push(await initializeChildPromise(field, this.schemas[field].validate, dataValidate[field]))
        }
      }
    } catch (e) {
      mainErrors = e
    }

    return new Promise((resolve, reject) => {
      if (mainErrors) {
        return reject(mainErrors)
      }

      let errors = {}
      let data = {}

      for (let field of Object.keys(promises)) {
        const validatorsData = promises[field]

        errors = Object.assign(errors, groupErrors(validatorsData))
        data = Object.assign(data, getChildData(dataValidate, validatorsData))
      }

      if (Object.keys(errors).length > 0) {
        reject(errors)
      } else {
        resolve(data)
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

      if (typeof this.allowedValues[field] !== 'undefined') {
        data[field]['allowedValues'] = this.allowedValues[field]
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
