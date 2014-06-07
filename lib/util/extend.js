'use strict';

function extend(obj) {
  var sources = [].slice.call(arguments, 1);

  sources.forEach(function (source) {
    for (var prop in source) {
      obj[prop] = source[prop];
    }
  });

  return obj;
}

module.exports = extend;
