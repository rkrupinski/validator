'use strict';

var validator = require('../../lib/index');

validator(document.querySelector('.js_form'), {
  submitHandler: function (form) {
    this.validate() && alert('Yay!');
    form.reset();
  }
});
