var Message = require('./message')
  , validators = require('./validators')
  , re = /^data-v-([a-z]+)$/
  , slice = [].slice
  , events = { 'checkbox': 'change', '*': 'blur' };

function compare(a, b) {
  if (validators[a.type].priority <
      validators[b.type].priority) {
    return -1;
  }
  if (validators[a.type].priority >
      validators[b.type].priority) {
    return 1;
  }
  return 0;
}

function getValidatorParams(node, validator) {
  var params = {}
    , re = new RegExp('^data-v-' + validator + '-([a-z-]+)$')
    , match;

  slice.call(node.attributes).forEach(function (attr) {
    match = re.exec(attr.name);
    match && (params[match[1]] = attr.value);
  });

  return params;
}

function getValidators(node) {
  var found = []
    , match;

  slice.call(node.attributes).forEach(function (attr) {
    match = re.exec(attr.name);

    match && typeof validators[match[1]] !== 'undefined' &&
        found.push({
      type: match[1],
      message: attr.value,
      params: getValidatorParams(node, match[1])
    });
  });

  found.sort(compare);

  return found;
}


function Field(node) {
  this._node = node;
  this._validators = getValidators(this._node);
  this._message = new Message(this._node);

  this._node.addEventListener(events[this._node.type] ||
      events['*'], this.validate.bind(this));
}

Field.prototype.validate = function () {
  var validator
    , valid = true
    , i = -1
    , l = this._validators.length;

  while (++i < l) {
    validator = this._validators[i];
    valid = validators[validator.type].validate(
        this._node, validator.params);

    if (!valid) {
      this._message.show(validator);
      break;
    } else {
      this._message.hide();
    }
  }

  return valid;
};

module.exports = Field;
