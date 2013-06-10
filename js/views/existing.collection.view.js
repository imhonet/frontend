define([
    'jquery',
    'underscore',
    'marionette',
    'views/enhanced.collection.view'
],
    function($, _, Marionette, EnhancedCollectionView) {

        var ExistingCollectionView = EnhancedCollectionView.extend({

            // переписываем конструктор
            constructor : function(options) {

                // разрешаем опциональное переназначение аттрибутов
                this.existingEl = ( options.existingEl ) ? options.existingEl : this.existingEl;
                this.existingItemEl = ( options.existingItemEl ) ? options.existingItemEl : this.existingItemEl;
                // проверяем на существование в DOM-е
                this._setExistingEl();
                // исполняем оригинальный конструктор (он перепишет this.el)
                EnhancedCollectionView.prototype.constructor.apply(this,Array.prototype.slice.call(arguments));
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

                        this.existingItemViews = [];

                        for ( var i = 0, len = this.$columns.length; i < len; i++ ) {

                            this.existingItemViews.push(jQuery.makeArray(this.$columns[i].children(this.existingItemEl)));
                        }

                    }
                    else {

                        // собираем результат работы селектора, содержащего jQuery объекты контекстных нод в массив
                        this.existingItemViews = jQuery.makeArray(this.$el.children(this.existingItemEl));
                    }

                    if ( this.existingItemViews.length ) {

                        this.listenTo(this,'collection:rendered',this._removeRedundantViews);
                    }
                }
            },

            _removeRedundantViews : function() {

                if ( this.existingItemViews.length ) {

                    _.each(this.existingItemViews,function(existingView){

                        $(existingView).remove();
                    });
                }
            },

            // переписываем метод appendHtml, где при первичном рендере
            appendHtml : function(collectionView, itemView, index){

                // если мы ранее нашли контекстные ноды
                if ( this.existingItemViews.length ) {

                    var nodeToReplace;

                    if ( this.$columns && this.$columns.length ) {

                        var columnId = index % this.$columns.length;
                        var customColumnId = itemView.model.get('c');

                        if ( customColumnId ) {

                            columnId = customColumnId - 1;
                        }

                        nodeToReplace = this.existingItemViews[columnId].shift();
                    }
                    else {
                        // достаем первую с удалением из массива
                        nodeToReplace = this.existingItemViews.shift();
                    }

                    // заменяем на результат работы itemView
                    $(nodeToReplace).replaceWith(itemView.el);
                }
                // иначе используем вызов оригинального метода, который добавит в конец нашей ноды-контейнера
                else {

                    var $container = this.getItemViewContainer(collectionView, itemView, index);
                    $container.append(itemView.el);
                }
            }

        });

        return ExistingCollectionView;
    });
