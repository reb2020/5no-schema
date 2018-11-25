'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var value = _ref.value,
      options = _ref.options;

  if (value === null) {
    return null;
  }

  if (typeof options.format !== 'undefined') {
    return (0, _helper.formatDate)(value, options.format);
  }

  return new Date(value);
};

var _helper = require('../helper');