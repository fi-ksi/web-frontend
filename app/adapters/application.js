import DS from "ember-data";

export default DS.FixtureAdapter.extend( {
	queryFixtures: function(fixtures, query) {
		var properties;
		properties = Object.keys(query);
		// Pagination support
		if(properties.contains('offset')) {
			fixtures = fixtures.slice(query.offset, query.offset + query.limit);
		}

		return fixtures;
	}
});