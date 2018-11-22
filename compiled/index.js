'use strict';

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

var Schema = function Schema(schema) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Schema);

  this.filter = function (data) {
    var dataFilter = (0, _helper.clone)(data);

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

  this.validate = function (data) {
    var dataValidate = (0, _helper.clone)(data);
    var errors = [];

    Object.keys(_this.fields).forEach(function (field) {
      var validatorsByField = (0, _helper.initializeFunctions)(_this.validators[field], _validators2.default, {
        name: field,
        type: _this.types[field],
        value: dataValidate[field],
        defaultValue: _this.fields[field]
      });

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = validatorsByField[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var validator = _step2.value;

          var isValid = validator.fn(validator.data);
          if (isValid !== true) {
            if (typeof isValid === 'string') {
              errors.push(new Error(isValid));
            } else {
              errors.push(isValid);
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
    });

    return new Promise(function (resolve, reject) {
      if (errors.length > 0) {
        reject(errors);
      } else {
        resolve(dataValidate);
      }
    });
  };

  var allowTypes = ['string', 'number', 'boolean', 'object', 'array', 'date'];

  this.fields = {};
  this.validators = {};
  this.filters = {};
  this.types = {};

  Object.keys(schema).forEach(function (field) {
    var _schema$field = schema[field],
        type = _schema$field.type,
        defaultValue = _schema$field.defaultValue,
        required = _schema$field.required,
        validators = _schema$field.validators,
        filters = _schema$field.filters;

    var typeName = (0, _helper.getTypeName)(type);

    if (!allowTypes.includes(typeName)) {
      throw new Error('Don\'t allow type of field \'' + field + '\'');
    }

    _this.fields[field] = defaultValue;
    _this.types[field] = type;

    _this.validators[field] = ['type'];

    if (required) {
      _this.validators[field].push('required');
    }

    if (validators) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = validators[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var validator = _step3.value;

          _this.validators[field].push(validator);
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
    }

    _this.filters[field] = [typeName];

    if (filters) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = filters[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var filter = _step4.value;

          _this.filters[field].push(filter);
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
    }
  });

  this.fields = this.filter(this.fields);
};

module.exports = Schema;