import ValidatableInput from 'ember-cli-html5-validation/mixins/validatable-input';

ValidatableInput.reopen({
  errorTemplates: {
    // Errors when an input with "required" attribute has no value
    valueMissing: {
      defaultMessage: 'Toto pole je povinné',
      checkbox: 'Je třeba zaškrtnout alespoň jednu možnost',
      select: 'Je třeba vybrat jednu možnost',
      radio: 'Je třeba vybrat jednu možnost'
    },

    // Errors when a value does not match a given type like "url" or "email"
    typeMismatch: {
      defaultMessage: 'Zadaná hodnota je neplatná',
      email: 'E-mailová adresa je neplatná',
      url: 'Adresa je neplatná'
    },

    // Errors when a value does not follow the "pattern" regex
    patternMismatch: {
      defaultMessage: 'Hodnota nesplňuje očekávaný formát'
    },

    // Errors when an input is too long
    tooLong: {
      defaultMessage: 'Můžeš vložit maximálně %@ znaků'
    },

    // Errors when an input is less than "min" value
    rangeUnderflow: {
      defaultMessage: 'Číslo musí být alespoň %@'
    },

    // Errors when an input is more than "max" value
    rangeOverflow: {
      defaultMessage: 'Číslo může být nejvýše %@'
    },

    // Errors when a value does not follow step (for instance for "range" type)
    stepMismatch: {
      defaultMessage: 'Hodnota je neplatná'
    },

    // Default message that is used when none is matched
    defaultMessage: 'Hodnota je neplatná'
  },
});