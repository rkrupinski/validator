'use strict';

var validators = {

  required: {
    priority: 10,
    validate: function (field) {
      var ret;

      switch (field.type) {
        case 'checkbox':
          ret = field.checked;
          break;
        case 'radio':
          ret = !!field.form.querySelector('[name="' +
              field.name + '"]:checked');
          break;
        default:
          ret = !!field.value.length;
          break;
      }

      return ret;
    }
  },

  regex: {
    priority: 20,
    validate: function (field, params) {
      var re = new RegExp(params.pattern, params.flags);

      return field.value ? re.test(field.value) : true;
    }
  },

  equalto: {
    priority: 20,
    validate: function (field, params) {
      var other = document.querySelector('#' + params.other);

      return other.value ? field.value === other.value : true;
    }
  }

};

module.exports = validators;
