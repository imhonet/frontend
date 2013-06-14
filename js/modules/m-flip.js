define(
    [
        "app",
        "jquery",
        "modernizr",
        "flip"
    ],

    function(App, $){
        App.module('subnavigation', function(){

            $(function () {
                // Utilize the modernzr feature support class to detect CSS 3D transform support
                if ($('html').hasClass('csstransforms3d')) {

                    // if it's supported, remove the scroll effect add the cool card flipping instead
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

                } else {

                    // CSS 3D is not supported, use the scroll up effect instead
                    $('.m-signature-item').hover(
                        function () {
                            $(this).find('.m-signature-txt').stop().animate({bottom:0}, 100, 'easeOutCubic');
                        },
                        function () {
                            $(this).find('.m-signature-txt').stop().animate({bottom: ($(this).height() * -1) }, 100, 'easeOutCubic');
                        }
                    );
                }
            });

        });
    }
);


