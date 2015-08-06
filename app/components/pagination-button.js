import Ember from "ember";

export default Ember.Component.extend({
	tagName: "button",
	classNames: "btn btn-default".w(),
	attributeBindings: ["disabled"],
	enabled: true,
	disabled: Ember.computed.not("enabled"),
	action: null,
	click: function() {
		this.sendAction();
		//window.scrollTo(0, 0);
		Ember.$("html, body").animate({ scrollTop: 0 }, "slow"); // ToDo: This isn't working!
		console.log("Scrolled!");
	}
});