define([
    "jquery",
    "underscore",
    "backbone",
    "collections/evaluator.gallery.collection",
    "views/m-evaluator-forecast"
],

function($, _, Backbone, EvaluatorGallery, EvaluatorForecast) {
    var Evaluator = Backbone.Model.extend({
        url : "/backend/evaluator.php",
        loaded: false,
        gallery: null,
        forecast: null,

        defaults : {
            forecast : 0,
            items : [],
            usedIds: []
        },

        initialize: function() {
            var self = this;
            this.gallery = new EvaluatorGallery();
            this.gallery.on('saveItem', function(item){
                self.trigger('saveItem',item);
            }, this);
            this.forecast = new EvaluatorForecast();
            this.bind('sync', this.onSync);
        },

        onSync: function(model, response, options){
            this.forecast.set(response.forecast);
            this.gallery.addItems(response.items);
            if (!this.loaded){
                this.loaded = true;
                this.trigger('loaded');
            } else {
                this.trigger('fetch');
            }
        },

        fetch: function(options){
            if (!options){
                options = {};
            }
            if (!options.data){
                options.data = {};
            }
            options.data.usedIds = this.gallery.used_ids;
            return Backbone.Model.prototype.fetch.call(this, options);
        },

        save: function(attributes){
            return Backbone.Model.prototype.save.call(this, attributes);
        }

    });

    return Evaluator;
});
