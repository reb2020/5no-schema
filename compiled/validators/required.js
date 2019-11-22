'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var name = _ref.name,
      value = _ref.value,
      defaultValue = _ref.defaultValue;

  var typeOfValue = (0, _helper.getTypeOfValue)(value);

  if (typeof value === 'undefined' || !value && typeOfValue !== 'boolean' && !(0, _helper.isEqual)(value, defaultValue)) {
    return name + ' is required';
  }

  return true;
};

var _helper = require('../helper');