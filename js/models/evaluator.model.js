define([
    "jquery",
    "underscore",
    "backbone",
    "collections/evaluator.gallery.collection"
],

function($, _, Backbone, EvaluatorGallery) {
    var Evaluator = Backbone.Model.extend({
        url : "/backend/evaluator.php",
        loaded: false,
        gallery: null,

        defaults : {
            forecast : 0,
            items : []
        },

        initialize: function() {
            this.gallery = new EvaluatorGallery();
            this.bind('sync', this.onSync);
        },

        onSync: function(model, response, options){
            this.gallery.addItems(response.items);
            if (!this.loaded){
                this.loaded = true;
                this.trigger('loaded');
            } else {
                this.trigger('fetch');
            }
        }


    });

    return Evaluator;
});
