define([
    "jquery",
    "underscore",
    "backbone",
    "collections/child.custom.collection",
    "models/tags.group.model"
],
    function($, _, Backbone, ChildCustomCollection, TagsGroup) {

        var CustomModel = Backbone.Model.extend({

            defaults : {

                name : null,
                message : null,
                expanded : false,
                model : "scale"
            }
        });

        var TagsGroups = ChildCustomCollection.extend({

            model : TagsGroup,
            parentEvent : "update:filter",

            modelTypes : {
                scale : CustomModel,
                recommendationStatus : CustomModel
            }
        });

        return TagsGroups;
    });
