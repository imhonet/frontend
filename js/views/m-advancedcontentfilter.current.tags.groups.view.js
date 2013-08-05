define([
    "jquery",
    "underscore",
    "marionette",
    "views/m-advancedcontentfilter.tag.view"
],
    function($, _, Marionette, TagView) {


        var CurrentTagView = TagView.extend({

            onRender : function(){

            }
        });

        return CurrentTagView;
    });
