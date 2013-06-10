define([
    'jquery',
    'underscore',
    'marionette',
    'text!templates/views/cards/cards.movie.view.html'
],
    function($, _, Marionette, Template) {

        var CardsMovieView = Marionette.ItemView.extend({

            tagName : 'div',
            className : 'm-films-promo-card',
            template : Template,

            events : {

                'click img' : 'fooMe'
            },

            fooMe : function() {

                alert('CardsMovieView');
            }
        });

        return CardsMovieView;
    });