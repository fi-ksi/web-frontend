import Ember from "ember";

export default Ember.Controller.extend( {
	init_graph: function() {
		this.reset_graph_panel();
	}.on('init'),
	reset_graph_panel: function() {
        //var graphWidth = document.getElementById('graph-content').offsetWidth;
        //var graphHeight = document.getElementById('graph-content').offsetHeight;
        var graphPanel = document.getElementById("cy");

        //graphPanel.style.width = graphWidth + "px";
        //graphPanel.style.height = "1000px";
    },

});