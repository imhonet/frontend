<?php
    /*
     * Все public, для простоты создания тестовых данных (в реале поменять)
     */

    //Пример класса элемента системы рейтинга
    abstract class EvaluatorItem {
        //Идентификатор элемента системы рейтинга (строка id)
        public $id;
        //Тип элемента
        public $type = null;

        public function getJsonData(){
            $var = get_object_vars($this);
            foreach($var as &$value){
                if(is_object($value) && method_exists($value,'getJSON')){
                    $value = $value->getJsonData();
                }
            }
            return $var;
        }
    }

    //Пример класса HTML блока для системы рейтинга
    class EvaluatorItemHTML extends EvaluatorItem {
        public $type = 'html';
        //HTML код блока, содержит любой html код (главное, чтоб верстка не развалилась)
        public $code;
        //Ставить ли обработчик на клик (bool)
        public $clickable;
        //Возвращается с клиента - Нажатие на блок, если установлен выше описанный флаг
        public $click;
    }

    //Пример класса блока рейтинга (звездочки с картинкой) для системы рейтинга
    class EvaluatorItemRate extends EvaluatorItem {
        public $type = 'rate';
        //Заголовок, он же alt картинки
        public $title;
        //Путь к картинке рейтинга
        public $img;
        //Возвращается с клиента - Рейтинг от 1 до 10
        public $rate;
    }

    //Пример класса списка для системы рейтинга
    class EvaluatorItemList extends EvaluatorItem {
        public $type = 'list';
        //Заголовок
        public $title;
        //Нужно ли располагать в 2 столбца
        public $double;
        //Набпись на кнопке, если не указана, то выбор осуществляется нажатием на элемент
        public $buttonText;
        //Возвращается с клиента - id выбранного элемента
        public $selected;

        //Массив элементов списка (EvaluatorItemListItem)
        public $items;

        function __construct() {
            $this->double = false;
            $this->buttonText = '';
            $this->items = array();
        }
    }

    //Пример класса элемента списка для системы рейтинга
    class EvaluatorItemListItem {
        //Идентификатор элемента списка (строка id)
        public $id;
        //Заголовок (при наличии картинки не отобразится -  будет использоваться как alt)
        public $title;
        //Путь к картинке элемента списка
        public $img;
        //Превью картинки - если не задан -  будет использоваться основная картинка в рамках размеров превью
        public $thumb;

        function getJSON(){
            $var = get_object_vars($this);
            foreach($var as &$value){
                if(is_object($value) && method_exists($value,'getJSON')){
                    $value = $value->getJsonData();
                }
            }
            return $var;
        }
    }

    //Пример класса системы рейтинга
    class Evaluator {
        //Точность прогноза (от 0 до 1 (преобразуется в проценты))
        public $forecast;
        //Массив id элементов, по которым уже было голосование
        public $usedIds;
        //Количество элементов, которые нужно передать клиенту (может приходить с клиента)
        public $count;
        //Элементы ретинга для отдачи на клиент
        public $items;

        function __construct() {
            $this->forecast = 0;
            $this->usedIds = array();
            $this->count = 0;
            $this->items = array();
        }

        function getJsonData(){
            $var = get_object_vars($this);
            foreach($var as &$value){
                if(is_object($value) && method_exists($value,'getJSON')){
                    $value = $value->getJsonData();
                }
            }
            return $var;
        }
    }

    // Helper для тестовых данных
    class Helper {
        static public $types = array(
            'html',
            'rate',
            'list'
        );

        static public $templates = array(
            'html' => array(
                'code' => '
                    <div class="m-evaluator-gallery-facebook">
                    <div class="facebook-title">{{RANDOM_TITLE}}</div>
                    <div class="facebook-body"><p>Улучши свои рекомендации на<br>25%, заходи под аккаунтом
                        <br>Facebook</p>
                        <button class="btn btn-facebook">Зайти под аккаунтом Facebook</button>
                    </div>
                </div>'
            ),
            'rate' => array(
                'img' => 'img/films/185x270.jpg'
            ),
            'list' => array(
                'img' => 'img/photogall/user.jpg'
            )
        );

        static public function getRandomEvaluatorItemId(){
            return uniqid('evaluator_',true);
        }

        static public function getRandomListItemId(){
            return uniqid('list_',true);
        }

        static public function getRandomForecast(){
            return rand(0,100)/100;
        }

        static public function getRandomTitle(){
            $text = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
            $len = sizeof($text);
            $start = rand(0,50);
            return substr($text,$start, rand(10, 20));
        }

        static public function getRandomListItem($is_images){
            $item = new EvaluatorItemListItem();
            $item->id = self::getRandomListItemId();
            $item->title = self::getRandomTitle();
            if ($is_images){
                $item->img = self::$templates['list']['img'];
                $item->thumb = self::$templates['list']['img'];
            }
            return $item;
        }

        static public function getRandomEvaluatorItemHTML(){
            $item = new EvaluatorItemHTML();
            $item->id = self::getRandomEvaluatorItemId();
            $item->clickable = rand(0,1) == 1;
            $item->code = str_replace('{{RANDOM_TITLE}}',self::getRandomTitle(),self::$templates['html']['code']);
            return $item;
        }

        static public function getRandomEvaluatorItemRate(){
            $item = new EvaluatorItemRate();
            $item->id = self::getRandomEvaluatorItemId();
            $item->title = self::getRandomTitle();
            $item->img = self::$templates['rate']['img'];
            return $item;
        }

        static public function getRandomEvaluatorItemList(){
            $item = new EvaluatorItemList();
            $item->id = self::getRandomEvaluatorItemId();
            $item->title = self::getRandomTitle();
            $item->double = rand(0,1) == 1;
            $item->buttonText = (rand(0,1) == 1)?'Отправить':'';
            $count = rand(2,4);
            if ($item->double){
                $count = $count*2;
            }
            $is_images = rand(0,1) == 1;
            for ($i = 0; $i < $count; $i++){
                $item->items[] = self::getRandomListItem($is_images);
            }
            return $item;
        }

        static public function getRandomEvaluatorItem(){
            $type = self::$types[rand(0,2)];
            $item = false;
            switch ($type){
                case 'html':
                    $item = self::getRandomEvaluatorItemHTML();
                    break;
                case 'rate':
                    $item = self::getRandomEvaluatorItemRate();
                    break;
                case 'list':
                    $item = self::getRandomEvaluatorItemList();
                    break;
            }
            return $item;
        }
    }

$method = $_SERVER['REQUEST_METHOD'];


if ($method == 'PUT'){
    //Сохранить значение голосования (PUT), вернуть новые проценты прогноза
    /*
     * в запросе модель элемента приходит
     */

    $evaluator = new Evaluator();
    $evaluator->forecast = Helper::getRandomForecast();
    die(json_encode($evaluator->getJsonData()));
} else {
    //Получить список элементов (GET)
    $evaluator = new Evaluator();
    $evaluator->forecast = Helper::getRandomForecast();
    $evaluator->usedIds = array();
    for ($i = 0; $i < 10; $i++){
        $evaluator->usedIds[] = Helper::getRandomEvaluatorItemId();
    }
    $evaluator->count = 20;
    $evaluator->items = array();
    for ($i = 0; $i < $evaluator->count; $i++){
        $evaluator->items[] = Helper::getRandomEvaluatorItem();
    }

    die(json_encode($evaluator->getJsonData()));
}