import Ember from "ember";

export default Ember.Component.extend({
	tagName: '',
	didInsertElement: function() {
		Ember.run.scheduleOnce('afterRender', this, function(){
			this.reset_graph_panel();
			this.cy = cytoscape({
		        container: Ember.$('#cy')[0],
		        elements: this.loadGraph('graf.json'), //nahranie grafu
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
		                'width': '60px',
		                'height': '60px',
		                'border-color': 'gray',
		                'border-width': 3,
		                'border-opacity': 0.5
		              })
		            .selector('node[node_type = "uvod"]')
		              .css({
		                'width': '80px',
		                'height': '80px',
		                'background-color': '#E87184'
		              })
		            .selector('node[node_type = "small_p"]')
		              .css({
		                'width': '80px',
		                'height': '80px',
		                'background-color': '#3885C6'
		              })
		            .selector('node[node_type = "small_t"]')
		              .css({
		                'width': '80px',
		                'height': '80px',
		                'background-color': '#81E877'
		              })
		            .selector('node[node_type = "big"]')
		              .css({
		                'width': '80px',
		                'height': '80px',
		                'background-color': '#FFCC52'
		              })
		            .selector('node[node_type = "bonus"]')
		              .css({
		                'width': '80px',
		                'height': '80px',
		                'background-color': '#7A80FF'
		              })
		            .selector('edge')
		              .css({
		                'width': 4,
		                'target-arrow-shape': 'triangle',
		                'opacity': 0.8
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

			function showQTip(node)
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
		    }

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
	init_graph: function() {
		this.reset_graph_panel();
	},
	reset_graph_panel: function() {
		var graphWidth = document.getElementById('graph-content').offsetWidth;
		//var graphHeight = document.getElementById('graph-content').offsetHeight;
		var graphPanel = document.getElementById("cy");

		graphPanel.style.width = graphWidth + "px";
		graphPanel.style.height = "1000px";
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