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

  return Boolean(!(value === 'false' || value === '0' || !value));
};