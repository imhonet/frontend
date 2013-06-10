require.config({
     paths: {
        "jquery"        : "lib/jquery/jquery",
		"bootstrap"     : "lib/bootstrap",
		"raty"          : "lib/jquery/jquery.raty",
		"wookmark"      : "lib/jquery/jquery.wookmark",
		"photogallery"  : "lib/jquery/jquery.photogallery",
		"underscore"    : "lib/underscore",
		"backbone"      : "lib/backbone",
		"marionette"    : "lib/backbone.marionette",
		"text"          : "lib/require-text"
	},
	
	shim:{
		underscore: {
			'exports' : '_'
		},
		backbone: {
			'deps'    : ['jquery', 'underscore'],
			'exports' : 'Backbone'
		},
		marionette: {
			'deps'    : ['backbone', 'jquery', 'underscore'],
			'exports' : 'Marionette'
		},
		photogallery  : ['jquery'],
		wookmark      : ['jquery'],
		raty          : ['jquery']
	}	
});




