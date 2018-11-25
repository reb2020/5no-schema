import moment from 'moment'

const isDateValid = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(date, format).isValid()
}

const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(date).format(format)
}

const clone = (data) => {
  return Object.assign({}, data)
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
  getTypeOfValue,
  getTypeName,
  filterDataByFields,
  initializeFunctions,
  isDateValid,
  formatDate,
}
