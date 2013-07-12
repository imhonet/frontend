define([
    "jquery",
    "underscore",
    "marionette"
],
    function($, _, Marionette) {

        var FilterResetView = Marionette.ItemView.extend({

            template : "Сбросить фильтр",

            events : {

                "click" : "resetFilter"
            },

            resetFilter : function() {

                this.model.resetFilter();
            }
        });

        return FilterResetView;
    });
