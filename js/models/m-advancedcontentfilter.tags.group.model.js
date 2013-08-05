define([
    "underscore",
    "backbone",
    "collections/m-advancedcontentfilter.tag.collection",
    "models/child.model"
],
    function(_, Backbone, AdvancedContentFilterTagsCollection, ChildModel) {

        var TagsGroupModel = ChildModel.extend({

            ownEvent : "update:tags",
            parentEvent : "update:filter",

            defaults : {

                name : null,
                internalName : null,
                expanded : false,
                tags : null,
                logic : true
            },

            // API method for parent AdvancedContentFilter model
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

                response.tags = new AdvancedContentFilterTagsCollection(response.tags,{ parent : this });

                return response;
            }

        });

        return TagsGroupModel;
    });
