define(
    [
        "app",
        "layouts/filter",
        "layouts/filter-current",
        "models/filter.model"
    ],

    function(App, FilterLayout, FilterCurrentLayout, FilterModel){

        App.module('AdvancedContentFilter', function(AdvancedContentFilter){

            var filterRegion = new Marionette.Region({
                el : '[data-region="m-advancedcontentfilter"]'
            })
            var filterCurrentRegion = new Marionette.Region({
                el : '[data-region="m-advancedcontentfilter-current"]'
            })

            var filterModel = new FilterModel();

            var Controller = Marionette.Controller.extend({

                filterSyncedState : function() {

                    this.listenToOnce(filterModel,"sync",this.showLayout);
                    return this;
                },

                fetchFilter : function() {

                    filterModel.fetch();
                    return this;
                },

                updateFilterModel : function(model) {

                    filterModel
                        .addSubFilter(model)
                        .sendFilterToBackend();

                    //filterModel.save();
                },

                showLayout : function() {

                    this.listenTo(filterModel,"update:filter",this.updateFilterModel);

                    filterRegion.show(new FilterLayout({
                        model : filterModel
                    }));

                    filterCurrentRegion.show(new FilterCurrentLayout({
                        model : filterModel
                    }))

                    return this;
                }
            })

            AdvancedContentFilter.controller = new Controller();

            AdvancedContentFilter.addInitializer(function(){

                this.controller.filterSyncedState().fetchFilter();
            })

        });
    }
);