'use strict';

var Field = require('./field')
  , config = require('./config')
  , key = config.key
  , ignored = config.ignored
  , slice = [].slice;

function nodeFilter(node) {
  return ignored.indexOf(node.type) === -1;
}

function fieldFactory(node) {
  return new Field(node);
}


function Validator(form) {
  if (form[key]) {
    return form[key];
  }

  form[key] = this;

  this._form = form;
  this._fields = null;

  this._form.setAttribute('novalidate', '');
  this.update();

  this._form.addEventListener('submit', function (e) {
    !this.validate() && e.preventDefault();
  }.bind(this));
}

Validator.prototype.update = function () {
  this._fields = slice.call(this._form.querySelectorAll('input'))
      .filter(nodeFilter)
      .map(fieldFactory);
};

Validator.prototype.validate = function () {
  var invalid = 0;

  this._fields.forEach(function (field) {
    !field.validate() && invalid++;
  });

  return !invalid;
};

module.exports = Validator;
