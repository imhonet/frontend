define([
    "jquery",
    "underscore",
    "backbone"
],
    function($, _, Backbone) {

        var Tag = Backbone.Model.extend({

            defaults : {

                id : null,
                name : null,
                active : false,
                isBlock : false
            }
        });

        return Tag;
    });
