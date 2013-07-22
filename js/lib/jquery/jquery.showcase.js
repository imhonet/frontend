(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {'use strict';
	$.ShowCase = function(options, element) {
		this.$el	= $(element);
		this._init( options );
	};
	
	$.ShowCase.defaults = {
        show                : 9,
		current             : 3,
        selector_wraper     : '.m-evaluator-gallery-items',
        selector_nav_prev   : '.m-evaluator-gallery-page-left',
        selector_nav_next   : '.m-evaluator-gallery-page-right',
        class_item          : 'm-evaluator-gallery-item',
        class_left          : 'm-evaluator-gallery-item-left',
        class_center        : 'm-evaluator-gallery-item-center',
        class_right         : 'm-evaluator-gallery-item-right',
        class_suff_2d       : '_2d',
        class_suff_simple   : '_simple',
        class_suff_number   : '_{n}',
        class_transition    : 'm-evaluator-gallery-item_transition',
        onNext              : null,
        onPrev              : null,
        onChange            : null
    };
	
	$.ShowCase.prototype = {

		_init : function( options ) {
			this.options 		= $.extend( true, {}, $.ShowCase.defaults, options );
            this.sideShow = (this.options.show - 1)/2;
            this.support3d		= Modernizr.csstransforms3d;
			this.support2d		= Modernizr.csstransforms;
			this.supportTrans	= Modernizr.csstransitions;

            this.classLeft = this.options.class_left;
            this.classCenter = this.options.class_center;
            this.classRight = this.options.class_right;
            this.classesLeft = [];
            this.classesRight = [];
            for (var i=0; i<this.sideShow; i++){
                this.classesLeft[i] = this.classLeft + this.options.class_suff_number.replace('{n}',i);
                this.classesRight[i] = this.classRight + this.options.class_suff_number.replace('{n}',i);
            }

            if (!this.support3d) {
                if (this.support2d){
                    this.classLeft += this.options.class_suff_2d;
                    this.classCenter += this.options.class_suff_2d;
                    this.classRight += this.options.class_suff_2d;
                } else {
                    this.classLeft += this.options.class_suff_simple;
                    this.classCenter += this.options.class_suff_simple;
                    this.classRight += this.options.class_suff_simple;
                }
            }


            this.classesAll = []
                .concat(this.classLeft)
                .concat(this.classRight)
                .concat(this.classCenter)
                .concat(this.classesLeft)
                .concat(this.classesRight);

            this.selectorClassesAll = this.classesAll.join(' ');

			this.$wrapper		= this.$el.find(this.options.selector_wraper);
            this.$navPrev		= this.$el.find(this.options.selector_nav_prev);
            this.$navNext		= this.$el.find(this.options.selector_nav_next);

            for (var i=0; i<this.sideShow+1; i++){
                this.$wrapper.prepend('<div class="'+ this.options.class_item+'"></div>');
            }

            this.$items			= this.$wrapper.children();
			this.itemsCount		= this.$items.length;
			this.current		= this.options.current+this.sideShow+1;

            this.isAnim			= false;

            this.$current = null;
            this.$lefts = [];
            this.$rights = [];

			this._validate();
			
			this._setItems();
			
			this._loadEvents();

		},
		_validate			: function() {
			if( this.options.current < 0 || this.options.current > this.itemsCount - 1 ) {
				this.current = 0;
			}
		},
		_setItems			: function() {
			this.$items.removeClass(this.selectorClassesAll);

            this.$current	= this.$items.eq(this.current);
            this.$current.addClass(this.classCenter);
            for (var i = 0; i<this.sideShow; i++){
                var right_pos = i+1+this.current;
                var left_pos = this.current-i-1;
                /*if (right_pos>this.itemsCount-1){
                    right_pos = right_pos-this.itemsCount;
                }
                if (left_pos<0){
                    left_pos = this.itemsCount+left_pos;
                }
                */
                if (left_pos>this.sideShow){
                    this.$lefts[i] = this.$items.eq(left_pos);
                    this.$lefts[i].addClass(this.classLeft + ' ' + this.classesLeft[i]);
                }
                this.$rights[i] = this.$items.eq(right_pos);
                this.$rights[i].addClass(this.classRight + ' ' + this.classesRight[i]);
            }
            if (this.options.onChange && typeof this.options.onChange == 'function'){
                this.options.onChange(this.current, this.$items.length);
            }
		},

		_loadEvents: function() {
			var _self	= this;

			this.$navPrev.on( 'click.showCase', function( event ) {
				_self._navigate('prev');
				return false;
			});

			this.$navNext.on( 'click.showCase', function( event ) {
				_self._navigate('next');
				return false;
			});

            if (this.supportTrans){
                this.$wrapper.on( 'webkitTransitionEnd.showCase transitionend.showCase OTransitionEnd.showCase', function( event ) {
                    _self.$items.removeClass(_self.options.class_transition);
                    _self.isAnim	= false;
                });
            }
		},
		_navigate : function( dir ) {
			if( this.supportTrans && this.isAnim ){
				return false;
            }
			switch( dir ) {
			
				case 'next' :
                        this.isAnim	= true;
                        this.current = this.$rights[0].index();
                        this.$current.addClass(this.options.class_transition).addClass(this.classLeft + ' ' + this.classesLeft[0]);
                        this.$rights[0].addClass(this.options.class_transition).addClass(this.classCenter);
                        for (var i=1; i<this.sideShow; i++){
                            if (this.$rights[i]){
                                this.$rights[i].addClass(this.options.class_transition).addClass(this.classesRight[i-1]);
                            }
                        }
                        for (var i=0; i<this.sideShow-1; i++){
                            if (this.$lefts[i]){
                                this.$lefts[i].addClass(this.options.class_transition).addClass(this.classesLeft[i+1]);
                            }
                        }
                        if (this.options.onNext && typeof this.options.onNext == 'function'){
                            this.options.onNext(this.current, this.$items.length);
                        }
                        this._setItems();
					break;
					
				case 'prev' :
                    if (this.current>this.sideShow+1){
                        this.isAnim	= true;
                        this.current = this.$lefts[0].index();
                        this.$current.addClass(this.options.class_transition).addClass(this.classRight + ' ' + this.classesRight[0]);
                        this.$lefts[0].addClass(this.options.class_transition).addClass(this.classCenter);
                        for (var i=1; i<this.sideShow; i++){
                            if (this.$lefts[i]){
                                this.$lefts[i].addClass(this.options.class_transition).addClass(this.classesLeft[i-1]);
                            }
                        }
                        for (var i=0; i<this.sideShow-1; i++){
                            if (this.$rights[i]){
                                this.$rights[i].addClass(this.options.class_transition).addClass(this.classesRight[i+1]);
                            }
                        }
                        if (this.options.onPrev && typeof this.options.onPrev == 'function'){
                            this.options.onPrev(this.current, this.$items.length);
                        }
                        this._setItems();
                    }
                    break;
			};
		},
		destroy : function(){
			this.$navPrev.off('.showCase');
			this.$navNext.off('.showCase');
			this.$wrapper.off('.showCase');
		},
        length: function(){
            return this.$items.length;
        },
        calcChildren: function(){
            this.$items			= this.$wrapper.children();
            this.itemsCount		= this.$items.length;
        },
        next: function(){
            this._navigate('next');
        }
	};
	
	$.fn.showCase = function( options ) {
        this.each(function() {
            var instance = $.data( this, 'showCase' );
            if ( !instance ) {
                $.data( this, 'showCase', new $.ShowCase( options, this ) );
            } else {
                if (options && typeof(options) == 'string') {
                    if (options == 'recalc') {
                        instance.calcChildren();
                        return;
                    }
                    if (options == 'next') {
                        instance.next();
                        return;
                    }
                }
            }
        });
        return this;
	};
}));