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
			var n = {
				data: {
					id: node.get("id"),
					active: node.get("active"),
					name: node.get("title"),
					tooltip: node.get("intro"),
					max_score: node.get("max_score"),
					deadline: node.get("time_deadline"),
					node_type: node.get("category").get("type"),
					picture: node.get("picture")
				}
			};

			ret["nodes"].push(n);

			var colors = ["#ffc388","#52b27e","#ef7b8c","#50b5d8","#8fb2cc"];
			var i = 0;
			node.get("prerequisities.groups").forEach( function(prerequizit) {
				prerequizit.forEach( function(parent) {
						ret["edges"].push({
							data: {
								source: parent,
								target: node.get("id"),
								color: colors[i]
							}
						});
				});
				i++;
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
		        	self.style_graph();
		        	self.reposition_graph();
		        	self.setup_graph_actions();
		        }
		    }));
		});
	},
    reposition_graph: function() {
    	var cy = this.get("cy");
    	cy.autolock(false);
    	var cy_elem = document.getElementById("cy");
    	if(cy_elem) {
	    	cy_elem.style.width = "100%";
	    }
    	var width = Ember.$("#cy").width();
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
			ready: function(){}, // on layoutready
			stop: function(){} // on layoutstop
		};
		cy.layout(options);

		var positions = cy.nodes().map(function(node) { return node.position(); });
		var min_y = Math.min.apply(
			null,
			positions.map(function(pos) { return pos.y; }));
		var max_y = Math.max.apply(
			null,
			positions.map(function(pos) { return pos.y; }));

		var min_x = Math.min.apply(
			null,
			positions.map(function(pos) { return pos.x; }));
		var max_x = Math.max.apply(
			null,
			positions.map(function(pos) { return pos.x; }));

		var graph_width = max_x - min_x + 100;
		if (graph_width > width) {
			var ratio = width / graph_width;
			cy.nodes().positions(function(i, elem) {
				var pos = elem.position();
				return {
					y: pos.y,
					x: pos.x * ratio
				};
			});
		}

		if (cy_elem) {
			cy_elem.style.height = (max_y + 250 - min_y) + "px"; // Magic constant
		}
		cy.resize();
		cy.center();
		cy.autolock(true);
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
				'cursor': 'pointer'
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
								'line-color': 'data(color)',
								'target-arrow-color': 'data(color)',
                'target-arrow-shape': 'triangle',
                'opacity': 0.7
              })
            .selector('.faded')
              .css({
                'opacity': 0.0,
                'text-opacity': 0
							})
						.selector(':active')
			        .css({
			            'overlay-opacity': 0
			        })
						.selector('core') // just core properties
							.css({
								'active-bg-size': 0
        	}).update();
    },
    setup_graph_actions: function() {
    	var self = this;

    	this.get("cy").on('mousedown','node', function(event){
			var target = event.cyTarget;
	        var id = target.data("id");
	        if(target.data("active")) {
		        self.sendAction('assign', id);
		    }
			Ember.$(".qtip").remove();
		});

		this.get("cy").on('mouseout','node', function(event) {
			Ember.$(".qtip").remove();
			Ember.$("#cy").removeClass('mouseover');
		});

		this.get("cy").on('mouseover','node', function(event){
	        var target = event.cyTarget;
	        var id = target.data("id");
	        var name = target.data("name");
	        var date = target.data("deadline");
	        var text = target.data("tooltip") + "<br><br>" +
	        	"<p class='graph-qtip-text inline'>Max.body: </p> " + target.data("max_score") + "<br>";
			if(date) {
				text += "<p class='graph-qtip-text inline'>Termím odevzdání: </p> " + date.getDate() + ". " + (date.getMonth() + 1) + ". " + date.getFullYear(); //ToDo: Time!
			}

			if(target.data("active")) {
		        Ember.$("#cy").addClass('mouseover');
		    }
			
	        var x=event.cyPosition.x;
	        var y=event.cyPosition.y;
	        self.get("cy").$('#' + id).qtip({
	            content: {
	                title: name,
	                text: text
	            },
	            position: {
	                my: 'bottom center',
	                at: 'top center',
	                target: [x, y]
	            },
							show: {
									event: false,
									ready: true,
									effect:false
							},
	            style: {
	                classes: 'graph-qtip',
	                tip: false
	            }
	        });
	    });
    }
});
