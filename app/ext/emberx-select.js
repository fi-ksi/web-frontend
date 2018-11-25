import Select from 'emberx-select/components/x-select';
import ValidatableInput from 'ember-cli-html5-validation/mixins/validatable-input';

Select.reopen(ValidatableInput, {
});