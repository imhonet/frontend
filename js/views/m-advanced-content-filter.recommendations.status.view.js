define([
    "jquery",
    "underscore",
    "marionette",
    "views/m-advanced-content-filter.scale.view",
    "text!templates/views/m-advanced-content-filter-recommendations-status-view.html"
],
    function($, _, Marionette, ScaleView, RecommendationsStatusViewTemplate) {

        var RecommendationsView = ScaleView.extend({

            className : "m-advancedcontentfilter-item m-advancedcontentfilter-item-recomendation",
            template : RecommendationsStatusViewTemplate
        })

        return RecommendationsView;
    });