import Filters from './filters'
import Validators from './validators'
import { clone, groupErrors, initializePromise, getTypeName, initializeFunctions, initializeChildPromise, filterDataByFields, prefilledDataByFields, getChildData, isEqual } from './helper'

class Schema implements FiveNoSchema.Schema {
  isChild = false

  private _schemas: FiveNoSchema.List<FiveNoSchema.Schema> = {}
  private _fields: FiveNoSchema.List<any> = {}
  private _validators: FiveNoSchema.List<Array<string | FiveNoSchema.FnInit>> = {}
  private _filters: FiveNoSchema.List<Array<string | FiveNoSchema.FnInit>> = {}
  private _allowedValues: FiveNoSchema.List<any> = {}
  private _formats: FiveNoSchema.List<string | undefined> = {}
  private _types: FiveNoSchema.List<FiveNoSchema.AllowTypes> = {}
  private _prefilled: FiveNoSchema.List<boolean> = {}
  private _required: FiveNoSchema.List<boolean> = {}
  private _prefilledSchema: boolean = false

  constructor(fieldsSchema: FiveNoSchema.FieldsSchema, prefilledSchema: boolean = false) {
    const allowTypes = [
      'string',
      'number',
      'boolean',
      'object',
      'array',
      'date',
    ]

    this._prefilledSchema = prefilledSchema

    Object.keys(fieldsSchema).forEach((field) => {
      const { type, prefilled, defaultValue, allowedValues, required, validators, filters, format, schema } = fieldsSchema[field]
      const typeName = getTypeName(type)

      if (!allowTypes.includes(typeName)) {
        throw new Error(`Don't allow type of field '${field}'`)
      }

      this._fields[field] = defaultValue
      this._prefilled[field] = prefilled || false
      this._types[field] = typeName

      this._validators[field] = ['type']
      this._required[field] = false
      this._formats[field] = format

      if (allowedValues) {
        this._allowedValues[field] = allowedValues
        this._validators[field].push({
          fn: 'enum',
          options: {
            allowedValues: allowedValues,
          },
        })
      }

      if (required) {
        this._required[field] = true
        this._validators[field].push('required')
      }

      if (schema) {
        this._schemas[field] = new Schema(schema, prefilledSchema)
        this._schemas[field].isChild = true
      }

      const dataFN: FiveNoSchema.FnInit = {
        fn: typeName,
      }

      if (typeof format !== 'undefined') {
        dataFN.options = { format: format }
      }

      if (['date', 'number'].includes(typeName)) {
        this._validators[field].push(dataFN)
      }

      if (validators) {
        for (const validator of validators) {
          this._validators[field].push(validator)
        }
      }

      if (['date', 'number'].includes(typeName)) {
        this._filters[field] = [dataFN]
      } else {
        this._filters[field] = [typeName]
      }

      if (filters) {
        for (const filter of filters) {
          this._filters[field].push(filter)
        }
      }
    })
  }

  filter = async(data: object): Promise<object> => {
    let dataFilter = filterDataByFields(clone(data), this._fields, this._prefilled)
    if (this._prefilledSchema) {
      dataFilter = prefilledDataByFields(clone(data), this._fields)
    }

    try {
      for (const field of Object.keys(this._fields)) {
        const filtersByField = initializeFunctions(this._filters[field], Filters, {
          name: field,
          type: this._types[field],
          allValues: dataFilter,
          defaultValue: this._fields[field],
          value: dataFilter[field],
          previousResult: dataFilter[field],
        })

        if (typeof dataFilter[field] !== 'undefined' && dataFilter[field] !== this._fields[field]) {
          let previousResult = dataFilter[field]
          for (const filter of filtersByField) {
            filter.data.previousResult = previousResult
            filter.data.value = previousResult
            const promiseResult = await initializePromise(field, filter)
            previousResult = promiseResult.result
          }

          dataFilter[field] = previousResult

          if (this._schemas[field]) {
            if (this._types[field] === 'array' && !isEqual(dataFilter[field], this._fields[field])) {
              const dataFilterCopy = dataFilter[field] || []
              dataFilter[field] = []
              for (const filterData of dataFilterCopy) {
                const promiseResult = await initializeChildPromise(field, this._schemas[field].filter, filterData)
                dataFilter[field].push(promiseResult.result)
              }
            } else if (!isEqual(dataFilter[field], this._fields[field])) {
              const promiseResult = await initializeChildPromise(field, this._schemas[field].filter, dataFilter[field])
              dataFilter[field] = promiseResult.result
            }
          }
        }
      }
    } catch (e) {
      return Promise.reject(e)
    }

    return Promise.resolve(dataFilter)
  }

  validate = async(data: object): Promise<object> => {
    let dataValidate = filterDataByFields(clone(data), this._fields, this._prefilled)
    if (this._prefilledSchema) {
      dataValidate = prefilledDataByFields(clone(data), this._fields)
    }
    const promises = {}

    try {
      for (const field of Object.keys(this._fields)) {
        const validatorsByField = initializeFunctions(this._validators[field], Validators, {
          name: field,
          type: this._types[field],
          allValues: dataValidate,
          previousResult: true,
          value: dataValidate[field],
          defaultValue: this._fields[field],
        })

        let previousResult = true
        for (const validator of validatorsByField) {
          if (typeof promises[field] === 'undefined') {
            promises[field] = []
          }
          validator.data.previousResult = previousResult
          const promiseResult = await initializePromise(field, validator)
          previousResult = promiseResult.result
          promises[field].push(promiseResult)
        }

        if (this._schemas[field]) {
          if (typeof promises[field] === 'undefined') {
            promises[field] = []
          }

          if (this._types[field] === 'array' && !isEqual(dataValidate[field], this._fields[field])) {
            const dataValidateCopy = dataValidate[field] || []
            dataValidate[field] = []
            for (const validateData of dataValidateCopy) {
              promises[field].push(await initializeChildPromise(field, this._schemas[field].validate, validateData))
            }
          } else if (!isEqual(dataValidate[field], this._fields[field])) {
            promises[field].push(await initializeChildPromise(field, this._schemas[field].validate, dataValidate[field]))
          }
        }
      }
    } catch (e) {
      return Promise.reject(e)
    }

    return new Promise((resolve, reject) => {
      let errors = {}
      let data = {}

      for (const field of Object.keys(promises)) {
        const validatorsData = promises[field]

        errors = Object.assign(errors, groupErrors(validatorsData))
        data = Object.assign(data, getChildData(this._types, dataValidate, validatorsData))
      }

      if (Object.keys(errors).length > 0) {
        reject(errors)
      } else {
        resolve(data)
      }
    })
  }

  json = () => {
    const data = {}

    Object.keys(this._fields).forEach((field) => {
      data[field] = {
        type: this._types[field],
        required: this._required[field],
      }

      if (typeof this._fields[field] !== 'undefined') {
        data[field].defaultValue = this._fields[field]
      }

      if (typeof this._formats[field] !== 'undefined') {
        data[field].format = this._formats[field]
      }

      if (typeof this._allowedValues[field] !== 'undefined') {
        data[field].allowedValues = this._allowedValues[field]
      }

      if (typeof this._schemas[field] !== 'undefined') {
        data[field].schema = this._schemas[field].json()
      }
    })

    return data
  }
}

export default Schema
