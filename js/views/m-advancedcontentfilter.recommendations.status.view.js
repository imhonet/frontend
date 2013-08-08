define([
    "jquery",
    "underscore",
    "marionette",
    "views/m-advancedcontentfilter.scale.view",
    "text!templates/views/m-advancedcontentfilter.recommendations.status.view.html"
],
    function($, _, Marionette, ScaleView, RecommendationsStatusViewTemplate) {

        var RecommendationsView = ScaleView.extend({

            className : "m-advancedcontentfilter-item",
            template : RecommendationsStatusViewTemplate
        })

        return RecommendationsView;
    });