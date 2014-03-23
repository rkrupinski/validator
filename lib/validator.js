'use strict';

var field = require('./field')
  , config = require('./config')
  , utils = require('./utils')
  , key = config.key
  , ignored = config.ignored
  , slice = [].slice;

function nodeFilter(node) {
  return ignored.indexOf(node.type) === -1;
}

function Validator(form, options) {
  if (form[key]) {
    return form[key];
  }

  form[key] = this;

  this._form = form;
  this._options = utils.extend({}, options);
  this._fields = null;

  this.update();
  this._form.setAttribute('novalidate', '');

  this._form.addEventListener('submit', function (e) {
    if (typeof this._options.submitHandler === 'function') {
      e.preventDefault();
      return this._options.submitHandler.call(this, this._form);
    }

    !this.validate() && e.preventDefault();
  }.bind(this));
}

Validator.prototype.update = function () {
  this._fields = slice.call(this._form.querySelectorAll('input'))
      .filter(nodeFilter)
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
