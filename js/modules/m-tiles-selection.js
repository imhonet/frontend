define(
    [
        "app",
        "jquery",
        "modernizr",
        "metroJs"
    ],

    function(App, $){
        App.module('m-tiles-selection', function(){

           $(function () {

                //flip-list: image swaps and triggerDelay

//an array of 9 images to swap between
                var nineImgs = [
                    {src:'img/photogall/user.jpg', alt:'1'},
                    {src:'img/photogall/user.jpg', alt:'2'},
                    {src:'img/photogall/user.jpg', alt:'3'},
                    {src:'img/photogall/user.jpg', alt:'4'},
                    {src:'img/photogall/user.jpg', alt:'5'},
                    {src:'img/photogall/user.jpg', alt:'6'},
                    {src:'img/photogall/user.jpg', alt:'7'},
                    {src:'img/photogall/user.jpg', alt:'8'},
                    {src:'img/photogall/user.jpg', alt:'9'},
                    {src:'img/photogall/user.jpg', alt:'1'},
                    {src:'img/photogall/user.jpg', alt:'2'},
                    {src:'img/photogall/user.jpg', alt:'3'},
                    {src:'img/photogall/user.jpg', alt:'4'},
                    {src:'img/photogall/user.jpg', alt:'5'},
                    {src:'img/photogall/user.jpg', alt:'6'},
                    {src:'img/photogall/user.jpg', alt:'7'},
                    {src:'img/photogall/user.jpg', alt:'8'},
                    {src:'img/photogall/user.jpg', alt:'9'},
                    {src:'img/photogall/user.jpg', alt:'8'},
                    {src:'img/photogall/user.jpg', alt:'9'}
                ];

                    $(".flip-list").liveTile(
                        {
                            mode:'flip-list',
                            // fade the image before swapping
                            frontImages: null,
                            backImages: nineImgs,
                            //choose image in sequence from the array
                            frontIsRandom: true,
                            // every tile in the list should flip every time the delay interval occurs
                            alwaysTrigger:false,
                            flipListOnHoverEvent: 'mouseover',
                            speed: 400,

                            startNow: false,
                            playOnHover:  true,
                            playOnHoverEvent: 'mouseover',
                            //pauseOnHover: true,
                            //pauseOnHoverEvent: 'mouseout',
                            //flip the tiles in sequence
                            triggerDelay: function(idx){ return idx * 150; },
                            animationStarting: function (tileData, $front, $back) { $(this).parent().addClass('animation');}
                        }
                    );



           });

        });
    }
);


