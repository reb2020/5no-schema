'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var value = _ref.value,
      defaultValue = _ref.defaultValue;

  if (value === null) {
    return null;
  }

  if (value === defaultValue) {
    return defaultValue;
  }

  var typeOfValue = (0, _helper.getTypeOfValue)(value);

  if (typeOfValue !== 'object') {
    return {};
  }

  return value;
};

var _helper = require('../helper');