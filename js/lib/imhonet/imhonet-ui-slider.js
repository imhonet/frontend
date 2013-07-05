(function($){

    $.widget( "ui.m_slider", $.ui.slider, {

        widgetEventPrefix : "m_slider",

        options : {
            /*
                Cодержит легенду, массив объектов { value : X, label : Y }
                Если нет аттрибута label, то для отображения берется само значение value
             */
            ticks : null,
            // минимальная дистанция между лэйблами ползунков
            minlabelDistance : 4,
            // отображать значение (мин, макс)
            minDisplayedValue : null,
            maxDisplayedValue : null,
            // смещать значение (мин, макс)
            slideToMinAfterValue : null,
            slideToMaxAfterValue : null
        },

        // переписываем метод
        _refresh : function() {
            this._createTickValues();
            // исполняем оригинальный
            $.ui.slider.prototype._refresh.apply(this,arguments);
            // создаем нашу легенду
            this._createLegend();
        },

        _createTickValues : function() {

            this._tickValues = [];
            var ticks = this.options.ticks || [];

            for ( var i = 0, len = ticks.length; i < len; i++ ) {

                this._tickValues.push(ticks[i].value);
            }
        },

        // отрисовывает легенду и расставляет лэйблы
        _createLegend : function() {

            if ( this._legend ) {

                this._legend.empty().detach();
            }
            else {
                // create legend container
                this._legend = $("<div>",{class : "ui-slider-legend"});
            }
            // append to the element
            this.element.append(this._legend);

            this._tickNodes = [];

            var ticks = this.options.ticks || [];
            var legendNodes = [];

            for ( var i = 0, len = ticks.length; i < len; i++ ) {

                var tick = ticks[i];
                var node = $("<div>");
                var where = (tick.value - this._valueMin()) / (this._valueMax() - this._valueMin()) * 100;

                node.css({
                    "left" : where + '%'
                });

                if ( where === 0 ) {

                    node.addClass("ui-slider-legend-start");
                }
                else if ( where === 100 ) {

                    node.addClass("ui-slider-legend-end");
                }

                var label = $("<div>").html(
                    ( tick.label ) ? tick.label : tick.value
                );

                node.append(label);

                legendNodes.push(node);

                this._tickNodes.push({
                    "el" : node,
                    "label" : label
                });
            }

            this._legend.append(legendNodes);

            for ( var i = 0, len = this._tickNodes.length; i < len; i++ ) {

                var tickLabel = this._tickNodes[i].label;
                var tickLabelWidth = tickLabel.outerWidth();

                var leftOffset = 0;

                if ( i !== 0 ) {

                    if ( i == len - 1) {

                        leftOffset = tickLabelWidth;
                    }
                    else {

                        leftOffset = tickLabelWidth/2;
                    }
                }

                tickLabel.css({

                    left : -1 * leftOffset + "px"
                });
            }

            this._legend.addClass("ui-state-visible");
        },

        // добавляет лэйблы к ползункам
        _createHandleLabels : function() {

            if ( this._handleLabels ) {

                var i = 0, len = this._handleLabels.length;

                for ( ; i++; i < len ) {

                    this._handleLabels[i].remove();
                    this._handleLabels[i] = null;
                }
            }

            var blocks = this._handleLabels = [];
            var handleBlock = "<div class='ui-slider-handle-block'>";

            this.handles.each(function(i, node) {

                blocks.push($(handleBlock).appendTo($(node)));
            });
        },

        // переписываем метод
        _refreshValue : function() {
            // исполняем оригинальный
            $.ui.slider.prototype._refreshValue.apply(this, arguments);
            // если у нас нет лэйблов к ползункам
            if ( !this._handleLabels ) {
                // вызываем соответствующий метод
                this._createHandleLabels();
            }
            // обновляем данные и позиционируем лэйблы ползунков
            this._updateHandleLabels();
        },

        // стоит ли отображать значение лэйбла ползунка
        _isHandleBlockVisible : function(value) {

            var range = this.options.values,
                minDisplayed = this.options.minDisplayedValue || range[0],
                maxDisplayed = this.options.maxDisplayedValue || range[1];

            return $.inArray(value,this._tickValues) < 0 && value >= minDisplayed && value <= maxDisplayed;
        },

        _checkSlideToAfter : function(index) {

            var values = this.options.values,
                min = this.options.slideToMinAfterValue,
                max = this.options.slideToMaxAfterValue,
                refreshUI = false;

            if ( values && values.length && ( min || max ) ) {

                refreshUI = true;

                if ( index && this.values(index) > max ) {

                    this.options.values[index] = this.options.max;
                }
                else if ( this.values(index) < min ) {

                    this.options.values[index] = this.options.min;
                }
                else {
                    refreshUI = false;
                }
            }

            return refreshUI;
        },

        _change : function(event, index) {

            if ( !this._keySliding && !this._mouseSliding ) {

                var refreshUI = this._checkSlideToAfter(index);

                // исполняем оригинальный
                $.ui.slider.prototype._change.apply(this, arguments);

                if ( refreshUI ) {

                    this._refreshValue();
                }
            }
        },

        // обновляет содержимое и позиционирует лэйблы ползунков
        _updateHandleLabels : function() {

            var that = this, values = this.values();

            var defaultCSS = {
                left : 0,
                visibility : "hidden"
            };

            var visibility = [
                this._isHandleBlockVisible(values[0]),
                this._isHandleBlockVisible(values[1])
            ];

            var arrangement = [1,1];

            // update
            $.each(this._handleLabels,function(i, jqNode){

                jqNode.html(values[i]).css(defaultCSS);
            });

            if ( values[0] === values[1] ) {

                visibility[1] = false;
            }
            else {

                var startHandleWidth = this._handleLabels[0].outerWidth(),
                    startHandleOffsetLeft = this._handleLabels[0].offset().left,
                    endHandleOffsetLeft = this._handleLabels[1].offset().left;

                if ( startHandleWidth + startHandleOffsetLeft + this.options.minlabelDistance > endHandleOffsetLeft ) {

                    arrangement = [2,0];
                }
            }

            $.each(this._handleLabels,function(i, jqNode){

                if ( visibility[i] ) {

                    jqNode.css({
                        left : ( -1 * jqNode.outerWidth()/2 ) * arrangement[i],
                        visibility : "visible"
                    })
                }
            });
        },

        getRange : function() {

            return this.options.values;
        },

        // публичный метод для одновременной установки региона (this.options.values)
        setRange : function(newValues) {

            // если передан массив и установлен регион
            if ( $.isArray(newValues) && this.options.values && this.options.values.length ) {

                // если передан неправильный диапазон
                if ( newValues[0] > newValues[1] ) return;

                // иначе продолжаем с установкой новых значений
                this.options.values[0] = this._trimAlignValue(newValues[0]);
                this.options.values[1] = this._trimAlignValue(newValues[1]);

                // кидаем событие
                this._trigger("rangeset", null, { values : this.options.values });
                // обновляем UI
                this._refreshValue();
            }
        }
    });

}(jQuery));