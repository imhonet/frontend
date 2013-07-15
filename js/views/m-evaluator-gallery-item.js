define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "showcase",
    "text!templates/views/m-evaluator-gallery-item.html"
],

function($, _, Backbone, Marionette, ShowCase, Template) {

    var ItemView = Marionette.ItemView.extend({
        className: 'm-evaluator-gallery-item',
        template : Template
    });

    return ItemView;
});
