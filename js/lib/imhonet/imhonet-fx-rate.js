(function( $ ){

    var pluginName = "m_rate";

    // Конструктор
    var Plugin = function() {

        /* * * * * * * * * * * *
         * "Приватные" аттрибуты
         * * * * * * * * * * * */

         var readOnly,
            originalRating,
            rating,
            container,
            starsWidth,
            totalWidth,
            fauxContainer;

         /* * * * * * * * * * *
         * "Приватные" методы
         * * * * * * * * * * */


        var getNamespacedEventNames = function() {

            var names = Array.prototype.slice.call(arguments),
                namespace = "." + pluginName + " ";

            return (names.join(namespace) + namespace).slice(0,-1);
        }

        var createContainers = function() {

            container = $('<div>').css({ color : this.options.colors.empty });

            var stars = [];

            for ( var i = 0, len = this.options.stars; i < len; i++ ) {

                stars.push($('<i>'));
            }

            container.append(stars);

            fauxContainer = container.clone().css({

                color : this.options.colors.full,
                position : 'absolute',
                top : 0,
                left : 0,
                "z-index" : 5,
                "pointer-events" : "none",
                overflow : "hidden"
            })

            stars = null;

            this.$el.append(container)
                    .append(fauxContainer);
        }

        var setRating = function(newRating) {

            if ( readOnly === true ) return;

            var value = Math.abs(newRating);
            var delta = value - Math.floor(value);

            switch ( true ) {

                case delta > 0 && delta <= .5 :
                    newRating = Math.floor(newRating) + .5;
                    break;
                case delta > .5 && delta <= 1 :
                    newRating = Math.floor(newRating) + 1;
                    break;
            }

            var computedStarsWidth = ( newRating / this.options.stars ) * starsWidth,
                fullStars = Math.floor(newRating),
                adjustmentWidth = this.options.size.interval;

                adjustmentWidth *= ( fullStars === this.options.stars ) ? fullStars - 1 : fullStars;

            fauxContainer.css({
                width : (((computedStarsWidth + adjustmentWidth)/totalWidth) * 100) + '%'
            });

            return newRating;
        }

        var setEventHandlers = function() {

            var that = this;

            this.$el.on(getNamespacedEventNames("mouseenter"),"i",function(e){
                setRating.call(that, getStarRating(e));
            });
            this.$el.on(getNamespacedEventNames("mouseleave"),function(e){
                setRating.call(that, rating);
            });
            this.$el.on(getNamespacedEventNames("click"),"i",function(e){

                setCurrentRating.call(that,e);
            });
        }

        var getStarRating = function(e) {

            return $(e.currentTarget).index() + 1;
        }

        var setReadOnly = function(isReadOnly,isVoted) {

            readOnly = isReadOnly !== false;

            if ( !readOnly ) {
                setEventHandlers.call(this);
            }
            else {
                this.$el.off();
            }

            ( readOnly ) && this.$el.addClass(this.options.readOnlyClass) || this.$el.removeClass(this.options.readOnlyClass);

            ( isVoted ) && this.$el.addClass(this.options.votedClass) || this.$el.removeClass(this.options.votedClass)
        }

        var setCurrentRating = function(e) {

            rating = getStarRating(e);
            setReadOnly.call(this,true,true);
            executeCallback.call(this);
        }

        var executeCallback = function() {

            if ( typeof this.options.callback === "function" ) {

                this.options.callback.call(null,{ "rating" : rating });
            }
        }

        /* * * * * * * * * * *
         * "Публичные" методы
         * * * * * * * * * * */

        this.buildDOM = function() {

            // parse options
            originalRating = rating = this.options.rating || 0;
            totalWidth = ( this.options.size.star + this.options.size.interval) * this.options.stars - this.options.size.interval;
            starsWidth = this.options.stars * this.options.size.star;

            // create containers with stars
            createContainers.call(this);
            // display initial rating if any
            setRating.call(this,rating);
            // run forrest run!
            setReadOnly.call(this, this.options.readOnly || false);
        }

        this.destroy = function() {

            this.$el.empty();
            Plugin.prototype.destroy.call(this);
        }

        this.getRating = function() {

            return rating;
        }

        this.setRating = function(value) {

            if ( !readOnly ) {

                rating = value;
                setRating.call(this,rating);
            }
        },

        this.unlock = function() {

            rating = originalRating;
            setReadOnly.call(this,false,false);
            setRating.call(this,rating);
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
        stars : 10,
        rating : 1.5,
        readOnlyClass : "rating-read-only",
        votedClass : "rating-voted",
        readOnly : false,
        size : {
            star : 16,
            interval : 4
        },
        colors : {
            full : '#7cb5d2',
            empty : '#828b9a'
        }
    }


})( jQuery );