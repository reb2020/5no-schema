import moment from 'moment'

const isDateValid = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(date, format, true).isValid()
}

const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(date).format(format)
}

const clone = (data) => {
  return Object.assign({}, data)
}

const groupErrors = (errors) => {
  let group = {}
  for (let error of errors) {
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

const getTypeName = (type) => {
  let typeName = null
  if (typeof type === 'string') {
    typeName = type.toLowerCase()
  } else {
    typeName = type.name.toString().toLowerCase()
  }

  return typeName
}

const getTypeOfValue = (value) => {
  let typeOfValue = typeof value

  if (typeOfValue === 'object' && value !== null) {
    typeOfValue = value.constructor.name.toLowerCase()
  }

  return typeOfValue
}

const getChildData = (allData, result) => {
  for (let data of result) {
    if (data.child === true) {
      allData[data.field] = data.result
    }
  }
  return allData
}

const initializeChildPromise = (field, fn, data) => {
  return new Promise((resolve) => {
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
}

const initializePromise = (field, objectData) => {
  return new Promise((resolve) => {
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
}

const initializeFunctions = (functionsData, functionsList, functionArguments) => {
  let initializeFunctionsData = []
  for (let functionData of functionsData) {
    let functionObject = functionData
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
        options: functionOptions,
        ...functionArguments,
      },
    })
  }

  return initializeFunctionsData
}

const filterDataByFields = (data, fields) => {
  let returnData = {}
  const allowFields = Object.keys(fields)
  for (let field of Object.keys(data)) {
    if (allowFields.includes(field)) {
      returnData[field] = data[field]
    }
  }

  return returnData
}

module.exports = {
  clone,
  groupErrors,
  getTypeOfValue,
  getTypeName,
  filterDataByFields,
  initializeFunctions,
  initializeChildPromise,
  isDateValid,
  formatDate,
  initializePromise,
  getChildData,
}
