define([
    "jquery",
    "underscore",
    "marionette",
    "text!templates/views/m-advanced-content-filter-scale-view.html"
],
    function($, _, Marionette, ScaleViewTemplate) {

        var ScaleView = Marionette.ItemView.extend({

            tagName : "div",
            className : "m-advancedcontentfilter-item",
            template : ScaleViewTemplate,

            events : {

                "click .m-advancedcontentfilter-title" : "setExpandedStatus"
            },

            initialize : function() {

                this.listenTo(App.vent,"advanced-content-filter:tag-group:status",this.reflectExpandedStatus);
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

        return ScaleView;
    });
