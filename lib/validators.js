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
      var id = params.other;

      return field.value === document.querySelector('#' + id).value;
    }
  }

};

module.exports = validators;
