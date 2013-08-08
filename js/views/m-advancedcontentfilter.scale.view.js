define([
    "jquery",
    "underscore",
    "marionette",
    "text!templates/views/m-advancedcontentfilter.scale.view.html"
],
    function($, _, Marionette, ScaleViewTemplate) {

        var ScaleView = Marionette.ItemView.extend({

            tagName : "div",
            className : "m-advancedcontentfilter-item",
            template : ScaleViewTemplate,

            events : {

                "click .m-advancedcontentfilter-title" : "setExpandedStatus"
            },

            onRender : function() {

                this.$el.addClass(this.model.get("uiType"));
            },

            isExpanded : function() {

                return this.model.get("expanded");
            },

            setWidth : function(value) {

                this.$el.css({
                    width : value
                })

                return this;
            },

            getWidth : function() {

                return this.$el.find(".m-advancedcontentfilter-item-wrap").outerWidth();
            },

            setExpandedStatus : function() {

                var expanded = !this.model.get("expanded");

                var eventData = {
                    view : this,
                    status : expanded
                }

                App.vent.trigger("m-advancedcontentfilter:tag-group:expanded",eventData);
            }
        });

        return ScaleView;
    });
