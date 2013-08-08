<?php

    sleep(3);

    class Years {

        public $from, $to;

        function __construct($from, $to) {

            $this->from = $from;
            $this->to = $to;
            $this->defaultFrom = $from;
            $this->defaultTo = $to;
        }
    }

    class Tag {

        public $id, $name, $isBlock, $active;

        function __construct($id, $name, $isBlock = false, $state = 0) {

            $this->id = $id;
            $this->name = $name;
            $this->state = $state;
            $this->isBlock = $isBlock;

            return this;
        }

        public function setState($value) {

            $this->state = $value;
        }

        public function setName($value) {

            $this->name = $value;
        }
    }

    class CustomModel {

        public $name, $expanded = false, $model, $itemView;

        function __construct($name, $model, $type) {

            $this->name = $name;
            $this->model = $this->itemView = $model;
            $this->uiType = $type;
        }

    }

    class TagGroup {

        public $id, $name, $internalName, $tags = array('');
        private $_isBlock;

        function __construct($id, $name, $internalName, $uiType, $isBlock = false) {

            $this->id = $id;
            $this->name = $name;
            $this->uiType = $uiType;
//            $this->expanded = false;
            $this->_isBlock = $isBlock;
            $this->internalName = $internalName;

            return this;
        }

        public function setExpanded($value) {

            $this->expanded = $value;
        }

        public function getTags() {

            return $this->tags;
        }

        public function setTags(array $tags) {

            $this->tags = array();

            for ( $i = 0, $len = count($tags); $i < $len; $i++ ) {
                array_push($this->tags, new Tag($i, $tags[$i], $this->_isBlock, $tags[i]["state"]));
            }

            return $this;
        }
    }

    $tagsGroups = array();

    function addTagGroup(&$arr, $tagGroup, $tags) {

        array_push($arr, $tagGroup->setTags($tags));
    }

    function getRequest() {

        $requestJSON = json_decode(file_get_contents('php://input'));

        return ( !$requestJSON ) ? null : $requestJSON;
    }

    function updateTagsGroups(&$filter,$request) {

        for ( $i = 0, $len = count($filter); $i < $len; $i++ ) {

            $filter[$i]->expanded = $request->tagsGroups[$i]->expanded;

            if ( !method_exists($filter[$i],"getTags") ) continue;

            $groupTags = $filter[$i]->getTags();
            $requestTags = $request->tagsGroups[$i]->tags;

            for ( $j = 0, $lenJ = count($groupTags); $j < $lenJ; $j++ ) {

                $groupTag = $groupTags[$j];
                $groupTag->setActive($requestTags[$j]->active);
            }
        }
    }

    $years = new Years(1980,2000);

    addTagGroup($tagsGroups, new TagGroup(1,"Фильтр","consume","static",true),["Смотреть онлайн","Можно скачать","Можно купить"]);
    addTagGroup($tagsGroups, new TagGroup(2,"Жанр","genre","wide"),["Аниме","Артхаус","Биография","Боевики","Военный","Детективы","Документальные","Драмы","Исторический","Комедии","Короткометражный","Криминал","Мелодрамы","Мистика","Мультфильмы","Мюзиклы","Научные","Приключения","Прочее","Спорт","Триллеры","Ужасы","Фантастика"]);
    addTagGroup($tagsGroups, new TagGroup(3,"Страна","country","wide"),["США","Россия","Беларусь","Чехия","Англия"]);
    addTagGroup($tagsGroups, new TagGroup(4,"Награды","awards","mid"),["Оскар","Распберри","Берлинале"]);

    $tagsGroups[3]->setExpanded(true);

    array_push($tagsGroups,new CustomModel("шкала бобрикова","scale","static"));
    array_push($tagsGroups,new CustomModel("Рекомендации","recommendationStatus","static"));

    if ( ($request = getRequest()) !== null ) {

        $years->to = $request->years->to;
        $years->from = $request->years->from;
        updateTagsGroups($tagsGroups,$request);

        if ( false ) {

            if ( count($request->tagsGroups) == 2 ) {
                addTagGroup($tagsGroups, new TagGroup(3,"Крутотень","crazyStuff"),["Опа","Шмопа"]);
                $tagsGroups[2]->tags[0]->setActive(true);
            }
            else if ( count($request->tagsGroups) == 3 ) {

                array_pop($request->tagsGroups);
            }
        }
    }

    $payload = new StdClass();

    $payload->years = $years;
    $payload->tagsGroups = $tagsGroups;

    if ( !getRequest() ) {

//        $payload->tagsGroups[4]->expanded = true;
        $payload->tagsGroups[1]->tags[0]->setState(1);
    }

    echo json_encode($payload);

?>