define([
    "jquery",
    "underscore",
    "marionette",
    "views/collections/mixed.collection.view",
    "views/composite/m-advanced-content-filter.tags.group.composite.view",
    "views/m-advanced-content-filter.scale.view",
    "views/m-advanced-content-filter.recommendations.status.view"
],
    function($, _, Marionette, MixedCollectionView, TagsGroupCompositeView, ScaleView, RecommendationsStatusView) {

        var TagsGroups = MixedCollectionView.extend({

            tagName : "div",
            itemView : TagsGroupCompositeView,
            itemViewType : "model",

            itemViews : {
                scale : ScaleView,
                recommendationStatus : RecommendationsStatusView
            },

            onRender : function() {

                var expandedTagsGroup, viewCid;

                expandedTagsGroup = this.collection.find(function(tagGroupModel){

                    if ( tagGroupModel.get("expanded") ) return true;
                });

                if ( expandedTagsGroup ) {

                    viewCid = this.children._indexByModel[expandedTagsGroup.cid];
                }

                if ( viewCid ) {

                    App.vent.trigger("advanced-content-filter:tag-group:status",{
                        cid : viewCid,
                        status : true
                    })
                }
            }
        });

        return TagsGroups;
    });
