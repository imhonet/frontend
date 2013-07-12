define([
    "jquery",
    "underscore",
    "marionette",
    "text!templates/views/m-advanced-filter-current-years.html"
],
    function($, _, Marionette, Template) {

        var YearsView = Marionette.ItemView.extend({

            template : Template,

            className : "tag",

            events : {

                "click" : "resetModel"
            },

            templateHelpers : function() {

                return _.clone(this.model.localData);
            },

            initialize : function() {

                this.listenTo(this.model.parent,"update:filter",this.render);
            },

            onBeforeRender : function() {

                this.model.setExtraAttributes();
            },

            resetModel : function() {

                if ( !this.model.localData.noCloseButton ) this.model.resetYears();
            }
        });

        return YearsView;
    });
