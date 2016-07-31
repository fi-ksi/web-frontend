import Ember from "ember";

export default Ember.Controller.extend( {
    queryParams: ["page"],
    page: 1,
    offset: 0,
    total: function() {
            return this.get("model").get('meta').total;
        }.property("model"),
    hasPreviousPage: function() {
            return this.get("offset") !== 0;
        }.property("offset"),
    hasNextPage: function() {
            return (this.get("offset") + this.get("limit")) < this.get("total");
        }.property("offset", "limit", "total"),
    actions: {
        previousPage: function() {
                var totalPages = Math.ceil(this.get("total") / this.get("limit"));
                if(this.decrementProperty("page") > totalPages) {
                    this.set("page", totalPages);
                }

                this.transitionToRoute( {
                    queryParams: {
                        page: this.get("page")
                    }
                });
            },
        nextPage: function() {
                this.transitionToRoute({
                    queryParams: {
                        page: this.incrementProperty('page')
                    }
                });
            }
        }
});
