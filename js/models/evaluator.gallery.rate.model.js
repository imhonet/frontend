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
                this.viewClass = View;
                Backbone.Model.apply(this,arguments);
            }
        });

        return EvaluatorGalleryRate;
    });
