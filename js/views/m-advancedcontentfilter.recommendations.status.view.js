define([
    "jquery",
    "underscore",
    "marionette",
    "views/m-advancedcontentfilter.scale.view",
    "text!templates/views/m-advancedcontentfilter.recommendations.status.view.html"
],
    function($, _, Marionette, ScaleView, RecommendationsStatusViewTemplate) {

        var RecommendationsView = ScaleView.extend({

            className : "m-advancedcontentfilter-item m-advancedcontentfilter-item-recomendation",
            template : RecommendationsStatusViewTemplate
        })

        return RecommendationsView;
    });