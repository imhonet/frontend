define([
    'jquery',
    'underscore',
    'marionette',
    'text!templates/views/test.item.view.html'
],
    function($, _, Marionette, Template) {

        var TestItemView = Marionette.ItemView.extend({

            tagName : 'li',
            template : Template,

            events : {
                'click button' : 'buttonHandler'
            },

            initialize : function() {

                this.listenTo(this.model,'change',this.render);
            },

            buttonHandler : function() {

                alert('Context event do work! Well, that was expected..');
            },

            onRender : function() {

                this.$button = this.$el.find('button');
            },

            onShow : function() {

                console.log(this.$button.get(0));
            }
        });

        return TestItemView;
    });