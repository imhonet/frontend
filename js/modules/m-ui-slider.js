define(
    [
        "app",
        "jquery",
        "jquery-ui"
    ],

    function(App, $){
        App.module('ui-slider', function(){


            (function($){

                $.widget( "ui.m_slider", $.ui.slider, {

                    widgetEventPrefix : "m_slider",

                    _refresh : function() {

                        $.ui.slider.prototype._refresh.apply(this, arguments);
                        this._createLegend();
                        this._createHandleBlocks();
                        this._addHandleBlocksListeners();
                    },

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
                        this._tickValues = [];

                        var ticks = this.options.ticks || [];
                        var legendNodes = [];

                        for ( var i = 0, len = ticks.length; i < len; i++ ) {

                            var tick = ticks[i];

                            this._tickValues.push(tick.value);

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

                    _createHandleBlocks : function() {

                        if ( this._handleBlocks ) {

                            var i = 0, len = this._handleBlocks.length;

                            for ( ; i++; i < len ) {

                                this._handleBlocks[i].remove();
                                this._handleBlocks[i] = null;
                            }
                        }

                        var blocks = this._handleBlocks = [];
                        var handleBlock = "<div class='ui-slider-handle-block'>";

                        this.handles.each(function(i, node) {

                            blocks.push($(handleBlock).appendTo($(node)));
                        });
                    },

                    _addHandleBlocksListeners : function() {

                        var fn = $.proxy(this._updateHandleBlocks,this);

                        this.element
                            .unbind(".handle:block")
                            .bind(this.widgetEventPrefix + "create.handle:block", fn)
                            .bind(this.widgetEventPrefix + "slide.handle:block", fn);
                    },

                    _isHandleBlockVisible : function(value) {

                        return $.inArray(value,this._tickValues) < 0;
                    },

                    _updateHandleBlocks : function(e, obj) {

                        var that = this;
                        var values = ( obj && obj.values ) ? obj.values : this.values();
                        var sibling = ( values[0] === values[1] - 1 );

                        var visibility = [
                            this._isHandleBlockVisible(values[0]),
                            this._isHandleBlockVisible(values[1])
                        ];

                        var arrangement = [

                            ( sibling && visibility[1] ) ? 2 : 1,
                            ( sibling && visibility[0] ) ? 0 : 1
                        ];

                        $.each(this._handleBlocks,function(i, jqNode){

                            var value = values[i];

                            var css = {
                                left : 0,
                                visibility : "hidden"
                            };

                            if ( visibility[i] ) {

                                that._handleBlocks[i].html(value);

                                css = {
                                    left : ( -1 * jqNode.outerWidth()/2 ) * arrangement[i],
                                    visibility : "visible"
                                };
                            }

                            that._handleBlocks[i].css(css);
                        });

                        return;
                    }
                });

            }(jQuery));


            $(function(){

                $(".m-advanced-content-filter-years-slider").m_slider({
                    range: true,
                    min: 1960,
                    values : [1975,2000],
                    max: 2020,
                    ticks : [
                        {
                            label : "Раньше",
                            value : 1960
                        },
                        {
                            value : 1970
                        },
                        {
                            value : 1980
                        },
                        {
                            value : 1990
                        },
                        {
                            value : 2000
                        },
                        {
                            value : 2010
                        },
                        {
                            label : "Сейчас",
                            value : 2020
                        }
                    ],
                    slide : function() {

                        //console.log(arguments);
                    }
                });
            });

        });
    }
);


