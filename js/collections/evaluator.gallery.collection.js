define([
    "jquery",
    "underscore",
    "backbone",
    "views/m-evaluator-gallery",
    "models/evaluator.gallery.item.model",
    "models/evaluator.gallery.html.model",
    "models/evaluator.gallery.rate.model",
    "models/evaluator.gallery.list.model"
],
    function($, _, Backbone, View, Item, ItemHtml, ItemRate, ItemList) {

        function getModelByName(name, attributes){
            switch (name){
                case 'html':
                    return new ItemHtml(attributes);
                break;
                case 'rate':
                    return new ItemRate(attributes);
                break;
                case 'list':
                    return new ItemList(attributes);
                break;
                default:
                    attributes.model = 'item';
                    return new Item(attributes);
                break;
            }
        }

        var Gallery = Backbone.Collection.extend({
            used_ids: [],
            viewClass: null,

            constructor : function(attributes, options) {
                this.viewClass = View;
                Backbone.Collection.apply(this,arguments);
            },

            addItem: function(item){
                var self = this;
                var model = getModelByName(item.type, item);
                model.on('save', function(item){
                    self.trigger('saveItem',item);
                }, this);
                this.used_ids.push(model.id);
                this.add(model);
                this.trigger('addItem', model);
            },

            addItems: function(items){
                for (var i = 0; i < items.length; i++){
                    this.addItem(items[i]);
                }
            }

        });


        return Gallery;
    });
