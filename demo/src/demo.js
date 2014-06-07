'use strict';

var validator = require('../../lib/index');

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
