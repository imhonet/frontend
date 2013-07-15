define([
    "jquery",
    "underscore",
    "backbone",
    "views/m-evaluator-gallery-item"
],

    function($, _, Backbone, View) {

        var EvaluatorGalleryItem = Backbone.Model.extend({
            viewClass: null,

            constructor : function(attributes, options) {
                this.viewClass = View;
                Backbone.Model.apply(this,arguments);
            }
        });


        return EvaluatorGalleryItem;
    });
