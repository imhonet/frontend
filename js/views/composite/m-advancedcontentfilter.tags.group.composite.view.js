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
            expendable : false,

            events : {

                "click .m-advancedcontentfilter-title" : "setExpandedStatus"
            },

            initialize : function() {

                this.listenTo(App.vent,"advanced-content-filter:tag-group:status",this.reflectExpandedStatus);
                this.collection = this.model.get("tags");
                this.listenTo(this.collection,"change:active",this.expandGroup)
            },

            shouldExpand : function() {

                return this.expendable;
            },

            onRender : function() {

                this.$contents = this.$el.find(this.itemViewContainer);
            },

            onShow : function() {

                this.getSize();
            },

            getSize : function() {

                var rootWidth = this.$el.outerWidth();

                this.expendable = false;

                var tags = this.$contents.find("div.m-advancedcontentfilter-tags:not(.m-advancedcontentfilter-tags-block)"),
                    width = 0;

                for ( var i = 0, len = tags.length; i < len; i++ ) {

                    var tag = $(tags[i]);
                    width += tag.outerWidth();

                    this.expendable = width > rootWidth;

                    if ( this.expendable ) break;
                }
            },

            reflectExpandedStatus : function(eventData) {

                this.$el.removeClass("hide show");

                if ( eventData.cid === this.cid ) {

                    if ( eventData.status ) {

                        this.$el.addClass("show");
                    }

                    this.model.set("expanded",eventData.status);
                }
                else {

                    if ( eventData.status ) {

                        this.$el.addClass("hide");
                        this.model.set("expanded",false);
                    }
                }
            },

            expandGroup : function(model) {

                if ( model.get("ui") && !this.model.get("expanded") ) this.setExpandedStatus();
            },

            setExpandedStatus : function() {

                var expanded = !this.model.get("expanded");

                var eventData = {
                    cid : this.cid
                }

                if ( this.shouldExpand() ) eventData.status = expanded;

                App.vent.trigger("advanced-content-filter:tag-group:status",eventData)
            }
        });

        return TagsGroupCompositeView;
    });
