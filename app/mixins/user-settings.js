import Ember from "ember";

export default Ember.Mixin.create({
    countries: [{name: "Česká republika", short: "cz"}, {name: "Slovensko", short: "sk"}],
    tshirt_size: [
      {name: "Pokud chceš, vyber svou velikost trička.", short: "M"},
      {name: "XS", short: "XS"},
      {name: "S", short: "S"},
      {name: "M", short: "M"},
      {name: "L", short: "L"},
      {name: "XL", short: "XL"},
    ],
});
