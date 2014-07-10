'use strict';

var field = require('./field')
  , validators = require('./validators')
  , config = require('./config')
  , key = config.key
  , ignored = config.ignored
  , extend = require('./util/extend')
  , slice = [].slice;

function elementFilter(element) {
  return ignored.indexOf(element.type) === -1 &&
      !element.disabled;
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
