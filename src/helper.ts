import moment from 'moment'

import { FiveNoSchema } from '../typings/app'

import { translate } from './translator'

export const isDateValid = (date: string | Date, format: string = 'YYYY-MM-DD HH:mm:ss'): boolean => moment(date, format, true).isValid()

export const formatDate = (date: string | Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string => moment(date).format(format)

export const formatNumber = (num: number | string, format: string = '0.00'): number => {
  const formatSplitted: Array<any> = format.split('.')
  return Number(Number(num).toFixed(formatSplitted.length > 1 ? formatSplitted.pop().length : 0))
}

export const clone = (data: object): object => Object.assign({}, data)

export const groupErrors = (errors: Array<FiveNoSchema.ChildResult>): FiveNoSchema.List<Array<string>> => {
  const group = {}
  for (const error of errors) {
    if (typeof error.result !== 'undefined' && ((error.child !== true && error.result !== true) || (error.child === true && error.errors))) {
      if (typeof group[error.field] === 'undefined') {
        group[error.field] = []
      }

      if ((typeof error.child !== 'undefined' && error.child === true)) {
        if (group[error.field].length === 0) {
          group[error.field] = error.errors
        }
      } else if (getTypeOfValue(error.result) === 'error') {
        group[error.field].push(error.result.message)
      } else {
        group[error.field].push(error.result)
      }
    }
  }
  return group
}

export const getTypeName = (type: any): FiveNoSchema.AllowTypes => {
  let typeName = null
  if (typeof type === 'string') {
    typeName = type.toLowerCase()
  } else {
    typeName = type.name.toString().toLowerCase()
  }

  return typeName
}

export const getTypeOfValue = (value: any): string => {
  let typeOfValue = typeof value

  if (typeOfValue === 'object' && value !== null) {
    typeOfValue = value.constructor.name.toLowerCase()
  }

  return typeOfValue
}

export const getChildData = (types: FiveNoSchema.List<FiveNoSchema.AllowTypes>, allData: FiveNoSchema.List<any>, result: Array<FiveNoSchema.ChildResult>): FiveNoSchema.List<any> => {
  for (const data of result) {
    if (data.child === true) {
      if (types[data.field] === 'array') {
        allData[data.field].push(data.result)
      } else {
        allData[data.field] = data.result
      }
    }
  }
  return allData
}

export const initializeChildPromise = (field: string, fn: FiveNoSchema.SchemaFn, data: object): Promise<FiveNoSchema.ChildResult> => new Promise((resolve) => {
  Promise.resolve(fn(data)).then((result) => {
    resolve({
      field: field,
      child: true,
      errors: null,
      result: result,
    })
  }).catch((errors) => {
    resolve({
      field: field,
      child: true,
      errors: errors,
      result: null,
    })
  })
})

export const initializePromise = (field: string, objectData: FiveNoSchema.InitializeFunctions): Promise<FiveNoSchema.Result> => new Promise((resolve) => {
  Promise.resolve(objectData.fn(objectData.data)).then((result) => {
    resolve({
      field: field,
      child: false,
      result: result,
    })
  }).catch((error) => {
    resolve({
      field: field,
      child: false,
      result: error.message,
    })
  })
})

export const initializeFunctions = (functionsData: Array<string | FiveNoSchema.FnInit>, functionsList: FiveNoSchema.Validators | FiveNoSchema.Filters, functionArguments: FiveNoSchema.FunctionArguments): Array<FiveNoSchema.InitializeFunctions> => {
  const initializeFunctionsData = [] as Array<FiveNoSchema.InitializeFunctions>
  for (const functionData of functionsData) {
    let functionObject: any = functionData
    let functionOptions = {}

    if (typeof functionData === 'object' &&
          typeof functionData.fn !== 'undefined'
    ) {
      functionOptions = functionData.options || {}
      functionObject = functionData.fn
    }
    if (typeof functionsList[functionObject] === 'function') {
      functionObject = functionsList[functionObject]
    }
    if (typeof functionObject !== 'function') {
      throw new Error(`Doesn't exist '${functionObject}'`)
    }

    initializeFunctionsData.push({
      fn: functionObject,
      data: {
        ...functionArguments,
        options: functionOptions,
        t: (value) => translate(translate(value)
          .replace(/\%value\%/g, functionArguments.value)
          .replace(/\%name\%/g, translate(functionArguments.name))),
      },
    })
  }

  return initializeFunctionsData
}

export const filterDataByFields = (data: FiveNoSchema.List<any>, fields: FiveNoSchema.List<any>, prefilled: FiveNoSchema.List<boolean>): FiveNoSchema.List<any> => {
  const returnData = {}
  const allowFields = Object.keys(fields)

  for (const field of Object.keys(prefilled)) {
    if (prefilled[field] === true) {
      returnData[field] = fields[field]
    }
  }

  for (const field of Object.keys(data)) {
    if (allowFields.includes(field)) {
      returnData[field] = data[field]
    }
  }

  return returnData
}

export const prefilledDataByFields = (data: FiveNoSchema.List<any>, fields: FiveNoSchema.List<any>): FiveNoSchema.List<any> => {
  const returnData = {}
  for (const field of Object.keys(fields)) {
    returnData[field] = typeof data[field] !== 'undefined' ? data[field] : fields[field]
  }

  return returnData
}

export const isEqual = (a: any, b: any): boolean => {
  const typeOfValueA = getTypeOfValue(a)
  const typeOfValueB = getTypeOfValue(b)

  if ((a === null && b === null) || (typeOfValueA === 'undefined' && typeOfValueB === 'undefined')) {
    return true
  } else if (typeOfValueA === typeOfValueB && typeOfValueA === 'object' && a !== null && b !== null) {
    const aProps = Object.getOwnPropertyNames(a)
    const bProps = Object.getOwnPropertyNames(b)

    if (aProps.length != bProps.length) {
      return false
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i]

      if (a[propName] !== b[propName]) {
        return false
      }
    }

    return true
  } else if (typeOfValueA === typeOfValueB && typeOfValueA === 'array') {
    if (a.length != b.length) {
      return false
    }

    return true
  } else if (typeOfValueA === typeOfValueB && a === b) {
    return true
  }

  return false
}
