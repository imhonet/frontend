define([
    "jquery",
    "underscore",
    "marionette",
    "views/m-advancedcontentfilter.tag.view"
],
    function($, _, Marionette, TagView) {


        var CurrentTagView = TagView.extend({

            states : ["","","excluded"],

            events : {

                "click" : "setTagStateDefault"
            },

            onRender : function() {

                this.$el.removeClass(this.states.join(" ")).addClass(this.states[this.model.get("state")]);
            },

            setTagStateDefault : function(e) {

                e.stopPropagation();

                this.model.set({
                    state : 0,
                    ui : false
                });
            }
        });

        return CurrentTagView;
    });
