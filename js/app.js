define(
	[
	
		"jquery",
		"raty",
		"wookmark",
		"bootstrap",
		"backbone",
		"underscore", 
		"marionette"
	], 
		
	function($, Raty, Wook, Bootstrap, Backbone, _, Marionette){

        // переопределяем метод render чтобы использовать шаблонизатор (Underscore)
        Marionette.Renderer.render = function(template, data){

            return ( template ) ? _.template(template,{data : data}) : false;
        };

        var App = new Marionette.Application();
		
		return App;
	}
);