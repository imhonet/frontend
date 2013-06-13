define(
    [
        "app",
        "jquery",
        "flip"
    ],

    function(App, $){
        App.module('subnavigation', function(){

            $(function(){

                var isHover = false;
                $(".m-signature-item").mouseenter(function () {
                    if (isHover == false) {
                        isHover = true;
                        var elem = $(this);
                        elem.flip({
                            direction: 'rl',
                            color: '#f38366',
                            speed: 200,
                            onBefore: function () {
                                elem.removeClass('hoverfront');
                                elem.addClass('back');
                            }
                        });
                    }
                }).mouseleave(function () {
                        var elem = $(this);

                            elem.flip({
                                direction: 'lr',
                                color: '#f38366',
                                speed: 200,
                                onBefore: function () {
                                    elem.removeClass('back');
                                    elem.addClass('hoverfront');
                                }
                            });
                            isHover = false;

                    });


            });

        });
    }
);


