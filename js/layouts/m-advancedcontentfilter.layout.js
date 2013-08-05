define([
    "jquery",
    "underscore",
    "marionette",
    "text!templates/layouts/m-advancedcontentfilter.layout.html",
    "views/m-advancedcontentfilter.years.view",
    "views/collections/m-advancedcontentfilter.tags.groups.collection.view"
],
    function($, _, Marionette, Template, YearsView, TagsGroupsCollectionView) {

        var FilterLayout = Marionette.Layout.extend({

            className : "m-advancedcontentfilter",
            template : Template,
            regions : {

                years : "[data-region='m-advanced-content-filter-years']",
                tagsGroups : "[data-region='m-advanced-content-filter-items']"
            },

            onShow : function() {

                this.years.show(new YearsView({
                    model : this.model.get("years")
                }));
                this.tagsGroups.show(new TagsGroupsCollectionView({
                    collection : this.model.get("tagsGroups")
                }));
            }
        });

        return FilterLayout;
    });
