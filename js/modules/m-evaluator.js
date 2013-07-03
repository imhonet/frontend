define(
    [
        "app",
        "jquery",
        "modernizr",
        "showcase"
    ],

    function(App, $){

        App.module('evaluator', function(filter){
            $(function () {
                $('.m-evaluator-gallery').showCase();

                //$('.sotial-net').socialsLike();
            });
        });
    }
);