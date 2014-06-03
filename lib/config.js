'use strict';

var config = {

  // key used to store validator data
  key: '___v',

  // ignored input types
  ignored: [
    'submit',
    'button',
    'reset',
    'radio',
    'hidden'
  ],

  // field specific events
  events: { 
    'checkbox': 'change',
    '*': 'blur'
  },

  // html element used for error messages
  errorElement: 'span',


  // the className error messages get
  errorClassName: 'error',

  // default method for inserting error messages
  appendMessage: function append(field, msg) {
    field.parentNode.appendChild(msg);
  }

};

module.exports = config;
