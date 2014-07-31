'use strict';

var message = require('./message')
  , validators = require('./validators')
  , config = require('./config')
  , key = config.key
  , re = /^data-v-([a-z]+)$/
  , slice = [].slice;

function compare(a, b) {
  return validators[a.type].priority > 
      validators[b.type].priority ?
      1 : -1;
}

function getValidatorParams(node, type) {
  var params = {}
    , re = new RegExp('^data-v-' + type + '-([a-z-]+)$')
    , match;

  slice.call(node.attributes).forEach(function (attr) {
    match = re.exec(attr.name);
    match && (params[match[1]] = attr.value);
  });

  return params;
}

function isValidatorDefined(type) {
  return typeof validators[type] !== 'undefined';
}

function getValidators(node) {
  var found = []
    , match;

  slice.call(node.attributes).forEach(function (attr) {
    match = re.exec(attr.name);

    match && isValidatorDefined(match[1]) && found.push({
      type: match[1],
      message: attr.value,
      params: getValidatorParams(node, match[1])
    });
  });

  found.sort(compare);

  return found;
}


function Field(node) {
  if (!(this instanceof Field)) {
    return new Field(node);
  }

  if (node[key]) {
    return node[key];
  }
  node[key] = this;

  this._valid = true;
  this._node = node;
  this._node.addEventListener('change',
      this.validate.bind(this));
  this._validators = getValidators(this._node);
  this._message = message(this._node);
}

Field.prototype.validate = function () {
  var valid = true
    , i = -1
    , l = this._validators.length
    , validator;

  while (++i < l) {
    validator = this._validators[i];
    valid = validators[validator.type].validate(
        this._node, validator.params);

    if (!valid) {
      this._valid = false;
      this._message.show(validator);
      break;
    } else {
      if (this._valid) {
        continue;
      }
      this._valid = true;
      this._message.hide();
    }
  }

  return valid;
};

Object.defineProperties(Field.prototype, {
  valid: {
    get: function () {
      return this._valid;
    },
    enumerable: true
  },
  node: {
    get: function () {
      return this._node;
    },
    enumerable: true
  }
});

module.exports = Field;
