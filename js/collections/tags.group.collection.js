define([
    "jquery",
    "underscore",
    "backbone",
    "models/tag.group.model"
],
    function($, _, Backbone, TagGroup) {

        var TagsGroups = Backbone.Collection.extend({

            model : TagGroup,
            parent : null,

            constructor : function(models, options) {

                if ( options && options.parent ) {

                    this.parent = options.parent;
                }

                Backbone.Collection.apply(this,arguments);
            },

            initialize : function() {

                this.listenTo(this,"change:tags",this._notifyParent);
            },

            _notifyParent : function() {

                if ( this.parent && this.parent.trigger ) {

                    this.parent.trigger("change:tagsGroup",this);
                }
            }
        });

        return TagsGroups;
    });
