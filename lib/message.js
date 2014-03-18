function append(field, msg) {
  field.parentNode.appendChild(msg);
}


function Message(field) {
  this._field = field;
  this._visible = false;

  this._el = document.createElement('span');
  this._el.className = 'error';
}

Message.prototype.show = function (validator) {
  this._el.innerHTML = validator.message;

  if (!this._visible) {
    append.call(null, this._field, this._el);
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
