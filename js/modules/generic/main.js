define([
    "app",
    "backbone",
    "marionette",
    "views/enhanced.collection.view",
    "views/existing.collection.view",
    "views/cards/cards.movie.view",
    "views/cards/cards.movie.foo.view"
], function(App, Backbone, Marionette, EnhancedCollectionView, ExistingCollectionView, CardsMovieView, CardsMovieFooView){

    var Generic = App.module("Generic");

    Generic.addInitializer(function(){

        var data = [
            {
                src : 'img/cruds.jpg',
                type : 'Новинка',
                title : 'Семейка Крудс. Они останутся в истории эволюции',
                comments : 40,
                likes : 100,
                people : 1000,
                c : 1

            },
            {
                src : 'img/super.jpg',
                type : 'Самое популярное',
                title : 'Человек из стали',
                comments : 40,
                likes : 100,
                people : 1000,
                t : 'super',
                c : 2
            },
            {
                src : 'img/cruds.jpg',
                type : 'Новинка',
                title : 'Семейка Крудс. Они останутся в истории эволюции',
                comments : 40,
                likes : 100,
                people : 1000,
                c : 1
            },
            {
                src : 'img/super.jpg',
                type : 'Самое популярное',
                title : 'Человек из стали',
                comments : 40,
                likes : 100,
                people : 1000,
                t : 'super',
                c : 2
            },
            {
                src : 'img/cruds.jpg',
                type : 'Новинка',
                title : 'Семейка Крудс. Они останутся в истории эволюции',
                comments : 40,
                likes : 100,
                people : 1000,
                c : 3
            },
            {
                src : 'img/cruds.jpg',
                type : 'Новинка',
                title : 'Семейка Крудс. Они останутся в истории эволюции',
                comments : 40,
                likes : 100,
                people : 1000,
                c : 3
            },
            {
                src : 'img/super.jpg',
                type : 'Самое популярное',
                title : 'Человек из стали',
                comments : 40,
                likes : 100,
                people : 1000,
                t : 'super',
                c : 2
            },
            {
                src : 'img/super.jpg',
                type : 'Самое популярное',
                title : 'Человек из стали',
                comments : 40,
                likes : 100,
                people : 1000,
                t : 'super',
                c : 2
            }
        ];

        //data = data.concat(data);

        var moviesCollection = new Backbone.Collection(data);

        var region = new Marionette.Region({
            el : '#movies-collection'
        })

        var CollectionView = ExistingCollectionView.extend({

            existingEl : '#sex',
            existingItemEl : '.m-films-promo-card',
            columns : 4,
            columnEl : 'div',
            columnElClassName : 'l-span3',
            itemView : CardsMovieView,
            itemViewType : 't',
            itemViews : {
                'super' : CardsMovieFooView
            }

        })

        var collectionView = new CollectionView({
            collection : moviesCollection
        });

        collectionView.render();
        region.show(collectionView);

    });

    Generic.addFinalizer(function(){
        MyApp.someRegion.close();
    });

    return Generic;
});