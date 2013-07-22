define(
    [
        "app",
        "jquery",
        "modernizr",
        "showcase",
        "models/evaluator.model"
    ],

    function(App, $, modernizr, showcase, EvaluatorModel){

        App.module('Evaluator', function(Evaluator){
            var terminator = 10;
            var evaluatorForecastRegion = new Marionette.Region({
                el : '[data-region="m-evaluator-forecast"]'
            });

            var evaluatorGalleryRegion = new Marionette.Region({
                el : '[data-region="m-evaluator-gallery"]'
            });

            var model = new EvaluatorModel();
            var galleryView = new model.gallery.viewClass({collection: model.gallery});
            var forecastView = model.forecast;

            evaluatorGalleryRegion.show(galleryView);
            evaluatorForecastRegion.show(forecastView);

            var Controller = Marionette.Controller.extend({

                next: function(current, total){
                    if (total-current<terminator){
                        Evaluator.controller.fetch();
                    }
                },

                prev: function(current, total){
                    if (total-current<terminator){
                        Evaluator.controller.fetch();
                    }
                },

                fetch: function(){
                    model.fetch();
                }
            });

            Evaluator.controller = new Controller();
            model.bind('loaded', function(){
                $('.m-evaluator-gallery').showCase({
                    onNext: Evaluator.controller.next,
                    onPrev: Evaluator.controller.prev
                });
            });

            model.bind('fetch', function(){
                $('.m-evaluator-gallery').showCase("recalc");
            });

            model.bind('saveItem', function(item){
                model.save(item);
                $('.m-evaluator-gallery').showCase("next");
            });

            Evaluator.addInitializer(function(){
                this.controller.fetch();
            });
        });
    }
);