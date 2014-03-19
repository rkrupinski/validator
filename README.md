validator
=========

Lightweight form validation.


Usage
-----
It feeds with `data-` attributes:
- `data-v-[type]="[message]"`
- `data-v-[type]-[param]="[value]"`

Actual html:
```html
<input type="text" data-v-required="I demand value" data-v-length="Too short" data-v-length-min="3">
```

The constructor:
```js
var myAwesomeValidator = new Validator(document.querySelector('form'));
```

For each form only one validator is allowed:
```js
var a = new Validator(myForm);
var b = new Validator(myForm);

a === b; // true
```

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
