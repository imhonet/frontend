define([
    "underscore",
    "backbone"
],
    function(_, Backbone) {

        var TagModel = Backbone.Model.extend({

            defaults : {

                id : null,
                name : null,
                active : false,
                isBlock : false
            }
        });

        return TagModel;
    });
