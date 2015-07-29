import Ember from "ember";

export default Ember.Component.extend({
	tagName: "button",
	classNames: "btn btn-default".w(),
	attributeBindings: ["disabled"],
	enabled: true,
	disabled: Ember.coputed.not("enabled"),
	action: null,
	click: function() {
		this.sendAction();
	}
});