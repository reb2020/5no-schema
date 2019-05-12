'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var name = _ref.name,
      value = _ref.value,
      options = _ref.options,
      defaultValue = _ref.defaultValue;

  if (typeof value !== 'undefined' && value !== defaultValue && !options.allowedValues.includes(value)) {
    return name + ' should be equal to one of the allowed values';
  }

  return true;
};