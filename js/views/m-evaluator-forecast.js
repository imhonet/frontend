define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "text!templates/views/m-evaluator-forecast.html"
],

function($, _, Backbone, Marionette, Template) {

    var ForecastView = Marionette.ItemView.extend({
        template : Template,
        selectorPercent: '.m-evaluator-forecast-percent',
        selectorSliderRange: '.m-evaluator-slider-range',
        selectorSliderPointsContainer: '.m-evaluator-slider-brd',
        classSliderPointsSelected: 'color-theme',
        containerPercent: null,
        containerRange: null,
        containerPoints: null,

        onRender: function() {
            this.containerPercent = this.$el.find(this.selectorPercent);
            this.containerRange = this.$el.find(this.selectorSliderRange);
            this.containerPoints = this.$el.find(this.selectorSliderPointsContainer);
        },

        set: function(part){
            var percent = Math.round(part*100)+'%';
            this.containerPercent.html(percent);
            this.containerRange.width(percent);
            for (var i = 0; i < 10; i++){
                if ((i+1) < part*10){
                    this.containerPoints.eq(i).addClass(this.classSliderPointsSelected);
                } else {
                    this.containerPoints.eq(i).removeClass(this.classSliderPointsSelected);
                }
            }
        }

    });

    return ForecastView;
});
