define([
    "jquery",
    "underscore",
    "marionette",
    "views/m-advancedcontentfilter.tag.view"
],
    function($, _, Marionette, TagView) {


        var CurrentTagView = TagView.extend({

            onRender : function(){

            },

            switchStatus : function() {

                var status = !this.model.get("active");

                this.model.set({
                    active : status,
                    ui : false
                });
            }

        });

        return CurrentTagView;
    });
