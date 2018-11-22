'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var name = _ref.name,
      value = _ref.value,
      defaultValue = _ref.defaultValue;

  if (typeof value === 'undefined' || !value && value !== defaultValue) {
    return name + ' is required';
  }

  return true;
};