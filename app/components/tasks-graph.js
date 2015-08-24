import Ember from "ember";

export default Ember.Component.extend({
	tagName: '',
	cytoscape_data: function() {
		var ret = {
			nodes: [],
			edges: []
		};

		this.get("model").forEach(function(node) {
			ret["nodes"].push({
				data: {
					id: node.get("id"),
					name: node.get("title"),
					tooltip: node.get("intro"),
					node_type: node.get("category").get("type")
				},
				position: {
					x: node.get("position").get("x"),
					y: node.get("position").get("y")
				}
			});
			node.get("node_parent").forEach(function(parent) {
				ret["edges"].push({
					data: {
						source: parent.get("id"),
						target: node.get("id")
					}
				});
			});
		});

		console.log(ret);

		return ret;
	}.property("model"),
	didInsertElement: function() {
		Ember.run.scheduleOnce('afterRender', this, function(){
			this.reset_graph_panel();
			this.cy = cytoscape({
		        container: Ember.$('#cy')[0],
		        elements: this.get("cytoscape_data"),//this.loadGraph('graf.json'), //nahranie grafu
		        zoom: 1,
		        pan: { x: 0, y: 0 },
		        zoomingEnabled: true,
		        userZoomingEnabled: false,
		        panningEnabled: true,
		        userPanningEnabled: false,
		        autolock: true, //uzamknutie pohybu
		        autoungrabify: false,
		            style: cytoscape.stylesheet()
		            .selector('node')
		              .css({
		                'width': '100px',
		                'height': '100px',
		                'border-color': 'gray',
		                'border-width': 3,
		                'border-opacity': 0.5
		              })
		            .selector('node[node_type = "uvod"]')
		              .css({
										'background-image': 'img/nodes/node-start.svg',
										'background-width': '103px',
		              })
		            .selector('node[node_type = "small_p"]')
		              .css({
		                'background-color': '#3885C6'
		              })
		            .selector('node[node_type = "small_t"]')
		              .css({
		                'background-color': '#81E877'
		              })
		            .selector('node[node_type = "big"]')
		              .css({
		                'background-color': '#FFCC52'
		              })
		            .selector('node[node_type = "bonus"]')
		              .css({
		                'background-color': '#7A80FF'
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
		                'opacity': 0.25,
		                'text-opacity': 0
		              }),
		        layout : {
		            name: 'circle',
		            padding: 100
		        }
		    });
			this.reset_graph_panel();

			/*function showQTip(node)
		    {
		        Ember.$(node).qtip({
		            // your options

		            show: '',
		            hide: '',

		            content: {
		                prerender: true, // important
		                text: 'Whatever you want to display'
		            }
		        }).qtip('show');
		    }*/

		    //nastavenie kontextoveho po pravom kliknuti
		    this.cy.cxtmenu({
		        selector: 'node',
		        //TODO diakritika
		        commands: [
		            {
		                content: 'Odevzdani',
		                select: function(){
		                    //TODO
		                    var url = location.origin  + "/web/uloha-template.html";
		                    location.href = url;
		                }
		            },

		            {
		                content: 'Zadani',
		                select: function(){
		                    //TODO
		                    var url = location.origin  + "/web/uloha-template.html";
		                    location.href = url;
		                }
		            },

		            {
		                content: 'Statistika',
		                select: function(){
		                    //TODO
		                    var url = location.origin  + "/web/uloha-template.html";
		                    location.href = url;
		                }
		            },

		            {
		                content: 'Diskuze',
		                select: function(){
		                    //TODO
		                    var url = location.origin  + "/web/uloha-template.html";
		                    location.href = url;
		                }
		            },

		            {
		                content: 'Reseni',
		                select: function(){
		                    //TODO
		                    var url = location.origin  + "/web/uloha-template.html";
		                    location.href = url;
		                }
		            }
		        ]
		    });

			// nastavenie qtipu
		    this.cy.on('mousedown','node', function(event){
		        var target = event.cyTarget;
		        var id = target.data("id");
		        var name = target.data("name");
		        var text = target.data("tooltip") + " Pokud chcete resit ulohu kliknete pravym tlacitkem."; //TODO formatovanie textu

		        alert(name);
		        var x=event.cyPosition.x;
		        var y=event.cyPosition.y;

		        Ember.$('#' + id).qtip({
		            content: {
		                title: name,
		                text: text
		            },
		            show: {
		                delay: 5,
		                event: false,
		                ready: true,
		                effect:false
		            },
		            position: {
		                my: 'bottom center',
		                at: 'top center',
		                target: [x+3, y+3],
		                adjust: {x:7,y:7}
		            },
		            hide: {
		                fixed: true,
		                event: false,
		                inactive: 3000
		            },
		            style: {
		                classes: 'qtip-bootstrap',
		                tip: {
		                    width: 16,
		                    height: 8
		                }
		            }
		        });
	        });
		});
	},
	reset_graph_panel: function() {
		var graphWidth = document.getElementById('graph-content').offsetWidth;
		var graphHeight = document.getElementById('graph-content').offsetHeight;
		var graphPanel = document.getElementById("cy");

		graphPanel.style.width = "100%";
		graphPanel.style.height = 1000 + "px";
	},
	loadGraph: function(file) {
        var json = null;
        Ember.$.ajax({
            'async': false,
            'global': false,
            'url': file,
            'dataType': 'json',
            'success': function (data) {
                json = data;
            }
        });
        return json;
    }
});
