'use strict';

var config = {

  // key used to store validator data
  key: '___v',

  // ignored input types
  ignored: [
    'submit',
    'button',
    'reset'
  ],

  // html element used for error messages
  errorElement: 'span',


  // the className error messages get
  errorClassName: 'error',

  // default method for inserting error messages
  appendMessage: function append(field, msg) {
    field.parentNode.appendChild(msg);
  },

  // default method for removing error messages
  removeMessage: function remove(field, msg) {
    msg.parentNode && msg.parentNode.removeChild(msg);
  }

};

module.exports = config;
