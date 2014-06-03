'use strict';

var validator = require('../../lib/index');

validator(document.querySelector('.js_form'), {
  submitHandler: function () {
    this.validate() && alert('Yay!');
  }
});
