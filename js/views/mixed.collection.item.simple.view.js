define([
    'jquery',
    'underscore',
    'marionette'
],
    function($, _, Marionette) {

        var TestItemView = Marionette.ItemView.extend({

            tagName : 'ul',
            template : '<%= data.id || data.nodeName %> — Simple',

            events : {
                'click' : 'sayHello'
            },

            sayHello : function() {

                alert('View is simple');
            }

        });

        return TestItemView;
    });