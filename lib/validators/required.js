'use strict';

var def = {
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
          ret = !!field.value;
          break;
      }

      return ret;
    }
  }
};

module.exports = def;
