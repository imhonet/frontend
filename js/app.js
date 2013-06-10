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
		
	function($, Raty, Wook, Bootstrap, _, Backbone, Marionette){
		var App = new Marionette.Application();
		
		return App;
	}
);