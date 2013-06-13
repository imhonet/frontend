define(
    [
        "app",
        "jquery"
    ],

    function(App, $){
        App.module('subnavigation', function(){

            $(function(){

                $('.m-subnavigation-item').click(function(){

                    $('.m-subnavigation-hide').hide();
                    $('.m-subnavigation-item').removeClass("active");
                    var linkSubnavigation = $('.m-subnavigation-item');
                    for (var i=0; i<linkSubnavigation.size(); i++){
                        var classLink = 'm-subnavigation-item-' + (i+1);
                        var classHide = 'm-subnavigation-hide-' + (i+1);


                        if ($(this).hasClass(classLink)){
                            $(this).toggleClass("active");
                            $("."+ classHide).show();
                        };

                    };
                });
            });

        });
    }
);


