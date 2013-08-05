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

            events : {

                "click .m-advancedcontentfilter-title" : "setExpandedStatus"
            },

            initialize : function() {

                this.listenTo(App.vent,"advanced-content-filter:tag-group:status",this.reflectExpandedStatus);
                this.collection = this.model.get("tags");
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

            setExpandedStatus : function() {

                var expanded = !this.model.get("expanded");

                App.vent.trigger("advanced-content-filter:tag-group:status",{
                    cid : this.cid,
                    status : expanded
                })
            }
        });

        return TagsGroupCompositeView;
    });
