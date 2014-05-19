'use strict';

var config = {
  key: '___v',
  ignored: ['submit', 'button', 'reset', 'radio'],
  events: { 'checkbox': 'change', '*': 'blur' },
  errorElement: 'span',
  errorClassName: 'error',
  appendMessage: function append(field, msg) {
    field.parentNode.appendChild(msg);
  }
};

module.exports = config;
