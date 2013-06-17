define(
	[
		"app",
		"jquery"
	], 
		
	function(App, $){
		
		App.module('filter', function(filter){
			
			App.vent.on('filter:toggleSlide', function(){
				$('.m-contentfilter').slideToggle({
					easing : 'easeInOutExpo'
				});
			});

		});
	}
);