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
    if (typeof error.result !== 'undefined' && error.result !== true) {
      if (typeof group[error.field] === 'undefined') {
        group[error.field] = []
      }

      if (typeof error.child !== 'undefined' && error.child === true) {
        group[error.field] = error.result
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
    if (typeof data.childData !== 'undefined') {
      allData[data.field] = data.childData
    }
  }
  return allData
}

const initializeChildPromise = (field, schema, data) => {
  return new Promise((resolve, reject) => {
    Promise.resolve(schema.validate(data)).then((result) => {
      resolve({
        field: field,
        childData: result,
      })
    }).catch((errors) => {
      if (getTypeOfValue(errors) !== 'object') {
        reject(errors)
      }
      resolve({
        field: field,
        child: true,
        result: errors,
      })
    })
  })
}

const initializePromise = (field, validator) => {
  return new Promise((resolve, reject) => {
    Promise.resolve(validator.fn(validator.data)).then((result) => {
      resolve({
        field: field,
        child: false,
        result: result,
      })
    }).catch(reject)
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
