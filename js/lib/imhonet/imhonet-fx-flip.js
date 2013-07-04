(function( $ ){

    var pluginName = "imhonet_Fx_Flip";

    // Конструктор
    var Plugin = function() {

        /* * * * * * * * * *
         * "Приватные" аттрибуты
         * * * * * * * * * */

         // ссылка на контекст для приватных методов
        var that = this,
            animatedAttribute,
            animationRule,
            slideDirection,
            containerOffset,
            slideInSize,
            shadowEls = [];

        /* * * * * * * * * * *
         * "Приватные" методы
         * * * * * * * * * * */

        var slide = function(slideOut) {

            that.$slideOut.css(animatedAttribute, ( slideOut !== false ) ? getNewOffset() + 'px' : containerOffset + 'px');
        }

        var getContainerOffset = function() {

            if ( containerOffset === undefined ) {

                containerOffset = parseInt(that.$slideOut.css(animatedAttribute).replace(/px/,''));
            }

            return containerOffset;
        }

        var getNewOffset = function() {

            if ( slideInSize === undefined ) {

                slideInSize = ( that.options.slideDirection === 'v' )
                    ? that.$slideIn.height()
                    : that.$slideIn.width();
            }

            return  -1 * slideDirection * slideInSize + getContainerOffset();
        }

        var processSettings = function() {

            // plane
            animatedAttribute = ( that.options.slideDirection === 'v' )
                ? 'top'
                : 'left';

            // direction
            if ( animatedAttribute === 'top' ) {

                slideDirection = ( that.options.slideTo === 't') ? 1 : -1;
            }
            else {
                slideDirection = ( that.options.slideTo === 'l') ? 1 : -1;
            }

            // animation
            animatedAttribute = 'margin-' + animatedAttribute;
            animationRule = animatedAttribute + ' ' + that.options.animationSpeed + 's';

            setAnimationRule(that.$slideOut,'transition',animationRule);
        }

        var setAnimationRule = function(el,ruleName,rule) {

            var prefixes = ['webkit','moz','ms','o',''];
            var ruleSet = {}

            for ( var i = 0, len = prefixes.length; i < len; i++ ) {

                var specificRuleName = ( prefixes[i].length ) ? ['-',prefixes[i],'-',ruleName].join('') : ruleName;

                ruleSet[specificRuleName] = rule || '';
            }

            el.css(ruleSet);
        }

        var removeShadowEls = function() {

            while ( shadowEls.length ) {

                shadowEls.pop().remove();
            }
        }

        var appendShadowEls = function() {

            if ( shadowEls.length ) return;

            shadowEls.push($('<div>').addClass(that.options.shadowClassName));
            shadowEls.push($('<div>').addClass(that.options.shadowClassName));

            if ( that.options.slideDirection === 'v' ) {

                shadowEls[0].css({
                    'top' : '0',
                    'left' : '-4px',
                    'right' : '-4px',
                    'height' : '1px'
                });

                shadowEls[1].css({
                    'right' : '-4px',
                    'bottom' : '0',
                    'left' : '-4px',
                    'height' : '1px'
                });
            }
            else {

                shadowEls[0].css({
                    'top' : '-4px',
                    'bottom' : '-4px',
                    'left' : 0,
                    'width' : '1px'
                });

                shadowEls[1].css({
                    'top' : '-4px',
                    'bottom' : '-4px',
                    'right' : '0',
                    'width' : '1px'
                });
            }

            that.$slideContainer.prepend(shadowEls[0]);
            that.$slideContainer.append(shadowEls[1]);
        }

        var bindEventListeners = function() {

            that.$el.bind('mouseenter.' + pluginName, function(){slide()});
            that.$el.bind('mouseleave.' + pluginName, function(){slide(false)});
        }

        /* * * * * * * * * * *
         * "Публичные" методы
         * * * * * * * * * * */

        this.buildDOM = function() {

            this.$slideContainer = this.$el.find('[data-fx="slide-container"]');
            this.$slideOut = this.$el.find('[data-fx="slide-out"]');
            this.$slideIn = this.$el.find('[data-fx="slide-in"]');

            processSettings();
            appendShadowEls();
            bindEventListeners();
        }

        this.slide = function() {

            slide.apply(null,arguments);

            return this;
        }

        this.destroy = function() {

            removeShadowEls();
            setAnimationRule(this.$slideOut,'transition');

            this.$slideOut.css(animatedAttribute,'');
            this.$slideOut.unbind('.' + pluginName);

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
                    instance[method](options);
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
        slideDirection : 'v',
        slideTo : 't',
        shadowClassName : 'm-films-promo-card-header-shadow',
        animationSpeed : .3
    }


})( jQuery );