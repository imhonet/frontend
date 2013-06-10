define([
    'jquery',
    'underscore',
    'marionette'
],
    function($, _, Marionette) {

        var EnhancedCollectionView = Marionette.CollectionView.extend({

            // переписываем конструктор
            constructor : function(options) {

                // исполняем оригинальный конструктор (он перепишет this.el)
                Marionette.CollectionView.apply(this,Array.prototype.slice.apply(arguments));
                // определяем необходимость колончатого вывода
                this._setColumns();
            },

            _setColumns : function() {

                this.columnEl = Marionette.getOption(this,'columnEl') || 'div';
                this.columns = parseInt(Marionette.getOption(this,'columns')) || 0;
                this.columnElClassName = Marionette.getOption(this,'columnElClassName') || '';

                if ( this.columns > 0 ) {

                    this.$columns = [];

                    var columns = this.getCollectionContainer(this).children(this.columnEl).filter('.' + this.columnElClassName);

                    for ( var i = 0; i < this.columns; i++ ) {

                        this.$columns.push(this.getColumnContainer(columns[i],this.columnEl,this.columnElClassName,i));
                    }
                }
            },

            getColumnContainer : function(column,columnEl,columnElClassName,index) {

                var columnContainer = ( column ) ? $(column) :  $('<' + columnEl + '>');

                return columnContainer.addClass(columnElClassName);
            },

            // переписываем метод appendHtml, где при первичном рендере
            appendHtml : function(collectionView, itemView, index){

                var $container = this.getItemViewContainer(collectionView, itemView, index);
                $container.append(itemView.el);
            },

            _ensureColumnEls : function() {

                if ( this.$columns && this.$columns.length ) {

                    for ( var i = 0, len = this.$columns.length; i < len; i++ ) {

                        if ( !this.$columns[i].get(0).parentNode ) this.getCollectionContainer(this).append(this.$columns[i]);
                    }
                }
            },

            getCollectionContainer : function(collectionView) {

                return collectionView.$el;
            },

            showCollection : function() {

                this._ensureColumnEls();

                Backbone.Marionette.CollectionView.prototype.showCollection.apply(this, Array.prototype.slice.apply(arguments));
            },

            _getCurrentColumn : function(collectionView, itemView, index) {

                var column = null;

                if ( this.$columns && this.$columns.length ) {

                    var columnId = index % this.$columns.length;
                    var customColumnId = itemView.model.get('c');

                    if ( customColumnId ) {

                        columnId = customColumnId - 1;
                    }

                    column = this.$columns[columnId];
                }

                return column;

            },

            getItemViewContainer : function(collectionView, itemView, index) {

                var container = this._getCurrentColumn(collectionView, itemView, index);

                if ( !container || !container.get(0).parentNode ) {

                    container = this.getCollectionContainer(collectionView);
                }

                return container;
            },

            addChildView : function(item, collection, options) {

                this._ensureColumnEls();

                Backbone.Marionette.CollectionView.prototype.addChildView.apply(this,Array.prototype.slice.apply(arguments));
            },

            getItemView: function(item){

                var itemViewTypeOption = Marionette.getOption(this, "itemViewType") || "itemType";
                var itemViewType = ( item ) ? item.get(itemViewTypeOption) : null;
                var itemViewsOption = Marionette.getOption(this, "itemViews");

                return ( itemViewType && itemViewsOption && itemViewsOption.hasOwnProperty(itemViewType) )

                    ? itemViewsOption[itemViewType]
                    : Backbone.Marionette.CollectionView.prototype.getItemView.apply(this,Array.prototype.slice.apply(arguments));

            },

            showEmptyView : function() {

                if ( this.$columns && this.$columns.length ) {

                    for ( var i = 0, len = this.$columns.length; i < len; i++ ) {

                        this.$columns[i].remove();
                    }
                }

                Backbone.Marionette.CollectionView.prototype.showEmptyView.call(this);
            }

        });

        return EnhancedCollectionView;
    });
