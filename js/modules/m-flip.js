define(
    [
        "app",
        "jquery",
        "flip"
    ],

    function(App, $){
        App.module('subnavigation', function(){

            $(function(){

                $('.m-signature-item').click(function(){
                    $(this).toggleClass('active');
                    $(this).flip({
                        direction:"rl",
                        color:"#f38366"
                    });


                });

            });

        });
    }
);


