define([
    "jquery",
    "underscore",
    "marionette"
],
    function($, _, Marionette) {

        var TagView = Marionette.ItemView.extend({

            template : '<%= data.name %><div class="m-advancedcontentfilter-close">x</div>',

            className : "m-advancedcontentfilter-tags",

            states : ["","active","excluded"],

            modelEvents : {

              "change"  : "render"
            },

            events : {

                "click .m-advancedcontentfilter-close" : "setTagStateExcluded",
                "click" : "switchTagState"
            },

            onRender : function() {

                if ( this.model.get("isBlock") ) this.$el.addClass("m-advancedcontentfilter-tags-block");
                this.$el.removeClass(this.states.join(" ")).addClass(this.states[this.model.get("state")]);
            },

            setTagStateExcluded : function(e) {

                e.stopPropagation();

                this.model.set({
                    state : 2,
                    ui : true
                });
            },

            switchTagState : function(e) {

                var state = this.model.get("state");

                if ( state === 2 ) {

                    state = 0;
                }
                else {

                    state = ( state === 1 ) ? 0 : 1;
                }

                this.model.set({
                    state : state,
                    ui : true
                });
            }
        });

        return TagView;
    });
