define([
    "underscore",
    "backbone"
],
    function(_, Backbone) {

        var TagModel = Backbone.Model.extend({

            defaults : {

                id : null,
                name : null,
                state : 0,
                isBlock : false
            }
        });

        return TagModel;
    });
