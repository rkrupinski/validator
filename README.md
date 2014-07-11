validator
=========
Lightweight (, basic) form validation.

Usage
-----
It feeds with `data-` attributes:
- `data-v-[type]="[message]"`
- `data-v-[type]-[param]="[value]"`

The actual html:
```html
<input type="text" data-v-required="I demand value" data-v-regex="Caps only" data-v-regex-pattern="^[A-Z]+$">
```

The factory:
```js
var validator = require('validator');

validator(form /*, [options]*/);
```

Options:
- `submitHandler` - function to call when the form is submitted (called in the context of the validator and passed the form as a parameter)
```js
{
  submitHandler: function (form) {
    this.validate() && form.submit();
  }
}
```
Instance properties:
- `fields` - array of held `Field` objects

Instance methods:
- `validate` - validates the form (returns `Boolean`, depending on the validation result)
- `update` - lets the validator know that fields were added/removed

For each form only one instance is allowed:
```js
var form = document.querySelector('form')
  , a = validator(form)
  , b = validator(form);

a === b; // true
```

Validators
----------
Validator comes with some built-in validators:
- `equalto` (params: `other` - id of the reference field)
- `regex` (parans: `pattern` - regular expression to match, `flags` - flags)
- `required`

Defining custom ones is easy as pie - all you need is simply an object with `2` properties:
- `priority` - an integer defining order of validators. The one with lower priority applies first.
- `validate` - the actual validation function. It is called with `2` arguments: `field` and `params`. It must return `Boolean`.

Defining custom validators:

```js
var validator = require('validator');

validator.define({
  is: {
    priority: 10,
    validate: function (field, params) {
      var ref = params.value;

      return field.value ? field.value === ref : true;
    }
  }
});
```

Example
-------
View demo [here](http://rkrupinski.github.io/validator/demo/).

Browser support
---------------
IE9+
