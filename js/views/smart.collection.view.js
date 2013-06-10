define([
    'jquery',
    'underscore',
    'marionette'
],
    function($, _, Marionette) {

        var SmartCollectionView = Marionette.CollectionView.extend({

            // переписываем конструктор
            constructor : function(options) {

                // разрешаем опциональное переназначение аттрибутов
                this.existingEl = ( options.existingEl ) ? options.existingEl : this.existingEl;
                this.existingItemEl = ( options.existingItemEl ) ? options.existingItemEl : this.existingItemEl;
                // проверяем на существование в DOM-е
                this._setExistingEl();
                // исполняем оригинальный конструктор (он перепишет this.el)
                Marionette.CollectionView.prototype.constructor.apply(this,Array.prototype.slice.call(arguments));
                // определяем необходимость колончатого вывода
                this._setColumns();
                // собираем существующие ноды контейнера
                this._setExistingItemViews();
            },

            _setExistingEl : function() {

                // если нет такого аттрибута на объекте / прототипе, сваливаем
                if ( !Marionette.getOption(this,'existingEl') ) return;

                // ищем в DOM-е
                var existingEl = $(this.existingEl);

                // если найден такой элемент и на объекте не объявлен this.el
                if ( existingEl.length && !this.el ) {
                    // объявляем this.el
                    this.el = this.existingEl;
                    // сохраняем нативный объект ноды
                    this.existingEl = existingEl.get(0);
                }
            },

            _setExistingItemViews : function() {

                this.existingItemViews = [];

                // если сохраненный нативный объект это наш this.el нативный объект
                if ( this.existingEl === this.el ) {

                    // считываем селектор для существующих контейнеров вложенных представлений
                    var existingItemEl = Marionette.getOption(this,'existingItemEl');

                    // если такого нет
                    if ( !existingItemEl ){

                        // портим кому-то настроение
                        var error = new Error("An `existingItemEl` must be specified along with `existingEl`");
                            error.name = "NoExistingItemElementError";
                        throw error;

                        return;
                    }

                    if ( this.$columns && this.$columns.length ) {

                        var columns = [];
                        var max = 0;

                        for ( var i = 0, len = this.$columns.length; i < len; i++ ) {

                            columns.push(this.$columns[i].children(this.existingItemEl));

                            max = ( columns[columns.length-1].length > max )
                                  ? columns[columns.length-1].length
                                  : max;
                        }

                        for ( var j = 0; j < max; j++ ) {

                            for ( var i = 0, len = columns.length; i < len; i++ ) {

                                var existingItemView = columns[i][j];

                                if ( existingItemView ) {

                                    this.existingItemViews.push(existingItemView);
                                }
                            }
                        }
                    }
                    else {

                        // собираем результат работы селектора, содержащего jQuery объекты контекстных нод в массив
                        this.existingItemViews = jQuery.makeArray(this.$el.children(this.existingItemEl));
                    }
                }
            },

            _setColumns : function() {

                this.columnEl = Marionette.getOption(this,'columnEl') || 'div';
                this.columns = parseInt(Marionette.getOption(this,'columns')) || 0;
                this.columnElClassName = Marionette.getOption(this,'columnElClassName') || '';

                if ( this.columns > 0 ) {

                    this.$columns = [];

                    var columns = this.$el.children(this.columnEl);

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

                // если мы ранее нашли контекстные ноды
                if ( this.existingItemViews.length ) {
                    // достаем первую с удалением из массива
                    var nodeToReplace = $(this.existingItemViews.shift());
                    // заменяем на результат работы itemView
                    nodeToReplace.replaceWith(itemView.el);
                }
                // иначе используем вызов оригинального метода, который добавит в конец нашей ноды-контейнера
                else {

                    var $container = this.getItemViewContainer(collectionView, itemView, index);
                    $container.append(itemView.el);
                }
            },

            _ensureColumnEls : function() {

                if ( this.$columns && this.$columns.length ) {

                    for ( var i = 0, len = this.$columns.length; i < len; i++ ) {

                        if ( !this.$columns[i].get(0).parentNode ) this.getCollectionContainer().append(this.$columns[i]);
                    }
                }
            },

            getCollectionContainer : function(collectionView) {

                var containerView = collectionView || this;

                return containerView.$el;
            },

            showCollection : function() {

                this._ensureColumnEls();

                Backbone.Marionette.CollectionView.prototype.showCollection.apply(this, Array.prototype.slice.apply(arguments));
            },

            getItemViewContainer : function(collectionView, itemView, index) {

                var container;

                if ( this.$columns && this.$columns.length ) {

                    var columnId = index % this.$columns.length;

                    container = this.$columns[columnId];
                }

                if ( !container || !container.get(0).parentNode ) {

                    container = this.getCollectionContainer(collectionView);
                }

                return container;
            },

            addChildView : function(item, collection, options) {

                this._ensureColumnEls();

                Backbone.Marionette.CollectionView.prototype.addChildView.apply(this,Array.prototype.slice.call(arguments));
            },

            getItemView: function(item){

                var itemViewTypeOption = Marionette.getOption(this, "itemViewType") || "itemType";
                var itemViewType = item.get(itemViewTypeOption) || null;
                var itemViewsOption = Marionette.getOption(this, "itemViews");

                return ( itemViewType && itemViewsOption.hasOwnProperty(itemViewType) )

                    ? itemViewsOption[itemViewType]
                    : Backbone.Marionette.CollectionView.prototype.getItemView.apply(this,arguments);

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

        return SmartCollectionView;
    });
