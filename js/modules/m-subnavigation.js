define(
	[
		"app",
		"jquery"
	], 
		
	function(App, $){
		
		App.module('subnavigation', function(subnavigation){

			$('.m-subnavigation').delegate('.m-subnavigation-toggler', 'click', function(){
				$('.m-subnavigation').toggleClass('expanded');
				App.vent.trigger('filter:toggleSlide');
			})

		});
	}
);