define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "showcase",
    "text!templates/views/m-evaluator-gallery.html"
],

function($, _, Backbone, Marionette, ShowCase, Template) {

    var CollectionView = Marionette.ItemView.extend({
        template : Template,
        _itemsViews: [],
        _childContainerSelector: '[data-items="m-evaluator-gallery-items"]',
        _childContainer: null,

        initialize: function(){
            var self = this;
            this._itemsViews = [];

            this.collection.each(function(item) {
                self.addItemView(item);
            });

            this.collection.on('addItem', function(item){
                self.addItemViewAndRender(item);
            }, this);

        },

        addItemView: function(item){
            var view = new item.viewClass({
                model : item
            });
            this._itemsViews.push(view);
            return view;
        },

        renderItem: function(itemView){
           this._childContainer.append(itemView.render().el);
        },

        addItemViewAndRender: function(item){
            this.renderItem(this.addItemView(item));
        },

        onRender : function() {
            var self = this;
            this._childContainer = this.$el.find(this._childContainerSelector);
            this._childContainer.empty();
            _(this._itemsViews).each(function(iv) {
                self.renderItem(iv);
            });
        }

    });

    return CollectionView;
});
