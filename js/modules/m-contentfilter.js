define(
	[
		"app",
		"jquery"
	], 
		
	function(App, $){
		
		App.module('filter', function(Filter){

            Filter.addInitializer(function(){

                $(".m-subnavigation-togglerm-subnavigation-toggler").on("click",function(){

                    App.vent.trigger('filter:toggleSlide');
                });

                App.vent.on('filter:toggleSlide', function(){
                    $('#filter').slideToggle({
                        easing : 'easeInOutExpo'
                    });
                });

            });
		});
	}
);