import Ember from "ember";

export default Ember.Component.extend({
	tagName: '',
	cy: undefined,
	root_node: undefined,
	cytoscape_data: function() {
		var ret = {
			nodes: [],
			edges: []
		};

		this.set("root_node",
			Math.min.apply(null, this.get("model").map(function(node) { return node.get("id"); })));

		//var self = this;
		this.get("model").forEach(function(node) {
			ret["nodes"].push({
				data: {
					id: node.get("id"),
					name: node.get("title"),
					picture: node.get("picture"),
					tooltip: node.get("intro"),
					max_score: node.get("max_score"),
					deadline: node.get("time_deadline"),
					node_type: node.get("category").get("type")
				}
			});
			// Heno ToDo: Počítej si hrany z node.get("prerequisities") - je to pole prerequizit, z nichž každá má atribut parents
			node.get("node_parent").forEach(function(parent) {
				ret["edges"].push({
					data: {
						source: parent.get("id"),
						target: node.get("id")
					}
				});
			});
		});

		return ret;
	}.property("model"),
	didInsertElement: function() {
		this._super();
		Ember.run.scheduleOnce('afterRender', this, function(){
			var self = this;
			Ember.$(window).on("window:resize", function() {
		  		self.reposition_graph();
		  	});
			this.reset_graph_panel();
			this.set("cy", cytoscape({
		        container: Ember.$('#cy')[0],
		        elements: this.get("cytoscape_data"),
		        zoom: 1,
		        pan: { x: 0, y: 0 },
		        zoomingEnabled: false,
		        userZoomingEnabled: false,
		        panningEnabled: true,
		        userPanningEnabled: false,
		        autoungrabify: false,
		        ready: function() {
		        	self.reset_graph_panel();
		        	self.style_graph();
		        	self.reposition_graph();
		        	self.setup_graph_actions();
		        }
		    }));
		});
	},
	reset_graph_panel: function() {
		var graphPanel = document.getElementById("cy");

		graphPanel.style.width = "100%";
		graphPanel.style.height = 1000 + "px";
	},
    reposition_graph: function() {
    	//var self = this;
    	this.get("cy").autolock(false);
    	var width = Ember.$("#cy").width();
    	var height = 1000;
    	var options = {
			name: 'dagre',

			// dagre algo options, uses default value on undefined
			/*nodeSep: undefined, // the separation between adjacent nodes in the same rank
			edgeSep: undefined, // the separation between adjacent edges in the same rank
			rankSep: undefined, // the separation between adjacent nodes in the same rank*/
			rankDir: 'TB', // 'TB' for top to bottom flow, 'LR' for left to right
			minLen: function(){ return 1; }, // number of ranks to keep between the source and target of the edge
			edgeWeight: function(){ return 1; }, // higher weight edges are generally made shorter and straighter than lower weight edges

			// general layout options
			fit: false, // whether to fit to viewport
			padding: 5, // fit padding
			animate: false, // whether to transition the node positions
			// Magic number hack
			boundingBox: {x1: 0, y1: 0, w: width/2, h: 0.8*height}, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
			ready: function(){}, // on layoutready
			stop: function(){} // on layoutstop
		};
		this.get("cy").layout(options);
		this.get("cy").center();
		options.boundingBox.height = this.get("cy").height();
		this.get("cy").autolock(true);
    },
    style_graph: function()  {
    	this.get("cy").style()
            .selector('node')
              .css({
                'width': '85px',
                'height': '85px',
								'background-width': '83px',
              	'background-height': '83px',
								'background-color': 'white',
								'background-opacity': '0',

								'background-image': 'data(picture)',
              })
            .selector('node[node_type = "uvod"]')
              .css({
								'width': '105px',
                'height': '105px',
								'background-width': '105px',
              	'background-height': '105px',
								'content': '',
              })
            .selector('node[node_type = "big"]')
              .css({
								'width': '105px',
                'height': '105px',
								'background-width': '105px',
              	'background-height': '105px',
								'content': '',
              })
            .selector('edge')
              .css({
                'width': 6,
								'border-color': '#39393a',
                'target-arrow-shape': 'triangle',
                'opacity': 1
              })
            .selector(':selected')
              .css({
                'background-color': 'orange',
                'opacity': 1
              })
            .selector('.faded')
              .css({
                'opacity': 0.0,
                'text-opacity': 0
        	}).update();
    },
    setup_graph_actions: function() {
    	var self = this;

    	this.get("cy").on('mousedown','node', function(event){
    		console.log("clicked!");
			var target = event.cyTarget;
	        var id = target.data("id");
	        self.sendAction('assign', id);
		});

		this.get("cy").on('mouseover','node', function(event){
	        var target = event.cyTarget;
	        var id = target.data("id");
	        var name = target.data("name");
	        var date = target.data("deadline");
	        var text = target.data("tooltip")
					+ "<br><br>"
					+ "<p class='graph-qtip-text inline'>Max.body:</p>" + target.data("max_score") + "<br>"
					+ "<p class='graph-qtip-text inline'>Termím odevzdání:</p> " + date.getDate() + ". " + (date.getMonth() + 1) + ". " + date.getFullYear(); //ToDo: Time!

	        var x=event.cyPosition.x;
	        var y=event.cyPosition.y;
	        self.get("cy").$('#' + id).qtip({
	            content: {
	                title: name,
	                text: text
	            },
	            show: {
	                event: false,
	                ready: true,
	                effect:false
	            },
	            position: {
	                my: 'bottom center',
	                at: 'top center',
	                target: [x, y]
	            },
							hide: { event: 'mouseout',
											when: 	{
												event: 'inactive',
												delay: 3000
											},
											fixed: false
              },
	            style: {
	                classes: 'graph-qtip',
	                tip: false
	            }
	        });
	    });
    }
});
