define([
    "jquery",
    "underscore",
    "backbone",
    "models/evaluator.gallery.item.model",
    "views/m-evaluator-gallery-thumbs"

],

    function($, _, Backbone, Item, View) {

        var EvaluatorGalleryItem = Item.extend({
            constructor : function(attributes, options) {
                this.viewClass = View;
                Backbone.Model.apply(this,arguments);
            }
        });

        return EvaluatorGalleryItem;
    });
