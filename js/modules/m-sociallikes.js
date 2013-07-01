define(
    [
        "app",
        "jquery",
        "social-likes"
    ],

    function(App, $){

        App.module('socials', function(filter){
            $(function () {
                $('.sotial-net').socialsLike();
            });
        });
    }
);