define([
    "underscore",
    "backbone",
    "collections/child.custom.collection",
    "models/m-advancedcontentfilter.tag.model"
],
    function(_, Backbone, ChildCustomCollection, AdvancedContentFilterTagModel) {

        var AdvancedContentFilterTags = ChildCustomCollection.extend({

            model : AdvancedContentFilterTagModel,
            parentEvent : "update:tags"
        });

        return AdvancedContentFilterTags;
    });
