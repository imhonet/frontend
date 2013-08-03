define([
    "jquery",
    "underscore",
    "backbone",
    "collections/custom.collection",
    "models/tags.group.model"
],
    function($, _, Backbone, CustomCollection, TagsGroup) {

        var CustomModel = Backbone.Model.extend({

            defaults : {

                name : null,
                message : null,
                expanded : false,
                model : "scale"
            }
        });

        var TagsGroups = CustomCollection.extend({

            model : TagsGroup,

            modelTypes : {
                scale : CustomModel,
                recommendationStatus : CustomModel
            }
        });

        return TagsGroups;
    });
