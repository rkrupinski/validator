'use strict';

var def = {
  regex: {
    priority: 20,
    validate: function (field, params) {
      var re = new RegExp(params.pattern, params.flags);

      return field.value ? re.test(field.value) : true;
    }
  }
};

module.exports = def;
