define(
	[
	
		"jquery",
		"raty",
		"wookmark",
		"bootstrap",
        "underscore",
        "backbone",
		"marionette"
	], 
		
	function($, Raty, Wook, Bootstrap, _, Backbone, Marionette){

        // переопределяем метод render чтобы использовать шаблонизатор (Underscore)
        Marionette.Renderer.render = function(template, data){

            return ( template ) ? _.template(template,{data : data}) : false;
        };

        App = new Marionette.Application();
		
		return App;
	}
);