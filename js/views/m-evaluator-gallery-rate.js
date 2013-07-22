define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "showcase",
    "text!templates/views/m-evaluator-gallery-rate.html",
    "views/m-evaluator-gallery-item"
],

function($, _, Backbone, Marionette, ShowCase, Template, ItemView) {

    var ItemView = ItemView.extend({
        template : Template,
        selectorRaty: '.films-score',

        onRender: function(){
            var self = this;
            this.$el.find(this.selectorRaty).raty({
                starOff: 'img/icons/star-off.png',
                starOn : 'img/icons/star-on.png',
                number: 10,
                width: false,
                hints: [null,null,null,null,null,null,null,null,null,null],
                click: function(score, evt){
                    self.model.save(score);
                }
            });
        }
    });



    return ItemView;
});
