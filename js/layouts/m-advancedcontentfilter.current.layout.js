define([
    "jquery",
    "underscore",
    "marionette",
    "text!templates/layouts/m-advancedcontentfilter.current.layout.html",
    "views/collections/m-advancedcontentfilter.current.tags.groups.collection.view",
    "views/m-advancedcontentfilter.current.years.view",
    "views/m-advancedcontentfilter.reset.view"
],
    function($, _, Marionette, Template, CurrentTagsGroupsCollectionView, YearsView, FilterResetView) {

        var FilterCurrentLayout = Marionette.Layout.extend({

            template : Template,

            regions : {
                years : "[data-region='m-advanced-filter-current-years']",
                tagsGroups : "[data-region='m-advanced-filter-current-tags-groups']",
                filterReset : "[data-region='m-advanced-content-filter-reset']"
            },

            onShow : function() {

                this.years.show(new YearsView({
                    model : this.model.get("years")
                }));

                this.tagsGroups.show(new CurrentTagsGroupsCollectionView({
                    collection : this.model.get("tagsGroups")
                }))

                this.filterReset.show(new FilterResetView({
                    model : this.model
                }))
            }
        });

        return FilterCurrentLayout;
    });
