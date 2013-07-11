define(
    [
        "app",
        "jquery",
        "modernizr",
        "flip"
    ],

    function(App, $){
        App.module('flip', function(){

            $(function () {
                // Utilize the modernzr feature support class to detect CSS 3D transform support
                if ($('html').hasClass('csstransforms3d')) {

                    // if it's supported, remove the scroll effect add the cool card flipping instead

                    // for .m-signature-item
                    $('.m-signature-item').removeClass('scroll').addClass('flip');

                    // add/remove flip class that make the transition effect
                    $('.m-signature-item.flip').hover(
                        function () {
                            $(this).find('.m-signature-item-wrap').addClass('flipIt');
                        },
                        function () {
                            $(this).find('.m-signature-item-wrap').removeClass('flipIt');
                        }
                    );

                    // for .m-tiles-promo-card
                    $('.m-tiles-opinion').removeClass('scroll').addClass('flip');

                    // add/remove flip class that make the transition effect
                    $('.m-tiles-opinion.flip').hover(
                        function () {
                            $(this).find('.m-tiles-opinion-wrap').addClass('flipIt');
                        },
                        function () {
                            $(this).find('.m-tiles-opinion-wrap').removeClass('flipIt');
                        }
                    );

                    /*$('.m-tiles-opinion.flip').mouseenter(function () {
                        $(this).find('.m-tiles-opinion-wrap').addClass('flipIt');
                    }).mouseleave(function () {
                            $(this).find('.m-tiles-opinion-wrap').removeClass('flipIt');
                        });
                     */

                } else {

                    // CSS 3D is not supported, use the scroll up effect instead

                    // for .m-signature-item
                    $('.m-signature-item').hover(
                        function () {
                            $(this).find('.m-signature-txt').stop().animate({bottom:0}, 500, 'easeOutCubic');
                        },
                        function () {
                            $(this).find('.m-signature-txt').stop().animate({bottom: ($(this).height() * -1) }, 500, 'easeOutCubic');
                        }
                    );


                    // for .m-tiles-promo-card
                    $('.m-tiles-opinion').hover(
                        function () {
                            $(this).find('.m-tiles-opinion-side-img').stop().animate({bottom:0}, 500, 'easeOutCubic');
                        },
                        function () {
                            $(this).find('.m-tiles-opinion-side-img').stop().animate({bottom: ($(this).height() * -1) }, 500, 'easeOutCubic');
                        }
                    );
                }


            });

        });
    }
);


