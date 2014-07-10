(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var validator = require('../..');

validator.define({
  even: {
    priority: 20,
    validate: function (field) {
      return field.value ? !(field.value.length % 2) : true;
    }
  }
});

validator(document.querySelector('.js_form'), {
  submitHandler: function (form) {
    if (this.validate()) {
      alert('Yay!');
      form.reset();
    }
  }
});

},{"../..":2}],2:[function(require,module,exports){
'use strict';

module.exports = require('./lib/validator');

},{"./lib/validator":7}],3:[function(require,module,exports){
'use strict';

var config = {

  // key used to store validator data
  key: '___v',

  // ignored input types
  ignored: [
    'submit',
    'button',
    'reset'
  ],

  // html element used for error messages
  errorElement: 'span',


  // the className error messages get
  errorClassName: 'error',

  // default method for inserting error messages
  appendMessage: function append(field, msg) {
    field.parentNode.appendChild(msg);
  }

};

module.exports = config;

},{}],4:[function(require,module,exports){
'use strict';

var message = require('./message')
  , validators = require('./validators')
  , config = require('./config')
  , key = config.key
  , re = /^data-v-([a-z]+)$/
  , slice = [].slice;

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

  this._node = node;
  this._node.addEventListener('change',
      this.validate.bind(this));
  this._validators = getValidators(this._node);
  this._message = message(this._node);
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

},{"./config":3,"./message":5,"./validators":8}],5:[function(require,module,exports){
'use strict';

var config = require('./config')
  , appendMessage = config.appendMessage;

function Message(field) {
  if (!(this instanceof Message)) {
    return new Message(field);
  }

  this._field = field;
  this._visible = false;
  this._el = document.createElement(config.errorElement);
  this._el.className = config.errorClassName;
}

Message.prototype.show = function (validator) {
  this._el.innerHTML = validator.message;

  if (!this._visible) {
    appendMessage.call(null, this._field, this._el);
    this._visible = true;
  }
};

Message.prototype.hide = function () {
  if (this._visible) {
    this._el.parentNode.removeChild(this._el);
    this._visible = false;
  }
};

module.exports = Message;

},{"./config":3}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

var field = require('./field')
  , validators = require('./validators')
  , config = require('./config')
  , key = config.key
  , ignored = config.ignored
  , extend = require('./util/extend')
  , slice = [].slice;

function elementFilter(element) {
  return ignored.indexOf(element.type) === -1;
}

function submitHandler(e) {
  /*jshint validthis:true*/
  if (typeof this._options.submitHandler === 'function') {
    e.preventDefault();
    return this._options.submitHandler.call(this, this._form);
  }

  !this.validate() && e.preventDefault();
}

function Validator(form, options) {
  if (!(this instanceof Validator)) {
    return new Validator(form, options);
  }

  if (form[key]) {
    return form[key];
  }
  form[key] = this;

  this._form = form;
  this._form.noValidate = true;
  this._form.addEventListener('submit', submitHandler.bind(this));
  this._options = extend({}, options);

  this.update();
}

Validator.define = function (def) {
  extend(validators, def);

  return this;
};

Validator.prototype.update = function () {
  this._fields = slice.call(this._form.elements)
      .filter(elementFilter)
      .map(field);
};

Validator.prototype.validate = function () {
  var invalid = 0;

  this._fields.forEach(function (field) {
    !field.validate() && invalid++;
  });

  return !invalid;
};

module.exports = Validator;

},{"./config":3,"./field":4,"./util/extend":6,"./validators":8}],8:[function(require,module,exports){
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

},{"./util/extend":6,"./validators/equalto":9,"./validators/regex":10,"./validators/required":11}],9:[function(require,module,exports){
'use strict';

var def = {
  equalto: {
    priority: 20,
    validate: function (field, params) {
      var other = document.querySelector('#' + params.other);

      return other.value ? field.value === other.value : true;
    }
  }
};

module.exports = def;

},{}],10:[function(require,module,exports){
'use strict';

var def = {
  regex: {
    priority: 20,
    validate: function (field, params) {
      var re = new RegExp(params.pattern, params.flags);

      return field.value ? re.test(field.value) : true;
    }
  }
};

module.exports = def;

},{}],11:[function(require,module,exports){
'use strict';

var def = {
  required: {
    priority: 10,
    validate: function (field) {
      var ret;

      switch (field.type) {
        case 'checkbox':
          ret = field.checked;
          break;
        case 'radio':
          ret = !!field.form.querySelector('[name="' +
              field.name + '"]:checked');
          break;
        default:
          ret = !!field.value;
          break;
      }

      return ret;
    }
  }
};

module.exports = def;

},{}]},{},[1])