'use strict';

var extend = require('./util/extend');

// built in validators
var validators = [
  require('./validators/equalto'),
  require('./validators/regex'),
  require('./validators/required')
];

module.exports = extend.apply(null,
  [{}].concat(validators));
