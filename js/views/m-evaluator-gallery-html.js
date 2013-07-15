define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "showcase",
    "text!templates/views/m-evaluator-gallery-html.html",
    "views/m-evaluator-gallery-item"
],

function($, _, Backbone, Marionette, ShowCase, Template, ItemView) {

    var ItemView = ItemView.extend({
        template : Template
    });

    return ItemView;
});
