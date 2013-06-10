define([
    'jquery',
    'underscore',
    'marionette',
    'views/enhanced.collection.view'
],
    function($, _, Marionette, EnhancedCollectionView) {

        var EnhancedCompositeView = EnhancedCollectionView.extend({

            // переписываем конструктор
            constructor : function(options) {

                this.itemViewContainer = Marionette.getOption(options,"itemViewContainer") || this.itemViewContainer;
                // исполняем оригинальный конструктор (он перепишет this.el)
                Marionette.CollectionView.apply(this,Array.prototype.slice.apply(arguments));

                this.itemView = Marionette.getOption(this, "itemView") || this.constructor;
            },

            _initialEvents: function(){

                if ( this.collection ) {

                    this.listenTo(this.collection, "add", this.addChildView, this);
                    this.listenTo(this.collection, "remove", this.removeItemView, this);
                    this.listenTo(this.collection, "reset", this._renderChildren, this);
                }
            },

            serializeData: function(){
                var data = {};

                if (this.model){
                    data = this.model.toJSON();
                }

                return data;
            },

            render: function(){

                this.isRendered = true;
                this.isClosed = false;
                this.resetItemViewContainer();

                this.triggerBeforeRender();
                var html = this.renderModel();
                this.$el.html(html);
                this.bindUIElements();
                this.triggerMethod("composite:model:rendered");

                this._setColumns();
                this._renderChildren();

                this.triggerMethod("composite:rendered");
                this.triggerRendered();
                return this;
            },

            _renderChildren: function(){
                if (this.isRendered){
                    EnhancedCollectionView.prototype._renderChildren.call(this);
                    this.triggerMethod("composite:collection:rendered");
                }
            },

            renderModel: function(){
                var data = {};
                data = this.serializeData();
                data = this.mixinTemplateHelpers(data);

                var template = this.getTemplate();
                return Marionette.Renderer.render(template, data);
            },

            getCollectionContainer : function(containerView){

                if ("$itemViewContainer" in containerView){
                    return containerView.$itemViewContainer;
                }

                var container;
                if ( containerView.itemViewContainer ){

                    var selector = _.result(containerView, "itemViewContainer");
                    container = containerView.$(selector);
                    if (container.length <= 0) {

                        var error = new Error("The specified `itemViewContainer` was not found: " + containerView.itemViewContainer);
                        error.name = "ItemViewContainerMissingError";
                        throw error;
                    }

                } else {
                    container = containerView.$el;
                }

                containerView.$itemViewContainer = container;
                return container;
            },

            // Internal method to reset the `$itemViewContainer` on render
            resetItemViewContainer: function(){
                if (this.$itemViewContainer){
                    delete this.$itemViewContainer;
                }
            }

        });

        return EnhancedCompositeView;
    });
