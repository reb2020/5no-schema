'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var name = _ref.name,
      value = _ref.value,
      options = _ref.options,
      defaultValue = _ref.defaultValue;

  if (typeof value !== 'undefined' && (0, _helper.getTypeOfValue)(value) === 'string' && !(0, _helper.isEqual)(value, defaultValue) && (typeof options.format === 'undefined' || !(0, _helper.isDateValid)(value, options.format))) {
    return name + ' has incorrect date format';
  }

  return true;
};

var _helper = require('../helper');