define(
	[
		"app",
		"jquery"
	], 
		
	function(App, $){
		
		App.module('filter', function(filter){
			
			App.vent.on('filter:toggleSlide', function(){
				$('#filter').slideToggle({
					easing : 'easeInOutExpo'
				});
			});

		});
	}
);