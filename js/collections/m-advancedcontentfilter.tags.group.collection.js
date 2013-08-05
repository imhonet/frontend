define([
    "underscore",
    "backbone",
    "collections/custom.collection",
    "models/m-advancedcontentfilter.tags.group.model"
],
    function(_, Backbone, CustomCollection, AdvancedContentFilterTagsGroupModel) {

        var CustomModel = Backbone.Model.extend({

            defaults : {

                name : null,
                message : null,
                expanded : false,
                model : "scale"
            }
        });

        var TagsGroups = CustomCollection.extend({

            model : AdvancedContentFilterTagsGroupModel,

            modelTypes : {
                scale : CustomModel,
                recommendationStatus : CustomModel
            }
        });

        return TagsGroups;
    });
