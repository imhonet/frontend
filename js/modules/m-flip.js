define(
    [
        "app",
        "jquery",
        "flip"
    ],

    function(App, $){
        App.module('subnavigation', function(){

            $(function(){

                $('.m-signature-item').mouseover(
                    function(){
                        $(this).flip({
                            direction : "rl",
                            color : "#f38366",
                            speed : "200"
                        });
                        $(this).toggleClass('active');

                    }
                );

            });

        });
    }
);


