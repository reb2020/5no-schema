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

  var prefilledSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  (0, _classCallCheck3.default)(this, Schema);

  this.filter = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
      var dataFilter, mainErrors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, field, filtersByField, previousResult, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, filter, _promiseResult2, dataFilterCopy, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, filterData, promiseResult, _promiseResult;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dataFilter = (0, _helper.filterDataByFields)((0, _helper.clone)(data), _this.fields, _this.prefilled);

              if (_this.prefilledSchema) {
                dataFilter = (0, _helper.prefilledDataByFields)((0, _helper.clone)(data), _this.fields);
              }
              mainErrors = null;
              _context.prev = 3;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 7;
              _iterator = Object.keys(_this.fields)[Symbol.iterator]();

            case 9:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 87;
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
                _context.next = 84;
                break;
              }

              previousResult = dataFilter[field];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 17;
              _iterator2 = filtersByField[Symbol.iterator]();

            case 19:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 30;
                break;
              }

              filter = _step2.value;

              filter.data.previousResult = previousResult;
              filter.data.value = previousResult;
              _context.next = 25;
              return (0, _helper.initializePromise)(field, filter);

            case 25:
              _promiseResult2 = _context.sent;

              previousResult = _promiseResult2.result;

            case 27:
              _iteratorNormalCompletion2 = true;
              _context.next = 19;
              break;

            case 30:
              _context.next = 36;
              break;

            case 32:
              _context.prev = 32;
              _context.t0 = _context['catch'](17);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t0;

            case 36:
              _context.prev = 36;
              _context.prev = 37;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 39:
              _context.prev = 39;

              if (!_didIteratorError2) {
                _context.next = 42;
                break;
              }

              throw _iteratorError2;

            case 42:
              return _context.finish(39);

            case 43:
              return _context.finish(36);

            case 44:

              dataFilter[field] = previousResult;

              if (!_this.schemas[field]) {
                _context.next = 84;
                break;
              }

              if (!((0, _helper.getTypeName)(_this.types[field]) === 'array' && !(0, _helper.isEqual)(dataFilter[field], _this.fields[field]))) {
                _context.next = 79;
                break;
              }

              dataFilterCopy = dataFilter[field] || [];

              dataFilter[field] = [];
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context.prev = 52;
              _iterator3 = dataFilterCopy[Symbol.iterator]();

            case 54:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context.next = 63;
                break;
              }

              filterData = _step3.value;
              _context.next = 58;
              return (0, _helper.initializeChildPromise)(field, _this.schemas[field].filter, filterData);

            case 58:
              promiseResult = _context.sent;

              dataFilter[field].push(promiseResult.result);

            case 60:
              _iteratorNormalCompletion3 = true;
              _context.next = 54;
              break;

            case 63:
              _context.next = 69;
              break;

            case 65:
              _context.prev = 65;
              _context.t1 = _context['catch'](52);
              _didIteratorError3 = true;
              _iteratorError3 = _context.t1;

            case 69:
              _context.prev = 69;
              _context.prev = 70;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 72:
              _context.prev = 72;

              if (!_didIteratorError3) {
                _context.next = 75;
                break;
              }

              throw _iteratorError3;

            case 75:
              return _context.finish(72);

            case 76:
              return _context.finish(69);

            case 77:
              _context.next = 84;
              break;

            case 79:
              if ((0, _helper.isEqual)(dataFilter[field], _this.fields[field])) {
                _context.next = 84;
                break;
              }

              _context.next = 82;
              return (0, _helper.initializeChildPromise)(field, _this.schemas[field].filter, dataFilter[field]);

            case 82:
              _promiseResult = _context.sent;

              dataFilter[field] = _promiseResult.result;

            case 84:
              _iteratorNormalCompletion = true;
              _context.next = 9;
              break;

            case 87:
              _context.next = 93;
              break;

            case 89:
              _context.prev = 89;
              _context.t2 = _context['catch'](7);
              _didIteratorError = true;
              _iteratorError = _context.t2;

            case 93:
              _context.prev = 93;
              _context.prev = 94;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 96:
              _context.prev = 96;

              if (!_didIteratorError) {
                _context.next = 99;
                break;
              }

              throw _iteratorError;

            case 99:
              return _context.finish(96);

            case 100:
              return _context.finish(93);

            case 101:
              _context.next = 106;
              break;

            case 103:
              _context.prev = 103;
              _context.t3 = _context['catch'](3);

              mainErrors = _context.t3;

            case 106:
              return _context.abrupt('return', new Promise(function (resolve, reject) {
                if (mainErrors) {
                  reject(mainErrors);
                } else {
                  resolve(dataFilter);
                }
              }));

            case 107:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[3, 103], [7, 89, 93, 101], [17, 32, 36, 44], [37,, 39, 43], [52, 65, 69, 77], [70,, 72, 76], [94,, 96, 100]]);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }();

  this.validate = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
      var dataValidate, promises, mainErrors, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, field, validatorsByField, previousResult, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, validator, promiseResult, dataValidateCopy, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, validateData;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dataValidate = (0, _helper.filterDataByFields)((0, _helper.clone)(data), _this.fields, _this.prefilled);

              if (_this.prefilledSchema) {
                dataValidate = (0, _helper.prefilledDataByFields)((0, _helper.clone)(data), _this.fields);
              }
              promises = {};
              mainErrors = null;
              _context2.prev = 4;
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context2.prev = 8;
              _iterator4 = Object.keys(_this.fields)[Symbol.iterator]();

            case 10:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                _context2.next = 90;
                break;
              }

              field = _step4.value;
              validatorsByField = (0, _helper.initializeFunctions)(_this.validators[field], _validators2.default, {
                name: field,
                type: _this.types[field],
                allValues: dataValidate,
                previousResult: true,
                value: dataValidate[field],
                defaultValue: _this.fields[field]
              });
              previousResult = true;
              _iteratorNormalCompletion5 = true;
              _didIteratorError5 = false;
              _iteratorError5 = undefined;
              _context2.prev = 17;
              _iterator5 = validatorsByField[Symbol.iterator]();

            case 19:
              if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                _context2.next = 31;
                break;
              }

              validator = _step5.value;

              if (typeof promises[field] === 'undefined') {
                promises[field] = [];
              }
              validator.data.previousResult = previousResult;
              _context2.next = 25;
              return (0, _helper.initializePromise)(field, validator);

            case 25:
              promiseResult = _context2.sent;

              previousResult = promiseResult.result;
              promises[field].push(promiseResult);

            case 28:
              _iteratorNormalCompletion5 = true;
              _context2.next = 19;
              break;

            case 31:
              _context2.next = 37;
              break;

            case 33:
              _context2.prev = 33;
              _context2.t0 = _context2['catch'](17);
              _didIteratorError5 = true;
              _iteratorError5 = _context2.t0;

            case 37:
              _context2.prev = 37;
              _context2.prev = 38;

              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }

            case 40:
              _context2.prev = 40;

              if (!_didIteratorError5) {
                _context2.next = 43;
                break;
              }

              throw _iteratorError5;

            case 43:
              return _context2.finish(40);

            case 44:
              return _context2.finish(37);

            case 45:
              if (!_this.schemas[field]) {
                _context2.next = 87;
                break;
              }

              if (typeof promises[field] === 'undefined') {
                promises[field] = [];
              }

              if (!((0, _helper.getTypeName)(_this.types[field]) === 'array' && !(0, _helper.isEqual)(dataValidate[field], _this.fields[field]))) {
                _context2.next = 81;
                break;
              }

              dataValidateCopy = dataValidate[field] || [];

              dataValidate[field] = [];
              _iteratorNormalCompletion6 = true;
              _didIteratorError6 = false;
              _iteratorError6 = undefined;
              _context2.prev = 53;
              _iterator6 = dataValidateCopy[Symbol.iterator]();

            case 55:
              if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                _context2.next = 65;
                break;
              }

              validateData = _step6.value;
              _context2.t1 = promises[field];
              _context2.next = 60;
              return (0, _helper.initializeChildPromise)(field, _this.schemas[field].validate, validateData);

            case 60:
              _context2.t2 = _context2.sent;

              _context2.t1.push.call(_context2.t1, _context2.t2);

            case 62:
              _iteratorNormalCompletion6 = true;
              _context2.next = 55;
              break;

            case 65:
              _context2.next = 71;
              break;

            case 67:
              _context2.prev = 67;
              _context2.t3 = _context2['catch'](53);
              _didIteratorError6 = true;
              _iteratorError6 = _context2.t3;

            case 71:
              _context2.prev = 71;
              _context2.prev = 72;

              if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
              }

            case 74:
              _context2.prev = 74;

              if (!_didIteratorError6) {
                _context2.next = 77;
                break;
              }

              throw _iteratorError6;

            case 77:
              return _context2.finish(74);

            case 78:
              return _context2.finish(71);

            case 79:
              _context2.next = 87;
              break;

            case 81:
              if ((0, _helper.isEqual)(dataValidate[field], _this.fields[field])) {
                _context2.next = 87;
                break;
              }

              _context2.t4 = promises[field];
              _context2.next = 85;
              return (0, _helper.initializeChildPromise)(field, _this.schemas[field].validate, dataValidate[field]);

            case 85:
              _context2.t5 = _context2.sent;

              _context2.t4.push.call(_context2.t4, _context2.t5);

            case 87:
              _iteratorNormalCompletion4 = true;
              _context2.next = 10;
              break;

            case 90:
              _context2.next = 96;
              break;

            case 92:
              _context2.prev = 92;
              _context2.t6 = _context2['catch'](8);
              _didIteratorError4 = true;
              _iteratorError4 = _context2.t6;

            case 96:
              _context2.prev = 96;
              _context2.prev = 97;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 99:
              _context2.prev = 99;

              if (!_didIteratorError4) {
                _context2.next = 102;
                break;
              }

              throw _iteratorError4;

            case 102:
              return _context2.finish(99);

            case 103:
              return _context2.finish(96);

            case 104:
              _context2.next = 109;
              break;

            case 106:
              _context2.prev = 106;
              _context2.t7 = _context2['catch'](4);

              mainErrors = _context2.t7;

            case 109:
              return _context2.abrupt('return', new Promise(function (resolve, reject) {
                if (mainErrors) {
                  return reject(mainErrors);
                }

                var errors = {};
                var data = {};

                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                  for (var _iterator7 = Object.keys(promises)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var _field = _step7.value;

                    var validatorsData = promises[_field];

                    errors = Object.assign(errors, (0, _helper.groupErrors)(validatorsData));
                    data = Object.assign(data, (0, _helper.getChildData)(_this.types, dataValidate, validatorsData));
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

                if (Object.keys(errors).length > 0) {
                  reject(errors);
                } else {
                  resolve(data);
                }
              }));

            case 110:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[4, 106], [8, 92, 96, 104], [17, 33, 37, 45], [38,, 40, 44], [53, 67, 71, 79], [72,, 74, 78], [97,, 99, 103]]);
    }));

    return function (_x3) {
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
      }
    });

    return data;
  };

  var allowTypes = ['string', 'number', 'boolean', 'object', 'array', 'date'];

  this.fields = {};
  this.prefilled = {};
  this.validators = {};
  this.filters = {};
  this.types = {};
  this.required = {};
  this.formats = {};
  this.schemas = {};
  this.allowedValues = {};
  this.isChild = false;
  this.prefilledSchema = prefilledSchema;

  Object.keys(fieldsSchema).forEach(function (field) {
    var _fieldsSchema$field = fieldsSchema[field],
        type = _fieldsSchema$field.type,
        prefilled = _fieldsSchema$field.prefilled,
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
    _this.prefilled[field] = prefilled || false;
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

    var dataFN = {
      fn: typeName
    };

    if (typeof format !== 'undefined') {
      dataFN.options = { format: format };
    }

    if (['date', 'number'].includes(typeName)) {
      _this.validators[field].push(dataFN);
    }

    if (validators) {
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = validators[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var validator = _step8.value;

          _this.validators[field].push(validator);
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }
    }

    if (['date', 'number'].includes(typeName)) {
      _this.filters[field] = [dataFN];
    } else {
      _this.filters[field] = [typeName];
    }

    if (filters) {
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = filters[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var filter = _step9.value;

          _this.filters[field].push(filter);
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }
    }
  });
};

module.exports = Schema;