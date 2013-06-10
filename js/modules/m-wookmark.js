define(
	[
		"app",
		"jquery",
		"wookmark",
		"photogallery"
	], 
		
	function(App, $){
		App.module('wookmark', function(wookmark){
			
			
			
			  
			
			
			
			$(function(){
				$('.m-films-promo-card').wookmark(
					{
						autoResize: true,
						container: $('.m-films'),
						itemWidth: 300,
						offset: 20
					}
				);
				
				$('.m-photogallery').imhoGallery({
					extending: 'width' // каритинка тянется: width - по ширине, heigth - по высоте
				});
				
				
			});

			

			
		});
	}
);