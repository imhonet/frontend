jQuery(window).load(function(){

   /* var mediaQuery767 = "screen and (max-width: 767px)",
        mediaQuery979 = "screen and (min-width: 768px) and (max-width: 979px)",
        mediaQuery1200 = "screen and (min-width: 980px) and (max-width: 1200px)",
        mediaQuery1200plus = "screen and (min-width: 1200px)",
        $card = jQuery('.m-films-promo-card'),
        $cardColumns = jQuery('.card-columns'),
        $columns = jQuery('.card-columns > div'),
        n = 0, m = 4, l = -1, k = 2;

    enquire.register(mediaQuery979,
        {
            match: function(){

                $cardColumns.append(new Array(3).join('<div class="span4"></div>'))
            }
        })

    enquire.register(mediaQuery1200,
        {
            match: function(){

                $cardColumns.append(new Array(3).join('<div class="span4"></div>'))
            }
        })

    enquire.register(mediaQuery1200plus,
        {
            match: function(){

                $cardColumns.append(new Array(4).join('<div class="span3"></div>'))
            }
        })

    $columns.each(function(index, column) {

        count = Math.floor(Math.random() * (n - m + 1)) + m;
        for (i=0; i < count; i++) {

            countCards = Math.floor(Math.random() * (l - k + 1)) + k;
            jQuery(column).append($card.eq(countCards).clone());
        }
    })*/

    $('.m-films-promo-card').wookmark(
        {
            autoResize: true,
            container: $('.m-films'),
            itemWidth: 300,
            offset: 20
        }
    );
})