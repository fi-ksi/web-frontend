$(document).ready(function () {
	$(window).resize(function() {
  		$(window).trigger("window:resize");
  	});

  	var gen_function = function(width) {
  		var elem = $(".stickycolumn");
  		if($(window).width() < width) {
  			elem.trigger("sticky_kit:detach");
  		} else {
  			elem.stick_in_parent({
  				parent: ".stickycolumn-parent",
  				offset_top: 100
  			});
  		}
  	};

  	var fun_xs = function() {

  	};

  	var fun_sm = function() {
  		gen_function(768);
  	};

  	var fun_md = function() {
  		gen_function(992);
  	};

  	var fun_lg = function() {
  		gen_function(1200);
  	};

  	var trig = function(dim, fun) {
  		$(".flex-row-" + dim + ".stickycolumn-parent").livequery(function() {
			$(window).on("window:resize", fun);
			fun();
		}, function() {
			$(window).off("window:resize", fun);
		});
  	};

  	trig("xs", fun_xs);
  	trig("sm", fun_sm);
  	trig("md", fun_md);
  	trig("lg", fun_lg);

});
