define([
    "jquery",
    "underscore",
    "backbone",
    "models/evaluator.gallery.item.model",
    "views/m-evaluator-gallery-rate"

],

    function($, _, Backbone, Item, View) {

        var EvaluatorGalleryRate = Item.extend({
            constructor : function(attributes, options) {
                if (attributes.title){
                    attributes.alt = attributes.title.replace(/"/g, "'");
                }
                this.viewClass = View;
                Backbone.Model.apply(this,arguments);
            },

            save: function(score){
                this.set('rate', score);
                this.trigger('saveItem',this);
            }
        });

        return EvaluatorGalleryRate;
    });
