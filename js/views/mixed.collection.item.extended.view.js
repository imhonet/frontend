define([
    'jquery',
    'underscore',
    'marionette'
],
    function($, _, Marionette) {

        var TestItemView = Marionette.ItemView.extend({

            tagName : 'div',
            template : '<%= data.id %> — Extended',

            events : {
                'click' : 'sayHello'
            },

            sayHello : function() {

                alert('View is extended');
            }
        });

        return TestItemView;
    });