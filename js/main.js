require.config({
     paths: {
        "jquery"        : "lib/jquery/jquery",
		"bootstrap"     : "lib/bootstrap",
		"raty"          : "lib/jquery/jquery.raty",
		"wookmark"      : "lib/jquery/jquery.wookmark",
		"photogallery"  : "lib/jquery/jquery.photogallery",
		"flip"          : "lib/jquery/jquery.flip",
		"jquery-ui"     : "lib/jquery/jquery-ui-1.10.3.custom",
        "showcase"      : "lib/jquery/jquery.showcase",
		"underscore"    : "lib/underscore",
		"backbone"      : "lib/backbone",
		"marionette"    : "lib/backbone.marionette",
		"text"          : "lib/require.text",
		"modernizr"     : "lib/modernizr.2.6.2.min",
        "social-likes"  : "lib/socials",
        "imhonet-ui-slider" : "lib/imhonet/imhonet-ui-slider",
        "metroJs"       : "lib/metroJs"
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
        bootstrap          : ['jquery'],
		photogallery  : ['jquery'],
		wookmark      : ['jquery'],
		raty          : ['jquery'],
        "imhonet-ui-slider" : ['jquery']
	}	
});




