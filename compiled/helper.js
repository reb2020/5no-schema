'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDateValid = function isDateValid(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';

  return (0, _moment2.default)(date, format, true).isValid();
};

var formatDate = function formatDate(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';

  return (0, _moment2.default)(date).format(format);
};

var formatNumber = function formatNumber(num) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0.00';

  var formatSplitted = format.split('.');
  return Number(Number(num).toFixed(formatSplitted.length > 1 ? formatSplitted.pop().length : 0));
};

var clone = function clone(data) {
  return Object.assign({}, data);
};

var groupErrors = function groupErrors(errors) {
  var group = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var error = _step.value;

      if (typeof error.result !== 'undefined' && (error.child !== true && error.result !== true || error.child === true && error.errors)) {
        if (typeof group[error.field] === 'undefined') {
          group[error.field] = [];
        }

        if (typeof error.child !== 'undefined' && error.child === true) {
          if (group[error.field].length === 0) {
            group[error.field] = error.errors;
          }
        } else if (getTypeOfValue(error.result) === 'error') {
          group[error.field].push(error.result.message);
        } else {
          group[error.field].push(error.result);
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return group;
};

var getTypeName = function getTypeName(type) {
  var typeName = null;
  if (typeof type === 'string') {
    typeName = type.toLowerCase();
  } else {
    typeName = type.name.toString().toLowerCase();
  }

  return typeName;
};

var getTypeOfValue = function getTypeOfValue(value) {
  var typeOfValue = typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value);

  if (typeOfValue === 'object' && value !== null) {
    typeOfValue = value.constructor.name.toLowerCase();
  }

  return typeOfValue;
};

var getChildData = function getChildData(types, allData, result) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = result[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var data = _step2.value;

      if (data.child === true) {
        if (getTypeName(types[data.field]) === 'array') {
          allData[data.field].push(data.result);
        } else {
          allData[data.field] = data.result;
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return allData;
};

var initializeChildPromise = function initializeChildPromise(field, fn, data) {
  return new Promise(function (resolve) {
    Promise.resolve(fn(data)).then(function (result) {
      resolve({
        field: field,
        child: true,
        errors: null,
        result: result
      });
    }).catch(function (errors) {
      resolve({
        field: field,
        child: true,
        errors: errors,
        result: null
      });
    });
  });
};

var initializePromise = function initializePromise(field, objectData) {
  return new Promise(function (resolve) {
    Promise.resolve(objectData.fn(objectData.data)).then(function (result) {
      resolve({
        field: field,
        child: false,
        result: result
      });
    }).catch(function (error) {
      resolve({
        field: field,
        child: false,
        result: error.message
      });
    });
  });
};

var initializeFunctions = function initializeFunctions(functionsData, functionsList, functionArguments) {
  var initializeFunctionsData = [];
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = functionsData[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var functionData = _step3.value;

      var functionObject = functionData;
      var functionOptions = {};

      if ((typeof functionData === 'undefined' ? 'undefined' : (0, _typeof3.default)(functionData)) === 'object' && typeof functionData.fn !== 'undefined') {
        functionOptions = functionData.options || {};
        functionObject = functionData.fn;
      }
      if (typeof functionsList[functionObject] === 'function') {
        functionObject = functionsList[functionObject];
      }
      if (typeof functionObject !== 'function') {
        throw new Error('Doesn\'t exist \'' + functionObject + '\'');
      }

      initializeFunctionsData.push({
        fn: functionObject,
        data: (0, _extends3.default)({
          options: functionOptions
        }, functionArguments)
      });
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return initializeFunctionsData;
};

var filterDataByFields = function filterDataByFields(data, fields, prefilled) {
  var returnData = {};
  var allowFields = Object.keys(fields);

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = Object.keys(prefilled)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var field = _step4.value;

      if (prefilled[field] === true) {
        returnData[field] = fields[field];
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = Object.keys(data)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var _field = _step5.value;

      if (allowFields.includes(_field)) {
        returnData[_field] = data[_field];
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return returnData;
};

var prefilledDataByFields = function prefilledDataByFields(data, fields) {
  var returnData = {};
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = Object.keys(fields)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var field = _step6.value;

      returnData[field] = typeof data[field] !== 'undefined' ? data[field] : fields[field];
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return returnData;
};

var isEqual = function isEqual(a, b) {
  var typeOfValueA = getTypeOfValue(a);
  var typeOfValueB = getTypeOfValue(b);

  if (a === null && b === null || typeOfValueA === 'undefined' && typeOfValueB === 'undefined') {
    return true;
  } else if (typeOfValueA === typeOfValueB && typeOfValueA === 'object') {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
      return false;
    }

    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    return true;
  } else if (typeOfValueA === typeOfValueB && typeOfValueA === 'array') {
    if (a.length != b.length) {
      return false;
    }

    return true;
  } else if (typeOfValueA === typeOfValueB && a === b) {
    return true;
  }

  return false;
};

module.exports = {
  clone: clone,
  isEqual: isEqual,
  groupErrors: groupErrors,
  getTypeOfValue: getTypeOfValue,
  getTypeName: getTypeName,
  filterDataByFields: filterDataByFields,
  prefilledDataByFields: prefilledDataByFields,
  initializeFunctions: initializeFunctions,
  initializeChildPromise: initializeChildPromise,
  isDateValid: isDateValid,
  formatDate: formatDate,
  initializePromise: initializePromise,
  getChildData: getChildData,
  formatNumber: formatNumber
};