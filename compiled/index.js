'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _filters = require('./filters');

var _filters2 = _interopRequireDefault(_filters);

var _validators = require('./validators');

var _validators2 = _interopRequireDefault(_validators);

var _helper = require('./helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = function Schema(fieldsSchema) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Schema);

  this.filter = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
      var dataFilter, mainErrors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, field, filtersByField, previousResult, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, filter, _promiseResult, promiseResult;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dataFilter = (0, _helper.filterDataByFields)((0, _helper.clone)(data), _this.fields);
              mainErrors = null;
              _context.prev = 2;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 6;
              _iterator = Object.keys(_this.fields)[Symbol.iterator]();

            case 8:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 52;
                break;
              }

              field = _step.value;
              filtersByField = (0, _helper.initializeFunctions)(_this.filters[field], _filters2.default, {
                name: field,
                type: _this.types[field],
                allValues: dataFilter,
                defaultValue: _this.fields[field],
                value: dataFilter[field],
                previousResult: dataFilter[field]
              });

              if (!(typeof dataFilter[field] !== 'undefined' && dataFilter[field] !== _this.fields[field])) {
                _context.next = 49;
                break;
              }

              previousResult = dataFilter[field];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 16;
              _iterator2 = filtersByField[Symbol.iterator]();

            case 18:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 29;
                break;
              }

              filter = _step2.value;

              filter.data.previousResult = previousResult;
              filter.data.value = previousResult;
              _context.next = 24;
              return (0, _helper.initializePromise)(field, filter);

            case 24:
              _promiseResult = _context.sent;

              previousResult = _promiseResult.result;

            case 26:
              _iteratorNormalCompletion2 = true;
              _context.next = 18;
              break;

            case 29:
              _context.next = 35;
              break;

            case 31:
              _context.prev = 31;
              _context.t0 = _context['catch'](16);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t0;

            case 35:
              _context.prev = 35;
              _context.prev = 36;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 38:
              _context.prev = 38;

              if (!_didIteratorError2) {
                _context.next = 41;
                break;
              }

              throw _iteratorError2;

            case 41:
              return _context.finish(38);

            case 42:
              return _context.finish(35);

            case 43:

              dataFilter[field] = previousResult;

              if (!_this.schemas[field]) {
                _context.next = 49;
                break;
              }

              _context.next = 47;
              return (0, _helper.initializeChildPromise)(field, _this.schemas[field].filter, dataFilter[field]);

            case 47:
              promiseResult = _context.sent;

              dataFilter[field] = promiseResult.result;

            case 49:
              _iteratorNormalCompletion = true;
              _context.next = 8;
              break;

            case 52:
              _context.next = 58;
              break;

            case 54:
              _context.prev = 54;
              _context.t1 = _context['catch'](6);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 58:
              _context.prev = 58;
              _context.prev = 59;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 61:
              _context.prev = 61;

              if (!_didIteratorError) {
                _context.next = 64;
                break;
              }

              throw _iteratorError;

            case 64:
              return _context.finish(61);

            case 65:
              return _context.finish(58);

            case 66:
              _context.next = 71;
              break;

            case 68:
              _context.prev = 68;
              _context.t2 = _context['catch'](2);

              mainErrors = _context.t2;

            case 71:
              return _context.abrupt('return', new Promise(function (resolve, reject) {
                if (mainErrors) {
                  reject(mainErrors);
                } else {
                  resolve(dataFilter);
                }
              }));

            case 72:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[2, 68], [6, 54, 58, 66], [16, 31, 35, 43], [36,, 38, 42], [59,, 61, 65]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  this.validate = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
      var dataValidate, promises, mainErrors, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, field, validatorsByField, previousResult, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, validator, promiseResult;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dataValidate = (0, _helper.filterDataByFields)((0, _helper.clone)(data), _this.fields);
              promises = {};
              mainErrors = null;
              _context2.prev = 3;
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context2.prev = 7;
              _iterator3 = Object.keys(_this.fields)[Symbol.iterator]();

            case 9:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context2.next = 54;
                break;
              }

              field = _step3.value;
              validatorsByField = (0, _helper.initializeFunctions)(_this.validators[field], _validators2.default, {
                name: field,
                type: _this.types[field],
                allValues: dataValidate,
                previousResult: true,
                value: dataValidate[field],
                defaultValue: _this.fields[field]
              });
              previousResult = true;
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context2.prev = 16;
              _iterator4 = validatorsByField[Symbol.iterator]();

            case 18:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                _context2.next = 30;
                break;
              }

              validator = _step4.value;

              if (typeof promises[field] === 'undefined') {
                promises[field] = [];
              }
              validator.data.previousResult = previousResult;
              _context2.next = 24;
              return (0, _helper.initializePromise)(field, validator);

            case 24:
              promiseResult = _context2.sent;

              previousResult = promiseResult.result;
              promises[field].push(promiseResult);

            case 27:
              _iteratorNormalCompletion4 = true;
              _context2.next = 18;
              break;

            case 30:
              _context2.next = 36;
              break;

            case 32:
              _context2.prev = 32;
              _context2.t0 = _context2['catch'](16);
              _didIteratorError4 = true;
              _iteratorError4 = _context2.t0;

            case 36:
              _context2.prev = 36;
              _context2.prev = 37;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 39:
              _context2.prev = 39;

              if (!_didIteratorError4) {
                _context2.next = 42;
                break;
              }

              throw _iteratorError4;

            case 42:
              return _context2.finish(39);

            case 43:
              return _context2.finish(36);

            case 44:
              if (!_this.schemas[field]) {
                _context2.next = 51;
                break;
              }

              if (typeof promises[field] === 'undefined') {
                promises[field] = [];
              }
              _context2.t1 = promises[field];
              _context2.next = 49;
              return (0, _helper.initializeChildPromise)(field, _this.schemas[field].validate, dataValidate[field]);

            case 49:
              _context2.t2 = _context2.sent;

              _context2.t1.push.call(_context2.t1, _context2.t2);

            case 51:
              _iteratorNormalCompletion3 = true;
              _context2.next = 9;
              break;

            case 54:
              _context2.next = 60;
              break;

            case 56:
              _context2.prev = 56;
              _context2.t3 = _context2['catch'](7);
              _didIteratorError3 = true;
              _iteratorError3 = _context2.t3;

            case 60:
              _context2.prev = 60;
              _context2.prev = 61;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 63:
              _context2.prev = 63;

              if (!_didIteratorError3) {
                _context2.next = 66;
                break;
              }

              throw _iteratorError3;

            case 66:
              return _context2.finish(63);

            case 67:
              return _context2.finish(60);

            case 68:
              _context2.next = 73;
              break;

            case 70:
              _context2.prev = 70;
              _context2.t4 = _context2['catch'](3);

              mainErrors = _context2.t4;

            case 73:
              return _context2.abrupt('return', new Promise(function (resolve, reject) {
                if (mainErrors) {
                  return reject(mainErrors);
                }

                var errors = {};
                var data = {};

                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                  for (var _iterator5 = Object.keys(promises)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _field = _step5.value;

                    var validatorsData = promises[_field];

                    errors = Object.assign(errors, (0, _helper.groupErrors)(validatorsData));
                    data = Object.assign(data, (0, _helper.getChildData)(dataValidate, validatorsData));
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

                if (Object.keys(errors).length > 0) {
                  reject(errors);
                } else {
                  resolve(data);
                }
              }));

            case 74:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[3, 70], [7, 56, 60, 68], [16, 32, 36, 44], [37,, 39, 43], [61,, 63, 67]]);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.json = function () {
    var data = {};

    Object.keys(_this.fields).forEach(function (field) {
      data[field] = {
        type: (0, _helper.getTypeName)(_this.types[field]),
        required: _this.required[field]
      };

      if (typeof _this.fields[field] !== 'undefined') {
        data[field]['defaultValue'] = _this.fields[field];
      }

      if (typeof _this.formats[field] !== 'undefined') {
        data[field]['format'] = _this.formats[field];
      }

      if (typeof _this.allowedValues[field] !== 'undefined') {
        data[field]['allowedValues'] = _this.allowedValues[field];
      }

      if (typeof _this.schemas[field] !== 'undefined') {
        data[field]['schema'] = _this.schemas[field].json();
        delete data[field]['required'];
        delete data[field]['defaultValue'];
      }
    });

    return data;
  };

  var allowTypes = ['string', 'number', 'boolean', 'object', 'array', 'date'];

  this.fields = {};
  this.validators = {};
  this.filters = {};
  this.types = {};
  this.required = {};
  this.formats = {};
  this.schemas = {};
  this.allowedValues = {};
  this.isChild = false;

  Object.keys(fieldsSchema).forEach(function (field) {
    var _fieldsSchema$field = fieldsSchema[field],
        type = _fieldsSchema$field.type,
        defaultValue = _fieldsSchema$field.defaultValue,
        allowedValues = _fieldsSchema$field.allowedValues,
        required = _fieldsSchema$field.required,
        validators = _fieldsSchema$field.validators,
        filters = _fieldsSchema$field.filters,
        format = _fieldsSchema$field.format,
        schema = _fieldsSchema$field.schema;

    var typeName = (0, _helper.getTypeName)(type);

    if (!allowTypes.includes(typeName)) {
      throw new Error('Don\'t allow type of field \'' + field + '\'');
    }

    _this.fields[field] = defaultValue;
    _this.types[field] = type;

    _this.validators[field] = ['type'];
    _this.required[field] = false;
    _this.formats[field] = format;

    if (allowedValues) {
      _this.allowedValues[field] = allowedValues;
      _this.validators[field].push({
        fn: 'enum',
        options: {
          allowedValues: allowedValues
        }
      });
    }

    if (required) {
      _this.required[field] = true;
      _this.validators[field].push('required');
    }

    if (schema) {
      _this.schemas[field] = new Schema(schema);
      _this.schemas[field].isChild = true;
    }

    var dateFN = {
      fn: 'date',
      options: {
        format: format
      }
    };

    if (typeName === 'date') {
      _this.validators[field].push(dateFN);
    }

    if (validators) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = validators[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var validator = _step6.value;

          _this.validators[field].push(validator);
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
    }

    if (typeName === 'date') {
      _this.filters[field] = [dateFN];
    } else {
      _this.filters[field] = [typeName];
    }

    if (filters) {
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = filters[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var filter = _step7.value;

          _this.filters[field].push(filter);
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }
    }
  });
};

module.exports = Schema;