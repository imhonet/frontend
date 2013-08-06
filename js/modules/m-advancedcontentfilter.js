define(
    [
        "app",
        "layouts/m-advancedcontentfilter.layout",
        "layouts/m-advancedcontentfilter.current.layout",
        "models/m-advancedcontentfilter.filter.model"
    ],

    function(App, FilterLayout, FilterCurrentLayout, AdvancedContentFilterModel){

        App.module('AdvancedContentFilter', function(AdvancedContentFilter){

            var filterRegion = new Marionette.Region({
                el : '[data-region="m-advancedcontentfilter"]'
            })
            var filterCurrentRegion = new Marionette.Region({
                el : '[data-region="m-advancedcontentfilter-current"]'
            })

            var filterModel = new AdvancedContentFilterModel();

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

                    return;
                    filterModel
                        .addSubFilter(model)
                        .sendFilterToBackend();
                },

                emitUpdatedBusEvent : function() {

                    App.vent.trigger("content:filter:updated");
                },

                showLayout : function() {

                    this.listenTo(filterModel,"update:filter",this.updateFilterModel);
                    this.listenTo(filterModel,"filter:backend:updated",this.emitUpdatedBusEvent);

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