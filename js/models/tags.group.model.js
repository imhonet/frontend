define([
    "jquery",
    "underscore",
    "backbone",
    "collections/tag.collection",
    "models/child.model"
],
    function($, _, Backbone, Tags, ChildModel) {

        var TagsGroup = ChildModel.extend({

            parentEvent : "update:filter",

            defaults : {

                name : null,
                expanded : false,
                tags : null
            },

            parse : function(response, options) {

                response.tags = new Tags(response.tags,{ parent : this });

                return response;
            }
        });

        return TagsGroup;
    });
