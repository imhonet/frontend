define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "imhonet-ui-slider"
],
    function($, _, Backbone, Marionette) {

        var SliderYearsView = Marionette.ItemView.extend({

            className : "m-advanced-content-filter-years-slider",

            initialize : function() {

                this.listenTo(this.model.parent,"filter:update",this.setRange);
            },

            compareValues : function() {

                var from = this.model.get("from"),
                      to = this.model.get("to"),
                  range = this.$el.m_slider("getRange") || [from,to];

                return from === range[0] && to === range[1];
            },

            setRange : function() {

                if ( !this.compareValues() ) {

                    this.$el.m_slider("setRange",[this.model.get("from"),this.model.get("to")]);
                }
            },

            onShow : function() {

                var currentYear = new Date().getFullYear();
                var range = [this.model.get("from"),this.model.get("to")];

                this.$el.m_slider({
                    range: true,
                    min: 1960,
                    values : range,
                    max: 2020,
                    maxDisplayedValue : currentYear,
                    slideToMaxAfterValue : currentYear - 1,

                    ticks : [
                        {
                            label : "Раньше",
                            value : 1960
                        },
                        {
                            value : 1970
                        },
                        {
                            value : 1980
                        },
                        {
                            value : 1990
                        },
                        {
                            value : 2000
                        },
                        {
                            value : 2010
                        },
                        {
                            value : 2020,
                            label : "Сейчас"
                        }
                    ],
                    change : $.proxy(this.onSliderChange,this)
                });
            },

            onSliderChange : function(e, obj) {

                this.model.set({
                    from : obj.values[0],
                    to : obj.values[1]
                });
            }
        });

        return SliderYearsView;
    });
