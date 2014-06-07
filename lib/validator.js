'use strict';

var field = require('./field')
  , config = require('./config')
  , extend = require('./util/extend')
  , key = config.key
  , ignored = config.ignored
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

module.exports = function (form, options) {
  return new Validator(form, options);
};
