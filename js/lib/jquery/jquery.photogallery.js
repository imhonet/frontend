
function arrayIndexOf(arr ,value, strict) {
    var i = 0, L = arr.length;
    if (strict) {
        for ( ; i < L; i++) if (arr[i] === value) return i;
    }
    else {
        for ( ; i < L; i++) if (arr[i] == value) return i;
    }
    return -1;
};


(function( $ ){

    $.fn.imhoGallery = function(options) {
        var gallery = this,
            blockSlides = gallery.children('.m-photogallery-view'),
            blockPreview =  gallery.children('.m-photogallery-preview'),
            containerSlides = blockSlides.children('.m-list'),
            arrowRight = blockSlides.children('.m-right'),
            arrowLeft = blockSlides.children('.m-left'),
            previewArrowRight = blockPreview.children('.m-right'),
            previewArrowLeft = blockPreview.children('.m-left'),
            containerPreview = blockPreview.children('.m-list'),
            elemsSlides = containerSlides.children(),
            elemsPreview = containerPreview.children(),
            previewWidth,
            previewListWidth,
            params = {};

        params.slideStatus = 1;
        params.offset = 0;
        params.locked = false;
        params.stopAnimate = false;




        for (var key in options) {
            addOptions(key, options[key]);
        }

        if (elemsSlides.length>1) {
            arrowRight.show();
            blockPreview.show();
            $(elemsPreview[0]).addClass('active');

            previewListWidth = elemsPreview[0].offsetWidth*(elemsPreview.length+1);
            previewWidth = blockPreview.width();
            if (previewListWidth>previewWidth) {
                previewArrowRight.show();
            }
        }

        resizeSlides();

        previewArrowRight.hover(function() {
            params.stopAnimate = false;
            animatePreview(false);
        }, function() {
            params.stopAnimate = true;
            previewArrowLeft.show();
        })

        previewArrowLeft.hover(function() {
            params.stopAnimate = false;
            animatePreview(true);
        }, function() {
            params.stopAnimate = true;
        })

        function animatePreview(reverse) {
            if (params.stopAnimate) {
                return false;
            }
            var sign = reverse?'+=':'-=',
                animateOffset = parseInt(containerPreview.css('left'), 10);

            if ((animateOffset>params.maxOffset && !reverse)||(animateOffset<0 && reverse)) {
                containerPreview.animate({
                    left: sign + 30
                }, 150, 'linear', function() {
                    animatePreview(reverse);
                })
            }

        }

        containerPreview.width(elemsPreview[0].offsetWidth*(elemsPreview.length+1)+10);

        elemsPreview.click(function() {
            var indexOf =  arrayIndexOf(elemsPreview, this)+1;

            if (indexOf!=params.slideStatus) {
                params.locked = true;
                animateSlides(0-params.width*(indexOf-1), indexOf)
            }
        })

        arrowLeft.click(function() {
            if (params.slideStatus>=1 && !params.locked) {
                var $this = $(this);
                params.locked = true;
                animateSlides(0-params.width*(params.slideStatus-2));
            }
        })

        arrowRight.click(function() {
            if (params.slideStatus<elemsSlides.length && !params.locked) {
                var $this = $(this);
                params.locked = true;
                animateSlides(0-params.width*params.slideStatus);
            }
        })

        function animateSlides(offset, random) {
            arrowRight.toggleClass('fly');
            arrowLeft.toggleClass('fly');

            containerSlides.animate({
                'left': offset
            }, function() {
                params.locked = false;

                if (!random) {
                    if (params.offset>offset) {
                        params.slideStatus++;
                    } else if(params.offset<offset) {
                        params.slideStatus--;
                    } else {
                        return false;
                    }
                } else {
                    params.slideStatus = (0-offset/params.width)+1;
                }

                params.offset = offset;
                markArrow(offset);
                markPreviewSlide();
            })
        }

        function markArrow(offset) {
            arrowRight.toggleClass('fly');
            arrowLeft.toggleClass('fly');

            if (offset<0) {
                arrowLeft.show();
            } else if (offset==0) {
                arrowLeft.hide();
            }

            if ((0-params.width*elemsSlides.length)==(0-params.width*(params.slideStatus))) {
                arrowRight.hide();
            } else {
                arrowRight.show();
            }

            var contWidth = params.width*elemsSlides.length;
        }

        $(window).resize(function() {
            var resizeOffset;
            if (params.slideStatus>1) {
                resizeOffset = true;
            }
            resizeSlides(resizeOffset);
        })

        function markPreviewSlide() {
            elemsPreview.removeClass('active');
            $(elemsPreview[params.slideStatus-1]).addClass('active')
        }

        function resizeSlides(resizeOffset) {
            var offset;


            previewWidth = blockPreview.width();
            params.width = gallery.width();
            params.maxOffset = previewWidth - previewListWidth;

            containerSlides.width(params.width*elemsSlides.length);
            elemsSlides.width(params.width);

            if (resizeOffset) {
                offset = 0 - params.width*(params.slideStatus-1);
                containerSlides.css({
                    left: offset
                })
            }
        }

        function addOptions(type, param) {
            switch(type) {
                case 'extending':
                    gallery.addClass('exdending-'+param);
                    break;
                default:
                    break;
            }
        }
    };
})( jQuery );