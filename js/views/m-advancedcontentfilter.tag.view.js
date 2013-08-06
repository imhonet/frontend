define([
    "jquery",
    "underscore",
    "marionette"
],
    function($, _, Marionette) {

        var TagView = Marionette.ItemView.extend({

            template : '<%= data.name %><div class="m-advancedcontentfilter-close">x</div>',

            className : "m-advancedcontentfilter-tags",

            modelEvents : {

              "change"  : "render"
            },

            events : {

                "click" : "switchStatus"
            },

            onRender : function() {

                if ( this.model.get("isBlock") ) this.$el.addClass("m-advancedcontentfilter-tags-block");
                this.model.get("active") && this.$el.addClass("active") || this.$el.removeClass("active");
            },

            switchStatus : function() {

                var status = !this.model.get("active");

                this.model.set({
                    active : status,
                    ui : true
                });
            }
        });

        return TagView;
    });
