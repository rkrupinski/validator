'use strict';

var config = require('./config');

function Message(field) {
  if (!(this instanceof Message)) {
    return new Message(field);
  }

  this._field = field;
  this._el = document.createElement(config.errorElement);
  this._el.className = config.errorClassName;
}

Message.prototype.show = function (validator) {
  this._el.innerHTML = validator.message;
  config.appendMessage.call(null, this._field, this._el);
};

Message.prototype.hide = function () {
  config.removeMessage.call(null, this._field, this._el);
};

module.exports = Message;
