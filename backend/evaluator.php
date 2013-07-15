<?php

    $items = array();

    $types = array(
        'html',
        'rate',
        'list',
        'thumbs',
        'doublelist'
    );
    $count = 20;

    for ($i=0; $i<$count; $i++){
        $items[] = array(
            'id' => $i+time(),
            'model' => $types[1],//rand(0,sizeof($types)-1)],
            'src' => 'img/films/185x270.jpg'
        );
    }

    $results = array(
        'forecast' => '55',
        'items'=>$items
    );
    die(json_encode($results));
?>