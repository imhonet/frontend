(function( $ ){

    // Конструктор
    var Imhonet_Fx_Foo = function() {

        /* * * * * * * * * *
         * "Приватные" аттрибуты
         * * * * * * * * * */
        // ссылка на контекст для приватных методов
         var that = this;

        /* * * * * * * * * *
         * "Приватные" методы
         * * * * * * * * * */
        // var fn = function() { .. }

        /* * * * * * * * * *
         * "Публичные" методы
         * * * * * * * * * */
        // this.fn = function() { .. }
        // * не забываем про chainability, т.е. return this для "процедурных" методов;
    }

    // Прототип
    Imhonet_Fx_Foo.prototype = {

        init : function(userOptions, el) {

            // опции плагина (миксин глобальных и переданных кодером)
            this.options = $.extend({}, $.fn.imhonet_Fx_Foo.defaults, userOptions || {});
            // ссылка на jQuery объект-обертку DOM ноды
            this.el = el;
            this.$el = $(this.el);

            // поддержка chainability
            return this;
        },

        destroy : function() {

            // разбираем наше DOM творение
            // снимаем event handlers
            // ...
            // убираем ссылку из data map
            this.$el.data("Imhonet_Fx_Foo",null);
            // profit!
        }
    }

    // wrapper-код плагина
    $.fn.imhonet_Fx_Foo = function(method, options){

        return this.each(function(){
            // поднимаем ссылку из data map
            var instance = $.data(this, "imhonet_Fx_Foo");
            // если таковой нет
            if ( !instance ) {
                // переписываем аргументы
                if ( typeof method === "object" ) {
                    options = method;
                }
                // сохраняем ссылку на новый экземпляр плагина через data map
                $.data(this, "imhonet_Fx_Foo", new Imhonet_Fx_Foo().init(options, this));
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
                    var error = new Error("Plugin 'Imhonet_Fx_Foo' doesn't have method named '" + method + "'");
                    error.name = "NoMethodDefinedError";
                    throw error;
                }
            }
        })
    }

    // глобальные настройки плагина
    $.fn.imhonet_Fx_Foo.defaults = {
        foo : 'bar'
    }


})( jQuery );