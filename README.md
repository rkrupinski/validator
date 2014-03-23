validator
=========

Lightweight form validation.


Usage
-----
It feeds with `data-` attributes:
- `data-v-[type]="[message]"`
- `data-v-[type]-[param]="[value]"`

The actual html:
```html
<input type="text" data-v-required="I demand value" data-v-length="Too short" data-v-length-min="3">
```

The factory:
```js
var myAwesomeValidator = validator(document.querySelector('form'));
```

For each form only one validator is allowed:
```js
var a = validator(myForm);
var b = validator(myForm);

a === b; // true
```

Methods:
- `validate` - validates the form
- `update` - lets the validator know that fields were added/removed

Defining validators
-------------------
Validator is simply an object with `2` properties:
- `priority` - an integer defining order of validators. The one with lower priority applies first.
- `validate` - the actual validation function. It is called with `2` arguments: `field` and `params`. It must return `Boolean`.

Example validator:
```js
batman: {
  priority: 10,
  validate: function (field) {
    return field.value ? field.value.toLowerCase() === 'batman' : true;
  }
}
```
