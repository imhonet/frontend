define([
    'jquery',
    'underscore',
    'marionette',
    'text!templates/views/cards/cards.movie.foo.view.html',
    "imhonet"
],
    function($, _, Marionette, Template) {

        var CardsMovieView = Marionette.ItemView.extend({

            tagName : 'div',
            className : 'm-films-promo-card',
            template : Template,

            onRender : function() {

                this.$el.imhonet_Fx_Foo();
            },

            onClose : function() {

                this.$el.imhonet_Fx_Foo("destroy");
            }
        });

        return CardsMovieView;
    });