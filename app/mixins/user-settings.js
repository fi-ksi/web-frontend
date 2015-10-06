import Ember from "ember";

export default Ember.Mixin.create({
	countries: [{name: "Česká republika", short: "cz"}, {name: "Slovensko", short: "sk"}],
    tshirt_size: ["S", "M", "L", "XL"],
    maturita_year: ["2016", "2017", "2018", "2019"], // ToDo: Implement variable
});