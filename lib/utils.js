'use strict';

var utils = {}
  , slice = [].slice;

utils.extend = function () {
  var res = arguments[0]
    , sources = slice.call(arguments, 1);

  function extendOne(dest, src) {
    Object.keys(src).forEach(function (prop) {
      dest[prop] = src[prop];
    });
  }

  sources.forEach(function (src) {
    extendOne(res, src);
  });

  return res;
};

module.exports = utils;
