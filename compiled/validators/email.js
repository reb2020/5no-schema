'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var name = _ref.name,
      value = _ref.value;

  if (typeof value !== 'undefined' && (0, _helper.getTypeOfValue)(value) === 'string' && value && value.length < 254 && /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(value)) {
    var parts = value.split('@');
    var domainParts = parts[1].split('.');

    if (parts[0].length < 64 && !domainParts.some(function (part) {
      return part.length > 63;
    })) {
      return true;
    }
  } else if (typeof value === 'undefined') {
    return true;
  }

  return name + ' has incorrect email format';
};

var _helper = require('../helper');