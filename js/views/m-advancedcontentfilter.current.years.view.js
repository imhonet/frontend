define([
    "jquery",
    "underscore",
    "marionette",
    "text!templates/views/m-advancedcontentfilter.current.years.view.html"
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

                this.listenTo(this.model.parent,"filter:update",this.render);
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
