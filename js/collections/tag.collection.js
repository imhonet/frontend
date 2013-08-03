define([
    "jquery",
    "underscore",
    "backbone",
    "collections/child.custom.collection",
    "models/tag.model"
],
    function($, _, Backbone, ChildCustomCollection, Tag) {

        var Tags = ChildCustomCollection.extend({

            model : Tag,
            parentEvent : "update:tags"
        });

        return Tags;
    });
