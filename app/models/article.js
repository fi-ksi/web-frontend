import DS from "ember-data";

var Article = DS.Model.extend( {
	title: DS.attr("string"),
	published: DS.attr("date"),
	shortdescription: DS.attr("string"),
	content: DS.attr("string")
});

Article.reopenClass({
	FIXTURES: [
		{
			id: 1,
			title: "Testovaci clanek",
			content: "Cool obsah"
		},
		{
			id: 2,
			title: "Venku prší!",
			content: "Šokující, ale informatiky to nezajímá"
		}
	]
});

export default Article