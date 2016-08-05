import Ember from "ember";

export default Ember.Mixin.create({
    countries: [{name: "Česká republika", short: "cz"}, {name: "Slovensko", short: "sk"}],
    tshirt_size: ["S", "M", "L", "XL"],
});
