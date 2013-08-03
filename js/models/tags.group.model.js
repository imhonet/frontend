define([
    "jquery",
    "underscore",
    "backbone",
    "collections/tag.collection",
    "models/child.model"
],
    function($, _, Backbone, Tags, ChildModel) {

        var TagsGroup = ChildModel.extend({

            ownEvent : "update:tags",
            parentEvent : "update:filter",

            defaults : {

                name : null,
                internalName : null,
                expanded : false,
                tags : null,
                logic : true
            },

            getFilterData : function() {

                return {
                    id : this.get("id"),
                    name : this.get("internalName"),
                    expanded : this.get("expanded"),
                    include : this.getChangedTags(),
                    exclude : this.getChangedTags(false),
                    logic : this.get("logic")
                }
            },

            getChangedTags : function(active) {

                active = ( active !== false ) ? true : active;

                var tags = this.get("tags"),
                    tagProperty = "active";

                    console.log(tags.filter(function(tag){ return tag.get(tagProperty) === active && tag.hasChanged(tagProperty); }));

                    return _.map(
                        tags.filter(function(tag){ return tag.get(tagProperty) === active && tag.hasChanged(tagProperty); }),
                        function(tag){ return tag.get("id"); }
                    );
            },

            initialize : function() {

                if ( this.ownEvent ) {

                    this.listenTo(this,"change:expanded",this._notifyParent);
                }
            },

            parse : function(response, options) {

                response.tags = new Tags(response.tags,{ parent : this });

                return response;
            }

        });

        return TagsGroup;
    });
