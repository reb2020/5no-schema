'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var value = _ref.value;

  if (value === null) {
    return null;
  }

  return Boolean(!(value === 'false' || value === '0' || !value));
};