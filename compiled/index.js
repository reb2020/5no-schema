'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

  this.filter = function (data) {
    var dataFilter = (0, _helper.filterDataByFields)((0, _helper.clone)(data), _this.fields);

    Object.keys(dataFilter).forEach(function (field) {
      var filtersByField = (0, _helper.initializeFunctions)(_this.filters[field], _filters2.default, {
        name: field,
        type: _this.types[field],
        defaultValue: _this.fields[field]
      });

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = filtersByField[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var filter = _step.value;

          if (typeof dataFilter[field] !== 'undefined') {
            dataFilter[field] = filter.fn((0, _extends3.default)({}, filter.data, { value: dataFilter[field] }));
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
    });

    return dataFilter;
  };

  this.validate = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
      var dataValidate, promises, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, field, validatorsByField, previousResult, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, validator, promiseResult;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dataValidate = (0, _helper.filterDataByFields)((0, _helper.clone)(data), _this.fields);
              promises = {};
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 5;
              _iterator2 = Object.keys(_this.fields)[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 52;
                break;
              }

              field = _step2.value;
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
              _context.prev = 14;
              _iterator4 = validatorsByField[Symbol.iterator]();

            case 16:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                _context.next = 28;
                break;
              }

              validator = _step4.value;

              if (typeof promises[field] === 'undefined') {
                promises[field] = [];
              }
              validator.data.previousResult = previousResult;
              _context.next = 22;
              return (0, _helper.initializePromise)(field, validator);

            case 22:
              promiseResult = _context.sent;

              previousResult = promiseResult.result;
              promises[field].push(promiseResult);

            case 25:
              _iteratorNormalCompletion4 = true;
              _context.next = 16;
              break;

            case 28:
              _context.next = 34;
              break;

            case 30:
              _context.prev = 30;
              _context.t0 = _context['catch'](14);
              _didIteratorError4 = true;
              _iteratorError4 = _context.t0;

            case 34:
              _context.prev = 34;
              _context.prev = 35;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 37:
              _context.prev = 37;

              if (!_didIteratorError4) {
                _context.next = 40;
                break;
              }

              throw _iteratorError4;

            case 40:
              return _context.finish(37);

            case 41:
              return _context.finish(34);

            case 42:
              if (!_this.schemas[field]) {
                _context.next = 49;
                break;
              }

              if (typeof promises[field] === 'undefined') {
                promises[field] = [];
              }
              _context.t1 = promises[field];
              _context.next = 47;
              return (0, _helper.initializeChildPromise)(field, _this.schemas[field], dataValidate[field]);

            case 47:
              _context.t2 = _context.sent;

              _context.t1.push.call(_context.t1, _context.t2);

            case 49:
              _iteratorNormalCompletion2 = true;
              _context.next = 7;
              break;

            case 52:
              _context.next = 58;
              break;

            case 54:
              _context.prev = 54;
              _context.t3 = _context['catch'](5);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t3;

            case 58:
              _context.prev = 58;
              _context.prev = 59;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 61:
              _context.prev = 61;

              if (!_didIteratorError2) {
                _context.next = 64;
                break;
              }

              throw _iteratorError2;

            case 64:
              return _context.finish(61);

            case 65:
              return _context.finish(58);

            case 66:
              return _context.abrupt('return', new Promise(function (resolve, reject) {
                var errors = {};
                var data = {};

                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                  for (var _iterator3 = Object.keys(promises)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var field = _step3.value;

                    var validatorsData = promises[field];

                    errors = Object.assign(errors, (0, _helper.groupErrors)(validatorsData));
                    data = Object.assign(data, (0, _helper.getChildData)(dataValidate, validatorsData));
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

                if (Object.keys(errors).length > 0) {
                  reject(errors);
                } else {
                  resolve(data);
                }
              }));

            case 67:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[5, 54, 58, 66], [14, 30, 34, 42], [35,, 37, 41], [59,, 61, 65]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
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
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = validators[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var validator = _step5.value;

          _this.validators[field].push(validator);
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
    }

    if (typeName === 'date') {
      _this.filters[field] = [dateFN];
    } else {
      _this.filters[field] = [typeName];
    }

    if (filters) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = filters[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var filter = _step6.value;

          _this.filters[field].push(filter);
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
  });

  this.fields = this.filter(this.fields);
};

module.exports = Schema;