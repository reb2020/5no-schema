'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var value = _ref.value;

  if (value === null) {
    return null;
  }

  var typeOfValue = (0, _helper.getTypeOfValue)(value);

  if (typeOfValue === 'string') {
    return value.toLowerCase();
  }

  return value;
};

var _helper = require('../helper');