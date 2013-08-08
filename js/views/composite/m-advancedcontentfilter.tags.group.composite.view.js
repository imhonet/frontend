define([
    "jquery",
    "underscore",
    "marionette",
    "views/m-advancedcontentfilter.tag.view",
    "text!templates/views/m-advancedcontentfilter.item.view.html"
],
    function($, _, Marionette, TagView, TagsGroupTemplate) {

        var TagsGroupCompositeView = Marionette.CompositeView.extend({

            tagName : "div",
            className : "m-advancedcontentfilter-item",
            itemView : TagView,
            template : TagsGroupTemplate,
            itemViewContainer : "div[data-type='collection']",
            elWidth : null,

            events : {

                "click .m-advancedcontentfilter-title" : "setExpandedStatus"
            },

            initialize : function() {

                this.collection = this.model.get("tags");
                this.listenTo(this.collection,"change:state",this.expandGroup)
            },

            setWidth : function(value) {

                this.$el.css({
                    width : value
                })

                return this;
            },

            getWidth : function() {

                return this.elWidth;
            },

            isExpanded : function() {

                return this.model.get("expanded");
            },

            onRender : function() {

                this.$el.addClass(this.model.get("uiType"));
            },

            onShow : function() {

                this.elWidth = this.$el.find(".m-advancedcontentfilter-item-wrap").outerWidth();
            },

            expandGroup : function(model) {

                if ( model.get("ui") && !this.model.get("expanded") ) this.setExpandedStatus();
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

        return TagsGroupCompositeView;
    });
