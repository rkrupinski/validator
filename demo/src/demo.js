'use strict';

var validator = require('../..');

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
    var summary;

    if (this.validate()) {
      alert('Yay!');
      form.reset();
    } else {
      var summary = 'Errors: ' + this.fields.filter(function (field) {
        return !field.valid;
      }).map(function (field) {
        return field.node.name;
      }).join(', ') + '.';

      console.log('%c' + summary, 'font-size: 1.5em; color: maroon;');
    }
  }
});
