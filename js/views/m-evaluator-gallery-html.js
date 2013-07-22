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
        template : Template,
        onRender: function(){
            var self = this;
            if (this.model.get('clickable')){

                this.$el.bind('click',function(){
                    self.model.set('click',true)
                    self.model.save();
                }).css('cursor','pointer');
            }
        }
    });

    return ItemView;
});
