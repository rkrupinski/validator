'use strict';

var def = {
  equalto: {
    priority: 20,
    validate: function (field, params) {
      var other = document.querySelector('#' + params.other);

      return other.value ? field.value === other.value : true;
    }
  }
};

module.exports = def;
