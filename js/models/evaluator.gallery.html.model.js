define([
    "jquery",
    "underscore",
    "backbone",
    "models/evaluator.gallery.item.model",
    "views/m-evaluator-gallery-html"

],

    function($, _, Backbone, Item, View) {

        var EvaluatorGalleryItem = Item.extend({
            constructor : function(attributes, options) {
                this.viewClass = View;
                Backbone.Model.apply(this,arguments);
            },
            save: function(){
                this.trigger('saveItem',this);
            }
        });

        return EvaluatorGalleryItem;
    });
