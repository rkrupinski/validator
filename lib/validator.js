'use strict';

var Field = require('./field')
	, slice = [].slice
	, push = [].push
	, key = '__' + Date.now()
	, ignored = ['submit', 'button', 'reset', 'radio'];

function nodeFilter(node) {
	return !node[key] && ignored.indexOf(node.type) === -1;
}

function fieldFactory(node) {
	node[key] = '☺';

	return new Field(node);
}


function Validator(form) {
	if (form[key]) {
		return form[key];
	}

	form[key] = this;

	this._form = form;
	this._fields = [];

	this._form.setAttribute('novalidate', '');
	this.update();

	this._form.addEventListener('submit', function (e) {
		!this._validate() && e.preventDefault();
	}.bind(this));
}

Validator.prototype.update = function () {
	var fields = slice.call(this._form.querySelectorAll('input'))
			.filter(nodeFilter)
			.map(fieldFactory);

	push.apply(this._fields, fields);
};

Validator.prototype._validate = function () {
	var invalid = 0;

	this._fields.forEach(function (field) {
		!field.validate() && invalid++;
	});

	return !invalid;
};

module.exports = Validator;
