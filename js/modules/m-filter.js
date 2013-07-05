define(
	[
		"app",
		"jquery"
	], 
		
	function(App, $){
		
		App.module('filter', function(filter){
			
			App.vent.on('filter:toggleSlide', function(){
				$('.m-filter').slideToggle({
					easing : 'easeInOutExpo'
				});
			});

		});
	}
);