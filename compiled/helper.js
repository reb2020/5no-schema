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

  return (0, _moment2.default)(date, format).isValid();
};

var formatDate = function formatDate(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';

  return (0, _moment2.default)(date).format(format);
};

var clone = function clone(data) {
  return Object.assign({}, data);
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

var initializeFunctions = function initializeFunctions(functionsData, functionsList, functionArguments) {
  var initializeFunctionsData = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = functionsData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var functionData = _step.value;

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

  return initializeFunctionsData;
};

var filterDataByFields = function filterDataByFields(data, fields) {
  var returnData = {};
  var allowFields = Object.keys(fields);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.keys(data)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var field = _step2.value;

      if (allowFields.includes(field)) {
        returnData[field] = data[field];
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

  return returnData;
};

module.exports = {
  clone: clone,
  getTypeOfValue: getTypeOfValue,
  getTypeName: getTypeName,
  filterDataByFields: filterDataByFields,
  initializeFunctions: initializeFunctions,
  isDateValid: isDateValid,
  formatDate: formatDate
};