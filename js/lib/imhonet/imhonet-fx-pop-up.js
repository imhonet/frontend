(function( $ ){

    var pluginName = "m_popover";

    // Конструктор
    var Plugin = function() {

        /* * * * * * * * * * * *
         * "Приватные" аттрибуты
         * * * * * * * * * * * */
        var container,
            geometry,
            arrow,
            content,
            popoverContent,
            classMap = {
                t : "top",
                r : "right",
                b : "bottom",
                l : "left"
            },
            isView = false,
            isRendered = false,
            isDisplayed = false,
            header,
            monitor;


        /* * * * * * * * * * *
         * "Приватные" методы
         * * * * * * * * * * */

        var getNamespacedEventNames = function() {

            var names = Array.prototype.slice.call(arguments),
                namespace = "." + pluginName + " ";

            return (names.join(namespace) + namespace).slice(0,-1);
        }

        var setHandlers = function() {

            var that = this;

            monitor = $.proxy(monitorOutsideAction,this);

            this.$el.bind(getNamespacedEventNames("click"),function(e){

                if ( !isDisplayed ) {

                    appendContainer.call(that);
                    $(window).bind(getNamespacedEventNames("click"), monitor);
                }
                else {

                    dismantlePopUp.call(that);
                }
            });

            container.on(getNamespacedEventNames("click"),"[data-popover-attr='close']", $.proxy(dismantlePopUp,this));
        }

        var dismantlePopUp = function() {

            $(window).unbind(getNamespacedEventNames("click"), monitor);

            if ( isRendered ) {

                container.detach().removeAttr("style");
            }

            isDisplayed = false;
        }

        var monitorOutsideAction = function(e) {

            if ( e.target === this.el ) return;

            if ( !$(e.target).closest(container).length ) {

                dismantlePopUp.call(this);
            }
        }

        var appendContainer = function() {

            this.$el.after(container);

            showPopOver.call(this);

            isDisplayed = true;
        }

        var getArrow = function() {

            arrow = $('<div>').addClass(this.options.arrowClass);

            if ( this.options.customArrowColor ) {

                arrow.css({
                    "border-color" : this.options.customArrowColor
                })
            }

        }

        var resetData = function() {

            container = content = header = popoverContent = null;
            isView = isRendered = isDisplayed = false;
        }

        var getContainer = function() {

            if ( container ) return;

            container = $('<div>').addClass([this.options.containerClass,classMap[this.options.orientation]].join(" "));

            getArrow.call(this);
        };

        var setGeometry = function() {

            container.removeAttr("style");

            // собираем данные по геометрии
            geometry = {
                // наш элемент
                el : {
                    w : this.$el.outerWidth(),
                    h : this.$el.outerHeight(),
                    position : this.$el.position()
                },
                // наш элемент позиционирования
                header : {
                    w : header.outerWidth(),
                    h : header.outerHeight(),
                    position : header.position()
                }
            }

            // пре-декларируем css объект
            var css = {
                "z-index" : 100
            }

            // определяемся с параметрами позиционирования
            if ( /^t|b/.test(this.options.orientation) ) {

                css.left = -1 * (geometry.header.w - geometry.el.w) / 2 + geometry.el.position.left;

                if ( this.options.orientation === "b" ) {

                    css.top = (geometry.el.h + geometry.el.position.top + this.options.pad);
                }
                else {
                    css.top =  -1 * (geometry.header.h + geometry.el.position.top + this.options.pad);
                }
            }

            else if ( /^l|r$/.test(this.options.orientation) ) {

                css.top = -1 * (geometry.header.h - geometry.el.h) / 2 + geometry.el.position.top - geometry.header.position.top;

                if ( this.options.orientation === "l" ) {

                    css.left = -1 * ( geometry.header.w + this.options.pad ) + geometry.el.position.left;

                }
                else {

                    css.left = ( geometry.el.w + this.options.pad ) + geometry.el.position.left;
                }
            }

            // прописываем вычисленную геометрию позиционирования
            container.css(css);
        }

        var showPopOver = function() {

            // если не было первичного отображения
            if ( !isRendered ) {
                // если передан объект и он имеет метод "render"
                if ( typeof content === "object" && content.render ) {
                    // ставим соответствующий флаг
                    isView = true;
                    // рендерим вью
                    content.render();
                    // сохраняем ссылку на рут-элемент вью
                    popoverContent = content.el;
                }
                // иначе, если передана строка-селектор
                else if ( typeof content === "string" ) {
                    // ищем ноду в глобальном контексте
                    var domNode = $(content);
                    // если она имеется
                    if ( domNode.length ) {
                        // сохраняем ссылку на jQuery-объект
                        popoverContent = domNode.show();
                    }
                }
                // добавляем в наш контейнер содержимое по установленной ссылке
                container.append(popoverContent);
                // если у нас вью и имеется метод "onShow", то исполняем его
                if ( isView && content.onShow ) content.onShow.apply(content);
            }
            // иначе добавляем ранее определенное содержимое
            else {
                container.append(popoverContent);
            }
            /* выбор ноды относительно которой мы будет позиционироваться */
            header = container;
            // если не указано жесткое позиционирование по высоте, и расположение не сверху и не снизу, и указан селектор
            if ( !this.options.forceMiddle && !/^t|b/.test(this.options.orientation) && this.options.headerSelector ) {
                // определяем ноду по селектору в контексте содержимого поп-апа
                var el = container.find(this.options.headerSelector);
                // нашли?
                if ( el.length ) {
                    // присвоили ссылку на найденную ноду
                    header = el;
                }
            }

            // добавляем к элементу позиционирования нашу стрелку
            header.append(arrow);

            setGeometry.call(this);

            // отмечаем первичное отображение
            isRendered = true;
        }


        /* * * * * * * * * * *
        * "Публичные" методы
        * * * * * * * * * * */

        this.buildDOM = function() {

            content = this.options.content;

            getContainer.call(this);
            setHandlers.call(this);
        }

        this.update = function() {

            if ( isDisplayed ) {

                setGeometry.call(this);
            }
        }

        this.destroy = function() {

            // убираем обработчик событий
            $(window).unbind(getNamespacedEventNames("click"), monitor);
            // если у нас вью и есть метод "close", то исполняем его
            if ( isView && content.close ) content.close.apply(content);
            // remove DOM stuff
            container.empty().remove();
            // обнуляем параметры
            resetData();
            // исполняем оригинальный метод прототипа
            Plugin.prototype.destroy.call(this);
        }
    }

    // Прототип
    Plugin.prototype = {

        init : function(userOptions, el) {

            if ( this.$el ) return this;

            // опции плагина (миксин глобальных и переданных кодером)
            this.options = $.extend({}, $.fn[pluginName].defaults, userOptions || {});
            // ссылка на jQuery объект-обертку DOM ноды
            this.el = el;
            this.$el = $(this.el);

            this.buildDOM();

            // поддержка chainability
            return this;
        },

        destroy : function() {

            // разбираем наше DOM творение
            // снимаем event handlers
            this.$el.unbind('.' + pluginName);
            // убираем ссылку из data map
            this.$el.data(pluginName,null);
            // profit!
        }
    }

    // wrapper-код плагина
    $.fn[pluginName] = function(method, options){

        return this.each(function(){
            // поднимаем ссылку из data map
            var instance = $.data(this, pluginName);
            // если таковой нет
            if ( !instance ) {
                // переписываем аргументы
                if ( typeof method === "object" ) {
                    options = method;
                }
                // сохраняем ссылку на новый экземпляр плагина через data map
                $.data(this, pluginName, new Plugin().init(options, this));
            }
            // если вызывается метод инстанса плагина
            else if ( typeof method === "string" ) {
                // если такой метод определен
                if ( typeof instance[method] === "function" ) {
                    // исполняем его с передачей параметров
                    return instance[method](options);
                }
                // иначе бьем тревогу
                else {
                    var error = new Error("Plugin '" + pluginName + "' doesn't have method named '" + method + "'");
                    error.name = "NoMethodDefinedError";
                    throw error;
                }
            }
        })
    }

    // глобальные настройки плагина
    $.fn[pluginName].defaults = {

        containerClass : "m-popover-container",
        arrowClass : "m-popover-arrow",
        content : null,
        pad : 26,
        orientation : "l",
        customArrowColor : null,
        headerSelector : ".m-popover-header"
    }


})( jQuery );